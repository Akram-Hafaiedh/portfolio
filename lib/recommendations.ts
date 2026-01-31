// lib/recommendations.ts

import { Project, getProjects } from './projects';

/**
 * Recommends related projects based on shared type and common technologies.
 * Excludes the current project from the results.
 */
export const getRelatedProjects = (currentProject: Project, lang: 'en' | 'fr' = 'en', limit: number = 2): Project[] => {
    const allProjects = getProjects(lang);

    // Filter out the current project
    const candidates = allProjects.filter(p => p.id !== currentProject.id);

    const scored = candidates.map(project => {
        let score = 0;

        // Match project type (SaaS, ERP, Mobile, etc.) - High weight
        if (project.type === currentProject.type) {
            score += 10;
        }

        // Match technologies - Medium weight per match
        const commonTech = project.technologies.filter(tech =>
            currentProject.technologies.includes(tech)
        );
        score += commonTech.length * 2;

        return { project, score };
    });

    // Sort by score descending and return top matches
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(s => s.project);
};
