import { getFeaturedExperiences } from "@/lib/experiences";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function ExperienceHighlights() {
    const experiences = getFeaturedExperiences(2);

    return (
        <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">Recent Experience</h2>
                <div className="space-y-8 mb-12">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{exp.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{exp.company}</p>
                                </div>
                                <span className="text-slate-500 dark:text-slate-400">{exp.period}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                {exp.description}
                            </p>
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
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/experience"
                        className="inline-flex items-center gap-2 text-white hover:text-blue-700 dark:hover:text-blue-400 font-medium"
                    >
                        View All Experiences
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
