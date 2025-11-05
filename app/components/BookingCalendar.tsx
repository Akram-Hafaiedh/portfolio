// components/BookingCalendar.tsx
'use client';

import { Calendar, Clock, Users, MapPin, Video } from 'lucide-react';
import { TimeSlot, BookingFormData, AvailabilityResponse, AppointmentResponse } from '@/types/booking';
import { useCallback, useState } from 'react';


interface DurationOption {
    value: number;
    label: string;
}
export default function BookingCalendar() {

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<string>('');
    const [bookingSuccess, setBookingSuccess] = useState<string>('');


    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        duration: 30,
    });


    const durationOptions: DurationOption[] = [
        { value: 30, label: '30 minutes' },
        { value: 45, label: '45 minutes' },
        { value: 60, label: '1 hour' },
        { value: 90, label: '1.5 hours' },
        { value: 120, label: '2 hours' },
    ];


    const fetchAvailability = useCallback(async (date: string, duration: number) => {
        setIsLoading(true);
        setBookingError('');
        try {
            const response = await fetch(`/api/availability?date=${date}&duration=${duration}`);
            const data: AvailabilityResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch availability');
            }

            setAvailableSlots(data.availableSlots);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setBookingError(error instanceof Error ? error.message : 'Failed to fetch availability');
            setAvailableSlots([]);
        } finally {
            setIsLoading(false);
        }
    }, []);


    const isFormValid = () => {
        return (
            selectedSlot !== null &&
            formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.subject.trim() !== '' &&
            !isBooking
        );
    };


    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedSlot(null);
        setBookingError('');
        setBookingSuccess('');

        if (date) {
            fetchAvailability(date, formData.duration);
        } else {
            setAvailableSlots([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSlot) {
            setBookingError('Please select a time slot');
            return;
        }

        setIsBooking(true);
        setBookingError('');
        setBookingSuccess('');

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: selectedSlot.start,
                }),
            });

            const result: AppointmentResponse = await response.json();

            if (result.success) {
                setBookingSuccess('Appointment scheduled successfully! Check your email for the meeting link.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    duration: 30,
                });
                setSelectedDate('');
                setSelectedSlot(null);
                setAvailableSlots([]);
            } else {
                setBookingError(result.message || 'Failed to schedule appointment');
            }
        } catch (error) {
            setBookingError('Error scheduling appointment. Please try again.');
        } finally {
            setIsBooking(false);
        }
    };

    // Update the handleInputChange to refetch availability when duration changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? Number(value) : value,
        }));

        // Refetch availability when duration changes and date is selected
        if (name === 'duration' && selectedDate) {
            setSelectedSlot(null); // Clear selected slot since duration changed
            fetchAvailability(selectedDate, Number(value));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center">
                        {/* Animated Icon/Badge */}
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <Calendar className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                Instant Booking
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            Schedule a Meeting
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                Let's discuss your project and bring your ideas to life
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                    Choose a time that works for you.
                                </span>
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Calendar & Time Selection */}
                        <div className="animate-slide-up">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                Select Date & Time
                            </h2>

                            <div className="space-y-6">
                                {/* Date Selection */}
                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Calendar className="text-blue-600" />
                                        Choose a Date
                                    </label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={selectedDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Duration Selection */}
                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Clock className="text-purple-600" />
                                        Meeting Duration
                                    </label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    >
                                        {durationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Time Slots */}
                                {selectedDate && (
                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Users className="text-green-600" />
                                            Available Time Slots
                                        </label>

                                        {isLoading ? (
                                            <div className="text-center py-8">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                                <p className="text-slate-600 dark:text-slate-400 mt-2">Loading available slots...</p>
                                            </div>
                                        ) : availableSlots.length > 0 ? (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                                                {availableSlots.map((slot, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`p-4 text-sm rounded-lg border transition-all duration-200 ${selectedSlot?.start === slot.start
                                                            ? 'bg-blue-500 text-white border-blue-500 shadow-lg transform scale-105'
                                                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                                                            }`}
                                                    >
                                                        {slot.display}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-slate-500 dark:text-slate-400">
                                                    {bookingError || 'No available slots for this date'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Selected Time Display */}
                                {selectedSlot && (
                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                                        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                            <Video className="text-green-600" />
                                            Selected Meeting Time
                                        </h3>
                                        <p className="text-green-700 dark:text-green-400">
                                            {new Date(selectedSlot.start).toLocaleString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                            <span className="ml-2 text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                                {formData.duration} minutes
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                Your Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Success/Error Messages */}
                                {bookingSuccess && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                        <p className="text-green-800 dark:text-green-300">{bookingSuccess}</p>
                                    </div>
                                )}

                                {bookingError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                        <p className="text-red-800 dark:text-red-300">{bookingError}</p>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Meeting Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Job Opportunity, Project Discussion, Technical Interview"
                                        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Tell me a bit about what you'd like to discuss, your project requirements, or any specific topics you want to cover..."
                                        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                                    />
                                </div>

                                {/* Quick Info Card */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <MapPin className="text-blue-600" />
                                        Meeting Details
                                    </h3>
                                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                            <span>Google Meet link will be provided</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                            <span>Calendar invitation with reminders</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                            <span>Available for remote meetings worldwide</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                            <span>Flexible rescheduling available</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                                >
                                    {isBooking ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Scheduling Meeting...
                                        </span>
                                    ) : (
                                        'Schedule Meeting'
                                    )}
                                </button>

                                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                    By scheduling this meeting, you agree to our privacy policy and terms of service.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}