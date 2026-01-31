'use client';

import { useMemo, useState, useRef } from 'react';
import { getProjects } from "@/lib/projects";
import HorizontalProjectGrid from "../components/projects/HorizontalProjectGrid";
import ScrollProgress from "../components/ScrollProgress";
import CTA from "../components/CTA";
import { useLanguage } from "@/app/context/LanguageContext";
import { useKBar } from 'kbar';
import { projectsPageContent as enContent } from "@/lib/data/en/projects";
import { projectsPageContent as frContent } from "@/lib/data/fr/projects";
import { FaRocket, FaCode, FaSearch, FaTimes, FaCheckCircle, FaClock } from 'react-icons/fa';

type FilterType = 'all' | 'SaaS' | 'Enterprise' | 'Mobile' | 'Personal';

export default function EnhancedProjectsPage() {
    const { language } = useLanguage();
    const { query } = useKBar();
    const content = language === 'fr' ? frContent : enContent;
    const projects = getProjects(language);

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    // We remove visibleProjects for horizontal scroll as we want to show all filtered
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredProjects = useMemo(() => {
        let filtered = projects;

        if (activeFilter !== 'all') {
            filtered = filtered.filter(p => {
                if (activeFilter === 'SaaS') return p.title.includes('Iberis') || p.title.includes('Marketplace');
                if (activeFilter === 'Enterprise') return p.company === 'Casa-Group (Germany)' || p.company === 'Next Consulting' && !p.title.includes('Marketplace');
                if (activeFilter === 'Mobile') return p.type === 'Mobile' || p.technologies.includes('React Native') || p.title.includes('Physiomedica');
                if (activeFilter === 'Personal') return p.company === 'Personal Project' || p.company === 'Freelance Project';
                return true;
            });
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.shortDescription?.toLowerCase().includes(query) ||
                p.longDescription.toLowerCase().includes(query) ||
                p.technologies.some(t => t.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [activeFilter, searchQuery, projects]);

    const filterButtons: { key: FilterType; label: string }[] = [
        { key: 'all', label: content.filters.all },
        { key: 'SaaS', label: content.filters.saas },
        { key: 'Enterprise', label: content.filters.enterprise },
        { key: 'Mobile', label: content.filters.mobile },
        { key: 'Personal', label: content.filters.personal },
    ];

    const completedCount = projects.filter(p => p.status === 'Completed').length;
    const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
    const totalTech = [...new Set(projects.flatMap(p => p.technologies))].length;

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen transition-colors duration-500">
            {/* Animated Background Grid - Light Mode */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Animated Background Grid - Dark Mode */}
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Floating Gradient Orbs */}
            <div className="block dark:hidden fixed top-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
            <div className="hidden dark:block fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />

            <ScrollProgress sections={['Projects', 'Portfolio', 'Explore', 'Connect']} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
                                <FaRocket className="text-xs" />
                                {projects.length} {content.hero.projectsCount}
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                    <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-x" style={{ backgroundSize: '200% 200%' }}>
                                        {content.hero.mainTitle}
                                    </span>
                                    <span className="block text-slate-900 dark:text-white mt-2 relative">
                                        {content.hero.mainTitleSecond}
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                                    </span>
                                </h1>

                                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    {content.hero.subtitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 font-semibold">{content.hero.subtitleHighlight1}</span> {content.hero.subtitleMiddle}{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 font-semibold">{content.hero.subtitleHighlight2}</span>
                                    {' '}{content.hero.subtitleEnd}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Overview Stats */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <FaCheckCircle className="text-2xl" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">{content.stats.completed}</h4>
                                <div className="text-4xl font-black text-slate-900 dark:text-white">{completedCount}</div>
                                <p className="text-sm text-slate-500 leading-relaxed">Projets livrés avec succès, incluant des architectures complexes et des déploiements critiques.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <FaClock className="text-2xl" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">{content.stats.inProgress}</h4>
                                <div className="text-4xl font-black text-slate-900 dark:text-white">{inProgressCount}</div>
                                <p className="text-sm text-slate-500 leading-relaxed">Développements actifs explorant de nouvelles frontières en IA, UX et performance cloud.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
                                    <FaCode className="text-2xl" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500">{content.stats.technologies}</h4>
                                <div className="text-4xl font-black text-slate-900 dark:text-white">{totalTech}+</div>
                                <p className="text-sm text-slate-500 leading-relaxed">Une maîtrise polyvalente des frameworks modernes pour des solutions robustes et évolutives.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refined Filter & Search Section */}
                <div className="px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                            {/* Filter Pills - Independent & Responsive Track */}
                            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar w-full lg:w-auto pb-4 lg:pb-0 scroll-smooth">
                                {filterButtons.map((button) => (
                                    <button
                                        key={button.key}
                                        onClick={() => setActiveFilter(button.key)}
                                        className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeFilter === button.key
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl shadow-slate-900/20 dark:shadow-white/10 scale-105'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {button.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search Input - Clean & Minimalist */}
                            <div className="relative w-full lg:w-96 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 focus-within:bg-white/80 dark:focus-within:bg-slate-900/80 focus-within:border-blue-500/30 focus-within:shadow-xl focus-within:shadow-blue-500/5">
                                    <div className="pl-5 text-slate-400">
                                        <FaSearch className="text-xs" />
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onClick={() => query.toggle()}
                                        placeholder={content.search.placeholder}
                                        className="w-full pl-4 pr-12 py-4 bg-transparent border-none outline-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 text-sm cursor-pointer"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Project Discovery */}
                <div className="py-20">
                    {filteredProjects.length > 0 ? (
                        <HorizontalProjectGrid projects={filteredProjects} />
                    ) : (
                        <div className="text-center py-32">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                                <FaSearch className="text-5xl text-slate-400 dark:text-slate-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{content.results.noProjects}</h3>
                            <button
                                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
                            >
                                {content.results.showAll}
                            </button>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <CTA
                    title={content.cta.title}
                    description={content.cta.description}
                    buttons={[
                        {
                            label: content.cta.bookCall,
                            href: '/booking',
                            type: 'primary',
                            icon: 'calendar'
                        },
                        {
                            label: content.cta.viewExperience,
                            href: '/experience',
                            type: 'secondary',
                            icon: 'briefcase'
                        }
                    ]}
                    variant="default"
                    showIcon={true}
                />
            </div>
        </div>
    );
}