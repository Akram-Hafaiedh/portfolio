import { experiences as enExperiences } from './data/en/experiences';
import { experiences as frExperiences } from './data/fr/experiences';

export type Experience = typeof enExperiences[0];

export const getExperiences = (lang: 'en' | 'fr' = 'en') => {
    return lang === 'fr' ? frExperiences : enExperiences;
};

export const getFeaturedExperiences = (lang: 'en' | 'fr' = 'en', count = 2) => {
    const experiences = getExperiences(lang);
    return experiences
        .filter(exp => exp.featured)
        .slice(0, count)
        .map(({ id, title, company, location, period, description, skills }) => ({
            id, title, company, location, period, description, skills
        }));
};

export const getAllExperiences = (lang: 'en' | 'fr' = 'en') => getExperiences(lang);