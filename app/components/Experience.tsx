export default function Experience() {
    const experiences = [
        {
            title: "Full Stack Developer",
            company: "Iberis • Lac1, Tunis",
            period: "December 2023 - Present",
            description: "Migrated and enhanced UI/UX of Iberis online management and billing platform by integrating Vue.js with Laravel, improving key features like invoicing, expense tracking, client and stock management.",
            skills: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API"]
        },
        {
            title: "Full Stack Developer | Freelance",
            company: "Casagroup (Germany)",
            period: "January 2024 - June 2025",
            description: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
            skills: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js"]
        },
        {
            title: "Full Stack Developer",
            company: "Next Consulting • Tunis",
            period: "August 2023 - November 2024",
            description: "Patient management app with real-time messaging via WebSockets. Transport solution with push notifications via Pusher. Real estate marketplace with advanced search engine (Melisearch).",
            skills: ["Laravel", "Vue.js", "Next.js", "Node.js", "WebSocket"]
        },
        {
            title: "Full Stack Developer",
            company: "Dcarte Solutions • Lac2, Tunis",
            period: "March 2022 - October 2023",
            description: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
            skills: ["React", "React Native", "Django", "Laravel", "TailwindCSS"]
        }
    ];

    return (
        <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">Experience</h2>
                <div className="space-y-8">
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
            </div>
        </section>
    );
}
