'use client';
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";
import { FaArrowRight, FaRocket, FaExternalLinkAlt, FaGithub, FaStar, FaPlay } from "react-icons/fa";
import { useState } from "react";
import ProjectPlaceholder from "../projects/ProjectPlaceholder";
import { useLanguage } from "../../context/LanguageContext";
import { commonContent as enCommon } from "@/lib/data/en/common";
import { commonContent as frCommon } from "@/lib/data/fr/common";

export default function ProjectsHighlights() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { language } = useLanguage();
    const t = language === 'fr' ? frCommon : enCommon;
    const featuredProjects = getFeaturedProjects(language).sort((a, b) => (b.layoutPriority || 0) - (a.layoutPriority || 0));

    const containerVariants: Variants = {
        // ... (omitting unchanged variants)
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
                        <FaRocket className="text-xs" />
                        {t.sections.featuredWork}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {t.sections.projectsTitle}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.sections.projectsSubtitle}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-8 mb-12"
                >
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className={`group relative h-full ${project.layoutSpan === 2 ? 'md:col-span-2' :
                                project.layoutSpan === 3 ? 'md:col-span-2 lg:col-span-3' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl transition-all duration-500 ${hoveredIndex === index ? 'opacity-30 scale-105' : 'opacity-0'}`} />

                            {/* Card */}
                            <div className={`relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 h-full flex flex-col ${project.layoutSpan === 2 ? 'md:flex-row' : ''}`}>
                                {/* Image */}
                                <div className={`relative bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-800 overflow-hidden ${project.layoutSpan === 2 ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'}`}>
                                    {project.image ? (
                                        <>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes={project.layoutSpan === 2 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                                                priority={index < 3}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
                                                    <FaPlay className="text-white text-2xl" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <ProjectPlaceholder
                                            title={project.title}
                                            status={project.status}
                                            variant={index % 3 === 0 ? 'orange' : index % 3 === 1 ? 'blue' : 'purple'}
                                        />
                                    )}

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg animate-pulse">
                                            <FaStar className="text-xs animate-spin" style={{ animationDuration: '3s' }} />
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Title */}
                                    <div className="relative mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies?.slice(0, project.layoutSpan === 2 ? 6 : 3).map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                                                className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium transition-all duration-300 cursor-default"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                        {project.technologies?.length > (project.layoutSpan === 2 ? 6 : 3) && (
                                            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-600/50 transition-all cursor-default">
                                                +{project.technologies.length - (project.layoutSpan === 2 ? 6 : 3)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 overflow-hidden group/btn">
                                                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                                                <FaExternalLinkAlt className="text-xs relative z-10" />
                                                <span className="relative z-10">{t.sections.liveDemo}</span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-slate-900 dark:text-white text-sm font-semibold transition-all hover:scale-105 border border-slate-300 dark:border-slate-700 group/code">
                                                <FaGithub className="group-hover/code:rotate-12 transition-transform" />
                                                {t.sections.viewCode}
                                            </a>
                                        )}
                                        {!project.liveUrl && !project.githubUrl && (
                                            <Link href={`/projects/${project.id}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-slate-900 dark:text-white text-sm font-semibold transition-all hover:scale-105 group/details">
                                                {t.sections.viewDetails}
                                                <FaArrowRight className="text-xs group-hover/details:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Corner Gradients */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-700 ${hoveredIndex === index ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
                                <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full blur-2xl transition-all duration-700 ${hoveredIndex === index ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="text-center mt-16"
                >
                    <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-2xl group">
                        <span>{t.sections.viewAllProjects}</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-sm text-slate-500 mt-4">
                        {t.sections.projectsFooter}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}