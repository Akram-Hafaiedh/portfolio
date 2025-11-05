// lib/google-calendar.ts
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Initialize the OAuth2 client with service account
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

// Interface for creating calendar events
export interface CreateEventParams {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    attendeeEmail: string;
    timeZone?: string;
}

// Create a calendar event with Google Meet
export async function createCalendarEvent(params: CreateEventParams): Promise<{
    success: boolean;
    eventId?: string;
    htmlLink?: string;
    meetLink?: string;
    message: string;
}> {
    try {
        const calendar = getCalendarClient();
        const {
            summary,
            description,
            startDateTime,
            endDateTime,
            attendeeEmail,
            timeZone = 'UTC',
        } = params;

        // Generate a unique request ID for the conference
        const requestId = `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        const event = {
            summary,
            description,
            start: {
                dateTime: startDateTime,
                timeZone,
            },
            end: {
                dateTime: endDateTime,
                timeZone,
            },
            attendees: [
                { email: attendeeEmail },
                { email: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID }, // Your email
            ],
            conferenceData: {
                createRequest: {
                    requestId,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 }, // 30 minutes before
                ],
            },
            guestsCanModify: false,
            guestsCanInviteOthers: false,
            guestsCanSeeOtherGuests: true,
        };

        const response = await calendar.events.insert({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            conferenceDataVersion: 1,
            requestBody: event,
            sendUpdates: 'all', // Send email invitations to all attendees
        });

        // Extract the Google Meet link
        const meetLink = response.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === 'video'
        )?.uri;

        return {
            success: true,
            eventId: response.data.id || '',
            htmlLink: response.data.htmlLink || '',
            meetLink: meetLink || '',
            message: 'Event created successfully',
        };
    } catch (error) {
        console.error('Error creating calendar event:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to create calendar event',
        };
    }
}

// Get busy time slots for a specific date
export async function getBusySlots(date: string) {
    try {
        const calendar = getCalendarClient();

        // Set time range for the entire day in UTC
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                items: [{ id: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID }],
                timeZone: 'UTC',
            },
        });

        const busySlots = response.data.calendars?.[process.env.PORTFOLIO_GOOGLE_CALENDAR_ID!]?.busy || [];

        return {
            success: true,
            busySlots: busySlots.map((slot) => ({
                start: slot.start,
                end: slot.end,
            })),
        };
    } catch (error) {
        console.error('Error fetching busy slots:', error);
        return {
            success: false,
            busySlots: [],
            message: error instanceof Error ? error.message : 'Failed to fetch busy slots',
        };
    }
}

// Check if a time slot is available
export function isSlotAvailable(
    slotStart: Date,
    slotEnd: Date,
    busySlots: Array<{ start?: string; end?: string }>
): boolean {
    for (const busy of busySlots) {
        if (!busy.start || !busy.end) continue;

        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        // Check if there's any overlap
        if (slotStart < busyEnd && slotEnd > busyStart) {
            return false;
        }
    }
    return true;
}

// Delete a calendar event
export async function deleteCalendarEvent(eventId: string) {
    try {
        const calendar = getCalendarClient();

        await calendar.events.delete({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            eventId,
            sendUpdates: 'all',
        });

        return {
            success: true,
            message: 'Event deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting calendar event:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to delete calendar event',
        };
    }
}

// Update a calendar event
export async function updateCalendarEvent(
    eventId: string,
    params: Partial<CreateEventParams>
) {
    try {
        const calendar = getCalendarClient();

        const updateData: any = {};

        if (params.summary) updateData.summary = params.summary;
        if (params.description) updateData.description = params.description;
        if (params.startDateTime) {
            updateData.start = {
                dateTime: params.startDateTime,
                timeZone: params.timeZone || 'UTC',
            };
        }
        if (params.endDateTime) {
            updateData.end = {
                dateTime: params.endDateTime,
                timeZone: params.timeZone || 'UTC',
            };
        }
        if (params.attendeeEmail) {
            updateData.attendees = [
                { email: params.attendeeEmail },
                { email: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID },
            ];
        }

        const response = await calendar.events.patch({
            calendarId: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID,
            eventId,
            requestBody: updateData,
            sendUpdates: 'all',
        });

        return {
            success: true,
            eventId: response.data.id,
            message: 'Event updated successfully',
        };
    } catch (error) {
        console.error('Error updating calendar event:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to update calendar event',
        };
    }
}