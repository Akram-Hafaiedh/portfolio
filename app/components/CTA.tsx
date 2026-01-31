'use client';

import React from 'react';
import { Link } from '@/navigation';
import { FaCalendar, FaEnvelope, FaRocket, FaBriefcase, FaCode } from 'react-icons/fa';

interface CTAButton {
    label: string;
    href: string;
    type: 'primary' | 'secondary';
    icon?: 'calendar' | 'envelope' | 'code' | 'briefcase';
}

interface CTAProps {
    badge?: string;
    title: string;
    description: string;
    buttons: CTAButton[];
    variant?: 'default' | 'gradient';
    showIcon?: boolean;
}

const iconMap = {
    calendar: FaCalendar,
    envelope: FaEnvelope,
    code: FaCode,
    briefcase: FaBriefcase,
};

export default function CTA({
    badge,
    title,
    description,
    buttons,
    variant = 'default',
    showIcon = true
}: CTAProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800/50">
            <div className="max-w-4xl mx-auto">
                {variant === 'gradient' ? (
                    // Gradient variant (like original projects page)
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x" style={{ backgroundSize: '200% 200%' }} />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

                        <div className="relative p-12 lg:p-16 text-center">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                {title}
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                {buttons.map((button, index) => {
                                    const Icon = button.icon ? iconMap[button.icon] : null;

                                    if (button.type === 'primary') {
                                        return (
                                            <Link
                                                key={index}
                                                href={button.href}
                                                className="group relative inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                {Icon && <Icon className="relative group-hover:rotate-12 transition-transform" />}
                                                <span className="relative">{button.label}</span>
                                            </Link>
                                        );
                                    } else {
                                        return (
                                            <Link
                                                key={index}
                                                href={button.href}
                                                className="group inline-flex items-center justify-center gap-3 border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-5 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                                            >
                                                {Icon && <Icon className="group-hover:translate-x-1 transition-transform" />}
                                                {button.label}
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Default variant (like experience and contact pages)
                    <div className="text-center">
                        {badge && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500"></span>
                                </span>
                                {badge}
                            </div>
                        )}

                        {showIcon && (
                            <FaRocket className="text-5xl text-purple-500 dark:text-purple-400 mx-auto mb-6 animate-bounce" />
                        )}

                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            {title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {buttons.map((button, index) => {
                                const Icon = button.icon ? iconMap[button.icon] : null;

                                if (button.type === 'primary') {
                                    return (
                                        <Link
                                            key={index}
                                            href={button.href}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                                        >
                                            {Icon && <Icon />}
                                            {button.label}
                                        </Link>
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            href={button.href}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 text-slate-900 dark:text-white rounded-xl font-bold transition-all hover:scale-105"
                                        >
                                            {Icon && <Icon />}
                                            {button.label}
                                        </Link>
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}