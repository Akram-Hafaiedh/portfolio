// app/components/blog/BlogPostDetailClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/lib/blog';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaLinkedin,
    FaTwitter,
    FaLink,
    FaCheck,
    FaTag
} from 'react-icons/fa';
import Image from 'next/image';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogPostDetailClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostDetailClient({ post, relatedPosts }: BlogPostDetailClientProps) {
    const t = useTranslations('Common');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    // Scroll tracker for reading progress
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.scrollY / totalHeight) * 100);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            {/* Reading Progress Indicator */}
            <div className="fixed top-16 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Background design grids */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <header className="space-y-6 mb-12">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                        <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-slate-500">{post.category}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">
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
                <div className="relative h-64 sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Share / Actions bar (sticky side desktop, inline top mobile) */}
                    <div className="lg:col-span-1 lg:block flex lg:flex-col items-center justify-center gap-4 lg:sticky lg:top-32 h-fit z-20">
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

                    {/* Markdown Body */}
                    <div className="lg:col-span-11 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border border-slate-200/40 dark:border-slate-800/40 rounded-[2rem] p-6 sm:p-10 md:p-12 overflow-hidden shadow-sm">
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
                </div>

                {/* Related Articles Section */}
                {relatedPosts.length > 0 && (
                    <section className="mt-24 pt-16 border-t border-slate-200/50 dark:border-slate-800/50">
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
                                        <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-3">
                                            <Image
                                                src={rPost.image}
                                                alt={rPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
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
