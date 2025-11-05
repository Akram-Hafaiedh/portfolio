'use client'

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { FaRocket, FaCode, FaUsers, FaLightbulb, FaArrowRight, FaCalendar } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import { useMemo, useState } from "react";

type FilterType = 'all' | 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Freelance';

export default function ProjectsPage() {

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [visibleProjects, setVisibleProjects] = useState(6);


    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;

        return projects.filter(project => project.type === activeFilter);
    }, [activeFilter]);


    const displayedProjects = filteredProjects.slice(0, visibleProjects);


    const filterButtons: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'All Projects' },
        { key: 'Full Stack', label: 'Full Stack' },
        { key: 'Frontend', label: 'Frontend' },
        { key: 'Backend', label: 'Backend' },
        { key: 'Mobile', label: 'Mobile' },
        { key: 'Freelance', label: 'Freelance' },
    ];


    const handleLoadMore = () => {
        setVisibleProjects(prev => prev + 6);
    };


    const getButtonClasses = (filterKey: FilterType) => {
        const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105";

        if (activeFilter === filterKey) {
            return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg`;
        }

        return `${baseClasses} bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`;
    };

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

                        {/* <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                Building <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">scalable solutions</span> that solve real business problems
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div> */}

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

                        {/* Scroll Indicator */}
                        <div className="mt-16 animate-bounce">
                            <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center mx-auto">
                                <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse"></div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Scroll to explore</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-12 justify-center">
                        {filterButtons.map((button) => (
                            <button
                                key={button.key}
                                onClick={() => {
                                    setActiveFilter(button.key);
                                    setVisibleProjects(6); // Reset visible projects when filter changes
                                }}
                                className={getButtonClasses(button.key)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="text-center mb-8">
                        <p className="text-slate-600 dark:text-slate-300">
                            Showing {displayedProjects.length} of {filteredProjects.length} projects
                            {activeFilter !== 'all' && ` in ${activeFilter}`}
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                showFeaturedBadge={false}
                            />
                        ))}
                    </div>

                    {/* No Results Message */}
                    {displayedProjects.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-slate-400 dark:text-slate-500 text-lg mb-4">
                                No {activeFilter !== 'all' ? activeFilter.toLowerCase() : ''} projects found.
                            </div>
                            <button
                                onClick={() => setActiveFilter('all')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                            >
                                Show All Projects
                            </button>
                        </div>
                    )}

                    {/* Load More Button */}
                    {filteredProjects.length > visibleProjects && (
                        <div className="text-center mt-12">
                            <button
                                onClick={handleLoadMore}
                                className="group inline-flex items-center gap-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 transform"
                            >
                                Load More Projects ({filteredProjects.length - visibleProjects} remaining)
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
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
                        {/* <Link
                            href="/contact"
                            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            <FaRocket className="group-hover:animate-bounce" />
                            Start a Project
                        </Link> */}

                        <Link
                            href="/booking"  // Changed from /contact
                            className="group bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            <FaCalendar className="group-hover:animate-bounce" />
                            Book a Project Call
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