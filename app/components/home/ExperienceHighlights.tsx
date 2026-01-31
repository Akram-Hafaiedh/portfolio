'use client';
import { motion, Variants } from "framer-motion";
import { getFeaturedExperiences } from "@/lib/experiences";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ExperienceHighlights() {
    const locale = useLocale();
    const t = useTranslations('Common');
    const experiences = getFeaturedExperiences(locale as any, 2);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
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

    const lineVariants: Variants = {
        hidden: { scaleY: 0 },
        visible: {
            opacity: 1,
            scaleY: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut" as any
            }
        }
    };

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                        <FaBriefcase className="text-xs" />
                        {t('sections.professionalJourney')}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {t('sections.recentExperience')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('sections.experienceSubtitle')}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={lineVariants}
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 origin-top"
                    />

                    {/* Experience Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="space-y-12"
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative ${index % 2 === 0 ? 'md:pr-8 md:text-right md:flex-row-reverse' : 'md:pl-8 md:ml-auto md:text-left'} md:w-[calc(50%-2rem)] flex flex-col`}
                            >
                                {/* Timeline Dot */}
                                <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0" style={{ [index % 2 === 0 ? 'right' : 'left']: '-2.25rem' }}>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75" />
                                        <div className="relative w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-950 shadow-lg" />
                                    </div>
                                </div>

                                {/* Card */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                                                <div className={index % 2 === 0 ? 'md:ml-auto' : ''}>
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                        {exp.title}
                                                    </h3>
                                                    <div className={`flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-lg mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                        <FaBriefcase className="text-sm" />
                                                        {exp.company}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Meta Info */}
                                            <div className={`flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-blue-600 dark:text-blue-500" />
                                                    <span>{exp.period}</span>
                                                </div>
                                                {exp.location && (
                                                    <div className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="text-purple-600 dark:text-purple-500" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Skills */}
                                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                            {exp.skills.map((skill, skillIndex) => (
                                                <motion.span
                                                    key={skillIndex}
                                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium transition-all cursor-default"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>

                                        {/* Decorative Corner */}
                                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* View All Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="text-center mt-16"
                >
                    <Link href="/experience" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-2xl group">
                        <span>{t('sections.viewAllExperience')}</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}