'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCode, FaExternalLinkAlt, FaGithub, FaStar } from 'react-icons/fa';
import { Project } from '@/lib/projects';
import ProjectPlaceholder from './ProjectPlaceholder';

interface ProjectHeroEditorialProps {
    projects: Project[];
    content: {
        title: string;
        description: string;
    };
}

const ProjectHeroEditorial: React.FC<ProjectHeroEditorialProps> = ({ projects, content }) => {
    const featuredProjects = projects.filter(p => p.featured);
    const [activeIndex, setActiveIndex] = useState(0);

    const currentProject = featuredProjects[activeIndex];

    if (!currentProject) return null;

    return (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 pt-10 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        {content.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {content.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-900 transition-colors duration-500">
                    {/* Left Side: Content (40%) */}
                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 relative bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">

                        <div className="absolute top-8 left-8">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-widest">
                                <FaStar className="animate-pulse" />
                                Spotlight
                            </div>
                        </div>

                        <div className="space-y-6 pt-8">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentProject.id}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.6,
                                                staggerChildren: 0.1,
                                                ease: [0.215, 0.610, 0.355, 1.000]
                                            }
                                        },
                                        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
                                    }}
                                    className="space-y-4"
                                >
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        className="flex items-center gap-3 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest"
                                    >
                                        <FaCode className="text-xs" />
                                        <span>{currentProject.type}</span>
                                    </motion.div>
                                    <motion.h3
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight"
                                    >
                                        {currentProject.title}
                                    </motion.h3>
                                    <motion.p
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 }
                                        }}
                                        className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                                    >
                                        {currentProject.shortDescription || currentProject.longDescription}
                                    </motion.p>
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1 }
                                        }}
                                        className="flex flex-wrap gap-2 pt-4"
                                    >
                                        {currentProject.technologies.slice(0, 4).map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                whileHover={{ y: -2, scale: 1.05 }}
                                                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-colors hover:border-blue-500/50"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <Link
                                href={`/projects/${currentProject.id}`}
                                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 dark:shadow-white/5"
                            >
                                Explorer le Projet <FaArrowRight />
                            </Link>
                        </div>

                        {/* Project Switcher Dots */}
                        <div className="flex gap-3 pt-8">
                            {featuredProjects.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`relative h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-12 bg-blue-500' : 'w-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                                    aria-label={`Go to featured project ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Immersive Media (60%) */}
                    <div className="lg:col-span-7 relative bg-slate-100 dark:bg-slate-800 min-h-[400px] lg:min-h-full overflow-hidden">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentProject.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                {currentProject.image ? (
                                    <>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="relative w-full h-full"
                                        >
                                            <Image
                                                src={currentProject.image}
                                                alt={currentProject.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </motion.div>
                                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-50/20 dark:to-slate-950/40 pointer-events-none" />
                                    </>
                                ) : (
                                    <ProjectPlaceholder
                                        title={currentProject.title}
                                        variant={activeIndex % 3 === 0 ? 'orange' : activeIndex % 3 === 1 ? 'blue' : 'purple'}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Status Overlay */}
                        <div className="absolute bottom-6 right-6">
                            <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl text-white text-xs font-bold uppercase tracking-widest shadow-2xl">
                                Statut: {currentProject.status}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ProjectHeroEditorial;
