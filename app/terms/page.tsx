'use client';
import ScrollToTop from "../components/ScrollToTop";
import { FaGavel, FaExclamationTriangle, FaFileContract } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { termsContent as enContent } from "@/lib/data/en/terms";
import { termsContent as frContent } from "@/lib/data/fr/terms";

export default function TermsPage() {
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements - Light Mode */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="block dark:hidden absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
                    <div className="block dark:hidden absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Background Elements - Dark Mode */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="hidden dark:block absolute -top-40 -right-32 w-80 h-80 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
                    <div className="hidden dark:block absolute -bottom-40 -left-32 w-80 h-80 bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center">
                        {/* Animated Icon/Badge */}
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <FaGavel className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                {content.hero.badge}
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            {content.hero.title}
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                {content.hero.subtitle}
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                    {content.hero.emphasis}
                                </span>
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div>

                        {/* Last Updated */}
                        <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg inline-block">
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                <strong>{content.hero.badge}:</strong> {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Introduction */}
                        <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaFileContract className="text-blue-600 dark:text-blue-400" />
                                {content.sections.welcome.title}
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300">
                                {content.sections.welcome.description}
                            </p>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-12">
                            {/* Acceptance of Terms */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    1. {content.sections.acceptance.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {content.sections.acceptance.description}
                                </p>
                                <ul className="text-slate-600 dark:text-slate-300 space-y-2 ml-6">
                                    {content.sections.acceptance.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Use of Services */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    2. {content.sections.services.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {content.sections.services.description}
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                            <span className="text-green-500">✓</span>
                                            {content.sections.services.permitted.title}
                                        </h4>
                                        <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                                            {content.sections.services.permitted.items.map((item, i) => (
                                                <li key={i}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                        <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                                            <FaExclamationTriangle className="text-red-500" />
                                            {content.sections.services.prohibited.title}
                                        </h4>
                                        <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                                            {content.sections.services.prohibited.items.map((item, i) => (
                                                <li key={i}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Intellectual Property */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    3. {content.sections.ip.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {content.sections.ip.description}
                                </p>
                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{content.sections.ip.may.title}</h4>
                                    <ul className="text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                                        {content.sections.ip.may.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{content.sections.ip.mayNot.title}</h4>
                                    <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                                        {content.sections.ip.mayNot.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-red-500 mt-1">✗</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Contact & Communication */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    4. {content.sections.contact.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {content.sections.contact.description}
                                </p>
                                <ul className="text-slate-600 dark:text-slate-300 space-y-3 ml-6">
                                    {content.sections.contact.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Limitation of Liability */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    5. {content.sections.liability.title}
                                </h2>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                                    <p className="text-slate-700 dark:text-slate-300">
                                        <strong>{content.sections.liability.important}</strong> {content.sections.liability.description}
                                    </p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mt-4">
                                    {content.sections.liability.disclaimer}
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    6. {content.sections.changes.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300">
                                    {content.sections.changes.description}
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    7. {content.sections.contactInfo.title}
                                </h2>
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                                        {content.sections.contactInfo.description}
                                    </p>
                                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                                        <p>📧 <strong>{content.sections.contactInfo.email}</strong> hafaiedhakram@gmail.com</p>
                                        <p>📱 <strong>{content.sections.contactInfo.phone}</strong> +216 50 569 298</p>
                                        <p>📍 <strong>{content.sections.contactInfo.location}</strong> {content.sections.contactInfo.locationValue}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <ScrollToTop />
        </div>
    );
}