'use client';

import {
    SiReact, SiNodedotjs, SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiGit,
    SiVuedotjs, SiLaravel, SiDjango, SiPhp, SiPython, SiNextdotjs, SiAngular, SiTailwindcss,
    SiBootstrap, SiMysql, SiRedis, SiAmazon, SiVercel, SiGithub, SiFigma, SiAdobexd,
    SiJira, SiTrello, SiSlack, SiWordpress, SiShopify, SiStripe, SiPaypal, SiFirebase,
    SiGraphql, SiWebpack, SiBabel, SiEslint, SiJest, SiCypress, SiSelenium,
    SiFlutter,
    SiIonic
} from "react-icons/si";
import { FaMobile, FaDatabase, FaServer, FaCloud, FaTools, FaCode } from "react-icons/fa";
import { skillsData } from "@/lib/skills";
import { motion, Variants } from "framer-motion";

interface IconMap {
    [key: string]: typeof FaCode;
}

const iconMap: IconMap = {
    FaCode: FaCode,
    FaServer: FaServer,
    FaDatabase: FaDatabase,
    FaMobile: FaMobile,
    FaCloud: FaCloud,
    FaTools: FaTools,
    SiReact: SiReact,
    SiVuedotjs: SiVuedotjs,
    SiAngular: SiAngular,
    SiNextdotjs: SiNextdotjs,
    SiJavascript: SiJavascript,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
    SiBootstrap: SiBootstrap,
    SiNodedotjs: SiNodedotjs,
    SiLaravel: SiLaravel,
    SiDjango: SiDjango,
    SiPhp: SiPhp,
    SiPython: SiPython,
    SiGraphql: SiGraphql,
    SiMysql: SiMysql,
    SiPostgresql: SiPostgresql,
    SiMongodb: SiMongodb,
    SiRedis: SiRedis,
    SiFirebase: SiFirebase,
    SiIonic: SiIonic,
    SiFlutter: SiFlutter,
    SiGit: SiGit,
    SiDocker: SiDocker,
    SiAmazon: SiAmazon,
    SiVercel: SiVercel,
    SiGithub: SiGithub,
    SiWebpack: SiWebpack,
    SiBabel: SiBabel,
    SiEslint: SiEslint,
    SiJest: SiJest,
    SiCypress: SiCypress,
    SiSelenium: SiSelenium,
    SiFigma: SiFigma,
    SiAdobexd: SiAdobexd,
    SiJira: SiJira,
    SiTrello: SiTrello,
    SiSlack: SiSlack,
    SiWordpress: SiWordpress,
    SiShopify: SiShopify,
    SiStripe: SiStripe,
    SiPaypal: SiPaypal,
};

export default function AllSkills() {
    const skillCategories = skillsData;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12"
                >
                    Skills & Technologies
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skillCategories.map((category, categoryIndex) => {
                        const IconComponent = iconMap[category.icon];
                        return (
                            <motion.div
                                key={categoryIndex}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {category.skills.map((skill, skillIndex) => {
                                        const SkillIcon = iconMap[skill.icon] || FaCode;
                                        return (
                                            <motion.div
                                                key={skillIndex}
                                                whileHover={{ x: 3 }}
                                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors group/skill cursor-default"
                                            >
                                                <div className={`${skill.color} group-hover/skill:scale-110 transition-transform duration-200`}>
                                                    <SkillIcon />
                                                </div>
                                                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                                    {skill.name}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Additional Skills Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-900/30 p-10 rounded-2xl"
                >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center uppercase tracking-widest">
                        Additional Expertise
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { emoji: '🚀', label: 'Performance Optimization' },
                            { emoji: '🔒', label: 'Security Best Practices' },
                            { emoji: '📱', label: 'Mobile-First Design' },
                            { emoji: '⚡', label: 'API Development' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="text-3xl mb-3">{item.emoji}</div>
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}