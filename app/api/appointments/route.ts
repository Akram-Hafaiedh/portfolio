// api/appointments/route.ts
import { AppointmentRequest } from "@/types/booking";
import { isValidEmail } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createCalendarEvent } from "@/lib/google-calendar-oauth";
import { CalendarEventData, getICalendarAttachment } from "@/lib/icalendar";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body: AppointmentRequest = await request.json();
        const { name, email, message, date, duration, subject } = body;

        // Validation
        if (!name || !email || !message || !date || !duration || !subject) {
            return NextResponse.json(
                { success: false, message: 'All fields are required.' },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Validate date is not in the past
        const appointmentDate = new Date(date);
        const now = new Date();

        if (appointmentDate <= now) {
            return NextResponse.json(
                { success: false, message: 'Cannot schedule appointments in the past' },
                { status: 400 }
            );
        }

        // Calculate end time
        const startDateTime = new Date(date);
        const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

        // Create Google Calendar event WITHOUT attendees (just for your calendar)
        const eventResult = await createCalendarEvent({
            summary: `${subject} - Meeting with ${name}`,
            description: `Meeting with ${name} (${email})\n\nMessage:\n${message}`,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            attendeeEmail: email, // We still pass this for description purposes
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        });

        if (!eventResult.success) {
            return NextResponse.json(
                { success: false, message: eventResult.message },
                { status: 500 }
            );
        }

        // Send confirmation emails
        await sendConfirmationEmails(
            body,
            eventResult.meetLink || undefined,
            eventResult.htmlLink || undefined,
            eventResult.eventId || `event-${Date.now()}`
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Appointment scheduled successfully!',
                meetLink: eventResult.meetLink,
                eventId: eventResult.eventId
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error scheduling appointment:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

async function sendConfirmationEmails(
    data: AppointmentRequest,
    meetLink: string | undefined,
    calendarLink: string | undefined,
    eventId: string
): Promise<void> {
    try {

        const startDateTime = new Date(data.date);
        const endDateTime = new Date(startDateTime.getTime() + data.duration * 60000);

        // Prepare calendar event data for .ics generation
        const calendarEventData: CalendarEventData = {
            summary: `${data.subject} - Meeting with Akram Hafaiedh`,
            description: `Meeting with Akram Hafaiedh\n\nTopic: ${data.subject}\n\nMessage:\n${data.message}`,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            organizerEmail: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID || 'hafaiedhakram@gmail.com',
            organizerName: 'Akram Hafaiedh',
            attendeeEmail: data.email,
            attendeeName: data.name,
            meetLink: meetLink,
            eventId: eventId,
        };


        // Get the .ics attachment
        const icsAttachment = getICalendarAttachment(calendarEventData);

        // Send email to the person who booked WITH .ics attachment
        await resend.emails.send({
            from: 'Appointments <onboarding@resend.dev>',
            to: data.email,
            subject: `Meeting Confirmed: ${data.subject}`,
            html: generateRecruiterEmailHTML(data, meetLink, calendarLink),
            attachments: [icsAttachment],
        });

        // Send notification to yourself (without .ics since it's already in your calendar)
        await resend.emails.send({
            from: 'Appointments <onboarding@resend.dev>',
            to: process.env.PORTFOLIO_GOOGLE_CALENDAR_ID || 'hafaiedhakram@gmail.com',
            subject: `New Meeting: ${data.subject}`,
            html: generateAdminEmailHTML(data, meetLink, calendarLink),
        });
    } catch (error) {
        console.error('Error sending confirmation emails:', error);
        // Don't throw error - calendar event is already created
    }
}

function generateRecruiterEmailHTML(
    data: AppointmentRequest,
    meetLink?: string,
    calendarLink?: string
): string {
    const startTime = new Date(data.date);
    const endTime = new Date(startTime.getTime() + data.duration * 60000);

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Meeting Confirmed!</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">Hi ${data.name},</p>
                
                <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                    Your meeting with <strong>Akram Hafaiedh</strong> has been scheduled successfully. I'm looking forward to our conversation!
                </p>
                
                <!-- Meeting Details Box -->
                <div style="background-color: #f9fafb; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📅 Meeting Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Subject:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.subject}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Date & Time:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${startTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Time:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${startTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })} - ${endTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Duration:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.duration} minutes</td>
                        </tr>
                    </table>
                </div>
                
                 <!-- Action Buttons -->
                ${meetLink ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        🎥 Join Google Meet
                    </a>
                </div>
                ` : ''}
                
                 <!-- Important Notes -->
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin: 30px 0;">
                    <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                        <strong>📌 Important:</strong><br>
                        • A calendar invite (.ics file) is attached to this email<br>
                        • Click the attachment to add this meeting to your calendar<br>
                        • Works with Google Calendar, Outlook, Apple Calendar, and more<br>
                        • The Google Meet link will be active 15 minutes before the meeting<br>
                        • Please join on time to make the most of our session
                    </p>
                </div>
                
                <p style="font-size: 16px; color: #374151; margin-top: 30px;">
                    If you need to reschedule or have any questions, feel free to reply to this email.
                </p>
                
                <p style="font-size: 16px; color: #374151; margin-top: 20px;">
                    Best regards,<br>
                    <strong>Akram Hafaiedh</strong>
                </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    This is an automated confirmation email for your scheduled meeting.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
}

function generateAdminEmailHTML(
    data: AppointmentRequest,
    meetLink?: string,
    calendarLink?: string
): string {
    const startTime = new Date(data.date);
    const endTime = new Date(startTime.getTime() + data.duration * 60000);

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔔 New Meeting Scheduled</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
                    You have a new meeting request:
                </p>
                
                <!-- Client Info -->
                <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <h2 style="margin: 0 0 15px 0; color: #991b1b; font-size: 18px;">👤 Client Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Name:</td>
                            <td style="padding: 8px 0; color: #1f2937;"><strong>${data.name}</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Subject:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.subject}</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Meeting Details -->
                <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <h2 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">📅 Meeting Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Date:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${startTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Time:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${startTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })} - ${endTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Duration:</td>
                            <td style="padding: 8px 0; color: #1f2937;">${data.duration} minutes</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Message -->
                <div style="background-color: #fefce8; border-left: 4px solid #eab308; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <h3 style="margin: 0 0 10px 0; color: #854d0e; font-size: 16px;">💬 Client Message:</h3>
                    <p style="margin: 0; color: #422006; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message || 'No additional message provided'}</p>
                </div>
                
                <!-- Action Buttons -->
                ${meetLink ? `
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 10px;">
                        🎥 Join Meeting
                    </a>
                    ${calendarLink ? `
                    <a href="${calendarLink}" style="display: inline-block; background: #10b981; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 10px;">
                        📆 View in Calendar
                    </a>
                    ` : ''}
                </div>
                ` : ''}
                
                <!-- Reminder -->
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 16px; border-radius: 8px; margin: 30px 0;">
                    <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                        <strong>⏰ Reminder:</strong><br>
                        • This event has been added to your Google Calendar<br>
                        • You'll receive automatic reminders 1 day before and 30 minutes before<br>
                        • The client has been sent a confirmation email
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    Automated notification from your booking system
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
}