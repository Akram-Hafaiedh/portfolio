// app/projects/[id]/page.tsx
import { getProjectById } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "./projectPageClient";

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const project = getProjectById(id, locale as 'en' | 'fr');

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

export default async function ProjectPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params;
    const project = getProjectById(id, locale as 'en' | 'fr');

    if (!project) {
        notFound();
    }

    return <ProjectPageClient project={project} />;
}