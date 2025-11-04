"use client";

import { useState } from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FaDownload, FaGlobe, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { resumeData, type Language } from "@/lib/resume";

export default function ResumePage() {
    const [language, setLanguage] = useState<Language>('en');

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/resume/${language}/resume.pdf`;
        link.download = `Akram_Hafaiedh_Resume_${language.toUpperCase()}.pdf`;
        link.click();
    };

    const data = resumeData[language];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Action Bar - Hide on print */}
            <div className="no-print sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <FaGlobe />
                        {language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <FaDownload />
                            {data.downloadBtn}
                        </button>
                    </div>
                </div>
            </div>

            {/* Resume Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <header className="text-center mb-12 mt-12 print:mb-8">
                    <div className="relative inline-block mb-6 print:mb-4">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg print:shadow-none">
                            <span className="text-4xl">👨‍💻</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-3 print:text-4xl print:text-black">
                        Akram Hafaiedh
                    </h1>
                    <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4 print:text-xl print:text-blue-700">
                        {data.subtitle}
                    </p>
                    <div className="flex justify-center gap-6 text-slate-600 dark:text-slate-300 flex-wrap print:text-black print:text-sm">
                        <span>📧 {data.contact.email}</span>
                        <span>📱 {data.contact.phone}</span>
                        <span>📍 {data.contact.location}</span>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-8 print:gap-4">
                    {/* Sidebar */}
                    <aside className="space-y-6 print:space-y-4">
                        {/* Profile */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 print:shadow-none print:border-gray-300 print:p-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 print:text-black">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded print:bg-blue-600"></div>
                                {data.profile.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed print:text-black print:text-xs">
                                {data.profile.text}
                            </p>
                        </div>

                        {/* Languages */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 print:shadow-none print:border-gray-300 print:p-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 print:text-black">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded print:bg-blue-600"></div>
                                {data.languages.title}
                            </h3>
                            <div className="space-y-2">
                                {data.languages.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm print:text-xs">
                                        <span className="text-slate-700 dark:text-slate-300 print:text-black">{item.lang}</span>
                                        <span className="text-blue-600 dark:text-blue-400 font-medium print:text-blue-700">{item.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 print:shadow-none print:border-gray-300 print:p-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 print:text-black">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded print:bg-blue-600"></div>
                                {data.skills.title}
                            </h3>
                            <div className="space-y-4 print:space-y-2">
                                {data.skills.categories.map((category, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2 print:text-black">
                                            {category.name}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {category.items.map((skill, sidx) => (
                                                <span
                                                    key={sidx}
                                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium print:bg-blue-50 print:text-blue-800 print:border print:border-blue-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links - Hide on print */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 no-print">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                {data.social.title}
                            </h3>
                            <div className="space-y-2 text-sm">
                                {data.social.items.map((item, idx) => (
                                    <div key={idx} className="text-slate-600 dark:text-slate-300">
                                        {item.platform === 'LinkedIn' && '💼'}
                                        {item.platform === 'GitHub' && '🐙'}
                                        {item.platform === 'GitLab' && '🦊'}
                                        {' '}{item.platform}: {item.username}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-2 space-y-8 print:space-y-4">
                        {/* Experience */}
                        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 print:shadow-none print:border-gray-300 print:p-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 print:text-xl print:text-black print:mb-4">
                                <FaBriefcase className="text-blue-600 print:text-blue-700" />
                                {data.experience.title}
                            </h2>
                            <div className="space-y-6 print:space-y-3">
                                {data.experience.jobs.map((job, idx) => (
                                    <div key={idx} className="border-l-4 border-blue-500 pl-4 print:border-l-2">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white print:text-base print:text-black">
                                            {job.title}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm print:text-blue-700 print:text-xs">
                                            {job.company}
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm italic mb-3 print:text-black print:text-xs">
                                            {job.date}
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 print:text-black print:text-xs">
                                            {job.description.map((item, didx) => (
                                                <li key={didx} className="flex gap-2">
                                                    <span className="text-blue-500 print:text-blue-700">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2 mt-3 print:mt-2">
                                            {job.skills.map((skill, sidx) => (
                                                <span
                                                    key={sidx}
                                                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs print:bg-gray-100 print:text-black print:border print:border-gray-300"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 print:shadow-none print:border-gray-300 print:p-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 print:text-xl print:text-black print:mb-4">
                                <FaGraduationCap className="text-purple-600 print:text-purple-700" />
                                {data.education.title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 print:gap-2">
                                {data.education.items.map((item, idx) => (
                                    <div key={idx} className="border-l-4 border-purple-500 pl-4 print:border-l-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white text-sm print:text-black print:text-xs">
                                            {item.degree}
                                        </h3>
                                        <p className="text-purple-600 dark:text-purple-400 text-sm print:text-purple-700 print:text-xs">
                                            {item.institution}
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs italic print:text-black">
                                            {item.date}
                                        </p>
                                        {item.description && (
                                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 print:text-black">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <Footer />
            <ScrollToTop />

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    @page {
                        margin: 0.5in;
                        size: A4;
                    }
                }
            `}</style>
        </div>
    );
}