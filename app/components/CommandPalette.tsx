'use client';

import React from 'react';
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
    Action,
    useRegisterActions
} from 'kbar';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getProjects } from '@/lib/projects';
import {
    FaSearch,
    FaBriefcase,
    FaCalendarAlt,
    FaHome,
    FaUser,
    FaEnvelope,
    FaMoon,
    FaLanguage,
    FaCode,
    FaArrowRight
} from 'react-icons/fa';

export default function CommandPalette({ children }: { children: React.ReactNode }) {
    const t = useTranslations('Common');
    const locale = useLocale();
    return (
        <KBarProvider key={locale}>
            <CommandPaletteActions />
            <KBarPortal>
                <KBarPositioner className="bg-slate-900/60 backdrop-blur-md z-[9999] p-4">
                    <KBarAnimator className="w-full max-w-[650px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-slate-800/50">
                        <div className="flex items-center px-6 py-5 border-b border-slate-200/50 dark:border-slate-800/50 group">
                            <FaSearch className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors mr-4" />
                            <KBarSearch
                                defaultPlaceholder={t('search.commandPlaceholder')}
                                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-xl font-medium tracking-tight"
                            />
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('search.esc')}</span>
                            </div>
                        </div>
                        <div className="max-h-[450px] overflow-y-auto hide-scrollbar">
                            <RenderResults />
                        </div>
                        <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                    <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↵</kbd>
                                    <span>{t('search.select')}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                    <div className="flex gap-0.5">
                                        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">↓</kbd>
                                    </div>
                                    <span>{t('search.navigate')}</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-blue-500 font-black uppercase tracking-widest animate-pulse">
                                {t('search.premium')}
                            </div>
                        </div>
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
}

function CommandPaletteActions() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations('Common');
    const projects = getProjects(locale as 'en' | 'fr');

    const actions: Action[] = [
        // Navigation
        {
            id: 'home',
            name: t('commandPalette.actions.home'),
            shortcut: ['h'],
            keywords: 'home index start',
            perform: () => router.push('/'),
            icon: <FaHome className="w-5 h-5" />,
            section: t('commandPalette.sections.navigation'),
        },
        {
            id: 'about',
            name: t('commandPalette.actions.about'),
            shortcut: ['a'],
            keywords: 'about biography me',
            perform: () => router.push('/about'),
            icon: <FaUser className="w-5 h-5" />,
            section: t('commandPalette.sections.navigation'),
        },
        {
            id: 'experience',
            name: t('commandPalette.actions.experience'),
            shortcut: ['e'],
            keywords: 'experience work job history resume',
            perform: () => router.push('/experience'),
            icon: <FaBriefcase className="w-5 h-5" />,
            section: t('commandPalette.sections.navigation'),
        },
        {
            id: 'booking',
            name: t('commandPalette.actions.booking'),
            shortcut: ['b'],
            keywords: 'book calendar meeting schedule call strategy',
            perform: () => router.push('/booking'),
            icon: <FaCalendarAlt className="w-5 h-5" />,
            section: t('commandPalette.sections.navigation'),
        },
        {
            id: 'contact',
            name: t('commandPalette.actions.contact'),
            shortcut: ['c'],
            keywords: 'contact email message hire',
            perform: () => router.push('/contact'),
            icon: <FaEnvelope className="w-5 h-5" />,
            section: t('commandPalette.sections.navigation'),
        },
        // Utilities
        {
            id: 'theme',
            name: t('commandPalette.actions.toggleTheme'),
            shortcut: ['t'],
            keywords: 'theme dark light mode color style',
            perform: () => {
                const isDark = document.documentElement.classList.contains('dark');
                if (isDark) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
            },
            icon: <FaMoon className="w-5 h-5" />,
            section: t('commandPalette.sections.preferences'),
        },
        {
            id: 'language',
            name: locale === 'fr' ? t('commandPalette.actions.changeToEnglish') : t('commandPalette.actions.passerEnFrancais'),
            shortcut: ['l'],
            keywords: 'language traduction translate english french',
            perform: () => router.replace(pathname, { locale: locale === 'en' ? 'fr' : 'en' }),
            icon: <FaLanguage className="w-5 h-5" />,
            section: t('commandPalette.sections.preferences'),
        },
        // Projects Search
        ...projects.map(project => ({
            id: `project-${project.id}`,
            name: project.title,
            keywords: `${project.title} ${project.type} ${project.technologies.join(' ')}`,
            perform: () => router.push(`/projects/${project.id}`),
            icon: <FaCode className="w-5 h-5" />,
            section: t('commandPalette.sections.projects'),
            subtitle: project.type
        }))
    ];

    useRegisterActions(actions, [pathname, locale]);

    return null;
}

function RenderResults() {
    const { results } = useMatches();
    const items = results;

    return (
        <KBarResults
            items={items}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-400/5 border-y border-slate-200/30 dark:border-slate-800/30 first:border-t-0">
                        {item}
                    </div>
                ) : (
                    <div
                        className={`px-6 py-4 flex items-center justify-between cursor-pointer relative group/item ${active
                            ? 'text-white'
                            : 'text-slate-600 dark:text-slate-300'
                            }`}
                    >
                        {active && (
                            <motion.div
                                layoutId="active-bar"
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 z-0 shadow-lg"
                                initial={false}
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        <div className="flex items-center gap-4 relative z-10 w-full">
                            <div className={`p-2 rounded-xl transition-transform duration-300 ${active ? 'bg-white/20 text-white rotate-12' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover/item:rotate-12 group-hover/item:text-blue-500'}`}>
                                {item.icon}
                            </div>
                            <div className="flex flex-col flex-1 truncate">
                                <span className="font-bold tracking-tight">{item.name}</span>
                                {item.subtitle && (
                                    <span className={`text-[10px] uppercase font-black tracking-widest opacity-60 ${active ? 'text-blue-100' : 'text-slate-500'}`}>
                                        {item.subtitle}
                                    </span>
                                )}
                            </div>

                            {item.shortcut?.length ? (
                                <div className="flex gap-1">
                                    {item.shortcut.map(sc => (
                                        <kbd key={sc} className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-colors ${active ? 'bg-white/20 text-white border border-white/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'}`}>
                                            {sc}
                                        </kbd>
                                    ))}
                                </div>
                            ) : (
                                <FaArrowRight className={`text-xs transition-all duration-300 ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                            )}
                        </div>
                    </div>
                )
            }
        />
    );
}
