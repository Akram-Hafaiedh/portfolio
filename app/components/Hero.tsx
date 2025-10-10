import Link from "next/link";
import { FaEnvelope, FaCode, FaRocket } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    {/* Enhanced Avatar with floating animation */}
                    <div className="relative inline-block mb-8 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
                        <img
                            src="/avatar.jpg"
                            alt="Avatar"
                            className="relative w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl transform group-hover:scale-110 transition-transform duration-300 animate-bounce-in"
                        />
                    </div>

                    {/* Name with fade-in-up */}
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                        Akram Hafaiedh
                    </h1>

                    {/* Headline with gradient text effect */}
                    <h2 className="text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-6 animate-gradient bg-[length:200%_200%]">
                        Full-Stack Developer | Building Scalable Web Applications
                    </h2>

                    {/* Description with staggered animation */}
                    <div className="space-y-4 max-w-2xl mx-auto mb-8">
                        <p className="text-lg text-slate-600 dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            With expertise in both <span className="font-semibold text-blue-600 dark:text-blue-400">JavaScript</span> (React, Vue, Angular, Next.js, Node.js) and <span className="font-semibold text-purple-600 dark:text-purple-400">PHP</span> (Laravel) ecosystems.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            I create efficient solutions that solve real business problems and deliver exceptional user experiences.
                        </p>
                    </div>

                    {/* Buttons with enhanced animations */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <Link
                            href="/contact"
                            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl animate-pulse-slow"
                        >
                            <FaEnvelope />
                            Contact Me
                        </Link>
                        <Link
                            href="/projects"
                            className="group border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 hover:scale-105 transform duration-200"
                        >
                            <FaCode />
                            View My Work
                        </Link>
                    </div>

                    {/* Optional: Animated scroll indicator */}
                    <div className="mt-16 animate-bounce flex justify-center">
                        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}