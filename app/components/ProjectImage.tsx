// components/ProjectImage.jsx (or wherever your project image component is)
import Image from 'next/image';
import ProjectImageFallback from './ProjectImageFallback';
import { Project } from '@/lib/projects';

interface ProjectImageProps {
    project: Project;
    imageUrl?: string;
    className?: string;
    compact?: boolean;
}
const ProjectImage = ({ project, imageUrl, className = '', compact = false }: ProjectImageProps) => {
    // Default gradients based on project type
    const getDefaultGradient = (project: Project) => {
        const type = project.type.toLowerCase();

        if (type.includes('mobile')) {
            return 'bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600';
        }
        if (type.includes('web') || type.includes('frontend')) {
            return 'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600';
        }
        if (type.includes('backend') || type.includes('api')) {
            return 'bg-gradient-to-br from-green-600 via-emerald-600 to-lime-600';
        }
        if (type.includes('fullstack')) {
            return 'bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600';
        }

        // Default gradient
        return 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600';
    };

    const projectWithGradient = {
        ...project,
        gradient: project.gradient || getDefaultGradient(project)
    };

    if (imageUrl) {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        );
    }

    return (
        <ProjectImageFallback
            project={projectWithGradient}
            className={className}
            compact={compact}
        />
    );
};

export default ProjectImage;