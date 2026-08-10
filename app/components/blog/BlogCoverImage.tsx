// app/components/blog/BlogCoverImage.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaCode, FaDatabase, FaShieldAlt, FaServer, FaChartLine, FaLayerGroup } from 'react-icons/fa';

interface BlogCoverImageProps {
    src?: string;
    alt: string;
    category?: string;
    className?: string;
    priority?: boolean;
}

const CATEGORY_STYLES: Record<string, { bg: string; icon: React.ComponentType<{ size?: number; className?: string }>; accent: string }> = {
    Architecture: {
        bg: 'from-blue-950 via-slate-900 to-indigo-950',
        icon: FaServer,
        accent: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    Backend: {
        bg: 'from-slate-950 via-zinc-900 to-slate-900',
        icon: FaCode,
        accent: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    },
    Frontend: {
        bg: 'from-indigo-950 via-purple-950 to-slate-950',
        icon: FaLayerGroup,
        accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    Security: {
        bg: 'from-slate-950 via-indigo-950 to-purple-950',
        icon: FaShieldAlt,
        accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    Fintech: {
        bg: 'from-slate-950 via-blue-950 to-emerald-950',
        icon: FaChartLine,
        accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    Database: {
        bg: 'from-slate-950 via-slate-900 to-cyan-950',
        icon: FaDatabase,
        accent: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
};

export default function BlogCoverImage({
    src,
    alt,
    category = 'Architecture',
    className = '',
    priority = false,
}: BlogCoverImageProps) {
    const [imageError, setImageError] = useState(false);

    const categoryConfig = CATEGORY_STYLES[category] || CATEGORY_STYLES.Architecture;
    const IconComponent = categoryConfig.icon;

    if (src && !imageError) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover ${className}`}
                priority={priority}
                onError={() => setImageError(true)}
            />
        );
    }

    // Dynamic Gradient Fallback Banner
    return (
        <div className={`w-full h-full bg-gradient-to-br ${categoryConfig.bg} relative overflow-hidden flex items-center justify-center p-6 border border-white/10 ${className}`}>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

            {/* Glowing Accent Orb */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Center Content Badge */}
            <div className="relative z-10 text-center flex flex-col items-center gap-3">
                <div className={`p-4 rounded-2xl border backdrop-blur-md ${categoryConfig.accent} shadow-2xl`}>
                    <IconComponent size={28} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-300 bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10">
                    {category} Case Study
                </span>
            </div>
        </div>
    );
}
