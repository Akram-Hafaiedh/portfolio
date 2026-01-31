'use client';
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaCode, FaArrowRight, FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { homeContent as enContent } from "@/lib/data/en/home";
import { homeContent as frContent } from "@/lib/data/fr/home";

export default function About() {
    const { language } = useLanguage();
    const homeData = language === 'fr' ? frContent : enContent;
    const content = homeData.hero; // The about section data is nested in the hero content object in data/en/home.ts

    const icons = [FaCode, FaLightbulb, FaUsers, FaRocket];
    const values = content.values.map((val: any, index: number) => ({
        ...val,
        icon: icons[index]
    }));

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

    return (
        <div className="relative pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                        <FaCode className="text-xs" />
                        {content.aboutPreview.badge}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        {content.aboutPreview.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        {content.aboutPreview.description}
                    </p>
                </motion.div>

                {/* Values Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {values.map((value: any, index: number) => (
                        <motion.div key={index} variants={fadeInUp} className="group relative">
                            <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                            <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:border-transparent transition-all duration-300 h-full">
                                <div className={`w-12 h-12 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <value.icon className="text-xl" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{value.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                {content.aboutPreview.approach.title}
                            </h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                {content.aboutPreview.approach.description}
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 group">
                                {content.aboutPreview.approach.cta}
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {content.aboutPreview.traits.map((trait: any, index: number) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 10 }}
                                    className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <div className={`w-10 h-10 ${index === 0 ? 'bg-blue-500/10' : index === 1 ? 'bg-purple-500/10' : 'bg-green-500/10'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-2xl">{trait.emoji}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{trait.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{trait.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
