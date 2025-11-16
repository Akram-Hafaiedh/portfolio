import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import { Project } from "@/lib/projects";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
    project: Project;
    index: number;
    showFeaturedBadge?: boolean;
    className?: string;
}

export default function ProjectCard({ project, index, showFeaturedBadge = true, className = "" }: ProjectCardProps) {
    return (
        <div
            className={`group relative animate-slide-up ${className}`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Electric glow effect (appears on hover) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500 animate-electric-pulse"></div>

            {/* Main card container */}
            <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-slate-200 dark:border-slate-700 group-hover:border-cyan-400 dark:group-hover:border-cyan-500">

                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-gradient-to-t group-hover:from-cyan-900/20 group-hover:via-transparent transition-all duration-300 z-10"></div>

                    {showFeaturedBadge && project.featured && (
                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg shadow-cyan-500/50 animate-glow">
                                <FaStar className="text-yellow-300 animate-pulse" />
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Project Type Badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <span className="bg-slate-800/90 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm group-hover:border-cyan-400/60 transition-colors">
                            {project.type}
                        </span>
                    </div>

                    {/* Use ProjectImage component */}
                    <ProjectImage
                        project={project}
                        imageUrl={project.image}
                        compact={true}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                {/* Project Content */}
                <div className="p-6 relative z-10">
                    <Link href={`/projects/${project.id}`}>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all cursor-pointer">
                            {project.title}
                        </h3>
                    </Link>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {project.shortDescription || project.longDescription}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-transparent group-hover:border-cyan-500/20 transition-colors">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Role</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.role}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-transparent group-hover:border-cyan-500/20 transition-colors">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Timeline</div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.timeline}</div>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-transparent group-hover:border-cyan-500/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-transparent group-hover:border-cyan-500/30 transition-all">
                                +{project.technologies.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700 group-hover:border-cyan-500/30 transition-colors">
                        <div className="flex gap-3">
                            {project.liveUrl && project.liveUrl !== "#" ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors text-sm font-medium group/link"
                                >
                                    <FaExternalLinkAlt className="group-hover/link:animate-bounce" />
                                    Live Demo
                                </a>
                            ) : (
                                <span className="flex items-center gap-2 text-slate-400 dark:text-slate-600 text-sm font-medium cursor-not-allowed">
                                    <FaExternalLinkAlt />
                                    No Demo
                                </span>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" ? (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-400 transition-colors text-sm font-medium group/link"
                                >
                                    <FaGithub className="group-hover/link:animate-spin-slow" />
                                    Code
                                </a>
                            ) : (
                                <span className="flex items-center gap-2 text-slate-400 dark:text-slate-600 text-sm font-medium cursor-not-allowed">
                                    <FaGithub />
                                    Private
                                </span>
                            )}
                        </div>

                        <Link
                            href={`/projects/${project.id}`}
                            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm font-medium transition-all hover:translate-x-1 inline-block"
                        >
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}