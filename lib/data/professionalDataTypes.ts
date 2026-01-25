// Shared TypeScript interfaces for professional data

export interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    period: string;
    type: string;
    description: string;
    achievements: string[];
    skills: string[];
    featured: boolean;
}

export interface Education {
    degree: string;
    institution: string;
    date: string;
    description?: string;
}

export interface SkillCategory {
    name: string;
    items: string[];
}

export interface LanguageSkill {
    lang: string;
    level: string;
    percentage: number;
}

export interface ProfessionalData {
    pageTitle: string;
    subtitle: string;
    downloadBtn: string;
    languageToggle: string;
    viewAllBtn: string;
    keyAchievements: string;
    technologiesUsed: string;
    contact: {
        email: string;
        phone: string;
        location: string;
    };
    profile: {
        title: string;
        text: string;
    };
    experienceSection: {
        title: string;
        subtitle: string;
        badge: string;
    };
    professionalSummary: {
        title: string;
        subtitle: string;
        stats: {
            yearsLabel: string;
            companiesLabel: string;
            technologiesLabel: string;
        };
        downloadDescription: string;
    };
    cta: {
        badge: string;
        title: string;
        description: string;
        getInTouch: string;
        viewWork: string;
    };
    experiences: Experience[];
    education: {
        title: string;
        items: Education[];
    };
    skills: {
        title: string;
        categories: SkillCategory[];
    };
    languages: {
        title: string;
        items: LanguageSkill[];
    };
    social: {
        title: string;
        items: {
            platform: string;
            username: string;
        }[];
    };
}
