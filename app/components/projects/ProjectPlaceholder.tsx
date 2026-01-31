'use client';

import React from 'react';
import { FaClock } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';

interface ProjectPlaceholderProps {
    title: string;
    variant?: 'orange' | 'blue' | 'purple';
    className?: string;
}

const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({ title, variant = 'orange', className = '' }) => {
    const { language } = useLanguage();

    const t = {
        en: {
            badge: "Coming Soon",
            description: "This project is currently under active development. Stay tuned for technical details and the live demo!"
        },
        fr: {
            badge: "Bientôt Disponible",
            description: "Ce projet est actuellement en cours de développement. Restez à l'écoute pour les détails techniques et la démo en direct !"
        }
    }[language as 'en' | 'fr'] || {
        badge: "Coming Soon",
        description: "This project is currently under active development. Stay tuned for technical details and the live demo!"
    };

    const gradients = {
        orange: 'from-orange-500 via-red-500 to-rose-600',
        blue: 'from-blue-500 via-indigo-600 to-purple-700',
        purple: 'from-purple-500 via-fuchsia-600 to-pink-600',
    };

    return (
        <div className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br ${gradients[variant]} ${className}`}>
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative z-10 space-y-4 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30 mb-2">
                    <FaClock className="animate-pulse" />
                    <span>{t.badge}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                    {title}
                </h3>

                <p className="text-white/80 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                    {t.description}
                </p>

                <div className="pt-4">
                    <div className="w-12 h-1 bg-white/40 mx-auto rounded-full" />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
        </div>
    );
};

export default ProjectPlaceholder;
