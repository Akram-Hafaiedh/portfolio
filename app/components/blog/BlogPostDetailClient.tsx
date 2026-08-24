// app/components/blog/BlogPostDetailClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { BlogPost } from '@/lib/blog';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCalendarAlt,
    FaClock,
    FaArrowLeft,
    FaLinkedin,
    FaTwitter,
    FaLink,
    FaCheck,
    FaLayerGroup,
    FaChevronRight,
    FaBookmark,
    FaTag,
    FaListUl,
    FaRocket,
    FaCalendarCheck,
    FaPaperPlane
} from 'react-icons/fa';
import Image from 'next/image';
import MarkdownRenderer from './MarkdownRenderer';
import BlogCoverImage from './BlogCoverImage';
import { getBlogPosts } from '@/lib/blog';

interface BlogPostDetailClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostDetailClient({ post, relatedPosts }: BlogPostDetailClientProps) {
    const t = useTranslations('Common');
    const locale = useLocale();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showFloatingHeader, setShowFloatingHeader] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeHeadingId, setActiveHeadingId] = useState<string>('');

    // Extract Table of Contents items dynamically from markdown
    const tocItems = useMemo(() => {
        const lines = post.content.split('\n');
        const items: { id: string; text: string; level: number }[] = [];
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('## ')) {
                const text = trimmed.substring(3).replace(/[*`[\]]/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                items.push({ id, text, level: 2 });
            } else if (trimmed.startsWith('### ')) {
                const text = trimmed.substring(4).replace(/[*`[\]]/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                items.push({ id, text, level: 3 });
            }
        }
        return items;
    }, [post.content]);

    // Scroll tracker & IntersectionObserver for active heading
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.scrollY / totalHeight) * 100);
            }
            setShowFloatingHeader(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);

        // Heading IntersectionObserver
        const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeadingId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -40% 0px' }
        );

        headingElements.forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link: ', err);
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const shareUrl = mounted ? encodeURIComponent(window.location.href) : '';
    const shareTitle = encodeURIComponent(post.title);

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen pt-32 pb-24 transition-colors duration-500">
            {/* Reading Progress Top Bar */}
            <div className="fixed top-16 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Floating Mini Top Header (shows when scrolled past hero) */}
            <AnimatePresence>
                {showFloatingHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 pt-2 left-0 right-0 z-40 px-4 pointer-events-none"
                    >
                        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-2xl px-6 py-3 shadow-2xl flex items-center justify-between pointer-events-auto">
                            <div className="flex items-center gap-4 min-w-0">
                                <Link
                                    href="/blog"
                                    className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors flex items-center gap-1.5 shrink-0"
                                >
                                    <FaArrowLeft size={10} />
                                    Blog
                                </Link>
                                <span className="text-slate-300 dark:text-slate-700">|</span>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                    {post.title}
                                </h4>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-[#0077b5] transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <FaLinkedin size={14} />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-[#1da1f2] transition-colors"
                                    aria-label="Share on Twitter"
                                >
                                    <FaTwitter size={14} />
                                </a>
                                <Link
                                    href="/booking"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    <FaCalendarCheck size={10} />
                                    Book Call
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background design grids */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Back to Blog */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-xs uppercase tracking-widest transition-colors group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        {t('blog.backToBlog')}
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-6 mb-12 max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                        <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-slate-500">{post.category}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {post.title}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {post.excerpt}
                    </p>

                    {/* Metadata & Author Row */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-y border-slate-200/50 dark:border-slate-800/50 py-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-base font-black text-slate-900 dark:text-white leading-none">{post.author.name}</div>
                                <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-1.5">{post.author.role}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-500">
                            <span className="flex items-center gap-2">
                                <FaCalendarAlt />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Banner Image */}
                <div className="relative h-64 sm:h-[480px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 max-w-5xl mx-auto">
                    <BlogCoverImage
                        src={post.image}
                        alt={post.title}
                        category={post.category}
                        priority
                    />
                </div>

                {/* Main Content Layout with Sticky Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    {/* Share / Actions bar */}
                    <div className="lg:col-span-1 lg:block flex lg:flex-col items-center justify-start gap-4 lg:sticky lg:top-32 h-fit z-20 order-2 lg:order-1">
                        <span className="hidden lg:block text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2 whitespace-nowrap [writing-mode:vertical-lr] rotate-180 select-none mx-auto">
                            {t('blog.share')}
                        </span>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500 flex items-center justify-center text-slate-500 hover:text-[#0077b5] dark:hover:text-[#0077b5] transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
                            aria-label="Share on LinkedIn"
                        >
                            <FaLinkedin size={16} />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-blue-400 flex items-center justify-center text-slate-500 hover:text-[#1da1f2] dark:hover:text-[#1da1f2] transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
                            aria-label="Share on Twitter"
                        >
                            <FaTwitter size={16} />
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className="relative w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all hover:-translate-y-0.5 active:scale-95 shadow-md cursor-pointer"
                            aria-label="Copy article link"
                        >
                            {copied ? <FaCheck size={16} className="text-emerald-500 animate-pulse" /> : <FaLink size={16} />}
                            {copied && (
                                <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-wider py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
                                    {t('blog.copied')}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Article Body */}
                    <div className="lg:col-span-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-slate-200/40 dark:border-slate-800/40 rounded-[2rem] p-6 sm:p-10 md:p-12 overflow-hidden shadow-sm order-1 lg:order-2">
                        {/* Series Playlist Navigation Card */}
                        {post.series && (
                            <div className="bg-gradient-to-br from-blue-900/10 via-slate-900/40 to-purple-900/10 border border-blue-500/30 rounded-3xl p-6 sm:p-8 mb-10 backdrop-blur-xl shadow-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            <FaLayerGroup size={18} />
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 block">
                                                Featured Engineering Series
                                            </span>
                                            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                {post.series.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono font-bold text-blue-400 self-start sm:self-auto">
                                        Part {post.series.part} of {post.series.totalParts}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {getBlogPosts(locale as 'en' | 'fr')
                                        .filter((p) => p.series?.id === post.series?.id)
                                        .sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0))
                                        .map((seriesItem) => {
                                            const isCurrent = seriesItem.slug === post.slug;
                                            return (
                                                <Link
                                                    key={seriesItem.slug}
                                                    href={`/blog/${seriesItem.slug}`}
                                                    className={`flex items-center justify-between p-3 rounded-xl transition-all border text-xs sm:text-sm font-medium ${
                                                        isCurrent
                                                            ? 'bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-300 font-bold shadow-md'
                                                            : 'bg-white/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-white/20'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span
                                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                                                                isCurrent
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                                            }`}
                                                        >
                                                            {seriesItem.series?.part}
                                                        </span>
                                                        <span className="truncate">{seriesItem.title}</span>
                                                    </div>

                                                    {isCurrent ? (
                                                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 shrink-0">
                                                            Reading Now
                                                        </span>
                                                    ) : (
                                                        <FaChevronRight size={10} className="text-slate-400 shrink-0 ml-2" />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        )}

                        <MarkdownRenderer content={post.content} />

                        {/* Article Tags Footer */}
                        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-2">
                            <FaTag className="text-slate-400 mr-2 self-center text-xs" />
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?search=%23${encodeURIComponent(tag)}`}
                                    className="px-3.5 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/30 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Table of Contents Sticky Sidebar */}
                    <div className="lg:col-span-3 order-3 hidden lg:block">
                        <div className="sticky top-32 space-y-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white pb-3 border-b border-slate-200/50 dark:border-slate-800/50">
                                <FaListUl className="text-blue-500" size={14} />
                                Table of Contents
                            </div>

                            <nav className="space-y-2 max-h-[60vh] overflow-y-auto hide-scrollbar">
                                {tocItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`block text-xs leading-relaxed transition-all duration-200 ${item.level === 3 ? 'pl-4' : ''} ${activeHeadingId === item.id
                                            ? 'text-blue-600 dark:text-blue-400 font-black translate-x-1'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                                            }`}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* End-of-Article Engagement & Hire Me CTA Card */}
                <section className="mt-16 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-blue-500/20 relative overflow-hidden">
                        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4 max-w-xl text-center md:text-left">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-400/20">
                                    <FaRocket size={10} />
                                    Engineering Collaboration
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                                    Building a High-Scale SaaS or Complex System?
                                </h3>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Let’s discuss your architecture, full-stack development, or system modernization needs.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105"
                                >
                                    <FaCalendarCheck size={12} />
                                    Book Call
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10"
                                >
                                    <FaPaperPlane size={12} />
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Articles Section */}
                {relatedPosts.length > 0 && (
                    <section className="mt-20 pt-16 border-t border-slate-200/50 dark:border-slate-800/50 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
                            {t('blog.relatedPosts')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((rPost) => (
                                <div
                                    key={rPost.slug}
                                    className="group flex flex-col justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                >
                                    <div className="space-y-4">
                                        <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3 shadow-inner">
                                            <BlogCoverImage
                                                src={rPost.image}
                                                alt={rPost.title}
                                                category={rPost.category}
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg text-[9px] uppercase font-black tracking-widest text-blue-400 border border-white/5 z-10">
                                                {rPost.category}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex gap-2">
                                            <span>{rPost.date}</span>
                                            <span>•</span>
                                            <span>{rPost.category}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors leading-snug">
                                            <Link href={`/blog/${rPost.slug}`}>
                                                {rPost.title}
                                            </Link>
                                        </h3>
                                    </div>

                                    <Link
                                        href={`/blog/${rPost.slug}`}
                                        className="mt-6 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:text-blue-500"
                                    >
                                        Read Article
                                        <FaArrowLeft className="rotate-180" size={8} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer back button */}
                <div className="mt-16 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    >
                        <FaArrowLeft size={10} />
                        {t('blog.backToBlog')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
