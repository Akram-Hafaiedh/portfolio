// app/components/blog/MarkdownRenderer.tsx
'use client';

import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import Image from 'next/image';

// Component for copy-to-clipboard syntax highlighted code block
function CodeBlock({ code, language }: { code: string; language: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const escapeHtml = (text: string) => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const highlightCode = (rawCode: string, lang: string) => {
        const escaped = escapeHtml(rawCode);
        if (!lang) return escaped;

        // 1. Comments: // ... or /* ... */
        let html = escaped.replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>');

        // 2. Strings: "..." or '...' or `...`
        html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-500 dark:text-emerald-400 font-medium">$&</span>');

        // 3. Keywords
        const keywords = [
            'const', 'let', 'var', 'function', 'return', 'import', 'from', 'export',
            'default', 'class', 'extends', 'if', 'else', 'try', 'catch', 'async', 'await',
            'true', 'false', 'null', 'undefined', 'typeof', 'new', 'interface', 'type', 'as'
        ];
        const keywordsRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        html = html.replace(keywordsRegex, '<span class="text-blue-600 dark:text-blue-400 font-bold">$1</span>');

        // 4. TSX Tags / XML Tags
        html = html.replace(/(&lt;\/?[a-zA-Z0-9_]+&gt;|&lt;[a-zA-Z0-9_]+\s|\/&gt;)/g, '<span class="text-rose-500 dark:text-rose-400 font-semibold">$1</span>');

        return html;
    };

    const highlighted = highlightCode(code, language);

    return (
        <div className="relative my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl group">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-slate-950/60 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="uppercase tracking-widest font-black text-[10px]">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
                    aria-label="Copy code block"
                >
                    {copied ? (
                        <>
                            <FaCheck size={10} className="text-emerald-400" />
                            <span className="text-emerald-400 font-bold">{copied ? 'Copied' : 'Copy'}</span>
                        </>
                    ) : (
                        <>
                            <FaCopy size={10} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Pre code */}
            <pre className="p-6 overflow-x-auto text-sm font-mono text-slate-300 bg-slate-900 leading-relaxed scrollbar-thin">
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
        </div>
    );
}

// Inline formatting parser
const parseInline = (text: string): React.ReactNode[] => {
    // Regex for bold, italic, inline-code, and links
    const inlineRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = text.split(inlineRegex);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-black text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={index} className="italic text-slate-800 dark:text-slate-200">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-pink-600 dark:text-pink-400 font-semibold">
                    {part.slice(1, -1)}
                </code>
            );
        }
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const mid = part.indexOf('](');
            const label = part.slice(1, mid);
            const url = part.slice(mid + 2, -1);
            const isExternal = url.startsWith('http');
            return (
                <a
                    key={index}
                    href={url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                    {label}
                </a>
            );
        }
        return part;
    });
};

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    let isInCodeBlock = false;
    let codeLanguage = '';
    let accumulatedCode: string[] = [];

    let accumulatedList: React.ReactNode[] = [];
    let isListActive = false;

    let accumulatedTableRows: string[][] = [];
    let isTableActive = false;

    const flushList = (key: number) => {
        if (accumulatedList.length > 0) {
            elements.push(
                <ul key={`list-${key}`} className="list-disc pl-6 space-y-2.5 my-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {...accumulatedList}
                </ul>
            );
            accumulatedList = [];
            isListActive = false;
        }
    };

    const flushTable = (key: number) => {
        if (accumulatedTableRows.length > 0) {
            const hasHeader = accumulatedTableRows.length > 1 && accumulatedTableRows[1].some(col => col.includes('---'));
            const headerRow = hasHeader ? accumulatedTableRows[0] : null;
            const bodyRows = hasHeader ? accumulatedTableRows.slice(2) : accumulatedTableRows;

            elements.push(
                <div key={`table-wrapper-${key}`} className="my-8 overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left border-collapse text-sm">
                        {headerRow && (
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                    {headerRow.map((col, idx) => (
                                        <th key={`th-${idx}`} className="px-6 py-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                                            {parseInline(col.trim())}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {bodyRows.map((row, rIdx) => (
                                <tr key={`tr-${rIdx}`} className="border-b last:border-0 border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                    {row.map((col, cIdx) => (
                                        <td key={`td-${cIdx}`} className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                            {parseInline(col.trim())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            accumulatedTableRows = [];
            isTableActive = false;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 1. Code Block parsing
        if (line.trim().startsWith('```')) {
            if (isInCodeBlock) {
                // End of code block, flush it
                elements.push(
                    <CodeBlock
                        key={`code-${i}`}
                        code={accumulatedCode.join('\n')}
                        language={codeLanguage}
                    />
                );
                accumulatedCode = [];
                codeLanguage = '';
                isInCodeBlock = false;
            } else {
                // Start of code block
                // Flush lists and tables first
                flushList(i);
                flushTable(i);
                isInCodeBlock = true;
                codeLanguage = line.trim().substring(3).trim();
            }
            continue;
        }

        if (isInCodeBlock) {
            accumulatedCode.push(line);
            continue;
        }

        // 2. Table parsing
        if (line.trim().startsWith('|')) {
            flushList(i);
            isTableActive = true;
            const columns = line.split('|').slice(1, -1);
            accumulatedTableRows.push(columns);
            continue;
        } else if (isTableActive) {
            flushTable(i);
        }

        // 3. Lists parsing (Unordered lists starting with - or *)
        const isListItem = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        if (isListItem) {
            isListActive = true;
            const cleanContent = line.trim().substring(2);
            accumulatedList.push(
                <li key={`li-${i}`}>
                    {parseInline(cleanContent)}
                </li>
            );
            continue;
        } else if (isListActive) {
            flushList(i);
        }

        // 4. Headers & other block elements
        const trimmed = line.trim();

        // 4a. Image block parsing: ![AltText](src)
        const imgRegex = /^!\[(.*?)\]\((.*?)\)$/;
        const imgMatch = trimmed.match(imgRegex);
        if (imgMatch) {
            const alt = imgMatch[1];
            const src = imgMatch[2];
            elements.push(
                <div key={`img-${i}`} className="my-8 rounded-[1.5rem] overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-xl relative h-64 sm:h-[350px] w-full bg-slate-100 dark:bg-slate-900">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                    />
                </div>
            );
            continue;
        }

        if (trimmed.startsWith('# ')) {
            const headingText = trimmed.substring(2);
            const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            elements.push(
                <h1 id={id} key={`h1-${i}`} className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-12 mb-6 tracking-tight leading-tight scroll-mt-24">
                    {parseInline(headingText)}
                </h1>
            );
        } else if (trimmed.startsWith('## ')) {
            const headingText = trimmed.substring(3);
            const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            elements.push(
                <h2 id={id} key={`h2-${i}`} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-10 mb-5 tracking-tight border-b border-slate-100 dark:border-slate-800/80 pb-3 scroll-mt-24">
                    {parseInline(headingText)}
                </h2>
            );
        } else if (trimmed.startsWith('### ')) {
            const headingText = trimmed.substring(4);
            const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            elements.push(
                <h3 id={id} key={`h3-${i}`} className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 tracking-tight scroll-mt-24">
                    {parseInline(headingText)}
                </h3>
            );
        } else if (trimmed.startsWith('> ')) {
            elements.push(
                <blockquote key={`quote-${i}`} className="border-l-4 border-blue-500 pl-6 my-6 italic text-lg text-slate-700 dark:text-slate-300 bg-blue-500/5 dark:bg-blue-500/3 py-4 pr-4 rounded-r-2xl">
                    {parseInline(trimmed.substring(2))}
                </blockquote>
            );
        } else if (trimmed === '---') {
            elements.push(<hr key={`hr-${i}`} className="my-10 border-slate-200 dark:border-slate-800" />);
        } else if (trimmed !== '') {
            // Normal paragraph
            elements.push(
                <p key={`p-${i}`} className="my-5 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                    {parseInline(line)}
                </p>
            );
        }
    }

    // Flush any trailing lists or tables
    flushList(lines.length);
    flushTable(lines.length);

    return <div className="prose prose-slate dark:prose-invert max-w-none">{elements}</div>;
}
