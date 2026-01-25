'use client';

import { Calendar, Clock, Users, MapPin, Video } from 'lucide-react';
import { TimeSlot, BookingFormData, AvailabilityResponse, AppointmentResponse } from '@/types/booking';
import { useCallback, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { bookingContent as enContent } from '@/lib/data/en/booking';
import { bookingContent as frContent } from '@/lib/data/fr/booking';

interface DurationOption {
    value: number;
    label: string;
}

export default function BookingCalendar() {
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;

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
        { value: 30, label: content.durations[30] },
        { value: 45, label: content.durations[45] },
        { value: 60, label: content.durations[60] },
        { value: 90, label: content.durations[90] },
        { value: 120, label: content.durations[120] },
    ];

    const fetchAvailability = useCallback(async (date: string, duration: number) => {
        setIsLoading(true);
        setBookingError('');
        try {
            const response = await fetch(`/api/availability?date=${date}&duration=${duration}`);
            const data: AvailabilityResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error || content.messages.fetchError);
            }

            setAvailableSlots(data.availableSlots);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setBookingError(error instanceof Error ? error.message : content.messages.fetchError);
            setAvailableSlots([]);
        } finally {
            setIsLoading(false);
        }
    }, [content.messages.fetchError]);

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
            setBookingError(content.messages.selectSlot);
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
                setBookingSuccess(content.messages.success);
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
                setBookingError(result.message || content.messages.error);
            }
        } catch (error) {
            setBookingError(content.messages.error);
        } finally {
            setIsBooking(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? Number(value) : value,
        }));

        if (name === 'duration' && selectedDate) {
            setSelectedSlot(null);
            fetchAvailability(selectedDate, Number(value));
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen">
            {/* Animated Background Grid - Light Mode */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Animated Background Grid - Dark Mode */}
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Floating Gradient Orbs - Light Mode */}
            <div className="block dark:hidden fixed top-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
            <div className="block dark:hidden fixed top-1/2 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="block dark:hidden fixed bottom-10 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Floating Gradient Orbs - Dark Mode */}
            <div className="hidden dark:block fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
            <div className="hidden dark:block fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="hidden dark:block fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Additional Subtle Orbs */}
            <div className="block dark:hidden fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />
            <div className="hidden dark:block fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <Calendar className="w-4 h-4" />
                            {content.hero.badge}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {content.hero.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {content.hero.subtitle}
                        </p>
                        <p className="text-lg text-slate-500 dark:text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                            {content.hero.emphasis}
                        </p>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Calendar & Time Selection */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    {content.calendar.title}
                                </h2>

                                {/* Date Selection */}
                                <div className="group relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl">
                                        <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Calendar className="text-blue-600 dark:text-blue-400" />
                                            {content.calendar.dateLabel}
                                        </label>
                                        <input
                                            name="date"
                                            id="date"
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selectedDate}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Duration Selection */}
                                <div className="group relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl">
                                        <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Clock className="text-purple-600 dark:text-purple-400" />
                                            {content.calendar.durationLabel}
                                        </label>
                                        <select
                                            id="duration"
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
                                </div>

                                {/* Time Slots */}
                                {selectedDate && (
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                        <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl">
                                            <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                <Users className="text-green-600 dark:text-green-400" />
                                                {content.calendar.slotsLabel}
                                            </label>

                                            {isLoading ? (
                                                <div className="text-center py-8">
                                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                                    <p className="text-slate-600 dark:text-slate-400 mt-2">{content.calendar.loadingSlots}</p>
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
                                                        {bookingError || content.calendar.noSlots}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Selected Time Display */}
                                {selectedSlot && (
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-30 blur-xl" />
                                        <div className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                                            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                                <Video className="text-green-600 dark:text-green-400" />
                                                {content.calendar.selectedTime}
                                            </h3>
                                            <p className="text-green-700 dark:text-green-400">
                                                {new Date(selectedSlot.start).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                                <span className="ml-2 text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                                                    {formData.duration} {content.calendar.minutes}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Booking Form */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    {content.form.title}
                                </h2>

                                <div className="space-y-6">
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
                                                {content.form.name} <span className="text-red-500">{content.form.required}</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={content.form.namePlaceholder}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                {content.form.email} <span className="text-red-500">{content.form.required}</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={content.form.emailPlaceholder}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {content.form.subject} <span className="text-red-500">{content.form.required}</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder={content.form.subjectPlaceholder}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {content.form.message}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder={content.form.messagePlaceholder}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                                        />
                                    </div>

                                    {/* Meeting Details Card */}
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />
                                        <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                                <MapPin className="text-blue-600 dark:text-blue-400" />
                                                {content.meetingDetails.title}
                                            </h3>
                                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 dark:text-green-400">✓</span>
                                                    <span>{content.meetingDetails.googleMeet}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 dark:text-green-400">✓</span>
                                                    <span>{content.meetingDetails.calendar}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 dark:text-green-400">✓</span>
                                                    <span>{content.meetingDetails.remote}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 dark:text-green-400">✓</span>
                                                    <span>{content.meetingDetails.flexible}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-8 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                                    >
                                        {isBooking ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                {content.form.submitting}
                                            </span>
                                        ) : (
                                            content.form.submit
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                        {content.form.disclaimer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}