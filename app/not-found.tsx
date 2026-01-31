// app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { useLanguage } from './context/LanguageContext';

export default function NotFound() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Lost in the Digital Void?",
            description: "The page you're looking for has vanished or never existed in this dimension.",
            backHome: "Back to Home",
        },
        fr: {
            title: "Perdu dans le Vide Numérique ?",
            description: "La page que vous recherchez a disparu ou n'a jamais existé dans cette dimension.",
            backHome: "Retour à l'Accueil",
        }
    };

    const t = content[language as 'en' | 'fr'] || content.en;

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 relative overflow-hidden">
            {/* Background Grids */}
            <div className="block dark:hidden absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="hidden dark:block absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="text-[12rem] md:text-[16rem] font-black leading-none bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent opacity-20 dark:opacity-40 select-none">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        {t.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        {t.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            <FaHome />
                            {t.backHome}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
