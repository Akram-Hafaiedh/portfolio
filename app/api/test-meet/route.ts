import { NextResponse } from "next/server";
import { google } from 'googleapis';

export async function GET() {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is disabled in production.' },
            { status: 403 }
        );
    }
    try {
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

        const calendar = google.calendar({ version: 'v3', auth: auth as any });

        // Try to create a test event with Meet
        const event = {
            summary: 'Test Meet Link',
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
                    requestId: `test-${Date.now()}`,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };

        console.log('Creating test event...');

        const response = await calendar.events.insert({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            conferenceDataVersion: 1,
            requestBody: event,
        });



        console.log('Test event created:', response.data.id);

        const meetLink = response.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === 'video'
        )?.uri;

        // Clean up
        await calendar.events.delete({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            eventId: response.data.id!,
        });

        return NextResponse.json({
            success: true,
            meetLink,
            message: meetLink ? 'Google Meet is working!' : 'Event created but no Meet link',
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            details: error.response?.data,
        });
    }
}