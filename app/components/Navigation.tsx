'use client';

import { useState } from 'react';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { dictionary } from '@/lib/dictionary';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const t = dictionary[language];

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
        { href: '/', label: t.nav.home },
        { href: '/about', label: t.nav.about },
        { href: '/experience', label: t.nav.experience },
        { href: '/projects', label: t.nav.projects },
        { href: '/contact', label: t.nav.contact },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            {/* Language Switcher Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleLangMenu}
                                    className="flex items-center gap-2 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <FaGlobe size={16} />
                                    <span className="uppercase font-medium">{language}</span>
                                </button>

                                {isLangMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden">
                                        <button
                                            onClick={() => {
                                                setLanguage('en');
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${language === 'en' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                                        >
                                            English
                                        </button>
                                        <button
                                            onClick={() => {
                                                setLanguage('fr');
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${language === 'fr' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
                                        >
                                            Français
                                        </button>
                                    </div>
                                )}
                            </div>

                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setLanguage('en');
                                        closeMenu();
                                    }}
                                    className={`px-3 py-2 rounded-md text-center text-sm font-medium ${language === 'en' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => {
                                        setLanguage('fr');
                                        closeMenu();
                                    }}
                                    className={`px-3 py-2 rounded-md text-center text-sm font-medium ${language === 'fr' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    Français
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
