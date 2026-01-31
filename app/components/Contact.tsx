'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Video } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Contact() {
    const t = useTranslations('Common');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any
            }
        }
    };

    return (
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-6">
                        <FaEnvelope className="text-xs" />
                        {t('sections.contactTitle')}
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        {t('sections.contactHeadline')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('sections.contactSubtitle')}
                    </p>
                </motion.div>

                {/* Contact Methods */}
                <motion.div
                    className="grid lg:grid-cols-3 gap-8 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {/* Method Items */}
                    {[
                        {
                            icon: FaEnvelope,
                            title: t('sections.emailMe'),
                            subtitle: t('sections.methodEmailSubtitle'),
                            value: "hafaiedhakram@gmail.com",
                            href: "mailto:hafaiedhakram@gmail.com",
                            gradient: "from-blue-600/20 to-purple-600/20",
                            iconColor: "text-blue-500 dark:text-blue-400",
                            iconBg: "bg-blue-500/10"
                        },
                        {
                            icon: FaPhone,
                            title: t('sections.callMe'),
                            subtitle: t('sections.methodPhoneSubtitle'),
                            value: "+216 50 569 298",
                            href: "tel:+21650569298",
                            gradient: "from-blue-600/20 to-purple-600/20",
                            iconColor: "text-blue-500 dark:text-blue-400",
                            iconBg: "bg-blue-500/10"
                        },
                        {
                            icon: FaMapMarkerAlt,
                            title: t('sections.location'),
                            subtitle: t('sections.methodLocationSubtitle'),
                            value: t('sections.methodLocationValue'),
                            href: null,
                            gradient: "from-purple-600/20 to-pink-600/20",
                            iconColor: "text-purple-500 dark:text-purple-400",
                            iconBg: "bg-purple-500/10"
                        }
                    ].map((method, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="group relative h-full">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient.replace('/20', '')} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                            {method.href ? (
                                <a href={method.href} className="relative flex flex-col p-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 h-full">
                                    <div className={`w-14 h-14 ${method.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <method.icon className={`${method.iconColor} text-2xl`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {method.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                                        {method.subtitle}
                                    </p>
                                    <p className="mt-auto text-slate-700 dark:text-slate-200 font-semibold break-all">
                                        {method.value}
                                    </p>
                                </a>
                            ) : (
                                <div className="relative flex flex-col p-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl h-full transition-all duration-300">
                                    <div className={`w-14 h-14 ${method.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                                        <method.icon className={`${method.iconColor} text-2xl`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                                        {method.subtitle}
                                    </p>
                                    <p className="mt-auto text-slate-700 dark:text-slate-200 font-semibold">
                                        {method.value}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Card */}
                    <motion.div
                        className="lg:col-span-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={itemVariants}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000" />
                            <div className="relative bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                        <FaPaperPlane className="text-blue-500 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {t('sections.sendMessage')}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            {t('sections.sendMessageSubtitle')}
                                        </p>
                                    </div>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Columns */}
                    <motion.div
                        className="space-y-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                    >
                        {/* Meeting CTA */}
                        <motion.div variants={itemVariants} className="group relative">
                            {/* Premium Aura Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 group-hover:opacity-30 blur-2xl transition-opacity duration-700" />

                            <div className="relative bg-slate-900 dark:bg-slate-800 p-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-800/50 dark:border-slate-700/50">
                                {/* Animated Particles or Decorative Elements */}
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
                                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />

                                <div className="flex items-start gap-5 mb-8 relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                        <Video className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                                            {t('sections.freeConsultation')}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed opacity-90">
                                            {t('sections.freeConsultationSubtitle')}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/booking"
                                    className="group/btn relative z-10 flex items-center justify-center gap-3 w-full bg-white dark:bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl overflow-hidden"
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
                                    <FaCalendar className="text-sm group-hover/btn:rotate-12 transition-transform text-blue-600" />
                                    {t('sections.bookMeeting')}
                                </Link>
                                <p className="mt-4 text-center text-[10px] text-slate-500 uppercase tracking-widest font-semibold relative z-10">
                                    {t('sections.limitedSlots')}
                                </p>
                            </div>
                        </motion.div>

                        {/* Social & Availability Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            {/* Connect Card */}
                            <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                                    {t('sections.connectWithMe')}
                                </h4>
                                <div className="space-y-4">
                                    {[
                                        { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/akram-hafaiedh-368b3312b/', color: 'hover:text-blue-600 dark:hover:text-blue-400' },
                                        { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Akram-Hafaiedh', color: 'hover:text-slate-900 dark:hover:text-white' }
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-slate-700 dark:text-slate-300 ${social.color} font-medium transition-all hover:translate-x-2 group h-12`}
                                        >
                                            <social.icon className="text-xl group-hover:scale-110 transition-transform" />
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Status Card */}
                            <motion.div variants={itemVariants} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-green-500 rounded-full" />
                                    {t('sections.availability')}
                                </h4>
                                <div className="space-y-4">
                                    {[
                                        { icon: FaCheckCircle, text: t('sections.availabilityFreelance'), color: 'text-green-500 dark:text-green-400' },
                                        { icon: FaCheckCircle, text: t('sections.availabilityFullTime'), color: 'text-blue-500 dark:text-blue-400' },
                                        { icon: FaCheckCircle, text: t('sections.availabilityRemote'), color: 'text-purple-500 dark:text-purple-400' },
                                        { icon: FaPaperPlane, text: t('sections.availabilityResponse'), color: 'text-orange-500 dark:text-orange-400' },
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <item.icon className={`${item.color} flex-shrink-0 text-lg`} />
                                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
