// app/[locale]/blog/page.tsx
'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getBlogPosts, getCategories } from '@/lib/blog';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaCalendarAlt, FaClock, FaFolderOpen, FaLayerGroup } from 'react-icons/fa';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import BlogCoverImage from '@/app/components/blog/BlogCoverImage';

function BlogListingContent() {
    const locale = useLocale();
    const t = useTranslations('Common');
    const posts = getBlogPosts(locale as 'en' | 'fr');
    const categories = getCategories(locale as 'en' | 'fr');

    const searchParams = useSearchParams();
    const searchParamValue = searchParams.get('search') || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Sync search query from URL parameters if redirected from tag links
    useEffect(() => {
        if (searchParamValue) {
            setSearchQuery(searchParamValue);
        }
    }, [searchParamValue]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        const cleanQuery = searchQuery.trim().startsWith('#')
            ? searchQuery.trim().substring(1)
            : searchQuery.trim();

        return posts.filter((post) => {
            const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                !cleanQuery ||
                post.title.toLowerCase().includes(cleanQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(cleanQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(cleanQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [posts, selectedCategory, searchQuery]);

    // Separate featured post (the latest post that has featured = true, or simply the first one)
    const featuredPost = useMemo(() => {
        return posts.find(p => p.featured) || posts[0];
    }, [posts]);

    // The rest of the posts
    const regularPosts = useMemo(() => {
        if (!featuredPost) return filteredPosts;
        return filteredPosts.filter(p => p.slug !== featuredPost.slug);
    }, [filteredPosts, featuredPost]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden min-h-screen pt-32 pb-24 transition-colors duration-500">
            {/* Background grids & orbs */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="block dark:hidden fixed top-1/4 right-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
            <div className="hidden dark:block fixed top-1/4 right-10 w-96 h-96 bg-blue-900/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none animate-delay-1000" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Head */}
                <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium animate-fade-in-up">
                        <FaFolderOpen className="text-xs" />
                        {posts.length} Technical Articles & Architecture Notes
                    </div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl sm:text-6xl font-black tracking-tight"
                        >
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                {t('blog.title')}
                            </span>
                            <span className="block text-slate-900 dark:text-white mt-2 relative">
                                Engineering & Architecture Insights
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed pt-2"
                        >
                            {t('blog.subtitle')}
                        </motion.p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl">
                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === 'all'
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/30'
                                }`}
                        >
                            {t('blog.categories.all')}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory.toLowerCase() === cat.toLowerCase()
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80 group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder={t('blog.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl outline-none text-sm text-slate-900 dark:text-white transition-all placeholder-slate-400 font-medium"
                        />
                    </div>
                </div>

                {/* Featured Post - Layout 1 */}
                {selectedCategory === 'all' && searchQuery === '' && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        className="mb-16 group"
                    >
                        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                            {/* Visual Display banner */}
                            <div className="lg:col-span-7 relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-inner">
                                <BlogCoverImage
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    category={featuredPost.category}
                                    priority
                                />
                                <div className="absolute top-4 left-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl text-[10px] uppercase font-black tracking-widest text-blue-400 border border-white/10 z-10">
                                    {t('blog.featured')}
                                </div>
                            </div>

                            {/* Details text */}
                            <div className="lg:col-span-5 flex flex-col justify-between py-2">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <FaCalendarAlt size={10} />
                                            {featuredPost.date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <FaClock size={10} />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                                        {featuredPost.excerpt}
                                    </p>

                                    {/* Clickable tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {featuredPost.tags.slice(0, 3).map(tag => (
                                            <button
                                                key={tag}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSearchQuery(`#${tag}`);
                                                }}
                                                className="px-3 py-1 bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-800/50 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                                            <Image
                                                src={featuredPost.author.avatar}
                                                alt={featuredPost.author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-900 dark:text-white">{featuredPost.author.name}</div>
                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">{featuredPost.author.role}</div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blog/${featuredPost.slug}`}
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:translate-x-1"
                                    >
                                        Read
                                        <FaArrowRight size={10} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Regular Articles Grid */}
                {filteredPosts.length > 0 ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {(selectedCategory === 'all' && searchQuery === '' ? regularPosts : filteredPosts).map((post) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 100 }}
                                    className="group flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                >
                                    <div className="space-y-4">
                                        {/* Image Display */}
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

                                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt size={8} />
                                                {post.date}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <FaClock size={8} />
                                                {post.readTime}
                                            </span>
                                            {post.series && (
                                                <>
                                                    <span>•</span>
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-mono font-bold lowercase tracking-normal">
                                                        <FaLayerGroup size={9} />
                                                        part {post.series.part}/{post.series.totalParts} ({post.series.title})
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>

                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Clickable tags on regular cards */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setSearchQuery(`#${tag}`);
                                                    }}
                                                    className="px-2.5 py-0.5 bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 rounded-lg text-[10px] font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
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
                        </motion.div>

                        {/* Dedicated Articles List CTA */}
                        <div className="mt-16 text-center">
                            <Link
                                href="/blog/articles"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                            >
                                View All Articles & Catalog
                                <FaArrowRight size={12} />
                            </Link>
                        </div>
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

export default function BlogListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        }>
            <BlogListingContent />
        </Suspense>
    );
}
