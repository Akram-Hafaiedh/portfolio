import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { getAllExperiences } from "@/lib/experiences";
import { FaBriefcase, FaBuilding, FaRocket } from "react-icons/fa6";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

export default function ExperiencePage() {
    const experiences = getAllExperiences();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

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
                                <FaBriefcase className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                4 Roles
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            Experience
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="relative inline-block max-w-3xl mx-auto">
                            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                                My professional journey through{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                                    innovative companies and challenging projects
                                </span>
                            </p>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="mt-16 animate-bounce">
                            <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center mx-auto">
                                <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse"></div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Scroll to explore my journey</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Experience Timeline */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="relative animate-slide-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Timeline Line */}
                                {index < experiences.length - 1 && (
                                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                                )}

                                <div className="flex gap-8">
                                    {/* Timeline Dot */}
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {exp.company.charAt(0)}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 p-8 rounded-lg hover:shadow-lg transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{exp.title}</h3>
                                                <p className="text-lg text-slate-600 dark:text-slate-300">{exp.company} • {exp.location}</p>
                                            </div>
                                            <div className="text-right mt-2 md:mt-0">
                                                <p className="text-slate-500 dark:text-slate-400">{exp.period}</p>
                                                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mt-1">
                                                    {exp.type}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Achievements:</h4>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, achievementIndex) => (
                                                    <li key={achievementIndex} className="flex items-start gap-2">
                                                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                                        <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Technologies Used:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.skills.map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
