'use client';

import { useState } from 'react';
import { FaPaperPlane, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { commonContent as enCommon } from "@/lib/data/en/common";
import { commonContent as frCommon } from "@/lib/data/fr/common";

export default function ContactForm() {
    const { language } = useLanguage();
    const t = language === 'fr' ? frCommon : enCommon;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState({ type: '', message: '' }); // 'success', 'error', ''
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitState({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitState({
                    type: 'success',
                    message: t.sections.formSuccessMessage
                });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitState({
                    type: 'error',
                    message: result.error || result.message || t.sections.formErrorMessage
                });
            }
        } catch (error) {
            setSubmitState({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as any
            }
        }
    };

    const inputClasses = "w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-0 focus:border-blue-500/50 outline-none text-slate-900 dark:text-white transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 group-hover:border-slate-300 dark:group-hover:border-slate-700";

    return (
        <div className="space-y-8">
            {/* Status Messages */}
            <AnimatePresence mode="wait">
                {submitState.message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className={`p-6 rounded-2xl flex items-start gap-4 shadow-xl backdrop-blur-md ${submitState.type === 'success'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300'
                            : 'bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${submitState.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}>
                            {submitState.type === 'success' ? (
                                <FaCheck className="text-green-500" />
                            ) : (
                                <FaExclamationTriangle className="text-red-500" />
                            )}
                        </div>
                        <div className="pt-1">
                            <p className="font-bold mb-1">
                                {submitState.type === 'success' ? t.sections.formSuccessTitle : t.sections.formErrorTitle}
                            </p>
                            <p className="text-sm opacity-90 leading-relaxed">{submitState.message}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.form
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <motion.div variants={itemVariants} className="group relative">
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2.5 transition-colors group-focus-within:text-blue-500">
                            {t.sections.formName}
                        </label>
                        <div className="relative">
                            <AnimatePresence>
                                {focusedField === 'name' && (
                                    <motion.div
                                        layoutId="input-aura"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur-sm pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                required
                                disabled={isSubmitting}
                                className={inputClasses}
                                placeholder={t.sections.formNamePlaceholder}
                            />
                        </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="group relative">
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2.5 transition-colors group-focus-within:text-blue-500">
                            {t.sections.formEmail}
                        </label>
                        <div className="relative">
                            <AnimatePresence>
                                {focusedField === 'email' && (
                                    <motion.div
                                        layoutId="input-aura"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur-sm pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                                disabled={isSubmitting}
                                className={inputClasses}
                                placeholder={t.sections.formEmailPlaceholder}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div variants={itemVariants} className="group relative">
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2.5 transition-colors group-focus-within:text-blue-500">
                        {t.sections.formSubject}
                    </label>
                    <div className="relative">
                        <AnimatePresence>
                            {focusedField === 'subject' && (
                                <motion.div
                                    layoutId="input-aura"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur-sm pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            required
                            disabled={isSubmitting}
                            className={inputClasses}
                            placeholder={t.sections.formSubjectPlaceholder}
                        />
                    </div>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={itemVariants} className="group relative">
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2.5 transition-colors group-focus-within:text-blue-500">
                        {t.sections.formMessage}
                    </label>
                    <div className="relative">
                        <AnimatePresence>
                            {focusedField === 'message' && (
                                <motion.div
                                    layoutId="input-aura"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur-sm pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            disabled={isSubmitting}
                            rows={6}
                            className={`${inputClasses} resize-none`}
                            placeholder={t.sections.formMessagePlaceholder}
                        />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full h-14 bg-slate-900 dark:bg-white rounded-2xl overflow-hidden font-bold transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative flex items-center justify-center gap-3 text-white dark:text-slate-900 group-hover:text-white transition-colors duration-300">
                            <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                    <motion.div
                                        key="submitting"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        <span>{t.sections.formSending}</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-3"
                                    >
                                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span>{t.sections.formSubmit}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                    <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-600">
                        {t.sections.formResponseTime}
                    </p>
                </motion.div>
            </motion.form>
        </div>
    );
}
