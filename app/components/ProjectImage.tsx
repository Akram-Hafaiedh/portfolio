// components/ProjectImage.tsx
import { Project } from "@/lib/projects";
import {
    FaMobile,
    FaGlobe,
    FaCode,
    FaBusinessTime,
    FaProjectDiagram,
    FaIdCard,
    FaCloud,
    FaDatabase,
    FaShieldAlt
} from "react-icons/fa";

interface ProjectImageProps {
    project: Project;
    className?: string;
    showIcon?: boolean;
    iconSize?: "sm" | "md" | "lg" | "xl";
}

export default function ProjectImage({
    project,
    className = "",
    showIcon = true,
    iconSize = "md"
}: ProjectImageProps) {
    // If project has an image, use it
    if (project.image) {
        return (
            <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover ${className}`}
            />
        );
    }

    // Icon size mapping
    const iconSizeMap = {
        sm: "text-2xl",
        md: "text-4xl",
        lg: "text-6xl",
        xl: "text-8xl"
    };
    

    // Get appropriate icon based on project title and type
    const getIconByProject = () => {
        const title = project.title.toLowerCase();
        const type = project.type.toLowerCase();

        // Check for specific project types first
        if (title.includes('nfc') || title.includes('card')) {
            return <FaIdCard className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }
        if (title.includes('business') || title.includes('management')) {
            return <FaBusinessTime className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }
        if (title.includes('cloud') || title.includes('aws')) {
            return <FaCloud className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }
        if (title.includes('security') || title.includes('shield')) {
            return <FaShieldAlt className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }
        if (title.includes('database') || title.includes('data')) {
            return <FaDatabase className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }

        // Fallback to type-based icons
        switch (type) {
            case 'mobile':
                return <FaMobile className={`${iconSizeMap[iconSize]} opacity-90`} />;
            case 'frontend':
                return <FaGlobe className={`${iconSizeMap[iconSize]} opacity-90`} />;
            case 'backend':
                return <FaCode className={`${iconSizeMap[iconSize]} opacity-90`} />;
            case 'full stack':
                return <FaProjectDiagram className={`${iconSizeMap[iconSize]} opacity-90`} />;
            default:
                return <FaProjectDiagram className={`${iconSizeMap[iconSize]} opacity-90`} />;
        }
    };

    // Status badge color
    const getStatusColor = () => {
        switch (project.status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'in progress':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'on hold':
            case 'abandoned':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className={`w-full h-full ${project.gradient} flex items-center justify-center text-white relative overflow-hidden group ${className}`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full blur-xl animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5 bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="text-center p-6 relative z-10">
                {showIcon && (
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {getIconByProject()}
                    </div>
                )}

                <div className="space-y-3">
                    <div className="text-xl font-bold opacity-95 leading-tight">
                        {project.title}
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                            {project.type}
                        </span>

                        {project.status && project.status !== 'Completed' && (
                            <span className={`${getStatusColor()} px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm`}>
                                {project.status}
                            </span>
                        )}
                    </div>
                </div>

                {/* Tech stack preview */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1 justify-center opacity-80">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                                key={index}
                                className="bg-white/10 px-2 py-1 rounded text-xs border border-white/20"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="bg-white/10 px-2 py-1 rounded text-xs border border-white/20">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}