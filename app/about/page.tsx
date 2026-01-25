'use client';
import { FaCode, FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaRocket, FaCalendar, FaLightbulb, FaHeart, FaMusic, FaFutbol, FaDumbbell, FaBriefcase, FaMobile, FaChartLine } from "react-icons/fa";
import { projects } from "@/lib/projects";
import Link from "next/link";
import ScrollProgress from "../components/ScrollProgress";
import { useState } from "react";

export default function AboutPage() {
    const [hoveredEmoji, setHoveredEmoji] = useState<string | number | null>(null);
    const timeline = [
        {
            year: "2018",
            title: "The Spark",
            subtitle: "Master's in Biomedical Engineering",
            description: "During my 'Medical Informatics' course with Miss Hanen Boussi, I built a hospital dashboard project with SQL authentication. That moment when I saw code create real-world solutions was my 'click' moment.",
            icon: FaLightbulb,
            color: "from-yellow-500 to-orange-500"
        },
        {
            year: "2019",
            title: "Foundation",
            subtitle: "Laravel & Blade",
            description: "Started my web development journey with Laravel and Blade, learning the fundamentals of backend development and database management.",
            icon: FaCode,
            color: "from-red-500 to-pink-500"
        },
        {
            year: "2020",
            title: "Evolution",
            subtitle: "Livewire, Inertia & Vue.js",
            description: "Advanced to Livewire and Inertia, then combined Vue.js with Laravel to build more dynamic, interactive applications.",
            icon: FaRocket,
            color: "from-green-500 to-emerald-500"
        },
        {
            year: "2021-2022",
            title: "MEAN Stack Mastery",
            subtitle: "MongoDB, Express, Angular & Node.js",
            description: "Completed a comprehensive MEAN stack course, mastering MongoDB, Express.js, Angular, and Node.js. Built a restaurant website as my final project. Then explored MERN stack by diving into React, discovering its differences and strengths.",
            icon: FaGlobe,
            color: "from-blue-500 to-cyan-500"
        },
        {
            year: "2022-2023",
            title: "Python & Django",
            subtitle: "Backend Expansion",
            description: "Learned Django framework and SQLite databases, expanding my backend expertise beyond JavaScript and PHP into the Python ecosystem.",
            icon: FaCode,
            color: "from-green-600 to-teal-500"
        },
        {
            year: "2023",
            title: "Full-Time Position",
            subtitle: "Transition to Company Work",
            description: "Transitioned from freelance work to a full-time position, applying all my experience in a team environment. Discovered Next.js (which was relatively new) and Flutter, making note to explore these technologies further.",
            icon: FaBriefcase,
            color: "from-purple-500 to-indigo-500"
        },
        {
            year: "2024",
            title: "Side Projects & Nuxt.js",
            subtitle: "Vue.js & Laravel at Work",
            description: "While working professionally with Vue.js and Laravel, I dedicated weekends to learning Nuxt.js, discovering its power for server-side rendering and really enjoying the framework.",
            icon: FaRocket,
            color: "from-emerald-500 to-green-500"
        },
        {
            year: "Early 2025",
            title: "Mobile Development",
            subtitle: "Ionic Framework",
            description: "Company decided to expand with a mobile app using a unified codebase. Learned Ionic to create cross-platform mobile applications from our existing web repository, enabling seamless web-to-mobile deployment.",
            icon: FaMobile,
            color: "from-blue-600 to-purple-600"
        },
        {
            year: "Mid 2025",
            title: "Industry Pivot",
            subtitle: "Learning Next.js",
            description: "After being laid off, I strategically chose to master Next.js - a widely-adopted industry standard. Leveraging my React foundation, I quickly adapted to this powerful framework used by top companies worldwide.",
            icon: FaChartLine,
            color: "from-orange-500 to-red-500"
        },
        {
            year: "2025-Present",
            title: "Full-Stack Expertise",
            subtitle: "Ready for New Opportunities",
            description: "Now equipped with a diverse tech stack spanning Laravel, Vue, React, Next.js, Node.js, Django, and Ionic. Ready to bring this expertise to exciting new projects and contribute to innovative teams.",
            icon: FaHeart,
            color: "from-pink-500 to-rose-500"
        }
    ];

    const stats = [
        { icon: FaGraduationCap, label: "Master's Degree", value: "Biomedical", color: "blue" },
        { icon: FaCode, label: "Projects Completed", value: projects.length.toString(), color: "green" },
        { icon: FaGlobe, label: "Languages", value: "4", color: "purple" },
        { icon: FaMapMarkerAlt, label: "Location", value: "Tunisia", color: "orange" }
    ];

    return (
        <div className="relative bg-slate-950 overflow-hidden min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <ScrollProgress sections={['About', 'Journey', 'Skills', 'Personal']} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6 animate-fade-in-up">
                            <FaHeart className="text-xs" />
                            My Story
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            From Biomedical to{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Full-Stack Development
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            A journey driven by passion, curiosity, and a love for building solutions that make a difference
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="group relative">
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color === 'blue' ? 'from-blue-600 to-cyan-600' :
                                        stat.color === 'green' ? 'from-green-600 to-emerald-600' :
                                            stat.color === 'purple' ? 'from-purple-600 to-pink-600' :
                                                'from-orange-600 to-red-600'
                                        } rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl text-center group-hover:scale-105 transition-transform">
                                        <stat.icon className="text-2xl mx-auto mb-2 text-slate-400" />
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-slate-400">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">My Development Journey</h2>
                            <p className="text-slate-400">How I became a full-stack developer</p>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Center Line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

                            {/* Timeline Items */}
                            <div className="space-y-12">
                                {timeline.map((item, index) => (
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
                                                <div className={`relative w-4 h-4 bg-gradient-to-r ${item.color} rounded-full border-4 border-slate-950`} />
                                            </div>
                                        </div>

                                        {/* Card */}
                                        <div className="group relative">
                                            <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                                            <div className="relative bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                                                <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                    <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                        <item.icon className="text-white text-2xl" />
                                                    </div>
                                                    <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                                                        <div className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                                                            {item.year}
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-purple-400 font-semibold text-sm">
                                                            {item.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className={`text-slate-300 leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills & Approach Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">My Approach</h2>
                            <p className="text-slate-400">What drives my development philosophy</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Clean Code",
                                    description: "I believe in writing maintainable, well-documented code that other developers can easily understand and build upon.",
                                    icon: FaCode,
                                    color: "from-blue-500 to-cyan-500"
                                },
                                {
                                    title: "User-Centric",
                                    description: "Every line of code I write is focused on creating intuitive experiences that solve real problems for real people.",
                                    icon: FaHeart,
                                    color: "from-pink-500 to-rose-500"
                                },
                                {
                                    title: "Continuous Learning",
                                    description: "Technology evolves rapidly, and I stay current with the latest trends and best practices in web development.",
                                    icon: FaLightbulb,
                                    color: "from-yellow-500 to-orange-500"
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl h-full hover:border-purple-500/50 transition-all">
                                        <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <item.icon className="text-white text-2xl" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Personal Info Section with Fun Animation */}
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Beyond the Code</h2>
                            <p className="text-slate-400">The person behind the developer</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {/* Education */}
                            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaGraduationCap className="text-3xl text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Education</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Master's Degree</h4>
                                        <p className="text-slate-400 text-sm">Biomedical Engineering</p>
                                        <p className="text-slate-500 text-xs">ISTMT, Tunis • 2016-2018</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Bachelor's Degree</h4>
                                        <p className="text-slate-400 text-sm">Biomedical Engineering</p>
                                        <p className="text-slate-500 text-xs">ISTMT, Tunis • 2013-2016</p>
                                    </div>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaGlobe className="text-3xl text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Languages</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { lang: "Arabic", level: "Native", width: "100%" },
                                        { lang: "French", level: "Native", width: "100%" },
                                        { lang: "English", level: "Fluent", width: "85%" },
                                        { lang: "Spanish", level: "Basic", width: "40%" }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-slate-300">{item.lang}</span>
                                                <span className="text-slate-500 text-sm">{item.level}</span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
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
                            <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl animate-fade-in-up hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                        <FaHeart className="text-3xl text-pink-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Beyond Code</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { icon: FaFutbol, text: "Football", color: "text-green-400", delay: "0s" },
                                        { icon: FaDumbbell, text: "Weight Lifting", color: "text-red-400", delay: "0.1s" },
                                        { icon: FaMusic, text: "Music", color: "text-purple-400", delay: "0.2s" },
                                        { icon: FaCode, text: "Technology", color: "text-blue-400", delay: "0.3s" }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform"
                                            style={{ animationDelay: item.delay }}
                                        >
                                            <item.icon className={`${item.color} group-hover/item:scale-125 transition-transform`} />
                                            <span className="text-slate-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Interactive Quote Section */}
                        <div className="relative group max-w-3xl mx-auto mt-16">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-500" />
                            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-12 rounded-2xl text-center overflow-hidden">
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
                                <blockquote className="text-2xl text-slate-200 font-medium mb-2 leading-relaxed">
                                    "Building digital experiences that inspire and empower"
                                </blockquote>
                                <p className="text-slate-400 mb-8">
                                    Let's create something amazing together
                                </p>

                                {/* Interactive emoji row */}
                                <div className="flex justify-center gap-6 mb-6">
                                    {[
                                        { emoji: '⚡', delay: '0s', label: 'Fast' },
                                        { emoji: '✨', delay: '0.2s', label: 'Creative' },
                                        { emoji: '🎯', delay: '0.4s', label: 'Focused' },
                                        { emoji: '🔥', delay: '0.6s', label: 'Passionate' },
                                        { emoji: '💡', delay: '0.8s', label: 'Innovative' }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="group/emoji relative"
                                            onMouseEnter={() => setHoveredEmoji(i)}
                                            onMouseLeave={() => setHoveredEmoji(null)}
                                        >
                                            <div
                                                className="text-4xl cursor-pointer transition-all duration-300 hover:scale-150 animate-bounce"
                                                style={{ animationDelay: item.delay }}
                                            >
                                                {item.emoji}
                                            </div>
                                            {/* Tooltip on hover */}
                                            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap transition-all duration-200 ${hoveredEmoji === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
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
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-semibold hover:scale-110 hover:border-blue-400/50 transition-all duration-300 cursor-pointer animate-fade-in-up"
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
                <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
                        <p className="text-slate-400 mb-8 text-lg">
                            Interested in collaborating or want to learn more about my experience?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/resume"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                            >
                                <FaRocket />
                                View My Resume
                            </Link>
                            <Link
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 border-2 border-slate-700 hover:border-green-500 text-white rounded-xl font-bold transition-all hover:scale-105"
                            >
                                <FaCalendar />
                                Schedule a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}