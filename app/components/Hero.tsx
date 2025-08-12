import { FaEnvelope } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-in">
                        <span className="text-4xl font-bold text-white">AK</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in">
                        Akram Hafaiedh
                    </h1>
                    <h2 className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-6 animate-slide-up">
                        Full Stack Web Developer
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in">
                        I am a Full Stack Developer based in the northern suburbs of Tunis. I specialize in full
                        stack development and database management systems (DBMS). I dedicate all my energy and
                        passion to building robust applications and websites to enhance the client experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                        <a
                            href="#contact"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 hover:scale-105 transform duration-200"
                        >
                            <FaEnvelope />
                            Get In Touch
                        </a>
                        <a
                            href="#projects"
                            className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-colors hover:scale-105 transform duration-200"
                        >
                            View Projects
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
