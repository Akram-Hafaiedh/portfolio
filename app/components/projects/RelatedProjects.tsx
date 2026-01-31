'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCode } from 'react-icons/fa';
import { Project } from '@/lib/projects';
import { getRelatedProjects } from '@/lib/recommendations';
import { useLocale, useTranslations } from 'next-intl';

import ProjectPlaceholder from './ProjectPlaceholder';

interface RelatedProjectsProps {
    currentProject: Project;
}

export default function RelatedProjects({ currentProject }: RelatedProjectsProps) {
    const locale = useLocale();
    const t = useTranslations('ProjectDetails');
    const related = getRelatedProjects(currentProject, locale as 'en' | 'fr', 3);

    const getPlaceholderVariant = (index: number) => {
        const variants: ('orange' | 'blue' | 'purple')[] = ['orange', 'blue', 'purple'];
        return variants[index % variants.length];
    };

    if (related.length === 0) return null;

    return (
        <section className="py-20 border-t border-slate-200 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                            <FaCode className="text-xs" />
                            {t('sections.allProjects')}
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {t('sections.relatedProjects')}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {related.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <Link href={`/projects/${project.id}`} className="block">
                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-2">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <ProjectPlaceholder
                                            title={project.title}
                                            status={project.status}
                                            variant={getPlaceholderVariant(index)}
                                            compact={true}
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {project.image && (
                                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-bold text-lg">{project.title}</span>
                                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                                    <FaArrowRight className="text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Subtle Overlay Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-white/90 text-[9px] font-black uppercase tracking-widest border border-white/10">
                                            {project.type}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
