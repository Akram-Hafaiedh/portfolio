import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { FaCode, FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaRoute } from "react-icons/fa";
import { projects } from "@/lib/projects";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Enhanced Hero Section */}
            <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center">
                        {/* Animated Avatar/Badge */}
                        <div className="relative inline-block mb-8">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in shadow-lg">
                                <FaRoute className="text-white text-3xl" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                5+ Years
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
                            About Me
                        </h1>



                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaGraduationCap className="text-blue-600 dark:text-blue-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">Master's</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Degree</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaCode className="text-green-600 dark:text-green-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{projects.length}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Projects</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaGlobe className="text-purple-600 dark:text-purple-400 text-2xl mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">4</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Languages</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transform transition duration-200">
                                <FaMapMarkerAlt className="text-orange-600 dark:text-orange-400 text-2xl mx-auto mb-2" />
                                <div className="text-sm font-bold text-slate-900 dark:text-white">Tunisia</div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">Remote</div>
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

            {/* Main Content - Rest of your existing About page content remains the same */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Personal Story - Your existing content */}
                        <div className="lg:col-span-2 animate-slide-up">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Journey into Web Development</h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                <p>
                                    My passion for web development started during my Master's in Biomedical Instrumentation,
                                    in a course called <strong>"Medical Informatics"</strong> taught by{' '}
                                    <a
                                        href="https://www.linkedin.com/in/hanene-boussi-79234419"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Miss Hanen Boussi
                                    </a>.
                                </p>
                                <p>
                                    We built a <strong>hospital dashboard project</strong> with SQL authentication systems
                                    where doctors could manage appointments and patients could book visits. That moment
                                    when I saw how code could create real-world solutions was my <strong>"click" moment</strong> -
                                    I was fascinated by how authentication worked and how we could build practical tools that help people.
                                </p>
                                <p>
                                    After graduating with top marks in that subject, I dove into web development, starting
                                    with <strong>Laravel and Blade</strong>, then advancing to <strong>Livewire, Inertia, and Vue.js</strong>.
                                    I combined Vue with Laravel to build more dynamic applications, then expanded my skills
                                    by learning <strong>Angular and React</strong>. Eventually, I explored <strong>Node.js</strong>
                                    to become a versatile full-stack developer comfortable across multiple technology stacks.
                                </p>
                                <p>
                                    Today, I bring that same passion for building practical solutions to every project I work on.
                                    I believe in writing clean, maintainable code and staying up-to-date with the latest
                                    industry trends and best practices.
                                </p>
                                <p>
                                    When I'm not coding, you can find me playing football, weight lifting, or exploring various music genres.
                                    These activities help me maintain a balanced lifestyle and keep my mind fresh for creative problem-solving.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8 animate-fade-in">
                            {/* Education - More compact version if needed */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Education</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-900 dark:text-white">Master's in Biomedical Engineering</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Higher Institute of Medical Technologies, Tunis</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">2016 - 2018</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 dark:text-white">Bachelor's in Biomedical Engineering</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Higher Institute of Medical Technologies, Tunis</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">2013 - 2016</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 dark:text-white">High School Diploma in Science</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Carthage Présidence High School</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">2009 - 2013</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Location</h3>
                                <p className="text-slate-600 dark:text-slate-300">Carthage, Tunis, Tunisia</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Available for remote work worldwide</p>
                            </div>

                            {/* Languages */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Languages</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-300">Arabic</span>
                                        <span className="text-slate-500 dark:text-slate-400">Native</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-300">French</span>
                                        <span className="text-slate-500 dark:text-slate-400">Native</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-300">English</span>
                                        <span className="text-slate-500 dark:text-slate-400">Intermediate</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-300">Spanish</span>
                                        <span className="text-slate-500 dark:text-slate-400">Basic</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">Football</span>
                                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">Weight Lifting</span>
                                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">Music</span>
                                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm">Technology</span>
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