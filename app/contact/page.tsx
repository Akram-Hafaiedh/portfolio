'use client';

import Contact from "../components/Contact";
import ScrollProgress from "../components/ScrollProgress";
import { faqData } from "@/lib/faq";

export default function ContactPage() {
    return (
        <div className="relative bg-slate-950 overflow-hidden min-h-screen">
            {/* Unified Animated background grid */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            {/* Unified Floating Gradient Orbs */}
            <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <ScrollProgress sections={['Contact', 'FAQ']} />

            <div className="relative z-10 pt-24 pb-20">
                <Contact />

                {/* FAQ Section - Reimagined */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-slate-800/50 pt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-400">Answers to common questions about my services</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {faqData.map((item, index) => (
                            <div key={index} className="group bg-slate-900/30 hover:bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300">
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors flex items-start gap-3">
                                    <span className="text-indigo-500/50 mt-1">0{index + 1}.</span>
                                    {item.question}
                                </h3>
                                <p className="text-slate-400 leading-relaxed pl-9">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}