import Link from "next/link";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaStar, FaPlay, FaArrowRight } from "react-icons/fa";
import { Project } from "@/lib/projects";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
    index: number;
    showFeaturedBadge?: boolean;
    className?: string;
}

export default function ProjectCard({ project, index, showFeaturedBadge = true, className = "" }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative animate-fade-in-up ${className}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl transition-all duration-500 ${isHovered ? 'opacity-30 scale-105' : 'opacity-0'}`} />

            {/* Card */}
            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 h-full flex flex-col group-hover:translate-y-[-8px]">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
                    {project.image ? (
                        <>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                                    <FaPlay className="text-white text-2xl" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-6xl opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                                {index % 3 === 0 ? '💼' : index % 3 === 1 ? '📊' : '🚀'}
                            </div>
                        </div>
                    )}

                    {/* Featured Badge */}
                    {showFeaturedBadge && project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg animate-pulse">
                            <FaStar className="text-xs animate-spin" style={{ animationDuration: '3s' }} />
                            Featured
                        </div>
                    )}

                    {/* Project Type Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 text-white rounded-full text-xs font-medium">
                            {project.type}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <div className="relative mb-3">
                        <Link href={`/projects/${project.id}`}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                                {project.title}
                            </h3>
                        </Link>
                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`} />
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                        {project.shortDescription || project.longDescription}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Role</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.role}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Timeline</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.timeline}</div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 cursor-default"
                                style={{
                                    transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
                                    transform: isHovered ? 'translateY(0)' : 'translateY(2px)'
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies?.length > 3 && (
                            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-600/50 transition-all cursor-default">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                        {project.liveUrl && project.liveUrl !== '#' ? (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 overflow-hidden group/btn"
                                aria-label={`View live demo of ${project.title}`}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                                <FaExternalLinkAlt className="text-xs relative z-10" />
                                <span className="relative z-10">Live Demo</span>
                            </a>
                        ) : project.githubUrl && project.githubUrl !== '#' ? (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-900 dark:text-white text-sm font-semibold transition-all hover:scale-105 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                            >
                                <FaGithub className="group-hover:rotate-12 transition-transform" />
                                Code
                            </a>
                        ) : (
                            <Link
                                href={`/projects/${project.id}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-900 dark:text-white text-sm font-semibold transition-all hover:scale-105"
                            >
                                View Details
                                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}

                        {project.githubUrl && project.githubUrl !== '#' && project.liveUrl && project.liveUrl !== '#' && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-900 dark:text-white text-sm font-semibold transition-all hover:scale-105 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                            >
                                <FaGithub className="group-hover:rotate-12 transition-transform" />
                                Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Corner Gradients */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
                <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-2xl transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
            </div>
        </div>
    );
}