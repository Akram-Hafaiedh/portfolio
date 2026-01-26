'use client';
import { FaCode, FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaRocket, FaCalendar, FaLightbulb, FaHeart, FaMusic, FaFutbol, FaDumbbell, FaBriefcase, FaMobile, FaChartLine } from "react-icons/fa";
import { getProjects } from "@/lib/projects";
import Link from "next/link";
import ScrollProgress from "../components/ScrollProgress";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { aboutPageContent as enContent } from "@/lib/data/en/about";
import { aboutPageContent as frContent } from "@/lib/data/fr/about";
import CTA from "../components/CTA";

export default function AboutPage() {
    const [hoveredEmoji, setHoveredEmoji] = useState<string | number | null>(null);
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;

    // Dynamic projects count
    const projectsCount = getProjects(language).length.toString();

    // Map content to include icons
    const iconMap: { [key: string]: any } = {
        FaCode, FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaRocket, FaCalendar,
        FaLightbulb, FaHeart, FaMusic, FaFutbol, FaDumbbell, FaBriefcase, FaMobile, FaChartLine
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

            <ScrollProgress sections={['About', 'Journey', 'Skills', 'Personal']} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <FaHeart className="text-xs" />
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

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {content.stats.map((stat, index) => {
                                const Icon = iconMap[stat.iconName];
                                const value = stat.iconName === 'FaCode' && stat.label.includes('Project') ? projectsCount + '+' : stat.value;

                                return (
                                    <div key={index} className="group relative">
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color === 'blue' ? 'from-blue-600 to-cyan-600' :
                                            stat.color === 'green' ? 'from-green-600 to-emerald-600' :
                                                stat.color === 'purple' ? 'from-purple-600 to-pink-600' :
                                                    'from-orange-600 to-red-600'
                                            } rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                        <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-4 rounded-xl text-center group-hover:scale-105 transition-transform">
                                            <Icon className="text-2xl mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.timeline.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.timeline.subtitle}</p>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Center Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {content.timeline.items.map((item, index) => {
                                    const Icon = iconMap[item.iconName];
                                    return (
                                        <div
                                            key={index}
                                            className={`relative animate-fade-in-up ${index % 2 === 0
                                                ? 'md:pr-[calc(50%+2rem)] md:text-right'
                                                : 'md:pl-[calc(50%+2rem)] md:text-left'
                                                }`}
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            {/* Timeline Dot */}
                                            <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="relative">
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-75`} />
                                                    <div className={`relative w-4 h-4 bg-gradient-to-r ${item.color} rounded-full border-4 border-white dark:border-slate-950`} />
                                                </div>
                                            </div>

                                            {/* Card */}
                                            <div className="group relative">
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                                                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                                                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                        <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                            <Icon className="text-white text-2xl" />
                                                        </div>
                                                        <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                                                            <div className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                                                                {item.year}
                                                            </div>
                                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                                                                {item.subtitle}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills & Approach Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.approach.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.approach.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {content.approach.items.map((item, index) => {
                                const Icon = iconMap[item.iconName];
                                return (
                                    <div
                                        key={index}
                                        className="group relative animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                        <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl h-full hover:border-purple-500/50 transition-all">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                <Icon className="text-white text-2xl" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Personal Info Section with Fun Animation */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{content.personal.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{content.personal.subtitle}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {/* Education */}
                            <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaGraduationCap className="text-3xl text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.personal.education.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    {content.personal.education.items.map((edu, i) => (
                                        <div key={i}>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{edu.degree}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.field}</p>
                                            <p className="text-slate-500 dark:text-slate-500 text-xs">{edu.school}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaGlobe className="text-3xl text-purple-500 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.personal.languages.title}</h3>
                                </div>
                                <div className="space-y-3">
                                    {content.personal.languages.items.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-slate-700 dark:text-slate-300">{item.lang}</span>
                                                <span className="text-slate-500 text-sm">{item.level}</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: item.width }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaHeart className="text-3xl text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.personal.interests.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    {content.personal.interests.items.map((item, i) => {
                                        const Icon = iconMap[item.iconName];
                                        return (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                <Icon className={`${item.color} group-hover/item:scale-125 transition-transform`} />
                                                <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Interactive Quote Section */}
                        <div className="relative group max-w-3xl mx-auto mt-16">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-12 rounded-2xl text-center overflow-hidden">
                                {/* Animated background particles */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }} />
                                    <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }} />
                                    <div className="absolute bottom-10 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }} />
                                </div>

                                {/* Main emoji with rotation on hover */}
                                <div
                                    className="text-7xl mb-6 inline-block transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer"
                                    onMouseEnter={() => setHoveredEmoji('main')}
                                    onMouseLeave={() => setHoveredEmoji(null)}
                                >
                                    {hoveredEmoji === 'main' ? '🚀' : '💻'}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-2xl text-slate-800 dark:text-slate-200 font-medium mb-2 leading-relaxed">
                                    {content.quote.text}
                                </blockquote>
                                <p className="text-slate-600 dark:text-slate-400 mb-8">
                                    {content.quote.sub}
                                </p>

                                {/* Interactive emoji row */}
                                <div className="flex justify-center gap-6 mb-6">
                                    {content.quote.emojis.map((item, i) => (
                                        <div
                                            key={i}
                                            className="group/emoji relative"
                                            onMouseEnter={() => setHoveredEmoji(i)}
                                            onMouseLeave={() => setHoveredEmoji(null)}
                                        >
                                            <div
                                                className="text-4xl cursor-pointer transition-all duration-300 hover:scale-150 animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            >
                                                {item.emoji}
                                            </div>
                                            {/* Tooltip on hover */}
                                            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap transition-all duration-200 ${hoveredEmoji === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                                                }`}>
                                                {item.label}
                                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Floating tech stack badges */}
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['React', 'Next.js', 'Vue', 'Laravel', 'Node.js'].map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold hover:scale-110 hover:border-blue-400/50 transition-all duration-300 cursor-pointer animate-fade-in-up"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Pulsing effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 animate-pulse pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <CTA
                    title={content.cta.title}
                    description={content.cta.description}
                    buttons={[
                        {
                            label: content.cta.resume,
                            href: '/experience',
                            type: 'primary',
                            icon: 'briefcase'
                        },
                        {
                            label: content.cta.schedule,
                            href: '/booking',
                            type: 'secondary',
                            icon: 'calendar'
                        }
                    ]}
                />
            </div>
        </div>
    );
}