'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendarAlt, FaCode } from 'react-icons/fa';
import { Project } from '@/lib/projects';
import ProjectPlaceholder from './ProjectPlaceholder';

interface HorizontalProjectGridProps {
    projects: Project[];
}

const HorizontalProjectGrid: React.FC<HorizontalProjectGridProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 20);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            return () => container.removeEventListener('scroll', checkScroll);
        }
    }, [projects]);

    if (projects.length === 0) return null;

    return (
        <div className="relative group/grid pb-20">
            {/* Scrollable Container Wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Indication Shadows */}
                <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-20 pointer-events-none transition-opacity duration-500 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-20 pointer-events-none transition-opacity duration-500 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

                <div
                    ref={containerRef}
                    className="flex gap-8 overflow-x-auto hide-scrollbar scroll-smooth py-4"
                >
                    <AnimatePresence mode='popLayout'>
                        {projects.map((project, index) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="w-[320px] md:w-[450px] shrink-0 pb-12"
                            >
                                <Link href={`/projects/${project.id}`} className="block group/card">
                                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-500 group-hover/card:shadow-2xl group-hover/card:shadow-blue-500/10 group-hover/card:-translate-y-4">

                                        {/* Image/Placeholder with Parallax-like Zoom */}
                                        <div className="relative w-full h-[70%] overflow-hidden">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <ProjectPlaceholder
                                                    title={project.title}
                                                    variant={index % 3 === 0 ? 'orange' : index % 3 === 1 ? 'blue' : 'purple'}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />

                                            {/* Status Chip */}
                                            <div className="absolute top-6 left-6">
                                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 h-[30%] flex flex-col justify-center">
                                            <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                                                <FaCode />
                                                <span>{project.type}</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover/card:text-blue-500 transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                                                    <FaCalendarAlt />
                                                    <span>{project.company}</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/card:bg-blue-500 group-hover/card:text-white transition-all">
                                                    <FaArrowRight className="text-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Spacer for end scroll shadow */}
                    <div className="w-[1px] md:w-20 shrink-0" />
                </div>
            </div>

            {/* Hint for mobile */}
            <div className="text-center mt-4 md:hidden">
                <p className="text-slate-500 text-xs italic">Dégraissez pour en voir plus →</p>
            </div>
        </div>
    );
};

export default HorizontalProjectGrid;
