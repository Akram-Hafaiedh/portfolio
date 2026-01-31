'use client';

import { useState } from 'react';
import { FaBars, FaTimes, FaGlobe, FaSearch } from 'react-icons/fa';
import { useKBar } from 'kbar';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { query } = useKBar();
    const t = useTranslations('Common');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleLangMenu = () => {
        setIsLangMenuOpen(!isLangMenuOpen);
    };

    const navItems = [
        { href: '/', label: t('nav.home') },
        { href: '/about', label: t('nav.about') },
        { href: '/experience', label: t('nav.experience') },
        { href: '/projects', label: t('nav.projects') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group py-2"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            {/* Search Trigger */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => query.toggle()}
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all group"
                                aria-label="Open search"
                            >
                                <FaSearch size={14} className="group-hover:text-blue-500 transition-colors" />
                                <span className="text-xs font-medium">{t('search.placeholder')}</span>
                                <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-black opacity-60">⌘K</kbd>
                            </motion.button>

                            {/* Language Switcher Dropdown */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                                    onClick={toggleLangMenu}
                                    className="flex items-center gap-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors dark:hover:bg-slate-800"
                                    aria-label="Select language"
                                    aria-expanded={isLangMenuOpen}
                                    aria-haspopup="true"
                                >
                                    <FaGlobe size={16} />
                                    <span className="uppercase font-bold text-xs tracking-wider">{locale}</span>
                                </motion.button>

                                <AnimatePresence>
                                    {isLangMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => {
                                                    router.replace(pathname, { locale: 'en' });
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${locale === 'en' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                                            >
                                                English
                                                {locale === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    router.replace(pathname, { locale: 'fr' });
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${locale === 'fr' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                                            >
                                                Français
                                                {locale === 'fr' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => query.toggle()}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            aria-label="Open search"
                        >
                            <FaSearch size={20} />
                        </motion.button>

                        <ThemeToggle />
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <FaTimes size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="open"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <FaBars size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4"
                                >
                                    <button
                                        onClick={() => {
                                            router.replace(pathname, { locale: 'en' });
                                            closeMenu();
                                        }}
                                        className={`px-4 py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider transition-all ${locale === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                    >
                                        EN
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.replace(pathname, { locale: 'fr' });
                                            closeMenu();
                                        }}
                                        className={`px-4 py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider transition-all ${locale === 'fr' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                    >
                                        FR
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
