'use client';

import { useState, useEffect } from 'react';
import { FaCode, FaStar, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Project } from '@/lib/projects';

interface FeaturedProjectsCarouselProps {
    projects: Project[];
    content?: {
        title?: string;
        description?: string;
    };
}

export default function FeaturedProjectsCarousel({ projects, content }: FeaturedProjectsCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredProjects = projects.filter(p => p.featured);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [featuredProjects.length]);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {content?.title || 'Featured Projects'}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        {content?.description || 'Highlighting my best work and achievements'}
                    </p>
                </div>

                <div className="relative group">
                    {/* Carousel Container with 3D perspective */}
                    <div className="relative overflow-hidden rounded-3xl" style={{ perspective: '1000px' }}>
                        {/* Background slides for parallax effect */}
                        <div className="absolute inset-0">
                            {featuredProjects.map((project, index) => (
                                <div
                                    key={`bg-${project.id}`}
                                    className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 blur-3xl`} />
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {featuredProjects.map((project) => (
                                    <div key={project.id} className="min-w-full px-4">
                                        <div className="relative h-[600px] rounded-2xl overflow-hidden group/card">
                                            {/* Adaptive base background - Clean gradients for both themes */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                                                {/* Light mode: Subtle diagonal stripes */}
                                                <div className="absolute inset-0 opacity-20 dark:opacity-0" style={{
                                                    backgroundImage: `repeating-linear-gradient(
                                                        45deg,
                                                        transparent,
                                                        transparent 35px,
                                                        rgba(100,116,139,0.03) 35px,
                                                        rgba(100,116,139,0.03) 70px
                                                    )`
                                                }} />

                                                {/* Dark mode: Diagonal stripes */}
                                                <div className="absolute inset-0 opacity-0 dark:opacity-10" style={{
                                                    backgroundImage: `repeating-linear-gradient(
                                                        45deg,
                                                        transparent,
                                                        transparent 35px,
                                                        rgba(255,255,255,0.05) 35px,
                                                        rgba(255,255,255,0.05) 70px
                                                    )`
                                                }} />

                                                {/* Dot pattern - adaptive opacity */}
                                                <div className="absolute inset-0 opacity-15 dark:opacity-5" style={{
                                                    backgroundImage: `radial-gradient(circle at center, rgb(100 116 139) 1px, transparent 1px)`,
                                                    backgroundSize: '40px 40px'
                                                }} />

                                                {/* Animated gradient orbs - adaptive opacity */}
                                                <div className={`absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-r ${project.gradient} rounded-full blur-3xl opacity-15 dark:opacity-30 animate-blob`} />
                                                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500 rounded-full blur-3xl opacity-10 dark:opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
                                                <div className="absolute top-1/2 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-rose-400 dark:from-pink-500 dark:to-rose-500 rounded-full blur-3xl opacity-8 dark:opacity-15 animate-blob" style={{ animationDelay: '4s' }} />
                                            </div>

                                            {/* Split layout: Image + Content */}
                                            <div className="relative h-full flex flex-col lg:flex-row">
                                                {/* Left side - Project Preview */}
                                                <div className="lg:w-1/2 p-8 flex items-center justify-center relative overflow-hidden">
                                                    {project.image ? (
                                                        <div className="relative w-full max-w-md group-hover/card:scale-105 transition-transform duration-700">
                                                            {/* Device frame mockup */}
                                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-slate-700 dark:border-slate-800">
                                                                <img
                                                                    src={project.image}
                                                                    alt={project.title}
                                                                    className="w-full h-auto"
                                                                />
                                                                {/* Screen glow effect */}
                                                                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover/card:opacity-20 transition-opacity duration-500`} />
                                                            </div>
                                                            {/* Floating elements */}
                                                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping" />
                                                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                                                        </div>
                                                    ) : (
                                                        <div className={`w-full max-w-md aspect-video bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center`}>
                                                            <FaCode className="text-8xl text-white/20" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right side - Project Details */}
                                                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                                                    {/* Badges */}
                                                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                                                        <span className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white backdrop-blur-sm rounded-full text-sm font-bold shadow-lg animate-fade-in-up`}>
                                                            <FaStar className="inline mr-1" />
                                                            Featured
                                                        </span>
                                                        <span className="px-4 py-2 bg-slate-200/80 dark:bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-700 dark:text-white border border-slate-300 dark:border-white/20">
                                                            {project.type}
                                                        </span>
                                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${project.status === 'Completed' ? 'bg-green-500/90 text-white' :
                                                                project.status === 'In Progress' ? 'bg-blue-500/90 text-white' :
                                                                    'bg-slate-500/90 text-white'
                                                            }`}>
                                                            {project.status}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
                                                        {project.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                                        {project.shortDescription || project.longDescription}
                                                    </p>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                                        <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10">
                                                            <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                                                {project.technologies.length}
                                                            </div>
                                                            <div className="text-xs text-slate-600 dark:text-slate-400">Technologies</div>
                                                        </div>
                                                        <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10">
                                                            <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                                                {project.features?.length || 0}
                                                            </div>
                                                            <div className="text-xs text-slate-600 dark:text-slate-400">Features</div>
                                                        </div>
                                                        <div className="text-center p-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-white/10">
                                                            <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                                                {project.timeline?.split(' ')[0] || '2024'}
                                                            </div>
                                                            <div className="text-xs text-slate-600 dark:text-slate-400">Year</div>
                                                        </div>
                                                    </div>

                                                    {/* Tech Stack Chips */}
                                                    <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                                        {project.technologies.slice(0, 4).map((tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white rounded-lg text-sm font-medium border border-slate-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 transition-all hover:scale-105 cursor-default"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.technologies.length > 4 && (
                                                            <span className="px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white rounded-lg text-sm font-medium border border-slate-200 dark:border-white/20">
                                                                +{project.technologies.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                                        {project.liveUrl && project.liveUrl !== '#' && (
                                                            <a
                                                                href={project.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-2xl relative overflow-hidden`}
                                                            >
                                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                                                                <FaExternalLinkAlt className="relative" />
                                                                <span className="relative">View Live</span>
                                                            </a>
                                                        )}
                                                        {project.githubUrl && project.githubUrl !== '#' && (
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-white/20 transition-all border border-slate-300 dark:border-white/20 hover:scale-105"
                                                            >
                                                                <FaGithub />
                                                                Source Code
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-300/50 dark:bg-white/10">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${project.gradient} transition-all duration-300`}
                                                    style={{
                                                        width: featuredProjects.indexOf(project) === currentSlide ? '100%' : '0%',
                                                        transition: featuredProjects.indexOf(project) === currentSlide ? 'width 5s linear' : 'width 0.3s'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {featuredProjects.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-slate-300 dark:border-white/20 hover:scale-110 shadow-lg"
                                >
                                    <FaChevronLeft className="text-xl" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-slate-300 dark:border-white/20 hover:scale-110 shadow-lg"
                                >
                                    <FaChevronRight className="text-xl" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Dots Indicator */}
                    {featuredProjects.length > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-8">
                            {featuredProjects.map((project, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`relative transition-all ${index === currentSlide ? 'w-12 h-3' : 'w-3 h-3 hover:w-6'
                                        }`}
                                >
                                    <div className={`absolute inset-0 rounded-full transition-all ${index === currentSlide
                                            ? `bg-gradient-to-r ${project.gradient}`
                                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                                        }`} />
                                    {index === currentSlide && (
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${project.gradient} blur-md opacity-50`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}