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
            className={`group bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 animate-slide-up overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 ${className}`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Project Image */}
            <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-300 z-10"></div>

                {showFeaturedBadge && project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <FaStar className="text-yellow-300" />
                            Featured
                        </span>
                    </div>
                )}

                {/* Project Type Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-slate-800/80 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {project.type}
                    </span>
                </div>

                {/* Use ProjectImage component */}
                <ProjectImage
                    project={project}
                    imageUrl={project.image}
                    compact={true}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Project Content */}
            <div className="p-6">
                <Link href={`/projects/${project.id}`}>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                        {project.title}
                    </h3>
                </Link>

                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.shortDescription || project.longDescription}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Role</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.role}</div>
                    </div>
                    <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Timeline</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{project.timeline}</div>
                    </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium">
                            +{project.technologies.length - 3} more
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex gap-3">
                        {project.liveUrl && project.liveUrl !== "#" ? (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                            >
                                <FaExternalLinkAlt />
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
                                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                            >
                                <FaGithub />
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
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}