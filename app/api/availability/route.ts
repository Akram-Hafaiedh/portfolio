// api/availability/route.ts
import { TimeSlot } from "@/types/booking";
import { NextRequest, NextResponse } from "next/server";
import { getBusySlots, isSlotAvailable } from "@/lib/google-calendar";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const duration = parseInt(searchParams.get('duration') || '30');

        if (!date) {
            return NextResponse.json(
                { error: 'Date is required.', availableSlots: [] },
                { status: 400 }
            );
        }

        // Validate date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return NextResponse.json(
                { error: 'Cannot book appointments in the past.', availableSlots: [] },
                { status: 400 }
            );
        }

        // Get busy slots from Google Calendar
        const busySlotsResult = await getBusySlots(date);

        if (!busySlotsResult.success) {
            console.error('Failed to fetch busy slots:', busySlotsResult.message);
            // Fallback to showing no slots if there's an error
            return NextResponse.json(
                { error: 'Error fetching availability.', availableSlots: [] },
                { status: 500 }
            );
        }

        // Define working hours (9 AM to 5 PM)
        const workingHours = { start: 9, end: 17 };

        // Filter and format busy slots to remove null values
        const formattedBusySlots: Array<{ start: string; end: string }> = busySlotsResult.busySlots
            .filter((slot) =>
                typeof slot.start === 'string' && typeof slot.end === 'string'
            )
            .map(slot => ({
                start: slot.start as string,
                end: slot.end as string
            }));

        // Generate available slots
        const availableSlots = generateAvailableSlots(
            date,
            workingHours,
            duration,
            formattedBusySlots
        );

        return NextResponse.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching availability:', error);
        return NextResponse.json(
            { error: 'Error fetching availability.', availableSlots: [] },
            { status: 500 }
        );
    }
}

function generateAvailableSlots(
    date: string,
    workingHours: { start: number; end: number },
    duration: number,
    busySlots: Array<{ start: string; end: string }>
): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const slotDuration = 30; // Check in 30-minute increments

    // Get current time
    const now = new Date();
    const selectedDate = new Date(date);
    const isToday = selectedDate.toDateString() === now.toDateString();

    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
            const slotStart = new Date(`${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`);
            const slotEnd = new Date(slotStart.getTime() + duration * 60000);

            // Skip if slot is in the past (for today)
            if (isToday && slotStart <= now) {
                continue;
            }

            // Skip if slot end time goes beyond working hours
            const slotEndHour = slotEnd.getHours();
            const slotEndMinute = slotEnd.getMinutes();
            if (slotEndHour > workingHours.end ||
                (slotEndHour === workingHours.end && slotEndMinute > 0)) {
                continue;
            }
            // Check if slot is available (not busy)
            const isAvailable = isSlotAvailable(slotStart, slotEnd, busySlots);

            if (isAvailable) {
                slots.push({
                    start: slotStart.toISOString(),
                    end: slotEnd.toISOString(),
                    display: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                });
            }
        }
    }

    return slots;
}