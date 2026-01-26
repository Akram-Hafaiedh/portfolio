// app/projects/[id]/page.tsx
import { getProjectById } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "./projectPageClient";

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
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

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectPageClient project={project} />;
}