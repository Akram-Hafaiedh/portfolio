'use client';
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaCode, FaRocket, FaCalendar, FaGithub, FaLinkedin, FaArrowRight, FaLightbulb, FaUsers } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function HeroAboutSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const values = [
        {
            icon: FaCode,
            title: "Clean Code",
            description: "Writing maintainable, scalable code that stands the test of time",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: FaLightbulb,
            title: "Innovation",
            description: "Leveraging cutting-edge technologies to solve complex problems",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: FaUsers,
            title: "User-Centric",
            description: "Building intuitive experiences that users love to interact with",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: FaRocket,
            title: "Performance",
            description: "Optimizing every detail for speed and efficiency",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section className="relative">
            {/* HERO SECTION */}
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium animate-fade-in-up">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Available for new projects
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                                    <span className="block text-white">Hi, I'm</span>
                                    <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                        Akram Hafaiedh
                                    </span>
                                </h1>
                                <p className="text-2xl sm:text-3xl font-bold text-slate-300">
                                    Full-Stack Developer
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                I craft exceptional digital experiences with{' '}
                                <span className="text-blue-400 font-semibold">JavaScript</span> (React, Vue, Angular, Next.js, Node.js) and{' '}
                                <span className="text-purple-400 font-semibold">PHP</span> (Laravel), turning complex problems into elegant solutions.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                                <Link
                                    href="/booking"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <FaCalendar />
                                        Book a Meeting
                                    </span>
                                </Link>

                                <Link
                                    href="/contact"
                                    className="group relative px-8 py-4 bg-slate-800 border-2 border-slate-700 hover:border-purple-500 rounded-xl font-bold text-white transition-all hover:scale-105"
                                >
                                    <span className="relative flex items-center justify-center gap-2">
                                        <FaEnvelope />
                                        Get in Touch
                                    </span>
                                </Link>
                            </div>

                            {/* Quick Links */}
                            <div className="flex gap-4 animate-fade-in-up justify-center lg:justify-start" style={{ animationDelay: '0.4s' }}>
                                <Link
                                    href="/resume"
                                    className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                                >
                                    <FaRocket className="group-hover:rotate-12 transition-transform" />
                                    <span className="border-b border-slate-600 group-hover:border-purple-400">Resume</span>
                                </Link>
                                <Link
                                    href="/projects"
                                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                >
                                    <FaCode className="group-hover:scale-110 transition-transform" />
                                    <span className="border-b border-slate-600 group-hover:border-blue-400">Projects</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Visual Element */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {/* Main Card */}
                            <div className="relative group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse-slow" />

                                {/* Card Content */}
                                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 space-y-6">
                                    {/* Avatar */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-75 animate-pulse-slow" />
                                            <Image
                                                src="/avatar.jpg"
                                                alt="Akram Hafaiedh"
                                                width={80}
                                                height={80}
                                                className="relative w-20 h-20 rounded-full border-2 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Akram Hafaiedh</h3>
                                            <p className="text-slate-400">Full-Stack Developer</p>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">5+</div>
                                            <div className="text-xs text-slate-500">Years Exp</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-400">50+</div>
                                            <div className="text-xs text-slate-500">Projects</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-pink-400">100%</div>
                                            <div className="text-xs text-slate-500">Satisfied</div>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-3">
                                        <p className="text-sm text-slate-400 font-medium">Core Technologies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript', 'TailwindCSS'].map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-purple-500/50 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-800">
                                        <a
                                            href="https://github.com/Akram-Hafaiedh"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all group"
                                        >
                                            <FaGithub className="group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">GitHub</span>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all group"
                                        >
                                            <FaLinkedin className="group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl flex items-center justify-center animate-float-slow">
                                <FaCode className="text-3xl text-blue-400" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl flex items-center justify-center animate-float-delayed">
                                <FaRocket className="text-3xl text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
                            <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-pulse" />
                        </div>
                        <p className="text-xs text-slate-500">Scroll</p>
                    </div>
                </div>
            </div>

            {/* ABOUT SECTION - Seamlessly continues */}
            <div className="relative pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                            <FaCode className="text-xs" />
                            About Me
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Building Digital Solutions That{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Make an Impact
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            I'm a Full Stack Developer passionate about building scalable web applications that solve real-world problems.
                            With expertise across both <strong className="text-blue-400">JavaScript</strong> (React, Vue.js, Next.js, Node.js) and <strong className="text-purple-400">PHP</strong> (Laravel) ecosystems,
                            I bring versatility and depth to every project.
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {values.map((value, index) => (
                            <div key={index} className="group relative">
                                {/* Glow effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />

                                {/* Card */}
                                <div className="relative bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-transparent transition-all duration-300 h-full">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <value.icon className="text-xl" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom section */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    My Approach
                                </h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    My approach combines technical excellence with user-centric design, ensuring that every application
                                    I build is not only powerful under the hood but also delightful to use. I believe in writing clean,
                                    maintainable code and delivering solutions that truly make a difference.
                                </p>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 group"
                                >
                                    Learn More About Me
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Problem Solver</h4>
                                        <p className="text-sm text-slate-400">
                                            I thrive on tackling complex challenges and finding elegant solutions
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl">
                                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Fast Learner</h4>
                                        <p className="text-sm text-slate-400">
                                            Constantly exploring new technologies and best practices
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">🤝</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Team Player</h4>
                                        <p className="text-sm text-slate-400">
                                            Collaborating effectively with designers, developers, and stakeholders
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}