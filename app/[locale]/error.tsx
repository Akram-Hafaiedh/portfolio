// app/error.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRedo, FaExclamationTriangle } from 'react-icons/fa';
import { useLocale } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const locale = useLocale();

    const content = {
        en: {
            title: "Something Went Wrong",
            description: "An unexpected error occurred. My automated sensors are already reporting this to me.",
            retry: "Try Again",
        },
        fr: {
            title: "Quelque chose s'est mal passé",
            description: "Une erreur inattendue s'est produite. Mes capteurs m'ont déjà signalé ce problème.",
            retry: "Réessayer",
        }
    };

    const t = content[locale as 'en' | 'fr'] || content.en;

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 relative overflow-hidden">
            <div className="relative z-10 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 text-5xl animate-pulse">
                        <FaExclamationTriangle />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        {t.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        {t.description}
                    </p>

                    <div className="pt-10">
                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            <FaRedo />
                            {t.retry}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
