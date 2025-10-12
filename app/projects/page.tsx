import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { FaRocket, FaCode, FaUsers, FaLightbulb, FaArrowRight } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Enhanced Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center">
                        {/* Animated Icon/Badge */}
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <FaRocket className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                {projects.length}+ Projects
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            My Projects
                        </h1>

                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                Building <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">scalable solutions</span> that solve real business problems
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaCode className="text-blue-600 dark:text-blue-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{projects.length}+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Projects</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaUsers className="text-green-600 dark:text-green-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">4</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Companies</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaLightbulb className="text-purple-600 dark:text-purple-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">5+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Years Exp</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaRocket className="text-orange-600 dark:text-orange-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">6+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Technologies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-12 justify-center">
                        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium transition-colors">
                            All Projects
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors">
                            Full Stack
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors">
                            Frontend
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors">
                            Backend
                        </button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                showFeaturedBadge={false} // Don't show featured badge on projects page
                            />
                        ))}
                    </div>

                    {/* Load More Button (if you add pagination later) */}
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center gap-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 transform">
                            Load More Projects
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Enhanced Call to Action */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 animate-slide-up max-w-2xl mx-auto">
                        I'm passionate about turning ideas into reality. Let's discuss how we can bring your vision to life with cutting-edge technology and exceptional user experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
                        <Link
                            href="/contact"
                            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            <FaRocket className="group-hover:animate-bounce" />
                            Start a Project
                        </Link>
                        <Link
                            href="/experience"
                            className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform inline-flex items-center gap-2"
                        >
                            View My Experience
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}