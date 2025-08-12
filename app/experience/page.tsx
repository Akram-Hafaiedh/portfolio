import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function ExperiencePage() {
    const experiences = [
        {
            title: "Full Stack Developer",
            company: "Iberis",
            location: "Lac1, Tunis",
            period: "December 2023 - Present",
            type: "Full-time",
            description: "Migrated and enhanced UI/UX of Iberis online management and billing platform by integrating Vue.js with Laravel, improving key features like invoicing, expense tracking, client and stock management.",
            achievements: [
                "Successfully migrated legacy system to modern Vue.js frontend",
                "Improved user experience and interface design",
                "Enhanced billing and invoicing system functionality",
                "Optimized database queries and performance"
            ],
            skills: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Git", "Docker"]
        },
        {
            title: "Full Stack Developer | Freelance",
            company: "Casagroup",
            location: "Germany (Remote)",
            period: "January 2024 - June 2025",
            type: "Freelance",
            description: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
            achievements: [
                "Built comprehensive home services management platform",
                "Implemented advanced search functionality with Meilisearch",
                "Integrated AWS S3 for document storage and PDF generation",
                "Developed CV generation system with customizable templates"
            ],
            skills: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js", "AWS S3", "Meilisearch"]
        },
        {
            title: "Full Stack Developer",
            company: "Next Consulting",
            location: "Tunis",
            period: "August 2023 - November 2024",
            type: "Full-time",
            description: "Patient management app with real-time messaging via WebSockets. Transport solution with push notifications via Pusher. Real estate marketplace with advanced search engine (Melisearch).",
            achievements: [
                "Developed real-time patient management system with WebSocket integration",
                "Built transport solution with push notification system",
                "Created real estate marketplace with advanced search capabilities",
                "Implemented real-time messaging features"
            ],
            skills: ["Laravel", "Vue.js", "Next.js", "Node.js", "WebSocket", "Pusher", "Meilisearch"]
        },
        {
            title: "Full Stack Developer",
            company: "Dcarte Solutions",
            location: "Lac2, Tunis",
            period: "March 2022 - October 2023",
            type: "Full-time",
            description: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
            achievements: [
                "Led development of NFC business card system from concept to production",
                "Built both web interface and mobile application",
                "Managed complete project lifecycle and deployment",
                "Implemented NFC technology integration"
            ],
            skills: ["React", "React Native", "Django", "Laravel", "TailwindCSS", "NFC", "Mobile Development"]
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
                            Experience
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto animate-slide-up">
                            My professional journey and the projects that have shaped my career as a Full Stack Developer
                        </p>
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
