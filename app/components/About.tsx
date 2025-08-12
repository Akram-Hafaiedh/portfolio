export default function About() {
    return (
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-up">
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            I am a Full Stack Developer based in the northern suburbs of Tunis. I specialize in full
                            stack development and database management systems (DBMS). I dedicate all my energy and
                            passion to building robust applications and websites to enhance the client experience.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            With expertise in modern web technologies like React, Vue.js, Laravel, and Node.js,
                            I specialize in building scalable, user-friendly applications that deliver exceptional experiences.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            When I'm not coding, you can find me playing football, weight lifting, or exploring various music genres.
                        </p>
                    </div>
                    <div className="space-y-4 animate-fade-in">
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Education</h3>
                            <p className="text-slate-600 dark:text-slate-300">Master in Biomedical Instrumentation</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Higher Institute of Medical Technologies, Tunis</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Location</h3>
                            <p className="text-slate-600 dark:text-slate-300">Carthage Salammbô, Tunis, Tunisia</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Languages</h3>
                            <p className="text-slate-600 dark:text-slate-300">Arabic (Native), French (Fluent), English (Intermediate), Spanish (Basic)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
