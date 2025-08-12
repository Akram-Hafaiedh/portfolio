import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in">
                            About Me
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-up">
                            Get to know more about my background, education, and what drives me as a Full Stack Developer
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Personal Story */}
                        <div className="lg:col-span-2 animate-slide-up">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Story</h2>
                            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
                                <p>
                                    I am a Full Stack Developer based in the northern suburbs of Tunis. I specialize in full
                                    stack development and database management systems (DBMS). I dedicate all my energy and
                                    passion to building robust applications and websites to enhance the client experience.
                                </p>
                                <p>
                                    With expertise in modern web technologies like React, Vue.js, Laravel, and Node.js,
                                    I specialize in building scalable, user-friendly applications that deliver exceptional experiences.
                                    My journey in web development started with a curiosity about how things work on the internet,
                                    and it has evolved into a passion for creating digital solutions that make a difference.
                                </p>
                                <p>
                                    I believe in writing clean, maintainable code and staying up-to-date with the latest
                                    industry trends and best practices. Every project I work on is an opportunity to learn
                                    something new and push the boundaries of what's possible.
                                </p>
                                <p>
                                    When I'm not coding, you can find me playing football, weight lifting, or exploring various music genres.
                                    These activities help me maintain a balanced lifestyle and keep my mind fresh for creative problem-solving.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8 animate-fade-in">
                            {/* Education */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Education</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-900 dark:text-white">Master in Biomedical Instrumentation</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Higher Institute of Medical Technologies, Tunis</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">2018 - 2020</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Location</h3>
                                <p className="text-slate-600 dark:text-slate-300">Carthage Salammbô, Tunis, Tunisia</p>
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
                                        <span className="text-slate-500 dark:text-slate-400">Fluent</span>
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
