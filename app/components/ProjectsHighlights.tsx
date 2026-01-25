'use client';
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";
import { FaArrowRight, FaRocket, FaExternalLinkAlt, FaGithub, FaStar, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { dictionary } from "@/lib/dictionary";

export default function ProjectsHighlights() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { language } = useLanguage();
    const t = dictionary[language];
    const featuredProjects = getFeaturedProjects(language);

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium mb-4">
                        <FaRocket className="text-xs" />
                        {t.sections.featuredWork}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        {t.sections.projectsTitle}
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t.sections.projectsSubtitle}
                    </p>
                </div>

                {/* Projects Grid with Interactive Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Animated Glow Effect */}
                            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl transition-all duration-500 ${hoveredIndex === index ? 'opacity-30 scale-105' : 'opacity-0'
                                }`} />

                            {/* Card Container */}
                            <div className="relative bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 h-full flex flex-col group-hover:translate-y-[-8px]">
                                {/* Project Image/Preview with Overlay */}
                                <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                                    {project.image ? (
                                        <>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                                            />
                                            {/* Interactive Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                                            {/* View Project Button on Hover */}
                                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                                }`}>
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                                                    <FaPlay className="text-white text-2xl" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-6xl opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                                                {index === 0 ? '💼' : index === 1 ? '📊' : '🚀'}
                                            </div>
                                        </div>
                                    )}

                                    {/* Featured Badge with Animation */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg animate-pulse">
                                            <FaStar className="text-xs animate-spin" style={{ animationDuration: '3s' }} />
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Title with Animated Underline */}
                                    <div className="relative mb-3">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-0'
                                            }`} />
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tech Stack with Stagger Animation */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies?.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 cursor-default"
                                                style={{
                                                    transitionDelay: hoveredIndex === index ? `${i * 50}ms` : '0ms',
                                                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(2px)'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies?.length > 3 && (
                                            <span className="px-3 py-1 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-xs font-medium hover:bg-slate-600/50 transition-all cursor-default">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons with Slide Animation */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 overflow-hidden group/btn"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                                                <FaExternalLinkAlt className="text-xs relative z-10" />
                                                <span className="relative z-10">Live Demo</span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 border border-slate-600 hover:border-slate-500"
                                            >
                                                <FaGithub className="group-hover:rotate-12 transition-transform" />
                                                Code
                                            </a>
                                        )}
                                        {!project.liveUrl && !project.githubUrl && (
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105"
                                            >
                                                View Details
                                                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Animated Corner Gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-700 ${hoveredIndex === index ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                                    }`} />

                                {/* Bottom Corner Accent */}
                                <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-2xl transition-all duration-700 ${hoveredIndex === index ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                                    }`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Simple CTA Section */}
                <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 border-2 border-slate-700 hover:border-purple-500 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-2xl group"
                    >
                        <span>{t.sections.viewAllProjects}</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-sm text-slate-500 mt-4">
                        {t.sections.projectsFooter}
                    </p>
                </div>
            </div>
        </section>
    );
}