'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaTrophy, FaRocket } from "react-icons/fa";
import Link from "next/link";

// Timeline data configuration
const timelineData = [
    {
        year: '2013-2016',
        type: 'education',
        title: 'Bachelor in Biomedical Engineering',
        company: 'Higher Institute of Medical Technologies',
        location: 'Tunis, Tunisia',
        description: 'Studied biomedical engineering fundamentals, developing analytical and problem-solving skills that would later transition into software development.',
        technologies: ['Signal Processing', 'Medical Devices', 'Mathematics', 'Physics'],
        Icon: FaGraduationCap,
        color: 'from-blue-500 to-cyan-500',
        highlight: 'Foundation in analytical thinking'
    },
    {
        year: '2016-2018',
        type: 'education',
        title: "Master's in Biomedical Instrumentation",
        company: 'Higher Institute of Medical Technologies',
        location: 'Tunis, Tunisia',
        description: 'Discovered passion for web development through Medical Informatics course. Built a hospital dashboard with SQL authentication - the spark that ignited my coding journey.',
        technologies: ['Medical Informatics', 'Database Design', 'Hospital Systems', 'SQL'],
        Icon: FaGraduationCap,
        color: 'from-purple-500 to-pink-500',
        highlight: '🔥 The "click" moment that changed everything'
    },
    {
        year: '2019-2020',
        type: 'milestone',
        title: 'Web Development Journey Begins',
        company: 'Self-Learning & First Projects',
        location: 'Tunis, Tunisia',
        description: 'Started with Laravel and Blade, then advanced to Livewire, Inertia, and Vue.js. Completed first freelance projects, learning project management and client communication.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'Blade', 'Vue.js', 'MySQL'],
        Icon: FaRocket,
        color: 'from-green-500 to-emerald-500',
        highlight: 'First freelance projects completed'
    },
    {
        year: '2021-2022',
        type: 'achievement',
        title: 'Mastered Modern Frameworks',
        company: 'Professional Development',
        location: 'Tunis, Tunisia',
        description: 'Expanded skills by learning Angular and React, then explored Node.js to become a versatile full-stack developer comfortable across multiple technology stacks.',
        technologies: ['React', 'Angular', 'Node.js', 'TypeScript', 'Express.js', 'MongoDB'],
        Icon: FaTrophy,
        color: 'from-orange-500 to-red-500',
        highlight: 'Became a true full-stack developer'
    },
    {
        year: '2023-2025',
        type: 'work',
        title: 'Full Stack Developer',
        company: 'Iberis',
        location: 'Lac1, Tunis',
        description: 'Migrated and enhanced UI/UX of Iberis online management platform. Integrated Vue.js with Laravel for improved invoicing, expense tracking, and client management systems.',
        technologies: ['Laravel', 'Vue.js', 'MySQL', 'Bootstrap', 'REST API', 'Git', 'Docker'],
        Icon: FaBriefcase,
        color: 'from-violet-500 to-purple-500',
        highlight: 'Led major platform migration'
    },
    {
        year: '2025',
        type: 'work',
        title: 'Full Stack Developer (Freelance)',
        company: 'Casagroup',
        location: 'Germany (Remote)',
        description: 'Built comprehensive home services platform with resource management, PDF generation with AWS S3, CV generation app with advanced search using Meilisearch, and planning management.',
        technologies: ['React', 'shadcn/ui', 'Tailwind CSS', 'Laravel', 'Node.js', 'AWS S3', 'Meilisearch'],
        Icon: FaBriefcase,
        color: 'from-cyan-500 to-blue-500',
        highlight: 'First international remote project'
    },
    {
        year: '2026',
        type: 'current',
        title: 'Full Stack Developer & Designer',
        company: 'Building the Future',
        location: 'Remote Worldwide',
        description: 'Creating modern full-stack applications with cutting-edge technologies. Open to exciting opportunities and collaborations that push the boundaries of web development.',
        technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Shadcn/ui'],
        Icon: FaRocket,
        color: 'from-pink-500 to-rose-500',
        highlight: '🚀 Ready for the next big challenge'
    }
];

// Timeline Component
export default function TimelineSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const scrolled = Math.max(0, window.innerHeight - rect.top);
                const height = rect.height + window.innerHeight;
                const progress = Math.min(100, (scrolled / height) * 100);
                setScrollProgress(progress);

                const itemHeight = height / timelineData.length;
                const currentIndex = Math.min(
                    timelineData.length - 1,
                    Math.floor(scrolled / itemHeight)
                );
                setActiveIndex(currentIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
            {/* Enhanced Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

                {/* Animated grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
                            Career Timeline
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                        My Journey
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        From biomedical engineering to full-stack development — a story of passion, learning, and continuous growth
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <span className="text-slate-500 text-sm">Progress</span>
                        <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 rounded-full"
                                style={{ width: `${scrollProgress}%` }}
                            />
                        </div>
                        <span className="text-cyan-400 text-sm font-medium">{Math.round(scrollProgress)}%</span>
                    </div>
                </div>

                <div ref={timelineRef} className="relative">
                    {/* Enhanced progress line with glow */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800/50">
                        <div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                            style={{ height: `${scrollProgress}%` }}
                        />
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-12 md:space-y-24">
                        {timelineData.map((item, index) => {
                            const Icon = item.Icon;
                            const isLeft = index % 2 === 0;
                            const isActive = index <= activeIndex;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Content card */}
                                    <div
                                        className={`w-full md:w-5/12 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                            } ${isHovered ? 'scale-105' : 'scale-100'}`}
                                    >
                                        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group">
                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>

                                            {/* Year badge with enhanced styling */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold shadow-lg`}>
                                                    {item.year}
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.type === 'education' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                        item.type === 'work' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                                            item.type === 'milestone' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                                item.type === 'achievement' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                                    'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                    }`}>
                                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                                </div>
                                            </div>

                                            {/* Title with gradient on hover */}
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                                <FaBriefcase className="w-4 h-4" />
                                                <span className="font-medium">{item.company}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-slate-500 mb-4">
                                                <FaMapMarkerAlt className="w-4 h-4" />
                                                <span className="text-sm">{item.location}</span>
                                            </div>

                                            {/* Highlight badge */}
                                            {item.highlight && (
                                                <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
                                                    <p className="text-cyan-300 text-sm font-medium">{item.highlight}</p>
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="text-slate-300 leading-relaxed mb-4">
                                                {item.description}
                                            </p>

                                            {/* Technologies with improved styling */}
                                            <div className="flex flex-wrap gap-2">
                                                {item.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-full border border-slate-600 hover:border-cyan-500/50 hover:bg-slate-700 transition-all duration-200 cursor-default"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced center icon with animated ring */}
                                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10 my-8 md:my-0">
                                        <div
                                            className={`transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                                                }`}
                                        >
                                            <div className="relative">
                                                {/* Animated ring */}
                                                {isActive && (
                                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-30 animate-ping`}></div>
                                                )}
                                                {/* Icon container */}
                                                <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block w-5/12" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Enhanced end marker */}
                    <div className="relative mt-32 flex justify-center">
                        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2">
                            <div className="relative">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 animate-pulse shadow-lg shadow-cyan-500/50" />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 opacity-30 animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced CTA section */}
                <div className="text-center mt-40">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl opacity-30 animate-pulse"></div>
                        <h2 className="relative text-4xl font-bold text-white">
                            Ready to Write the Next Chapter?
                        </h2>
                    </div>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                        I&apos;m always excited about new opportunities and challenging projects that push boundaries
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/contact"
                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
                        >
                            <span className="relative z-10">Let&apos;s Talk</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link
                            href="/projects"
                            className="px-8 py-4 bg-slate-800 text-white rounded-full font-semibold border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            View Projects
                        </Link>
                    </div>

                    {/* Social proof */}
                    <div className="mt-12 flex items-center justify-center gap-8 text-slate-400">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{timelineData.length}</div>
                            <div className="text-sm">Milestones</div>
                        </div>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">5+</div>
                            <div className="text-sm">Years Journey</div>
                        </div>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">∞</div>
                            <div className="text-sm">Learning</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}