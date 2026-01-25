'use client';
import Contact from "../components/Contact";
import ScrollProgress from "../components/ScrollProgress";
import { getFaqData } from "@/lib/faq";
import { FaRocket, FaClock, FaCheckCircle, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { contactPageContent as enContent } from "@/lib/data/en/contactPage";
import { contactPageContent as frContent } from "@/lib/data/fr/contactPage";

export default function ContactPage() {
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;
    const faqData = getFaqData(language);

    const iconMap: { [key: string]: any } = {
        FaEnvelope,
        FaPhone,
        FaCalendar,
        FaCheckCircle
    };

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

            <ScrollProgress sections={['Contact', 'Methods', 'Response', 'FAQ']} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <FaEnvelope className="text-xs" />
                            {content.hero.badge}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {content.hero.titlePrefix}{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {content.hero.titleHighlight}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {content.hero.description}
                        </p>
                    </div>
                </div>

                {/* Contact Methods Cards */}
                <div className="px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            {content.methods.map((method, index) => {
                                const Icon = iconMap[method.iconName];
                                const href = method.iconName === 'FaEnvelope' ? `mailto:${method.action}` :
                                    method.iconName === 'FaPhone' ? `tel:${method.action.replace(/ /g, '')}` :
                                        '/booking';

                                return (
                                    <Link
                                        key={index}
                                        href={href}
                                        className="group relative animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${method.color === 'blue' ? 'from-blue-600 to-cyan-600' :
                                            method.color === 'green' ? 'from-green-600 to-emerald-600' :
                                                'from-purple-600 to-pink-600'
                                            } rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />

                                        <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl hover:border-purple-500/50 transition-all h-full">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${method.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                                method.color === 'green' ? 'from-green-500 to-emerald-500' :
                                                    'from-purple-500 to-pink-500'
                                                } rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                <Icon className="text-white text-2xl" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{method.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{method.description}</p>
                                            <p className="text-slate-700 dark:text-slate-300 font-medium">{method.action}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Response Time Section */}
                <div className="px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.responseTime.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.responseTime.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {content.responseTime.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative group animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity`} />
                                    <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl text-center">
                                        <FaClock className={`text-4xl mx-auto mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                                        <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                            {item.time}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Contact Component */}
                <Contact />

                {/* Why Work With Me Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.whyMe.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.whyMe.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {content.whyMe.items.map((item, index) => {
                                const Icon = iconMap[item.iconName];
                                return (
                                    <div
                                        key={index}
                                        className="group bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-purple-500/50 transition-all animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Icon className="text-3xl text-green-500 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{content.faq.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.faq.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqData.map((item, index) => (
                                <div
                                    key={index}
                                    className="group bg-white dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-start gap-3">
                                        <span className="text-blue-500/50 mt-1 flex-shrink-0">Q{index + 1}.</span>
                                        <span>{item.question}</span>
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-4xl mx-auto text-center">
                        <FaRocket className="text-5xl text-purple-500 dark:text-purple-400 mx-auto mb-6 animate-bounce" />
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            {content.cta.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                            {content.cta.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                            >
                                <FaCalendar />
                                {content.cta.schedule}
                            </Link>
                            <a
                                href="mailto:hafaiedhakram@gmail.com"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:scale-105"
                            >
                                <FaEnvelope />
                                {content.cta.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}