export default function Projects() {
    const projects = [
        {
            title: "Iberis Management Platform",
            description: "Migrated and enhanced UI/UX of online management and billing platform with Vue.js and Laravel, improving invoicing, expense tracking, client and stock management.",
            technologies: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API"],
            gradient: "from-blue-500 to-purple-600",
            demoLink: "#",
            codeLink: "#"
        },
        {
            title: "Home Services Platform",
            description: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
            technologies: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js"],
            gradient: "from-green-500 to-teal-600",
            demoLink: "#",
            codeLink: "#"
        },
        {
            title: "NFC Business Card System",
            description: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
            technologies: ["React", "React Native", "Django", "Laravel", "TailwindCSS"],
            gradient: "from-purple-500 to-pink-600",
            demoLink: "#",
            codeLink: "#"
        }
    ];

    return (
        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in">
                    Featured Projects
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up group"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                                <span className="text-white text-2xl font-bold">{project.title.split(' ')[0]}</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm hover:scale-105 transition-transform"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={project.demoLink}
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                    >
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.codeLink}
                                        className="text-slate-600 dark:text-slate-400 hover:underline text-sm hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        Source Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
