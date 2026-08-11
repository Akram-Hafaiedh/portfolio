// app/components/blog/BlogCoverImage.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    FaServer,
    FaCode,
    FaLayerGroup,
    FaShieldAlt,
    FaChartLine,
    FaDatabase,
    FaTerminal,
    FaMicrochip,
    FaNetworkWired
} from 'react-icons/fa';

interface BlogCoverImageProps {
    src?: string;
    alt: string;
    category?: string;
    className?: string;
    priority?: boolean;
}

const CATEGORY_VECTOR_THEMES: Record<string, {
    glowColor: string;
    accentBorder: string;
    badgeBg: string;
    badgeText: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    codePrefix: string;
    techPills: string[];
}> = {
    Architecture: {
        glowColor: 'from-blue-600/20 via-indigo-600/10 to-transparent',
        accentBorder: 'border-blue-500/30',
        badgeBg: 'bg-blue-500/10 border-blue-500/20',
        badgeText: 'text-blue-400',
        icon: FaServer,
        codePrefix: '// SYSTEM ARCHITECTURE PATTERN',
        techPills: ['LARAVEL', 'REDIS', 'MULTI-TENANT'],
    },
    Backend: {
        glowColor: 'from-amber-600/20 via-orange-600/10 to-transparent',
        accentBorder: 'border-amber-500/30',
        badgeBg: 'bg-amber-500/10 border-amber-500/20',
        badgeText: 'text-amber-400',
        icon: FaCode,
        codePrefix: '// BACKEND & PIPELINE ENGINEERING',
        techPills: ['PHP 8.3', 'QUEUES', 'PARALLEL WORKERS'],
    },
    Frontend: {
        glowColor: 'from-cyan-600/20 via-blue-600/10 to-transparent',
        accentBorder: 'border-cyan-500/30',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
        badgeText: 'text-cyan-400',
        icon: FaLayerGroup,
        codePrefix: '// FRONTEND & UI RENDERING',
        techPills: ['VUE 3', 'NEXT.JS 15', 'TAILWIND'],
    },
    Security: {
        glowColor: 'from-emerald-600/20 via-teal-600/10 to-transparent',
        accentBorder: 'border-emerald-500/30',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
        badgeText: 'text-emerald-400',
        icon: FaShieldAlt,
        codePrefix: '// SECURITY & AUTHORIZATION',
        techPills: ['RBAC', 'OAUTH 2.0', 'SESSION SYNC'],
    },
    Fintech: {
        glowColor: 'from-emerald-600/20 via-blue-600/10 to-transparent',
        accentBorder: 'border-emerald-500/30',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
        badgeText: 'text-emerald-400',
        icon: FaChartLine,
        codePrefix: '// FINTECH & BILLING ENGINE',
        techPills: ['STRIPE WEBHOOKS', 'ADD-ONS', 'PRORATION'],
    },
    Database: {
        glowColor: 'from-sky-600/20 via-indigo-600/10 to-transparent',
        accentBorder: 'border-sky-500/30',
        badgeBg: 'bg-sky-500/10 border-sky-500/20',
        badgeText: 'text-sky-400',
        icon: FaDatabase,
        codePrefix: '// DATABASE OPTIMIZATION',
        techPills: ['MYSQL 8', 'COMPOSITE INDEX', 'EXPLAIN'],
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

    // If an authentic static visual asset exists (like nextjs15-performance.png or calendar-booking.png) and is NOT an AI stock cover, use next/image
    const isAiGeneratedStock = src?.includes('/blog/covers/');

    if (src && !isAiGeneratedStock && !imageError) {
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

    // Vercel / Linear-Style Abstract Geometric Vector Banner
    const theme = CATEGORY_VECTOR_THEMES[category] || CATEGORY_VECTOR_THEMES.Architecture;
    const IconComponent = theme.icon;

    return (
        <div className={`w-full h-full bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 border border-slate-800/80 shadow-2xl ${className}`}>
            {/* Vercel 1px Grid Lines with Radial Mask */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Ambient Radial Spotlight */}
            <div className={`absolute inset-0 bg-radial ${theme.glowColor} pointer-events-none opacity-80`} />

            {/* Linear Vector Geometric Graphic Elements (Top-Right Accent) */}
            <div className="absolute -top-10 -right-10 w-64 h-64 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full stroke-slate-400 fill-none" strokeWidth="1">
                    <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="60" />
                    <circle cx="100" cy="100" r="40" strokeDasharray="2 2" />
                    <line x1="20" y1="100" x2="180" y2="100" />
                    <line x1="100" y1="20" x2="100" y2="180" />
                </svg>
            </div>

            {/* Top Bar: Monospaced Monochromatic Code Header */}
            <div className="relative z-10 flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-mono tracking-wider font-bold ${theme.badgeBg} ${theme.badgeText}`}>
                    <IconComponent size={12} />
                    {theme.codePrefix}
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PRODUCTION VERIFIED</span>
                </div>
            </div>

            {/* Center Typography & Vector Layout */}
            <div className="relative z-10 my-4 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    TECHNICAL CASE STUDY
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white line-clamp-2 leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    {alt}
                </h3>
            </div>

            {/* Bottom Bar: Tech Stack Pills & Decorative Vector Node */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/60">
                <div className="flex flex-wrap gap-2">
                    {theme.techPills.map((pill) => (
                        <span
                            key={pill}
                            className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] font-mono font-bold text-slate-300 tracking-wider"
                        >
                            {pill}
                        </span>
                    ))}
                </div>

                <div className="hidden sm:flex items-center gap-1 text-slate-600 text-xs font-mono">
                    <FaTerminal size={12} />
                    <span>bash</span>
                </div>
            </div>
        </div>
    );
}
