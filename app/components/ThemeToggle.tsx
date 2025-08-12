'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Get the current theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Determine if we should be in dark mode
        let shouldBeDark = false;

        if (savedTheme === 'dark') {
            shouldBeDark = true;
        } else if (savedTheme === 'light') {
            shouldBeDark = false;
        } else {
            // No saved preference, use system preference
            shouldBeDark = systemPrefersDark;
        }

        // Update state and DOM
        setIsDark(shouldBeDark);
        updateTheme(shouldBeDark);

        // Debug log
        console.log('ThemeToggle mounted:', {
            savedTheme,
            systemPrefersDark,
            shouldBeDark,
            currentClassList: document.documentElement.classList.toString()
        });
    }, []);

    const updateTheme = (dark: boolean) => {
        const html = document.documentElement;

        if (dark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // Debug log
        console.log('Theme updated:', {
            dark,
            classList: html.classList.toString(),
            hasDarkClass: html.classList.contains('dark')
        });
    };

    const toggleTheme = () => {
        console.log('Toggle button clicked!');

        const newIsDark = !isDark;
        setIsDark(newIsDark);
        updateTheme(newIsDark);

        // Save to localStorage
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');

        // Debug log
        console.log('Theme toggled:', {
            from: isDark ? 'dark' : 'light',
            to: newIsDark ? 'dark' : 'light',
            localStorage: localStorage.getItem('theme'),
            htmlClassList: document.documentElement.classList.toString()
        });
    };

    // Show loading state while mounting
    if (!mounted) {
        return (
            <button
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Loading theme toggle"
            >
                <FaMoon size={16} />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>
    );
}
