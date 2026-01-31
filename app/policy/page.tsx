'use client';
import { FaShieldAlt, FaUserShield, FaDatabase, FaCookie, FaEye, FaLock, FaHandshake, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { privacyContent as enContent } from "@/lib/data/en/legal";
import { privacyContent as frContent } from "@/lib/data/fr/legal";

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;

    const sections = [
        {
            id: 1,
            title: content.sections.collection.title,
            icon: FaDatabase,
            color: "from-blue-500 to-cyan-500",
            description: "",
            hasCollectionContent: true,
            direct: content.sections.collection.direct,
            automatic: content.sections.collection.automatic
        },
        {
            id: 2,
            title: content.sections.usage.title,
            icon: FaEye,
            color: "from-purple-500 to-pink-500",
            description: content.sections.usage.subtitle,
            purposes: content.sections.usage.purposes
        },
        {
            id: 3,
            title: content.sections.sharing.title,
            icon: FaHandshake,
            color: "from-green-500 to-emerald-500",
            description: content.sections.sharing.description,
            noSell: content.sections.sharing.noSell,
            items: content.sections.sharing.items
        },
        {
            id: 4,
            title: content.sections.cookies.title,
            icon: FaCookie,
            color: "from-orange-500 to-red-500",
            description: content.sections.cookies.description,
            cookieTypes: content.sections.cookies.types,
            cookieItems: content.sections.cookies.items
        },
        {
            id: 5,
            title: content.sections.security.title,
            icon: FaLock,
            color: "from-yellow-500 to-orange-500",
            description: content.sections.security.description,
            measures: content.sections.security.measures
        },
        {
            id: 6,
            title: content.sections.rights.title,
            icon: FaUserShield,
            color: "from-indigo-500 to-purple-500",
            description: content.sections.rights.description,
            rights: content.sections.rights.items
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <FaShieldAlt className="text-xs" />
                            {content.hero.badge}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {content.hero.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {content.hero.subtitle}
                        </p>
                        <p className="text-lg text-slate-500 dark:text-slate-500 mb-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                            {content.hero.emphasis}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <strong>{language === 'fr' ? 'Dernière mise à jour' : 'Last Updated'}:</strong> {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaUserShield className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{content.sections.intro.title}</h2>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {content.sections.intro.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Sections */}
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
                                                        {language === 'fr' ? 'Section' : 'Section'} {section.id}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {section.title}
                                                    </h3>
                                                    {section.description && (
                                                        <p className="text-slate-600 dark:text-slate-300">
                                                            {section.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className={`text-2xl text-slate-400 dark:text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                                    ↓
                                                </div>
                                            </div>
                                        </button>

                                        {/* Expandable Content */}
                                        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                                                {/* Information Collection Content */}
                                                {section.hasCollectionContent && (
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                                                                <FaDatabase className="text-blue-600 dark:text-blue-400" />
                                                                {section.direct.title}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {section.direct.items.map((item, i) => (
                                                                    <li key={i} className="text-sm text-blue-700 dark:text-blue-400 flex items-start gap-2">
                                                                        <span>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                                            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                                                                <FaEye className="text-purple-600 dark:text-purple-400" />
                                                                {section.automatic.title}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {section.automatic.items.map((item, i) => (
                                                                    <li key={i} className="text-sm text-purple-700 dark:text-purple-400 flex items-start gap-2">
                                                                        <span>•</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Usage Purposes */}
                                                {section.purposes && (
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {section.purposes.map((purpose, i) => (
                                                            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                                                <div className={`w-8 h-8 ${i === 0 ? 'bg-green-100 dark:bg-green-900' :
                                                                    i === 1 ? 'bg-blue-100 dark:bg-blue-900' :
                                                                        i === 2 ? 'bg-purple-100 dark:bg-purple-900' :
                                                                            'bg-orange-100 dark:bg-orange-900'
                                                                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                                                                    <span className={`${i === 0 ? 'text-green-600 dark:text-green-400' :
                                                                        i === 1 ? 'text-blue-600 dark:text-blue-400' :
                                                                            i === 2 ? 'text-purple-600 dark:text-purple-400' :
                                                                                'text-orange-600 dark:text-orange-400'
                                                                        } font-bold text-sm`}>{i + 1}</span>
                                                                </div>
                                                                <div>
                                                                    <h5 className="font-semibold text-slate-900 dark:text-white mb-1">{purpose.title}</h5>
                                                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                                                        {purpose.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Data Sharing Items */}
                                                {section.noSell && (
                                                    <div>
                                                        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                                                            <p className="text-slate-700 dark:text-slate-300 font-semibold">
                                                                {section.noSell}
                                                            </p>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {section.items.map((item, i) => (
                                                                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                                                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                                        <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                                                                    </div>
                                                                    <div className="text-slate-700 dark:text-slate-300">
                                                                        <strong>{item.title}</strong> {item.description}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Cookie Items */}
                                                {section.cookieItems && (
                                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{section.cookieTypes}</h4>
                                                        <ul className="space-y-2">
                                                            {section.cookieItems.map((item, i) => (
                                                                <li key={i} className="text-sm text-slate-600 dark:text-slate-300">
                                                                    • <strong>{item.type}</strong> {item.description}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Security Measures */}
                                                {section.measures && (
                                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                                        <div className="grid md:grid-cols-2 gap-3">
                                                            {section.measures.map((measure, i) => (
                                                                <div key={i} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                                                                    <span className="text-green-500">✓</span>
                                                                    <span>{measure}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* User Rights */}
                                                {section.rights && (
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {section.rights.map((right, i) => (
                                                            <div key={i} className={`p-4 ${i === 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                                                                i === 1 ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                                                                    i === 2 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                                                                        'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                                                                } rounded-lg border`}>
                                                                <h4 className={`font-semibold mb-2 ${i === 0 ? 'text-blue-800 dark:text-blue-300' :
                                                                    i === 1 ? 'text-purple-800 dark:text-purple-300' :
                                                                        i === 2 ? 'text-green-800 dark:text-green-300' :
                                                                            'text-orange-800 dark:text-orange-300'
                                                                    }`}>{right.title}</h4>
                                                                <p className={`text-sm ${i === 0 ? 'text-blue-700 dark:text-blue-400' :
                                                                    i === 1 ? 'text-purple-700 dark:text-purple-400' :
                                                                        i === 2 ? 'text-green-700 dark:text-green-400' :
                                                                            'text-orange-700 dark:text-orange-400'
                                                                    }`}>
                                                                    {right.description}
                                                                </p>
                                                            </div>
                                                        ))}
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
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.sections.contactInfo.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.sections.contactInfo.description}</p>
                        </div>

                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl">
                                <div className="grid md:grid-cols-3 gap-6 mb-6">
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaEnvelope className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{content.sections.contactInfo.email}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">hafaiedhakram@gmail.com</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaPhone className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{content.sections.contactInfo.phone}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">+216 50 569 298</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <FaMapMarkerAlt className="text-white text-xl" />
                                        </div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{content.sections.contactInfo.location}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{content.sections.contactInfo.locationValue}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                    {content.sections.contactInfo.responseTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800/50 text-center">
                            <p className="text-slate-700 dark:text-slate-300">
                                {language === 'fr'
                                    ? "En utilisant ce site, vous reconnaissez avoir lu et compris cette politique de confidentialité."
                                    : "By using this website, you acknowledge that you have read and understood this privacy policy."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}