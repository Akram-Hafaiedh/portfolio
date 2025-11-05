// types/booking.ts
export interface TimeSlot {
    start: string;
    end: string;
    display: string;
}


export interface BookingFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    duration: number;
}

export interface AppointmentRequest extends BookingFormData {
    date: string;
}

export interface AvailabilityResponse {
    availableSlots: TimeSlot[];
    error?: string;
}


export interface AppointmentResponse {
    success: boolean;
    meetLink?: string;
    message: string;
    error?: string;
}


export interface CalendarEvent {
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
    summary: string;
    description: string;
    attendees: Array<{ email: string }>;
    conferenceData?: {
        createRequest: {
            requestId: string;
            conferenceSolutionKey: { type: string };
        };
    };
}

export interface GoogleCalendarEvent {
    summary: string;
    description: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
    attendees: Array<{
        email: string;
    }>;
    conferenceData?: {
        createRequest: {
        requestId: string;
        conferenceSolutionKey: {
            type: string;
        };
        };
    };
}


export interface GoogleCalendarEventResponse {
  id: string;
  htmlLink: string;
  conferenceData?: {
    entryPoints: Array<{
      entryPointType: string;
      uri: string;
    }>;
  };
}