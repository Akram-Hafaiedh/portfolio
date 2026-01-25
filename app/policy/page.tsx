'use client';
import ScrollToTop from "../components/ScrollToTop";
import { FaShieldAlt, FaUserShield, FaDatabase, FaCookie, FaEye } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { privacyContent as enContent } from "@/lib/data/en/privacy";
import { privacyContent as frContent } from "@/lib/data/fr/privacy";

export default function PrivacyPage() {
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
                                <FaShieldAlt className="text-white text-3xl" />
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

            {/* Privacy Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {/* Introduction */}
                        <div className="mb-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaUserShield className="text-green-600 dark:text-green-400" />
                                {content.sections.intro.title}
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300">
                                {content.sections.intro.description}
                            </p>
                        </div>

                        {/* Privacy Sections */}
                        <div className="space-y-12">
                            {/* Information Collection */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    1. {content.sections.collection.title}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                                            <FaDatabase className="text-blue-600 dark:text-blue-400" />
                                            {content.sections.collection.direct.title}
                                        </h4>
                                        <ul className="text-blue-700 dark:text-blue-400 space-y-2 text-sm">
                                            {content.sections.collection.direct.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                                            <FaEye className="text-purple-600 dark:text-purple-400" />
                                            {content.sections.collection.automatic.title}
                                        </h4>
                                        <ul className="text-purple-700 dark:text-purple-400 space-y-2 text-sm">
                                            {content.sections.collection.automatic.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* How I Use Information */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    2. {content.sections.usage.title}
                                </h2>

                                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">{content.sections.usage.subtitle}</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {content.sections.usage.purposes.map((purpose, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className={`w-8 h-8 ${i === 0 ? 'bg-green-100 dark:bg-green-900' : i === 1 ? 'bg-blue-100 dark:bg-blue-900' : i === 2 ? 'bg-purple-100 dark:bg-purple-900' : 'bg-orange-100 dark:bg-orange-900'} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                    <span className={`${i === 0 ? 'text-green-600' : i === 1 ? 'text-blue-600' : i === 2 ? 'text-purple-600' : 'text-orange-600'} font-bold`}>{i + 1}</span>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-slate-900 dark:text-white">{purpose.title}</h5>
                                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                                        {purpose.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Data Sharing */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    3. {content.sections.sharing.title}
                                </h2>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
                                    <p className="text-slate-700 dark:text-slate-300">
                                        <strong>{content.sections.sharing.noSell}</strong> {content.sections.sharing.description}
                                    </p>
                                </div>

                                <div className="space-y-4 text-slate-600 dark:text-slate-300">
                                    {content.sections.sharing.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <span className="text-blue-600 text-sm">✓</span>
                                            </div>
                                            <div>
                                                <strong>{item.title}</strong> {item.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Cookies */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    4. {content.sections.cookies.title}
                                </h2>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCookie className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-600 dark:text-slate-300 mb-3">
                                            {content.sections.cookies.description}
                                        </p>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{content.sections.cookies.types}</h4>
                                            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                                                {content.sections.cookies.items.map((item, i) => (
                                                    <li key={i}>• <strong>{item.type}</strong> {item.description}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Data Security */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    5. {content.sections.security.title}
                                </h2>

                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                                        {content.sections.security.description}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        {content.sections.security.measures.map((measure, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-green-500">✓</span>
                                                <span>{measure}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Your Rights */}
                            <section className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                                    6. {content.sections.rights.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    {content.sections.rights.description}
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {content.sections.rights.items.map((right, i) => (
                                        <div key={i} className={`p-4 ${i === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : i === 1 ? 'bg-purple-50 dark:bg-purple-900/20' : i === 2 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-orange-50 dark:bg-orange-900/20'} rounded-lg`}>
                                            <h4 className={`font-semibold ${i === 0 ? 'text-blue-800 dark:text-blue-300' : i === 1 ? 'text-purple-800 dark:text-purple-300' : i === 2 ? 'text-green-800 dark:text-green-300' : 'text-orange-800 dark:text-orange-300'} mb-2`}>{right.title}</h4>
                                            <p className={`${i === 0 ? 'text-blue-700 dark:text-blue-400' : i === 1 ? 'text-purple-700 dark:text-purple-400' : i === 2 ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'} text-sm`}>
                                                {right.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
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
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                                        {content.sections.contactInfo.responseTime}
                                    </p>
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