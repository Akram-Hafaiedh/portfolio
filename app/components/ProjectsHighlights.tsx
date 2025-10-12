import { featuredProjects } from "@/lib/projects";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ProjectCard from "./ProjectCard"; // Import the reusable component

export default function ProjectsHighlights() {
    return (
        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 animate-fade-in-up">
                        Featured Projects
                    </h2>
                </div>

                {/* Featured Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            showFeaturedBadge={true}
                        />
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors hover:scale-105 transform duration-200 group"
                    >
                        View all Projects & Case Studies
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}