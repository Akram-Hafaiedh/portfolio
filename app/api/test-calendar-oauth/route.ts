// Test the OAuth2 calendar integration
import { NextResponse } from "next/server";
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

function getOAuth2Client(): OAuth2Client {
    const oauth2Client = new google.auth.OAuth2(
        process.env.PORTFOLIO_GOOGLE_CLIENT_ID,
        process.env.PORTFOLIO_GOOGLE_CLIENT_SECRET,
        process.env.PORTFOLIO_GOOGLE_REDIRECT_URI
    );

    if (process.env.PORTFOLIO_GOOGLE_REFRESH_TOKEN) {
        oauth2Client.setCredentials({
            refresh_token: process.env.PORTFOLIO_GOOGLE_REFRESH_TOKEN,
        });
    }

    return oauth2Client;
}

export async function GET() {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is disabled in production.' },
            { status: 403 }
        );
    }
    console.log('\n=== Testing OAuth2 Calendar Access ===\n');

    try {
        // Check if refresh token exists
        if (!process.env.PORTFOLIO_GOOGLE_REFRESH_TOKEN) {
            return NextResponse.json({
                success: false,
                message: 'No refresh token found. Please complete OAuth flow first.',
                instructions: [
                    '1. Visit /api/auth/google to start OAuth flow',
                    '2. Authorize the application',
                    '3. Copy the refresh_token from the callback',
                    '4. Add it to .env.local as PORTFOLIO_GOOGLE_REFRESH_TOKEN',
                    '5. Restart server and try again',
                ],
            }, { status: 400 });
        }

        const oauth2Client = getOAuth2Client();
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        console.log('Testing OAuth2 calendar access...');

        // Test 1: Get user's calendar info
        const calendarList = await calendar.calendarList.list();
        const primaryCalendar = calendarList.data.items?.find(cal => cal.primary);

        console.log('✅ Calendar access successful');
        console.log('Primary calendar:', primaryCalendar?.summary);

        // Test 2: Create event with Google Meet
        const requestId = `test-oauth-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        const testEvent = {
            summary: 'OAuth2 Test Event with Meet',
            description: 'Testing Google Meet link creation with OAuth2',
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

        console.log('Creating event with Google Meet...');

        const eventResponse = await calendar.events.insert({
            calendarId: 'primary',
            conferenceDataVersion: 1,
            requestBody: testEvent,
        });

        console.log('✅ Event created:', eventResponse.data.id);

        const meetLink = eventResponse.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === 'video'
        )?.uri;

        if (meetLink) {
            console.log('✅ Meet link created successfully:', meetLink);
        } else {
            console.log('⚠️ Event created but no Meet link');
        }

        // Clean up
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: eventResponse.data.id!,
        });

        console.log('✅ Test event deleted');
        console.log('\n=== Test Complete ===\n');

        return NextResponse.json({
            success: true,
            message: '🎉 OAuth2 setup working perfectly! Google Meet links will be created automatically.',
            details: {
                calendarName: primaryCalendar?.summary,
                eventCreated: true,
                meetLinkGenerated: !!meetLink,
                meetLink: meetLink || 'Not generated',
            },
        });
    } catch (error: any) {
        console.error('❌ OAuth2 test failed');
        console.error('Error:', error.message);
        console.log('\n=== Test Complete ===\n');

        return NextResponse.json({
            success: false,
            message: error.message,
            details: {
                errorCode: error.code,
                suggestion: error.code === 401
                    ? 'Refresh token may be expired. Re-run OAuth flow at /api/auth/google'
                    : 'Check error details above',
            },
        }, { status: 500 });
    }
}