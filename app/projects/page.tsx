'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import ProjectCard from "../components/ProjectCard";
import ScrollProgress from "../components/ScrollProgress";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectsPageContent as enContent } from "@/lib/data/en/projectsPage";
import { projectsPageContent as frContent } from "@/lib/data/fr/projectsPage";
import { FaRocket, FaCode, FaSearch, FaTimes, FaChevronDown, FaGithub, FaExternalLinkAlt, FaCalendar, FaFilter, FaCheckCircle, FaClock, FaPause, FaBan, FaLightbulb, FaStar, FaTrophy, FaHeart } from 'react-icons/fa';

type FilterType = 'all' | 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Freelance';

export default function EnhancedProjectsPage() {
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;
    const projects = getProjects(language);

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredProjects = useMemo(() => {
        let filtered = projects;

        if (activeFilter !== 'all') {
            filtered = filtered.filter(p => p.type === activeFilter);
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

    const displayedProjects = filteredProjects.slice(0, visibleProjects);

    const filterButtons: { key: FilterType; label: string }[] = [
        { key: 'all', label: content.filters.all },
        { key: 'Full Stack', label: content.filters.fullStack },
        { key: 'Frontend', label: content.filters.frontend },
        { key: 'Backend', label: content.filters.backend },
        { key: 'Mobile', label: content.filters.mobile },
        { key: 'Freelance', label: content.filters.freelance },
    ];

    const completedCount = projects.filter(p => p.status === 'Completed').length;
    const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
    const totalTech = [...new Set(projects.flatMap(p => p.technologies))].length;
    const featuredCount = projects.filter(p => p.featured).length;

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen transition-colors duration-500">
            {/* Animated Background Grid - Light Mode */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Animated Background Grid - Dark Mode */}
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Floating Gradient Orbs - Light Mode */}
            <div className="block dark:hidden fixed top-10 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
            <div className="block dark:hidden fixed top-1/2 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="block dark:hidden fixed bottom-10 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Floating Gradient Orbs - Dark Mode */}
            <div className="hidden dark:block fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
            <div className="hidden dark:block fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="hidden dark:block fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Additional Subtle Orbs */}
            <div className="block dark:hidden fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />
            <div className="hidden dark:block fixed top-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />

            <ScrollProgress sections={['Projects', 'Portfolio', 'Explore', 'Connect']} />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Animated entrance content */}
                        <div className="space-y-8">
                            {/* Dynamic counter badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-fade-in-up">
                                <FaRocket className="text-xs" />
                                {projects.length} {content.hero.projectsCount}
                            </div>

                            {/* Main Title with typing effect feel */}
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

                            {/* Interactive Stats Dashboard */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                {[
                                    {
                                        icon: FaCheckCircle,
                                        value: completedCount,
                                        label: content.stats.completed,
                                        gradient: 'from-green-400 to-emerald-400',
                                        bgGradient: 'from-green-500/10 to-emerald-500/10',
                                        delay: '0s'
                                    },
                                    {
                                        icon: FaClock,
                                        value: inProgressCount,
                                        label: content.stats.inProgress,
                                        gradient: 'from-blue-400 to-cyan-400',
                                        bgGradient: 'from-blue-500/10 to-cyan-500/10',
                                        delay: '0.1s'
                                    },
                                    {
                                        icon: FaCode,
                                        value: `${totalTech}+`,
                                        label: content.stats.technologies,
                                        gradient: 'from-purple-400 to-pink-400',
                                        bgGradient: 'from-purple-500/10 to-pink-500/10',
                                        delay: '0.2s'
                                    },
                                    {
                                        icon: FaRocket,
                                        value: '5+',
                                        label: content.stats.experience,
                                        gradient: 'from-orange-400 to-red-400',
                                        bgGradient: 'from-orange-500/10 to-red-500/10',
                                        delay: '0.3s'
                                    }
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="group relative"
                                        style={{ animationDelay: stat.delay }}
                                    >
                                        {/* Glow effect */}
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

                                        {/* Card */}
                                        <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 text-center group-hover:scale-105 transition-transform">
                                            <stat.icon className={`text-2xl mx-auto mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Projects Highlight */}
                <div className="px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                                            <FaStar className="text-3xl text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                                {featuredCount} {content.featured?.title || 'Featured Projects'}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {content.featured?.description || 'Highlighting my best work and achievements'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-center px-6 py-3 bg-blue-500/10 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedCount}</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">Completed</div>
                                        </div>
                                        <div className="text-center px-6 py-3 bg-purple-500/10 rounded-xl">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{inProgressCount}</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">Active</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-6 backdrop-blur-2xl bg-white/80 dark:bg-slate-950/80 border-y border-slate-200/50 dark:border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                            {/* Search Bar */}
                            <div className="relative w-full lg:w-96 group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                <div className="relative">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={content.search.placeholder}
                                        className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                                    />
                                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${viewMode === 'grid'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    {content.search.grid}
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${viewMode === 'list'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    {content.search.list}
                                </button>
                            </div>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-3 mt-6 justify-center">
                            {filterButtons.map((button) => (
                                <button
                                    key={button.key}
                                    onClick={() => {
                                        setActiveFilter(button.key);
                                        setVisibleProjects(6);
                                    }}
                                    className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${activeFilter === button.key
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                                            : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 backdrop-blur-xl'
                                        }`}
                                >
                                    {activeFilter === button.key && (
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50" />
                                    )}
                                    <span className="relative">{button.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <div className="text-center mt-6">
                            <p className="text-slate-600 dark:text-slate-400">
                                {content.results.showing} <span className="font-bold text-slate-900 dark:text-white">{displayedProjects.length}</span> {content.results.of}{' '}
                                <span className="font-bold text-slate-900 dark:text-white">{filteredProjects.length}</span> {content.results.projects}
                                {activeFilter !== 'all' && <span className="text-blue-600 dark:text-blue-400"> {content.results.in} {activeFilter}</span>}
                                {searchQuery && <span className="text-purple-600 dark:text-purple-400"> {content.results.matching} "{searchQuery}"</span>}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-7xl mx-auto">
                        {displayedProjects.length > 0 ? (
                            <>
                                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
                                    {displayedProjects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={index}
                                            showFeaturedBadge={false}
                                        />
                                    ))}
                                </div>

                                {/* Load More */}
                                {filteredProjects.length > visibleProjects && (
                                    <div className="text-center mt-16">
                                        <button
                                            onClick={() => setVisibleProjects(prev => prev + 6)}
                                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75" />
                                            <span className="relative">{content.loadMore.button} ({filteredProjects.length - visibleProjects} {content.loadMore.remaining})</span>
                                            <FaChevronDown className="relative group-hover:translate-y-1 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-32">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-6">
                                    <FaSearch className="text-5xl text-slate-400 dark:text-slate-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{content.results.noProjects}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                                    {searchQuery ? `${content.results.noResults} "${searchQuery}"` : `${content.results.noType} ${activeFilter} ${content.results.available}`}
                                </p>
                                <button
                                    onClick={() => {
                                        setActiveFilter('all');
                                        setSearchQuery('');
                                    }}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
                                >
                                    {content.results.showAll}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x" style={{ backgroundSize: '200% 200%' }} />
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />

                            <div className="relative p-12 lg:p-16 text-center">
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                    {content.cta.title}
                                </h2>
                                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                                    {content.cta.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                    <Link
                                        href="/booking"
                                        className="group relative inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <FaCalendar className="relative group-hover:rotate-12 transition-transform" />
                                        <span className="relative">{content.cta.bookCall}</span>
                                    </Link>
                                    <Link
                                        href="/experience"
                                        className="group inline-flex items-center justify-center gap-3 border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-5 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                                    >
                                        {content.cta.viewExperience}
                                        <FaChevronDown className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}