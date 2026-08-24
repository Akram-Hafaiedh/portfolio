// app/[locale]/blog/articles/page.tsx
'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getBlogPosts, getCategories } from '@/lib/blog';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaFolderOpen,
    FaArrowLeft,
    FaChevronLeft,
    FaChevronRight,
    FaThList,
    FaThLarge,
    FaTimes,
    FaSortAmountDown,
    FaLayerGroup,
    FaFilter
} from 'react-icons/fa';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import BlogCoverImage from '@/app/components/blog/BlogCoverImage';

const POSTS_PER_PAGE = 6;

type SortOption = 'latest' | 'oldest' | 'readTimeAsc' | 'readTimeDesc';

function AllArticlesContent() {
    const locale = useLocale();
    const t = useTranslations('Common');
    const posts = getBlogPosts(locale as 'en' | 'fr');
    const categories = getCategories(locale as 'en' | 'fr');

    const searchParams = useSearchParams();
    const searchParamValue = searchParams.get('search') || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<SortOption>('latest');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    // Sync search query from URL parameters
    useEffect(() => {
        if (searchParamValue) {
            if (searchParamValue.startsWith('#')) {
                const tag = searchParamValue.substring(1);
                if (!selectedTags.includes(tag)) {
                    setSelectedTags((prev) => [...prev, tag]);
                }
            } else {
                setSearchQuery(searchParamValue);
            }
        }
    }, [searchParamValue]);

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedTags, sortOption]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedTags([]);
        setSortOption('latest');
    };

    // Live Category Counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: posts.length };
        posts.forEach((p) => {
            const cat = p.category.toLowerCase();
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [posts]);

    // Extract all unique tags with counts
    const allTagsWithCounts = useMemo(() => {
        const map: Record<string, number> = {};
        posts.forEach((p) => {
            p.tags.forEach((tag) => {
                map[tag] = (map[tag] || 0) + 1;
            });
        });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
    }, [posts]);

    // Filter & Sort posts
    const filteredPosts = useMemo(() => {
        const cleanQuery = searchQuery.trim().toLowerCase();

        let result = posts.filter((post) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                post.category.toLowerCase() === selectedCategory.toLowerCase();

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((selTag) =>
                    post.tags.some((t) => t.toLowerCase() === selTag.toLowerCase())
                );

            const matchesSearch =
                !cleanQuery ||
                post.title.toLowerCase().includes(cleanQuery) ||
                post.excerpt.toLowerCase().includes(cleanQuery) ||
                post.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));

            return matchesCategory && matchesTags && matchesSearch;
        });

        // Apply Sorting
        result = [...result].sort((a, b) => {
            if (sortOption === 'latest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            if (sortOption === 'oldest') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            const readA = parseInt(a.readTime) || 5;
            const readB = parseInt(b.readTime) || 5;
            if (sortOption === 'readTimeAsc') {
                return readA - readB;
            }
            if (sortOption === 'readTimeDesc') {
                return readB - readA;
            }
            return 0;
        });

        return result;
    }, [posts, selectedCategory, selectedTags, searchQuery, sortOption]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen pt-32 pb-24 transition-colors duration-500">
            {/* Background grids */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Navigation Back Link */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <FaArrowLeft size={10} />
                        Back to Blog Overview
                    </Link>
                </div>

                {/* Hero Head */}
                <div className="text-center max-w-4xl mx-auto mb-14 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium animate-fade-in-up">
                        <FaThList className="text-xs" />
                        Full Articles Catalog ({posts.length} Total)
                    </div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                        >
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Engineering Articles Catalog
                            </span>
                            <span className="block text-slate-900 dark:text-white mt-2 relative">
                                System Architecture & Technical Tutorials
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed pt-2"
                        >
                            Explore the complete catalog of production case studies, system architecture guides, and technical tutorials.
                        </motion.p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="space-y-6 mb-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Category Pills with Live Counts */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedCategory === 'all'
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/30'
                                    }`}
                            >
                                <span>{t('blog.categories.all')}</span>
                                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-mono">
                                    {categoryCounts.all || 0}
                                </span>
                            </button>
                            {categories.map((cat) => {
                                const catLower = cat.toLowerCase();
                                const count = categoryCounts[catLower] || 0;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedCategory.toLowerCase() === catLower
                                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/30'
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-mono">
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Field */}
                        <div className="relative w-full md:w-80">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t('blog.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl outline-none text-sm text-slate-900 dark:text-white transition-all placeholder-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    {/* Tag Filter Chips Bar */}
                    <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1">
                            <FaFilter size={10} />
                            Filter Tags:
                        </span>
                        {allTagsWithCounts.map(([tag, count]) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 border ${isSelected
                                        ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-105'
                                        : 'bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200/40 dark:border-slate-700/40 hover:border-blue-500/50'
                                        }`}
                                >
                                    <span>#{tag}</span>
                                    <span className="text-[10px] opacity-75 font-mono">({count})</span>
                                    {isSelected && <FaTimes size={10} className="ml-0.5" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Filter Chips & Clear All */}
                    {(selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery !== '' || sortOption !== 'latest') && (
                        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-200/20 dark:border-slate-800/20">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-slate-400 font-medium">Active Filters:</span>
                                {selectedCategory !== 'all' && (
                                    <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg font-bold uppercase text-[10px] flex items-center gap-1">
                                        Category: {selectedCategory}
                                        <FaTimes size={10} className="cursor-pointer" onClick={() => setSelectedCategory('all')} />
                                    </span>
                                )}
                                {selectedTags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg font-bold uppercase text-[10px] flex items-center gap-1">
                                        #{tag}
                                        <FaTimes size={10} className="cursor-pointer" onClick={() => toggleTag(tag)} />
                                    </span>
                                ))}
                                {searchQuery && (
                                    <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg font-bold text-[10px] flex items-center gap-1">
                                        Query: "{searchQuery}"
                                        <FaTimes size={10} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={clearAllFilters}
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Catalog Controls Header (Sorting + View Switcher) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 px-2">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Showing {filteredPosts.length > 0 ? (currentPage - 1) * POSTS_PER_PAGE + 1 : 0} - {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} Articles
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Sorting Selector */}
                        <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                            <FaSortAmountDown size={12} className="text-blue-500" />
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="bg-transparent text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                            >
                                <option value="latest">Latest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="readTimeAsc">Shortest Read</option>
                                <option value="readTimeDesc">Deep Dives</option>
                            </select>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-300/30 dark:border-slate-700/30">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                title="Detailed List View"
                            >
                                <FaThList size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                title="Grid Card View"
                            >
                                <FaThLarge size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Articles Rendering */}
                {paginatedPosts.length > 0 ? (
                    <>
                        {viewMode === 'list' ? (
                            /* Horizontal Detailed List Layout */
                            <div className="space-y-6 mb-16">
                                {paginatedPosts.map((post) => (
                                    <motion.article
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                                    >
                                        {/* Image Thumbnail */}
                                        <div className="md:col-span-4 relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-inner">
                                            <BlogCoverImage
                                                src={post.image}
                                                alt={post.title}
                                                category={post.category}
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg text-[9px] uppercase font-black tracking-widest text-blue-400 border border-white/5 z-10">
                                                {post.category}
                                            </div>
                                        </div>

                                        {/* Content Block */}
                                        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                                            <div className="space-y-3">
                                                <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
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
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold lowercase tracking-normal">
                                                                <FaLayerGroup size={9} />
                                                                part {post.series.part}/{post.series.totalParts} ({post.series.title})
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </h2>

                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {post.tags.map(tag => (
                                                        <button
                                                            key={tag}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSearchQuery(`#${tag}`);
                                                            }}
                                                            className="px-2.5 py-1 bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                                                        >
                                                            #{tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                                                        <Image
                                                            src={post.author.avatar}
                                                            alt={post.author.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-900 dark:text-white">{post.author.name}</div>
                                                        <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{post.author.role}</div>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                                >
                                                    Read Article
                                                    <FaArrowRight size={10} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        ) : (
                            /* Compact Grid View Layout */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                {paginatedPosts.map((post) => (
                                    <motion.article
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                    >
                                        <div className="space-y-4">
                                            <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-inner mb-4">
                                                <BlogCoverImage
                                                    src={post.image}
                                                    alt={post.title}
                                                    category={post.category}
                                                />
                                                <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg text-[9px] uppercase font-black tracking-widest text-blue-400 border border-white/5 z-10">
                                                    {post.category}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt size={8} />
                                                    {post.date}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <FaClock size={8} />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                                <Link href={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h3>

                                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setSearchQuery(`#${tag}`);
                                                        }}
                                                        className="px-2 py-0.5 bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 rounded-md text-[10px] font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                                                    <Image
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{post.author.name}</span>
                                            </div>

                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 inline-flex items-center gap-1"
                                            >
                                                Read
                                                <FaArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-3 pt-4">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <FaChevronLeft size={12} />
                                </button>

                                <span className="text-xs font-black uppercase tracking-widest text-slate-500 px-4">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <FaChevronRight size={12} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
                            <FaFolderOpen size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('blog.noPosts')}</h3>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ArticlesListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        }>
            <AllArticlesContent />
        </Suspense>
    );
}
