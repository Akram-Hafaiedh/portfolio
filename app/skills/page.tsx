import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AllSkills from "../components/AllSkills";
import { FaBriefcase } from "react-icons/fa";

export default function SkillsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Enhanced Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <FaBriefcase className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                5+ Years
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in">
                            Technical Expertise
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-up">
                            Comprehensive overview of my technical stack, tools, and methodologies
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">9+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Skill Categories</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Technologies</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Years Learning</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">10+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Projects Built</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Component */}
            <AllSkills />

            {/* Additional Skills Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                        Professional Development
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Soft Skills */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow animate-slide-up">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Soft Skills</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Problem Solving</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Communication</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Team Collaboration</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Time Management</span>
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        ))}
                                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Learning & Growth */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow animate-slide-up">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Learning & Growth</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Continuous Learning</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Adaptability</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Innovation</span>
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        ))}
                                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Mentoring</span>
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        ))}
                                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project Management */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow animate-slide-up">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Project Management</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Agile/Scrum</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Requirements Gathering</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Client Communication</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-300">Quality Assurance</span>
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        ))}
                                        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
