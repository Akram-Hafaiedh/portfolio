'use client';

import { useState, useEffect } from 'react';

export default function ThemeTest() {
    const [currentTheme, setCurrentTheme] = useState('unknown');
    const [htmlClasses, setHtmlClasses] = useState('');

    useEffect(() => {
        const updateThemeInfo = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setCurrentTheme(isDark ? 'dark' : 'light');
            setHtmlClasses(document.documentElement.classList.toString());
        };

        updateThemeInfo();

        // Update when theme changes
        const observer = new MutationObserver(updateThemeInfo);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed top-20 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm z-50 min-w-[200px]">
            <h3 className="font-bold mb-2 text-slate-900 dark:text-white">Theme Debug</h3>
            <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div>Current Theme: <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">{currentTheme}</span></div>
                <div>HTML Classes: <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded text-xs">{htmlClasses}</span></div>
                <div>localStorage: <span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">{typeof window !== 'undefined' ? localStorage.getItem('theme') || 'null' : 'N/A'}</span></div>
            </div>

            {/* Test elements to show dark mode difference */}
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-600">
                <div className="text-slate-900 dark:text-white font-medium">Test Content</div>
                <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">This should change with theme</div>
            </div>
        </div>
    );
}
