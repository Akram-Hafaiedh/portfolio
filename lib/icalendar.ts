// lib/icalendar.ts
export interface CalendarEventData {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    organizerEmail: string;
    organizerName: string;
    attendeeEmail: string;
    attendeeName: string;
    meetLink?: string;
    eventId: string;
}

/**
 * Generate an iCalendar (.ics) file content
 * This creates a standard calendar invite that works with all calendar apps
 */
export function generateICalendarInvite(event: CalendarEventData): string {
    const startDate = new Date(event.startDateTime);
    const endDate = new Date(event.endDateTime);

    // Format dates as YYYYMMDDTHHMMSSZ (UTC format for iCal)
    const formatICalDate = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const now = new Date();
    const timestamp = formatICalDate(now);

    // Escape special characters for iCal format
    const escapeICalText = (text: string): string => {
        return text
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');
    };

    // Build the description with Meet link
    let description = escapeICalText(event.description);
    if (event.meetLink) {
        description += `\\n\\nJoin Google Meet: ${event.meetLink}`;
    }

    // Generate the iCalendar content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Akram Hafaiedh//Portfolio Booking//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `UID:${event.eventId}@portfolio.akramhafaiedh.com`,
        `DTSTAMP:${timestamp}`,
        `DTSTART:${formatICalDate(startDate)}`,
        `DTEND:${formatICalDate(endDate)}`,
        `SUMMARY:${escapeICalText(event.summary)}`,
        `DESCRIPTION:${description}`,
        event.meetLink ? `LOCATION:${event.meetLink}` : '',
        `ORGANIZER;CN=${escapeICalText(event.organizerName)}:mailto:${event.organizerEmail}`,
        `ATTENDEE;CN=${escapeICalText(event.attendeeName)};RSVP=TRUE;PARTSTAT=NEEDS-ACTION;ROLE=REQ-PARTICIPANT:mailto:${event.attendeeEmail}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Meeting tomorrow',
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-PT30M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Meeting in 30 minutes',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(line => line !== '').join('\r\n');

    return icsContent;
}

export function getICalendarAttachment(event: CalendarEventData) {
    const icsContent = generateICalendarInvite(event);
    const base64Content = Buffer.from(icsContent).toString('base64');

    return {
        filename: 'meeting-invite.ics',
        content: base64Content,
        type: 'text/calendar',
        disposition: 'attachment',
    };
}