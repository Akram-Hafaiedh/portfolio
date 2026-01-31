'use client';

import React, { useCallback, useState } from 'react';
import { FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import { TimeSlot, BookingFormData, AvailabilityResponse, AppointmentResponse } from '@/types/booking';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface DurationOption {
    value: number;
    label: string;
}

export default function BookingCalendar() {
    const locale = useLocale();
    const t = useTranslations('Booking');

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
        { value: 30, label: t('durations.30') },
        { value: 45, label: t('durations.45') },
        { value: 60, label: t('durations.60') },
        { value: 90, label: t('durations.90') },
        { value: 120, label: t('durations.120') },
    ];

    const fetchAvailability = useCallback(async (date: string, duration: number) => {
        setIsLoading(true);
        setBookingError('');
        try {
            const response = await fetch(`/api/availability?date=${date}&duration=${duration}`);
            const data: AvailabilityResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t('messages.fetchError'));
            }

            setAvailableSlots(data.availableSlots);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setBookingError(error instanceof Error ? error.message : t('messages.fetchError'));
            setAvailableSlots([]);
        } finally {
            setIsLoading(false);
        }
    }, [t]);

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

    const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault();

        if (!selectedSlot) {
            setBookingError(t('messages.selectSlot'));
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
                setBookingSuccess(t('messages.success'));
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
                setBookingError(result.message || t('messages.error'));
            }
        } catch (error) {
            setBookingError(t('messages.error'));
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

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen">
            {/* Background Elements */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                            <FaCalendarAlt className="w-4 h-4" />
                            {t('hero.badge')}
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            {t('hero.title')}
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
                            {t('hero.subtitle')}
                        </motion.p>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-500 dark:text-slate-500">
                            {t('hero.emphasis')}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Booking Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Calendar & Time Selection */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    {t('calendar.title')}
                                </h2>

                                {/* Date Selection */}
                                <div className="group relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl transition-all">
                                        <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                                            {t('calendar.dateLabel')}
                                        </label>
                                        <input
                                            name="date"
                                            id="date"
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selectedDate}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Duration Selection */}
                                <div className="group relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl transition-all">
                                        <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <FaClock className="text-purple-600 dark:text-purple-400" />
                                            {t('calendar.durationLabel')}
                                        </label>
                                        <select
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none cursor-pointer"
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
                                <AnimatePresence mode="wait">
                                    {selectedDate && (
                                        <motion.div
                                            key="slots"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="group relative overflow-hidden"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl">
                                                <label className="block text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                    <FaUsers className="text-green-600 dark:text-green-400" />
                                                    {t('calendar.slotsLabel')}
                                                </label>

                                                {isLoading ? (
                                                    <div className="text-center py-8">
                                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                                        <p className="text-slate-600 dark:text-slate-400 mt-2">{t('calendar.loadingSlots')}</p>
                                                    </div>
                                                ) : availableSlots.length > 0 ? (
                                                    <motion.div
                                                        variants={containerVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar"
                                                    >
                                                        {availableSlots.map((slot, index) => (
                                                            <motion.button
                                                                key={index}
                                                                variants={fadeInUp}
                                                                type="button"
                                                                onClick={() => setSelectedSlot(slot)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className={`p-4 text-sm rounded-lg border transition-all duration-200 ${selectedSlot?.start === slot.start
                                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                                                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400'
                                                                    }`}
                                                            >
                                                                {slot.display}
                                                            </motion.button>
                                                        ))}
                                                    </motion.div>
                                                ) : (
                                                    <div className="text-center py-8">
                                                        <p className="text-slate-500 dark:text-slate-400">
                                                            {bookingError || t('calendar.noSlots')}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Selected Time Display */}
                                <AnimatePresence>
                                    {selectedSlot && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="group relative"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-xl" />
                                            <div className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 p-6 rounded-2xl border border-green-200 dark:border-green-800/50">
                                                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                                    <FaVideo className="text-green-600 dark:text-green-400" />
                                                    {t('calendar.selectedTime')}
                                                </h3>
                                                <p className="text-green-700 dark:text-green-400 font-medium">
                                                    {new Date(selectedSlot.start).toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                    <span className="ml-3 text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                                        {formData.duration} {t('calendar.minutes')}
                                                    </span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Booking Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    {t('form.title')}
                                </h2>

                                <div className="space-y-6">
                                    {/* Success/Error Messages */}
                                    <AnimatePresence mode="wait">
                                        {bookingSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                                            >
                                                <p className="text-green-800 dark:text-green-300">{bookingSuccess}</p>
                                            </motion.div>
                                        )}

                                        {bookingError && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                                            >
                                                <p className="text-red-800 dark:text-red-300">{bookingError}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                {t('form.name')} <span className="text-red-500">{t('form.required')}</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                placeholder={t('form.namePlaceholder')}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                {t('form.email')} <span className="text-red-500">{t('form.required')}</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                                placeholder={t('form.emailPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('form.subject')} <span className="text-red-500">{t('form.required')}</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder={t('form.subjectPlaceholder')}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {t('form.message')}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder={t('form.messagePlaceholder')}
                                            className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                                        />
                                    </div>

                                    {/* Meeting Details Card */}
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-10 blur-xl" />
                                        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-900/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                                                {t('meetingDetails.title')}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                    <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
                                                    <span>{t('meetingDetails.googleMeet')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                    <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
                                                    <span>{t('meetingDetails.calendar')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                    <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
                                                    <span>{t('meetingDetails.remote')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                                    <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
                                                    <span>{t('meetingDetails.flexible')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        whileHover={isFormValid() ? { scale: 1.02 } : {}}
                                        whileTap={isFormValid() ? { scale: 0.98 } : {}}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-8 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isBooking ? (
                                                <motion.span
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-3"
                                                >
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    {t('form.submitting')}
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    {t('form.submit')}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    <p className="text-xs text-center text-slate-500 dark:text-slate-500">
                                        {t('form.disclaimer')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}