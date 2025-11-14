// components/ProjectImageFallback.jsx
import { Project } from '@/lib/projects';
import { FaMobile, FaGlobe, FaCode, FaDatabase, FaCloud, FaShieldAlt, FaIdCard, FaProjectDiagram } from 'react-icons/fa';

interface ProjectImageProps {
    project: Project;
    className?: string;
    compact?: boolean;
}
const ProjectImageFallback = ({ project, className = '', compact = false }: ProjectImageProps) => {
    // Map project types to appropriate icons
    const getProjectIcon = () => {
        const type = project.type.toLowerCase();
        const title = project.title.toLowerCase();

        if (type.includes('mobile') || title.includes('mobile') || title.includes('app')) {
            return FaMobile;
        }
        if (type.includes('web') || title.includes('web') || title.includes('website')) {
            return FaGlobe;
        }
        if (type.includes('api') || title.includes('api') || title.includes('backend')) {
            return FaCode;
        }
        if (type.includes('database') || title.includes('db') || title.includes('data')) {
            return FaDatabase;
        }
        if (type.includes('cloud') || title.includes('aws') || title.includes('azure')) {
            return FaCloud;
        }
        if (type.includes('security') || title.includes('auth') || title.includes('secure')) {
            return FaShieldAlt;
        }
        if (title.includes('nfc') || title.includes('card')) {
            return FaIdCard;
        }

        return FaProjectDiagram;
    };

    const ProjectIcon = getProjectIcon();

    if (compact) {
        // Compact version for cards
        return (
            <div className={`w-full h-full ${project.gradient} relative overflow-hidden ${className}`}>
                {/* Simplified animated blob shapes */}
                <div className="absolute inset-0">
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-blob"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/15 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-white">
                    {/* Smaller icon without hover effects */}
                    <div className="mb-2">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                            <ProjectIcon className="text-3xl opacity-90" />
                        </div>
                    </div>

                    {/* Only show title in compact mode */}
                    <h3 className="text-sm font-semibold text-center mb-1 drop-shadow-md line-clamp-2">
                        {project.title}
                    </h3>

                    {/* Smaller type badge */}
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs border border-white/30">
                        {project.type}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full h-full ${project.gradient} relative overflow-hidden ${className}`}>
            {/* Animated blob shapes */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/15 rounded-full blur-3xl animate-blob delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob delay-4000"></div>
            </div>

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <svg className="w-full h-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-2xl">
                        <ProjectIcon className="text-6xl opacity-90" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-center mb-3 drop-shadow-lg">{project.title}</h3>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 shadow-lg">
                    {project.type}
                </span>

                {/* Tech stack preview */}
                <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs border border-white/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectImageFallback;