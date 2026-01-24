'use client';
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(progress, 100));

            // Show when scrolled more than 100px
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
            }`}>
            <div className="flex flex-col items-center gap-4">
                {/* Progress Circle */}
                <div className="relative w-16 h-16">
                    {/* Background Circle */}
                    <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-slate-700/50"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                            className="transition-all duration-300"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="50%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Percentage Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                            {Math.round(scrollProgress)}%
                        </span>
                    </div>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="group w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                </button>

                {/* Progress Bar (vertical) */}
                <div className="relative w-1 h-32 bg-slate-700/30 rounded-full overflow-hidden">
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                        style={{ height: `${scrollProgress}%` }}
                    />
                </div>

                {/* Section Indicators */}
                <div className="flex flex-col gap-3">
                    {['Hero', 'About', 'Experience', 'Projects', 'Contact'].map((section, i) => {
                        const sectionProgress = (i + 1) * 20;
                        const isActive = scrollProgress >= (i * 20) && scrollProgress < sectionProgress;
                        const isPassed = scrollProgress >= sectionProgress;

                        return (
                            <div key={section} className="relative group">
                                <div
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-150'
                                            : isPassed
                                                ? 'bg-purple-500 scale-100'
                                                : 'bg-slate-700 scale-100'
                                        }`}
                                />
                                {/* Tooltip */}
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg whitespace-nowrap text-xs text-white">
                                        {section}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}