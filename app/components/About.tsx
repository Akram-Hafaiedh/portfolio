import { projects } from "@/lib/projects";
import Link from "next/link";

export default function About() {
    return (
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-up">
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            I'm a Full Stack Developer passionate about building scalable web applications that solve real-world problems.
                            With expertise across both <strong>JavaScript</strong> (React, Vue.js, Next.js, Node.js) and <strong>PHP</strong> (Laravel) ecosystems,
                            I bring versatility and depth to every project.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            My approach combines technical excellence with user-centric design, ensuring that every application
                            I build is not only powerful under the hood but also delightful to use.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/about"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                My Full Story
                            </Link>
                            {/* <Link
                                href="/projects"
                                className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                See My Work
                            </Link> */}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg text-center hover:scale-105 transform transition duration-200">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300">Years Experience</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg text-center hover:scale-105 transform transition duration-200">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{projects.length}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300">Projects Completed</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg text-center hover:scale-105 transform transition duration-200">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">6+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300">Technologies</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg text-center hover:scale-105 transform transition duration-200">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">4</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300">Languages</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}