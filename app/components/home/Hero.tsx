'use client';
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { getProjects } from '@/lib/projects';
import { FaEnvelope, FaCode, FaRocket, FaCalendar, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
    const t = useTranslations('Home');
    const locale = useLocale();
    const projectsCount = getProjects(locale as any).length;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any
            }
        }
    };

    const float: Variants = {
        animate: (custom: number = 0) => ({
            y: [0, -12, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as any,
                delay: custom
            }
        })
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut" as any
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:grid-cols-2 lg:px-8 py-20">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <motion.div
                        className="space-y-8 text-center lg:text-left"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500"></span>
                            </span>
                            {t('hero.badge')}
                        </motion.div>

                        {/* Heading */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                                <span className="block text-slate-900 dark:text-white">{t('hero.greeting')}</span>
                                <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    {t('hero.name')}
                                </span>
                            </h1>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">
                                {t('hero.role')}
                            </p>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0"
                        >
                            {t('hero.description')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/booking" className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 text-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">
                                    <FaCalendar />
                                    {t('hero.cta.book')}
                                </span>
                            </Link>

                            <Link href="/contact" className="group relative px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 rounded-xl font-bold text-slate-900 dark:text-white transition-all hover:scale-105 text-center">
                                <span className="relative flex items-center justify-center gap-2">
                                    <FaEnvelope />
                                    {t('hero.cta.contact')}
                                </span>
                            </Link>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div variants={fadeInUp} className="flex gap-4 justify-center lg:justify-start">
                            <Link href="/experience" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 group">
                                <FaRocket className="group-hover:rotate-12 transition-transform" />
                                <span className="border-b border-slate-400 dark:border-slate-600 group-hover:border-purple-600 dark:group-hover:border-purple-400">{t('hero.links.resume')}</span>
                            </Link>
                            <Link href="/projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                <FaCode className="group-hover:scale-110 transition-transform" />
                                <span className="border-b border-slate-400 dark:border-slate-600 group-hover:border-blue-600 dark:group-hover:border-blue-400">{t('hero.links.projects')}</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Card */}
                    <motion.div
                        className="relative"
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                    >
                        <div className="relative group">
                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity animate-pulse-slow" />

                            {/* Card */}
                            <div className="relative bg-slate-50 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6">
                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-75 animate-pulse-slow" />
                                        <Image src="/avatar.jpg" alt="Akram Hafaiedh" width={80} height={80} className="relative w-20 h-20 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('hero.name')}</h3>
                                        <p className="text-slate-600 dark:text-slate-400">{t('hero.role')}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <div className="text-center group-hover:scale-110 transition-transform">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('hero.stats.exp.value')}</div>
                                        <div className="text-xs text-slate-500">{t('hero.stats.exp.label')}</div>
                                    </div>
                                    <div className="text-center group-hover:scale-110 transition-transform duration-300">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {projectsCount}+
                                        </div>
                                        <div className="text-xs text-slate-500">{t('hero.stats.projects.label')}</div>
                                    </div>
                                    <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{t('hero.stats.satisfied.value')}</div>
                                        <div className="text-xs text-slate-500">{t('hero.stats.satisfied.label')}</div>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-3">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t('hero.techStack')}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript', 'TailwindCSS'].map((tech) => (
                                            <motion.span
                                                key={tech}
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                                                className="px-3 py-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 transition-colors"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <a href="https://github.com/Akram-Hafaiedh" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group">
                                        <FaGithub className="group-hover:scale-110 transition-transform" />
                                        <span className="text-sm">GitHub</span>
                                    </a>
                                    <a href="https://www.linkedin.com/in/akram-hafaiedh-368b3312b/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all group">
                                        <FaLinkedin className="group-hover:scale-110 transition-transform" />
                                        <span className="text-sm">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl flex items-center justify-center hidden sm:flex"
                            animate="animate"
                            custom={0}
                            variants={float}
                        >
                            <FaCode className="text-3xl text-blue-500 dark:text-blue-400" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl flex items-center justify-center hidden sm:flex"
                            animate="animate"
                            custom={1}
                            variants={float}
                        >
                            <FaRocket className="text-3xl text-purple-500 dark:text-purple-400" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center p-2">
                        <motion.div
                            className="w-1.5 h-3 bg-slate-500 rounded-full"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{t('hero.links.scroll')}</p>
                </div>
            </motion.div>
        </section>
    );
}
