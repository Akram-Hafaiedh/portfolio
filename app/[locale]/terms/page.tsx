'use client';
import { FaGavel, FaExclamationTriangle, FaFileContract, FaShieldAlt, FaUserCheck, FaLightbulb, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const locale = useLocale();
    const t = useTranslations('Legal');

    const sections = [
        {
            id: 1,
            title: t('Terms.sections.acceptance.title'),
            icon: FaUserCheck,
            color: "from-blue-500 to-cyan-500",
            description: t('Terms.sections.acceptance.description'),
            items: t.raw('Terms.sections.acceptance.items') as string[]
        },
        {
            id: 2,
            title: t('Terms.sections.services.title'),
            icon: FaShieldAlt,
            color: "from-purple-500 to-pink-500",
            description: t('Terms.sections.services.description'),
            permitted: {
                title: t('Terms.sections.services.permitted.title'),
                items: t.raw('Terms.sections.services.permitted.items') as string[]
            },
            prohibited: {
                title: t('Terms.sections.services.prohibited.title'),
                items: t.raw('Terms.sections.services.prohibited.items') as string[]
            }
        },
        {
            id: 3,
            title: t('Terms.sections.ip.title'),
            icon: FaFileContract,
            color: "from-green-500 to-emerald-500",
            description: t('Terms.sections.ip.description'),
            may: {
                title: t('Terms.sections.ip.may.title'),
                items: t.raw('Terms.sections.ip.may.items') as string[]
            },
            mayNot: {
                title: t('Terms.sections.ip.mayNot.title'),
                items: t.raw('Terms.sections.ip.mayNot.items') as string[]
            }
        },
        {
            id: 4,
            title: t('Terms.sections.contact.title'),
            icon: FaEnvelope,
            color: "from-orange-500 to-red-500",
            description: t('Terms.sections.contact.description'),
            items: t.raw('Terms.sections.contact.items') as string[]
        },
        {
            id: 5,
            title: t('Terms.sections.liability.title'),
            icon: FaExclamationTriangle,
            color: "from-yellow-500 to-orange-500",
            description: t('Terms.sections.liability.description'),
            important: t('Terms.sections.liability.important'),
            disclaimer: t('Terms.sections.liability.disclaimer')
        },
        {
            id: 6,
            title: t('Terms.sections.changes.title'),
            icon: FaLightbulb,
            color: "from-indigo-500 to-purple-500",
            description: t('Terms.sections.changes.description')
        }
    ];

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
                            <FaGavel className="text-xs" />
                            {t('Terms.hero.badge')}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {t('Terms.hero.title')}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {t('Terms.hero.subtitle')}
                        </p>
                        <p className="text-lg text-slate-500 dark:text-slate-500 mb-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                            {t('Terms.hero.emphasis')}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <strong>{t('Terms.hero.badge')}:</strong> {new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Introduction Card */}
                <div className="px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaFileContract className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('Terms.sections.welcome.title')}</h2>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {t('Terms.sections.welcome.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms Sections */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            const isExpanded = activeSection === section.id;

                            return (
                                <div
                                    key={section.id}
                                    className="group relative animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${section.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />

                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all">
                                        {/* Header */}
                                        <button
                                            onClick={() => setActiveSection(isExpanded ? null : section.id)}
                                            className="w-full p-6 sm:p-8 text-left"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-14 h-14 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <Icon className="text-white text-2xl" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className={`text-sm font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent mb-2`}>
                                                        {locale === 'fr' ? 'Section' : 'Section'} {section.id}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {section.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-300">
                                                        {section.description}
                                                    </p>
                                                </div>
                                                <div className={`text-2xl text-slate-400 dark:text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                                    ↓
                                                </div>
                                            </div>
                                        </button>

                                        {/* Expandable Content */}
                                        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                                                {/* Liability Section Special Content */}
                                                {(section as any).important && (
                                                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                                                        <p className="text-slate-700 dark:text-slate-300">
                                                            <strong className="text-yellow-800 dark:text-yellow-300">{(section as any).important}</strong> {section.description}
                                                        </p>
                                                        {(section as any).disclaimer && (
                                                            <p className="text-slate-600 dark:text-slate-400 mt-3">
                                                                {(section as any).disclaimer}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Regular Items */}
                                                {(section as any).items && !(section as any).important && (
                                                    <ul className="space-y-3">
                                                        {(section as any).items.map((item: string, i: number) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${section.color} mt-1 text-xl`}>•</span>
                                                                <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Permitted/Prohibited Items */}
                                                {(section as any).permitted && (section as any).prohibited && (
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                                                                <span className="text-green-500 text-xl">✓</span>
                                                                {(section as any).permitted.title}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {(section as any).permitted.items.map((item: string, i: number) => (
                                                                    <li key={i} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2">
                                                                        <span>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                                            <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                                                                <FaExclamationTriangle className="text-red-500" />
                                                                {(section as any).prohibited.title}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {(section as any).prohibited.items.map((item: string, i: number) => (
                                                                    <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                                                                        <span>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* May/May Not Items */}
                                                {(section as any).may && (section as any).mayNot && (
                                                    <div className="space-y-4">
                                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{(section as any).may.title}</h4>
                                                            <ul className="space-y-2">
                                                                {(section as any).may.items.map((item: string, i: number) => (
                                                                    <li key={i} className="text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                                                        <span className="text-green-500 mt-1">✓</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{(section as any).mayNot.title}</h4>
                                                            <ul className="space-y-2">
                                                                {(section as any).mayNot.items.map((item: string, i: number) => (
                                                                    <li key={i} className="text-slate-600 dark:text-slate-300 flex items-start gap-2">
                                                                        <span className="text-red-500 mt-1">✗</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('Terms.sections.contactInfo.title')}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{t('Terms.sections.contactInfo.description')}</p>
                        </div>

                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaEnvelope className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{t('Terms.sections.contactInfo.email')}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">hafaiedhakram@gmail.com</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaPhone className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{t('Terms.sections.contactInfo.phone')}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">+216 50 569 298</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaMapMarkerAlt className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{t('Terms.sections.contactInfo.location')}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{t('Terms.sections.contactInfo.locationValue')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                            <p className="text-slate-700 dark:text-slate-300">
                                {t('Terms.footerNote')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}