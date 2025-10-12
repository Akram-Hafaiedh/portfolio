import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import ProjectImage from "@/app/components/ProjectImage";
import ScrollToTop from "@/app/components/ScrollToTop";
import { getProjectById } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaBuilding, FaCalendarAlt, FaChartLine, FaCheckCircle, FaExternalLinkAlt, FaGithub, FaLightbulb, FaRocket, FaUserTie } from "react-icons/fa";

interface ProjectPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        return {
            title: 'Project Not Found'
        };
    }

    return {
        title: `${project.title} - Case Study | Akram Hafaiedh`,
        description: project.shortDescription,
    };
}

export default function ProjectPage({ params }: ProjectPageProps) {

    const project = getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Navigation />

            <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                </div>
            </section>

            {/* Project Hero */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Project Image - Updated to use ProjectImage */}
                        <div className="animate-slide-up">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <ProjectImage
                                    project={project}
                                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                                    showIcon={true}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                        {project.type}
                                    </span>
                                </div>
                                {/* Optional: Add status badge for abandoned projects */}
                                {project.status === 'Abandoned' && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                            Project On Hold
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rest of your project header content remains the same */}
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                {project.fullDescription}
                            </p>

                            {/* Project Metadata */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <FaUserTie className="text-blue-600 dark:text-blue-400 text-xl" />
                                    <div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Role</div>
                                        <div className="font-semibold text-slate-900 dark:text-white">{project.role}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-green-600 dark:text-green-400 text-xl" />
                                    <div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Timeline</div>
                                        <div className="font-semibold text-slate-900 dark:text-white">{project.timeline}</div>
                                    </div>
                                </div>
                                {project.company && (
                                    <div className="flex items-center gap-3">
                                        <FaBuilding className="text-purple-600 dark:text-purple-400 text-xl" />
                                        <div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Company</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{project.company}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="text-orange-600 dark:text-orange-400 text-xl" />
                                    <div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Status</div>
                                        <div className="font-semibold text-slate-900 dark:text-white">{project.status}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                {project.liveUrl && project.liveUrl !== "#" ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                                    >
                                        <FaExternalLinkAlt className="group-hover:scale-110 transition-transform" />
                                        Live Demo
                                    </a>
                                ) : (
                                    <span className="group flex items-center gap-3 bg-gray-400 text-white font-medium py-3 px-6 rounded-lg cursor-not-allowed">
                                        <FaExternalLinkAlt />
                                        No Demo Available
                                    </span>
                                )}
                                {project.githubUrl && project.githubUrl !== "#" ? (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 transform"
                                    >
                                        <FaGithub className="group-hover:scale-110 transition-transform" />
                                        Source Code
                                    </a>
                                ) : (
                                    <span className="group flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-medium py-3 px-6 rounded-lg cursor-not-allowed">
                                        <FaGithub />
                                        Code Private
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Project Details */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <div className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <FaRocket className="text-blue-600 dark:text-blue-400" />
                                    Project Overview
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {project.fullDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <FaLightbulb className="text-green-600 dark:text-green-400" />
                                    Key Features
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {project.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <FaCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Challenges & Solutions */}
                            {project.challenges && project.solutions && (
                                <div className="animate-slide-up">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <FaChartLine className="text-orange-600 dark:text-orange-400" />
                                        Challenges & Solutions
                                    </h2>
                                    <div className="space-y-6">
                                        {project.challenges.map((challenge, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                    Challenge: {challenge}
                                                </h4>
                                                {project.solutions && project.solutions[index] && (
                                                    <p className="text-slate-600 dark:text-slate-300">
                                                        <strong>Solution:</strong> {project.solutions[index]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Results */}
                            {project.results && (
                                <div className="animate-slide-up">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Results & Impact</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {project.results.map((result, index) => (
                                            <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                                                <p className="text-slate-700 dark:text-slate-300 font-medium">{result}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* Technologies */}
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Learnings */}
                                {project.learnings && (
                                    <div className="animate-fade-in-up">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Learnings</h3>
                                        <ul className="space-y-3">
                                            {project.learnings.map((learning, index) => (
                                                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Project Links */}
                                <div className="animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Project Links</h3>
                                    <div className="space-y-3">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                            >
                                                <FaExternalLinkAlt />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                            >
                                                <FaGithub />
                                                Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Between Projects */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/projects"
                            className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            All Projects
                        </Link>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            Ready to start your project?
                        </div>
                        <Link
                            href="/contact"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:scale-105 transform duration-200"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>


            <Footer />
            <ScrollToTop />
        </div>
    )

}