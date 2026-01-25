'use client';

import { getFeaturedExperiences } from "@/lib/experiences";
import Link from "next/link";
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { dictionary } from "@/lib/dictionary";

export default function ExperienceHighlights() {
    const { language } = useLanguage();
    const t = dictionary[language];
    const experiences = getFeaturedExperiences(language, 2);

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                        <FaBriefcase className="text-xs" />
                        {t.sections.professionalJourney}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {t.sections.recentExperience}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.sections.experienceSubtitle}
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

                    {/* Experience Cards */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative animate-fade-in-up ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:text-left'} md:w-[calc(50%-2rem)]`} style={{ animationDelay: `${index * 150}ms` }}>
                                {/* Timeline Dot */}
                                <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 md:left-auto md:translate-x-0" style={{ [index % 2 === 0 ? 'right' : 'left']: '-2.25rem' }}>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75" />
                                        <div className="relative w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-950" />
                                    </div>
                                </div>

                                {/* Card */}
                                <div className="group relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-lg mb-2">
                                                        <FaBriefcase className="text-sm" />
                                                        {exp.company}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
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
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, skillIndex) => (
                                                <span key={skillIndex} className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Decorative Corner */}
                                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link href="/experience" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-2xl group">
                        <span>{t.sections.viewAllExperience}</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}