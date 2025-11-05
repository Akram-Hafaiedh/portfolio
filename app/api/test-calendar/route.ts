// api/test-calendar/route.ts
import { NextResponse } from "next/server";
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

function getAuthClient(): OAuth2Client {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.PORTFOLIO_GOOGLE_CLIENT_EMAIL,
            private_key: process.env.PORTFOLIO_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ],
    });

    return auth as unknown as OAuth2Client;
}

// Get calendar client
function getCalendarClient() {
    const auth = getAuthClient();
    return google.calendar({ version: 'v3', auth });
}

export async function GET() {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is disabled in production.' },
            { status: 403 }
        );
    }
    console.log('\n=== Testing Calendar Access ===\n');

    try {
        const calendar = getCalendarClient();

        console.log('Testing calendar access...');
        console.log('Calendar ID:', process.env.PORTFOLIO_GOOGLE_CALENDAR_ID);
        console.log('Service Account:', process.env.PORTFOLIO_GOOGLE_CLIENT_EMAIL);

        // Test 1: Read calendar
        const calendarInfo = await calendar.calendars.get({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
        });

        console.log('✅ Calendar access successful');
        console.log('Calendar name:', calendarInfo.data.summary);

        // Test 2: Create event WITH conference data from the start
        const requestId = `test-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        const testEvent = {
            summary: 'Permission Test Event with Meet',
            description: 'Testing Google Meet link creation',
            start: {
                dateTime: new Date(Date.now() + 3600000).toISOString(),
                timeZone: 'UTC',
            },
            end: {
                dateTime: new Date(Date.now() + 7200000).toISOString(),
                timeZone: 'UTC',
            },
            conferenceData: {
                createRequest: {
                    requestId,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };

        console.log('Creating event with conference data...');

        const eventResponse = await calendar.events.insert({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            conferenceDataVersion: 1, // CRITICAL: Include this
            requestBody: testEvent,
        });

        console.log('✅ Event created successfully:', eventResponse.data.id);
        console.log('Conference data:', JSON.stringify(eventResponse.data.conferenceData, null, 2));

        // Extract the Google Meet link
        const meetLink = eventResponse.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === 'video'
        )?.uri;

        if (meetLink) {
            console.log('✅ Meet link created successfully:', meetLink);
        } else {
            console.log('⚠️ Event created but no Meet link found');
            console.log('Conference data status:', eventResponse.data.conferenceData?.createRequest?.status);
        }

        // Clean up: delete the test event
        await calendar.events.delete({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            eventId: eventResponse.data.id!,
        });

        console.log('✅ Test event deleted');
        console.log('\n=== Test Complete ===\n');

        return NextResponse.json({
            success: true,
            message: meetLink
                ? 'All tests passed! Calendar access and Meet link creation working.'
                : 'Event created but Meet link generation may have issues. Check calendar settings.',
            details: {
                calendarName: calendarInfo.data.summary,
                meetLink: meetLink || 'Not generated',
                conferenceDataStatus: eventResponse.data.conferenceData?.createRequest?.status,
            },
        });
    } catch (error: any) {
        console.error('❌ Calendar access test failed');
        console.error('Error:', error.message);
        console.error('Error code:', error.code);
        console.error('Error details:', JSON.stringify(error.response?.data, null, 2));
        console.log('\n=== Test Complete ===\n');

        return NextResponse.json({
            success: false,
            message: error.message,
            details: {
                errorCode: error.code,
                errorDetails: error.response?.data,
            },
        }, { status: 500 });
    }
}