// lib/projects.ts

import { projects as enProjects, Project, ProjectImage } from './data/en/projects';
import { projects as frProjects } from './data/fr/projects';

export type { Project, ProjectImage };

export const getProjects = (lang: 'en' | 'fr' = 'en') => {
    return lang === 'fr' ? frProjects : enProjects;
};

export const projects = enProjects; // Backward compatibility/default

export const featuredProjects = projects.filter(project => project.featured === true); // Default to EN

export const getFeaturedProjects = (lang: 'en' | 'fr' = 'en') => {
    const projectsList = getProjects(lang);
    return projectsList.filter(project => project.featured === true);
};

export const getProjectById = (id: string, lang: 'en' | 'fr' = 'en'): Project | undefined => {
    const projectsList = getProjects(lang);
    return projectsList.find(project => project.id.toString() === id);
};