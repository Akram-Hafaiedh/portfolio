'use client';
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaCode, FaRocket, FaCalendar, FaGithub, FaLinkedin, FaArrowRight, FaLightbulb, FaUsers } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useLanguage } from "@/app/context/LanguageContext";
import { homeContent as enContent } from "@/lib/data/en/home";
import { homeContent as frContent } from "@/lib/data/fr/home";

export default function HeroAboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useLanguage();
    const homeData = language === 'fr' ? frContent : enContent;
    const content = homeData.hero; // Access hero section from home content

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const icons = [FaCode, FaLightbulb, FaUsers, FaRocket];
    const values = content.values.map((val, index) => ({
        ...val,
        icon: icons[index]
    }));

    return (
        <section className="relative">
            {/* HERO SECTION */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column */}
                        <div className="space-y-8 text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium animate-fade-in-up">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500"></span>
                                </span>
                                {content.badge}
                            </div>

                            {/* Heading */}
                            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                                    <span className="block text-slate-900 dark:text-white">{content.greeting}</span>
                                    <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                        {content.name}
                                    </span>
                                </h1>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">
                                    {content.role}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                {content.description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                                <Link href="/booking" className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <FaCalendar />
                                        {content.cta.book}
                                    </span>
                                </Link>

                                <Link href="/contact" className="group relative px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 rounded-xl font-bold text-slate-900 dark:text-white transition-all hover:scale-105">
                                    <span className="relative flex items-center justify-center gap-2">
                                        <FaEnvelope />
                                        {content.cta.contact}
                                    </span>
                                </Link>
                            </div>

                            {/* Quick Links */}
                            <div className="flex gap-4 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: '0.4s' }}>
                                <Link href="/experience" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group">
                                    <FaRocket className="group-hover:rotate-12 transition-transform" />
                                    <span className="border-b border-slate-400 dark:border-slate-600 group-hover:border-purple-600 dark:group-hover:border-purple-400">{content.links.resume}</span>
                                </Link>
                                <Link href="/projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <FaCode className="group-hover:scale-110 transition-transform" />
                                    <span className="border-b border-slate-400 dark:border-slate-600 group-hover:border-blue-600 dark:group-hover:border-blue-400">{content.links.projects}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Card */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative group">
                                {/* Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity animate-pulse-slow" />

                                {/* Card */}
                                <div className="relative bg-slate-50 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6">
                                    {/* Avatar */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-75 animate-pulse-slow" />
                                            <Image src="/avatar.jpg" alt="Akram Hafaiedh" width={80} height={80} className="relative w-20 h-20 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{content.name}</h3>
                                            <p className="text-slate-600 dark:text-slate-400">{content.role}</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{content.stats.exp.value}</div>
                                            <div className="text-xs text-slate-500">{content.stats.exp.label}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{content.stats.projects.value}</div>
                                            <div className="text-xs text-slate-500">{content.stats.projects.label}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{content.stats.satisfied.value}</div>
                                            <div className="text-xs text-slate-500">{content.stats.satisfied.label}</div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-3">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{content.techStack}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript', 'TailwindCSS'].map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:border-purple-500/50 transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <a href="https://github.com/Akram-Hafaiedh" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group">
                                            <FaGithub className="group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">GitHub</span>
                                        </a>
                                        <a href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group">
                                            <FaLinkedin className="group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl flex items-center justify-center animate-float-slow">
                                <FaCode className="text-3xl text-blue-500 dark:text-blue-400" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl flex items-center justify-center animate-float-delayed">
                                <FaRocket className="text-3xl text-purple-500 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center p-2">
                            <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse" />
                        </div>
                        <p className="text-xs text-slate-500">Scroll</p>
                    </div>
                </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="relative pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                            <FaCode className="text-xs" />
                            {content.aboutPreview.badge}
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            {content.aboutPreview.title}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {content.aboutPreview.description}
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {values.map((value, index) => (
                            <div key={index} className="group relative">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:border-transparent transition-all duration-300 h-full">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <value.icon className="text-xl" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{value.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {content.aboutPreview.approach.title}
                                </h3>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                    {content.aboutPreview.approach.description}
                                </p>
                                <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 group">
                                    {content.aboutPreview.approach.cta}
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {content.aboutPreview.traits.map((trait, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <div className={`w-10 h-10 ${index === 0 ? 'bg-blue-500/10' : index === 1 ? 'bg-purple-500/10' : 'bg-green-500/10'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-2xl">{trait.emoji}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{trait.title}</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{trait.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}