// app/booking/page.tsx
import BookingCalendar from "../components/BookingCalendar";

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <BookingCalendar />
        </div>
    );
}