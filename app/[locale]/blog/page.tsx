// app/[locale]/blog/page.tsx
'use client';

import { useMemo, useState, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getBlogPosts } from '@/lib/blog';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import {
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaLayerGroup,
    FaRocket,
    FaServer,
    FaShieldAlt,
    FaThList,
    FaBookOpen,
    FaCheckCircle,
    FaCompass
} from 'react-icons/fa';
import BlogCoverImage from '@/app/components/blog/BlogCoverImage';

function BlogHomeContent() {
    const locale = useLocale();
    const t = useTranslations('Common');
    const posts = getBlogPosts(locale as 'en' | 'fr');

    const [activeTab, setActiveTab] = useState<string>('all');

    // 3 Curated Engineering Series Data
    const curatedSeries = useMemo(() => {
        if (locale === 'fr') {
            return [
                {
                    id: "laravel-multi-tenancy",
                    title: "Masterclass Multi-Tenancy Laravel",
                    parts: 3,
                    category: "Architecture & Backend",
                    firstSlug: "laravel-global-scopes-multi-tenancy-isolation",
                    icon: FaServer,
                    description: "Isolation automatique des données par scopes globaux, indexation composite et persistance de session multi-entreprises."
                },
                {
                    id: "saas-monetization",
                    title: "Monétisation SaaS & Sécurité des Abonnements",
                    parts: 3,
                    category: "Sécurité & Fintech",
                    firstSlug: "rbac-collaborator-permissions-saas-subscription-feature-gating",
                    icon: FaShieldAlt,
                    description: "Permissions RBAC collaborateurs, verrouillage sur expiration d'abonnement, boucles OAuth et webhooks Stripe."
                },
                {
                    id: "realtime-performance",
                    title: "Systèmes Temps Réel & Streaming à Haute Échelle",
                    parts: 3,
                    category: "DevOps & Performance",
                    firstSlug: "realtime-websockets-laravel-echo-redis-stock-sync",
                    icon: FaRocket,
                    description: "WebSockets Laravel Echo + Redis pour la synchro de stock, exports streaming 100k lignes et workers Redis."
                }
            ];
        }

        return [
            {
                id: "laravel-multi-tenancy",
                title: "Laravel Multi-Tenancy Masterclass",
                parts: 3,
                category: "Architecture & Backend",
                firstSlug: "laravel-global-scopes-multi-tenancy-isolation",
                icon: FaServer,
                description: "Automated Global Scope data isolation, multi-tenant composite database indexing, and tenant context session state."
            },
            {
                id: "saas-monetization",
                title: "SaaS Monetization & Subscription Security",
                parts: 3,
                category: "Security & Fintech",
                firstSlug: "rbac-collaborator-permissions-saas-subscription-feature-gating",
                icon: FaShieldAlt,
                description: "Granular RBAC collaborator permissions, subscription expiration write-lockouts, OAuth loops, and Stripe webhook sync."
            },
            {
                id: "realtime-performance",
                title: "High-Scale Real-Time & Streaming Systems",
                parts: 3,
                category: "DevOps & Performance",
                firstSlug: "realtime-websockets-laravel-echo-redis-stock-sync",
                icon: FaRocket,
                description: "Laravel Echo + Redis WebSockets stock sync, memory-efficient 100k row CSV exports, and Redis queue workers."
            }
        ];
    }, [locale]);

    // Domain Ecosystem Tab Filters
    const domainFilteredPosts = useMemo(() => {
        if (activeTab === 'all') return posts.slice(0, 6);
        return posts
            .filter((p) => {
                const cat = p.category.toLowerCase();
                if (activeTab === 'architecture') return cat === 'architecture';
                if (activeTab === 'backend') return cat === 'backend' || cat === 'devops';
                if (activeTab === 'frontend') return cat === 'frontend' || cat === 'engineering';
                if (activeTab === 'security') return cat === 'security';
                return true;
            })
            .slice(0, 6);
    }, [posts, activeTab]);

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen pt-32 pb-24 transition-colors duration-500">
            {/* Background design grids */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
                {/* Section 1: Hero Header & Metrics Ticker */}
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Production-Verified Engineering & SaaS Insights
                    </div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white"
                        >
                            Engineering Insights &
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mt-1">
                                System Architecture
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
                        >
                            In-depth technical case studies on multi-tenancy isolation, high-scale Redis streaming, Next.js 15 performance, and subscription security.
                        </motion.p>
                    </div>

                    {/* Interactive Stats Ticker Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                        <div className="px-4 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-2">
                            <FaBookOpen className="text-indigo-500" />
                            <span>{posts.length} Production Case Studies</span>
                        </div>
                        <div className="px-4 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-2">
                            <FaLayerGroup className="text-purple-500" />
                            <span>3 Curated Engineering Series</span>
                        </div>
                        <div className="px-4 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex items-center gap-2">
                            <FaCheckCircle className="text-emerald-500" />
                            <span>100% Production Verified Code</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Curated Engineering Series Showcase ("Learning Paths") */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                                <FaLayerGroup size={14} />
                                Structured Learning Paths
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Curated Engineering Series
                            </h2>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                            Sequential multi-part series taking you from architectural concepts to production implementation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {curatedSeries.map((series) => {
                            const IconComponent = series.icon;
                            return (
                                <motion.div
                                    key={series.id}
                                    whileHover={{ y: -5 }}
                                    className="group flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:border-indigo-500/40 transition-all shadow-sm"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="p-3 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20 dark:border-indigo-500/30">
                                                <IconComponent size={20} />
                                            </div>
                                            <span className="px-3 py-1 bg-indigo-600/10 dark:bg-indigo-500/20 border border-indigo-600/20 dark:border-indigo-500/30 rounded-full text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                                                {series.parts} Parts
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 block mb-1">
                                                {series.category}
                                            </span>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                                                {series.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                            {series.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 mt-4 border-t border-slate-200/40 dark:border-slate-800/40">
                                        <Link
                                            href={`/blog/${series.firstSlug}`}
                                            className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 rounded-xl text-xs font-bold transition-all group-hover:shadow-md"
                                        >
                                            <span>Start Series (Part 1)</span>
                                            <FaArrowRight size={10} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Section 3: Domain Ecosystem Clusters (Tabbed Showcase) */}
                <section className="max-w-4xl mx-auto space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                                <FaCompass className="text-indigo-500" size={14} />
                                Explore by Architecture Domain
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Technical Deep Dives
                            </h2>
                        </div>

                        {/* Domain Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                            {[
                                { id: 'all', label: 'All Domains' },
                                { id: 'architecture', label: 'Architecture' },
                                { id: 'backend', label: 'Backend & Redis' },
                                { id: 'frontend', label: 'Next.js & Vue 3' },
                                { id: 'security', label: 'Security & Auth' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                                        activeTab === tab.id
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {domainFilteredPosts.map((post) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 hover:border-indigo-500/40 transition-all shadow-sm"
                            >
                                <div className="space-y-4">
                                    <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-inner">
                                        <BlogCoverImage
                                            src={post.image}
                                            alt={post.title}
                                            category={post.category}
                                        />
                                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg text-[9px] uppercase font-black tracking-widest text-indigo-400 border border-white/5 z-10">
                                            {post.category}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <FaCalendarAlt size={9} />
                                            {post.date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <FaClock size={9} />
                                            {post.readTime}
                                        </span>
                                        {post.series && (
                                            <>
                                                <span>•</span>
                                                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold lowercase">
                                                    Part {post.series.part}/{post.series.totalParts}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        By {post.author.name}
                                    </span>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                                    >
                                        <span>Read Article</span>
                                        <FaArrowRight size={10} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* Section 4: Full Catalog Search CTA Bar */}
                <section className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-indigo-500/20 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-lg text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-400/20">
                                <FaThList size={10} />
                                Full Engineering Catalogue
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                                Looking for a Specific Topic or Case Study?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                                Filter all 16+ production case studies by multi-tag selection, categories, or real-time search engine.
                            </p>
                        </div>

                        <Link
                            href="/blog/articles"
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-slate-900 hover:bg-indigo-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 shrink-0"
                        >
                            <span>Browse All Articles</span>
                            <FaArrowRight size={12} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function BlogHomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-500">Loading blog showcase...</div>}>
            <BlogHomeContent />
        </Suspense>
    );
}
