import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function ProjectsPage() {
    const projects = [
        {
            title: "Iberis Management Platform",
            description: "Migrated and enhanced UI/UX of online management and billing platform with Vue.js and Laravel, improving invoicing, expense tracking, client and stock management.",
            longDescription: "A comprehensive business management platform that handles all aspects of company operations including invoicing, expense tracking, client management, and inventory control. The project involved migrating from a legacy system to a modern Vue.js frontend with Laravel backend, significantly improving user experience and system performance.",
            technologies: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Git", "Docker"],
            features: [
                "Modern responsive UI with Vue.js",
                "Real-time invoice generation and tracking",
                "Advanced client management system",
                "Inventory and stock management",
                "Expense tracking and reporting",
                "Multi-user role-based access control"
            ],
            challenges: [
                "Migrating legacy system without downtime",
                "Optimizing database queries for large datasets",
                "Implementing real-time updates across multiple users",
                "Ensuring data integrity during migration"
            ],
            gradient: "from-blue-500 to-purple-600",
            demoLink: "#",
            codeLink: "#",
            status: "Live"
        },
        {
            title: "Home Services Platform",
            description: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
            longDescription: "A comprehensive platform for managing home services, connecting service providers with customers. Features include advanced search functionality, document generation, CV management for service providers, and comprehensive planning tools for service scheduling and management.",
            technologies: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js", "AWS S3", "Meilisearch"],
            features: [
                "Advanced search with Meilisearch integration",
                "PDF generation and document management",
                "CV generation system for service providers",
                "Real-time booking and scheduling",
                "Payment integration and invoicing",
                "Mobile-responsive design"
            ],
            challenges: [
                "Implementing complex search algorithms",
                "Integrating multiple third-party services",
                "Optimizing PDF generation for large documents",
                "Managing real-time data synchronization"
            ],
            gradient: "from-green-500 to-teal-600",
            demoLink: "#",
            codeLink: "#",
            status: "Live"
        },
        {
            title: "NFC Business Card System",
            description: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
            longDescription: "An innovative NFC-based business card system that allows users to share contact information digitally. The system includes both web and mobile applications, enabling users to create, customize, and share digital business cards using NFC technology.",
            technologies: ["React", "React Native", "Django", "Laravel", "TailwindCSS", "NFC", "Mobile Development"],
            features: [
                "NFC technology integration",
                "Cross-platform mobile application",
                "Customizable business card templates",
                "Contact information management",
                "Analytics and tracking",
                "Offline functionality"
            ],
            challenges: [
                "Integrating NFC technology across different devices",
                "Ensuring cross-platform compatibility",
                "Managing offline data synchronization",
                "Implementing secure data transfer"
            ],
            gradient: "from-purple-500 to-pink-600",
            demoLink: "#",
            codeLink: "#",
            status: "Live"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in">
                            Projects
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-up">
                            Explore my portfolio of projects that showcase my skills in full-stack development and problem-solving
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Project Image/Preview */}
                                    <div className="order-2 lg:order-1">
                                        <div className={`h-80 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                                            <div className="text-center text-white">
                                                <h3 className="text-3xl font-bold mb-2">{project.title.split(' ')[0]}</h3>
                                                <p className="text-lg opacity-90">Platform</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="order-1 lg:order-2">
                                        <div className="flex items-center gap-3 mb-4">
                                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
                                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                                {project.status}
                                            </span>
                                        </div>

                                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                                            {project.longDescription}
                                        </p>

                                        {/* Technologies */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Technologies Used:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Features:</h4>
                                            <ul className="space-y-2">
                                                {project.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-2">
                                                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Challenges */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Challenges Overcome:</h4>
                                            <ul className="space-y-2">
                                                {project.challenges.map((challenge, challengeIndex) => (
                                                    <li key={challengeIndex} className="flex items-start gap-2">
                                                        <span className="text-orange-600 dark:text-orange-400 mt-1">•</span>
                                                        <span className="text-slate-600 dark:text-slate-300">{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4">
                                            <a
                                                href={project.demoLink}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors hover:scale-105 transform duration-200"
                                            >
                                                Live Demo
                                            </a>
                                            <a
                                                href={project.codeLink}
                                                className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2 rounded-lg font-medium transition-colors hover:scale-105 transform duration-200"
                                            >
                                                Source Code
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in">
                        Interested in Working Together?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 animate-slide-up">
                        I'm always open to discussing new opportunities and exciting projects.
                        Let's create something amazing together!
                    </p>
                    <a
                        href="/contact"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:scale-105 transform duration-200 inline-block"
                    >
                        Get In Touch
                    </a>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
