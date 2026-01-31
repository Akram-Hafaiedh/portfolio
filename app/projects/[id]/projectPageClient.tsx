// ProjectPageClient.tsx
'use client';

import ProjectGallery from "@/app/components/ProjectGallery";
import GalleryLightbox from "@/app/components/GalleryLightbox";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaArrowLeft,
    FaBuilding,
    FaCalendar,
    FaCheckCircle,
    FaExternalLinkAlt,
    FaGithub,
    FaLightbulb,
    FaRocket,
    FaUserTie,
    FaCode,
    FaChartLine,
    FaClock,
    FaStar,
    FaGraduationCap
} from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { projectDetailsContent as enContent } from "@/lib/data/en/projectDetails";
import { projectDetailsContent as frContent } from "@/lib/data/fr/projectDetails";
import { Project } from "@/lib/projects";
import CTA from "@/app/components/CTA";
import ScrollProgress from "@/app/components/ScrollProgress";

interface ProjectPageClientProps {
    project: Project;
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
    const { language } = useLanguage();
    const content = language === 'fr' ? frContent : enContent;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const hasGallery = project.gallery && project.gallery.length > 0;

    // Combine main image with gallery for a single slideshow experience
    const allImages = [
        { url: project.image, caption: project.title, category: 'Main' },
        ...(project.gallery || [])
    ];

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };
    const getStatusText = (status?: string) => {
        if (!status) return '';
        switch (status) {
            case 'Completed': return content.status.completed;
            case 'In Progress': return content.status.inProgress;
            case 'On Hold': return content.status.onHold;
            case 'Cancelled': return content.status.cancelled;
            default: return status;
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
            {/* Background Elements */}
            <div className="block dark:hidden fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />
            <div className="hidden dark:block fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />


            <ScrollProgress sections={['Overview', 'Details', 'Features', 'Tech Stack']} />

            {/* Back Button */}
            <section className="relative z-10 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-all group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        {content.backButton}
                    </Link>
                </div>
            </section>

            {/* Hero Section */}
            <section className="relative z-10 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Project Header */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                            <span className={`px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-bold shadow-lg`}>
                                {project.type}
                            </span>
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${project.status === 'Completed' ? 'bg-green-500/90 text-white' :
                                project.status === 'In Progress' ? 'bg-blue-500/90 text-white' :
                                    project.status === 'On Hold' ? 'bg-yellow-500/90 text-white' :
                                        'bg-red-500/90 text-white'
                                }`}>
                                {getStatusText(project.status)}
                            </span>
                            {project.featured && (
                                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                                    <FaStar className="animate-pulse" />
                                    {content.badges.featured}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            {project.title}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {project.shortDescription || project.longDescription}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center mt-8 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {project.liveUrl && project.liveUrl !== "#" && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                                    <FaExternalLinkAlt className="relative group-hover:scale-110 transition-transform" />
                                    <span className="relative">{content.buttons.viewLiveDemo}</span>
                                </a>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 border-2 border-slate-300 dark:border-slate-600"
                                >
                                    <FaGithub className="group-hover:rotate-12 transition-transform" />
                                    {content.buttons.viewSourceCode}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Meta Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {[
                            { icon: FaUserTie, label: content.meta.role, value: project.role, gradient: 'from-blue-400 to-cyan-400' },
                            { icon: FaClock, label: content.meta.timeline, value: project.timeline, gradient: 'from-green-400 to-emerald-400' },
                            { icon: FaBuilding, label: content.meta.company, value: project.company || content.meta.personal, gradient: 'from-purple-400 to-pink-400' },
                            { icon: FaCode, label: content.meta.technologies, value: `${project.technologies.length}+`, gradient: 'from-orange-400 to-red-400' }
                        ].map((item, i) => (
                            <div key={i} className="group relative">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 text-center group-hover:scale-105 transition-transform">
                                    <item.icon className={`text-3xl mx-auto mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`} />
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{item.label}</div>
                                    <div className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Project Image or Fallback */}
                    {project.image ? (
                        <div
                            className="relative animate-fade-in-up cursor-pointer group/main-img"
                            style={{ animationDelay: '0.5s' }}
                            onClick={() => openLightbox(0)}
                        >
                            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-30 blur-2xl group-hover:opacity-50 transition-opacity`} />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover rounded-3xl"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent rounded-3xl" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <FaRocket className="text-white text-3xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-30 blur-2xl`} />
                                <div className={`relative w-full h-[500px] bg-gradient-to-br ${project.gradient} rounded-3xl flex flex-col items-center justify-center p-12`}>
                                    <div className="text-white/90 text-center space-y-6">
                                        <FaCode className="text-8xl mx-auto opacity-80" />
                                        <h3 className="text-4xl font-bold">{project.title}</h3>
                                        <p className="text-xl opacity-90 max-w-2xl">{project.type} Project</p>
                                        <div className="flex flex-wrap gap-3 justify-center mt-8">
                                            {project.technologies.slice(0, 5).map((tech, i) => (
                                                <span key={i} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 5 && (
                                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                                                    +{project.technologies.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent rounded-3xl" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Overview */}
                            <div className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl`}>
                                        <FaRocket className="text-white text-xl" />
                                    </div>
                                    {content.sections.projectOverview}
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {project.fullDescription || project.longDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Gallery */}
                            {hasGallery && (
                                <div className="animate-slide-up">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl`}>
                                            <FaCode className="text-white text-xl" />
                                        </div>
                                        {content.sections.projectGallery}
                                    </h2>
                                    <ProjectGallery
                                        images={project.gallery}
                                        title=""
                                        onImageClick={(index: number) => openLightbox(index + 1)}
                                    />
                                </div>
                            )}

                            {/* Key Features */}
                            <div className="animate-slide-up">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className={`p-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl`}>
                                        <FaLightbulb className="text-white text-xl" />
                                    </div>
                                    {content.sections.keyFeatures}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {project.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
                                            <div className="relative flex items-start gap-3 p-4 bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl group-hover:border-green-400/50 transition-all">
                                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Challenges & Solutions */}
                            {project.challenges && project.solutions && (
                                <div className="animate-slide-up">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <div className={`p-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl`}>
                                            <FaChartLine className="text-white text-xl" />
                                        </div>
                                        {content.sections.challengesSolutions}
                                    </h2>
                                    <div className="space-y-6">
                                        {project.challenges.map((challenge, index) => (
                                            <div
                                                key={index}
                                                className="group relative p-6 bg-white dark:bg-slate-800/50 backdrop-blur-sm border-l-4 border-blue-500 rounded-r-xl"
                                            >
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-2">
                                                    <span className="text-blue-500">⚡</span>
                                                    {content.sections.challenge}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-300 mb-4 ml-6">{challenge}</p>

                                                {project.solutions && project.solutions[index] && (
                                                    <>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-2">
                                                            <span className="text-green-500">✓</span>
                                                            {content.sections.solution}
                                                        </h4>
                                                        <p className="text-slate-600 dark:text-slate-300 ml-6">{project.solutions[index]}</p>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Results */}
                            {project.results && (
                                <div className="animate-slide-up">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <div className={`p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl`}>
                                            <FaCheckCircle className="text-white text-xl" />
                                        </div>
                                        {content.sections.resultsImpact}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {project.results.map((result, index) => (
                                            <div
                                                key={index}
                                                className="group relative"
                                            >
                                                <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity`} />
                                                <div className="relative p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl group-hover:scale-105 transition-transform">
                                                    <p className="text-slate-700 dark:text-slate-300 font-medium">{result}</p>
                                                </div>
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
                                <div className="animate-fade-in-up bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FaCode className="text-blue-500" />
                                        {content.sections.techStack}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-500/20 hover:scale-105 transition-all cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Learnings */}
                                {project.learnings && (
                                    <div className="animate-fade-in-up bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <FaGraduationCap className="text-purple-500" />
                                            {content.sections.keyLearnings}
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.learnings.map((learning, index) => (
                                                <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                                    <span className="text-purple-500 mt-1">•</span>
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Quick Links */}
                                <div className="animate-fade-in-up bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{content.sections.quickLinks}</h3>
                                    <div className="space-y-3">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                                            >
                                                <FaExternalLinkAlt className="group-hover:scale-110 transition-transform" />
                                                {content.sections.liveDemo}
                                            </a>
                                        )}
                                        {project.githubUrl && project.githubUrl !== "#" && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                                            >
                                                <FaGithub className="group-hover:rotate-12 transition-transform" />
                                                {content.sections.sourceCode}
                                            </a>
                                        )}
                                        <Link
                                            href="/projects"
                                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                                        >
                                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                            {content.sections.allProjects}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTA
                title={content.cta.title}
                description={content.cta.description}
                buttons={[
                    {
                        label: content.buttons.bookCall,
                        href: '/booking',
                        type: 'primary',
                        icon: 'calendar'
                    },
                    {
                        label: content.buttons.getInTouch,
                        href: '/contact',
                        type: 'secondary',
                        icon: 'envelope'
                    }
                ]}
                variant="default"
                showIcon={true}
            />

            {/* Lightbox Integration */}
            <GalleryLightbox
                images={allImages}
                isOpen={lightboxOpen}
                initialIndex={selectedImageIndex}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
}