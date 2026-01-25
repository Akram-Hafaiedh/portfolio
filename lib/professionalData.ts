// lib/professionalData.ts

export type Language = 'en' | 'fr';

// Unified Professional Data Structure
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

export const professionalData: Record<Language, ProfessionalData> = {
    en: {
        pageTitle: "Professional Experience",
        subtitle: "Senior Full Stack Developer",
        downloadBtn: "Download Resume",
        languageToggle: "Français",
        viewAllBtn: "View All Experience",
        keyAchievements: "Key Achievements",
        technologiesUsed: "Technologies Used",
        contact: {
            email: "hafaiedhakram@gmail.com",
            phone: "+216 50 569 298",
            location: "Carthage, Tunis, Tunisia"
        },
        profile: {
            title: "Professional Profile",
            text: "Dynamic Senior Full Stack Developer with 4+ years of proven expertise in architecting and delivering scalable web solutions across diverse industries. Passionate about leveraging cutting-edge technologies including React, Vue.js, Next.js, Laravel, Django, and Node.js to build high-performance applications that drive business growth."
        },
        experienceSection: {
            title: "My Journey",
            subtitle: "Building impactful solutions across diverse technologies and industries",
            badge: "Professional Journey"
        },
        experiences: [
            {
                id: 1,
                title: "Freelance Full Stack Developer",
                company: "Casagroup",
                location: "Germany (Remote)",
                period: "July 2025 - October 2025",
                type: "Freelance",
                description: "Engineered a comprehensive enterprise management dashboard for the German market, enhancing operational efficiency through modular architecture and cutting-edge technologies.",
                achievements: [
                    "Engineered a comprehensive enterprise management dashboard for the German market, enhancing operational efficiency through modular architecture",
                    "Developed modular systems for insurance, accounting, taxation, HR, and leave management, ensuring seamless integration and scalability",
                    "Integrated advanced features including email systems, real-time notifications via WebSockets, and activity logs, improving user engagement by 30%",
                    "Built a modern React interface with shadcn/ui and Tailwind CSS, delivering a premium user experience with optimized performance"
                ],
                skills: ["React", "shadcn/ui", "TailwindCSS", "PHP", "Laravel", "TypeScript", "Node.js", "MySQL"],
                featured: true
            },
            {
                id: 2,
                title: "Senior Full Stack Developer",
                company: "Iberis",
                location: "Lac1, Tunis",
                period: "December 2023 - June 2025",
                type: "Full-time",
                description: "Led complete migration of the Iberis SaaS platform using Vue.js and Laravel, resulting in 40% improved system performance and driving user growth from 1k to 9k active users.",
                achievements: [
                    "Led complete migration of the Iberis SaaS platform using Vue.js and Laravel, resulting in 40% improved system performance and reliability",
                    "Developed Fintech SaaS modules with customizable PDF templates, dynamic headers/footers, multilingual support (FR/AR), multi-currency (XOF/XAF), and auto-numbering",
                    "Engineered standalone POS module with real-time stock synchronization, payment processing, and multi-currency tax configurations, reducing transaction times by 25%",
                    "Implemented subscription monetization with premium features (+1000 API calls/month) and Konnect integration, boosting revenue through enhanced user tiers",
                    "Created secure client/supplier portals with invitation systems, Google Calendar integration, and granular permissions",
                    "Optimized data processing with batch Excel imports (10k+ items) and interactive tables featuring filters/exports, handling large datasets efficiently via Redis caching",
                    "Drove significant user growth from 1k to 9k active users through scalable multi-tenant architecture and performance enhancements"
                ],
                skills: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Redis", "WebSocket", "Ionic", "Konnect", "Yajra", "Datatables", "Blade"],
                featured: true
            },
            {
                id: 3,
                title: "Full Stack Developer",
                company: "Next Consulting",
                location: "Tunis",
                period: "August 2023 - November 2023",
                type: "Full-time",
                description: "Developed complex business applications with real-time capabilities, including patient management systems, transport solutions, and real estate marketplaces.",
                achievements: [
                    "Developed complex business applications with real-time messaging via WebSockets, improving communication latency by 50%",
                    "Engineered a transportation solution with push notifications using Pusher, enhancing user responsiveness and operational efficiency",
                    "Built a real estate marketplace with advanced search engine powered by Meilisearch, increasing search accuracy and speed for users",
                    "Implemented microservices architecture to boost scalability, supporting high-traffic loads with modular, maintainable code"
                ],
                skills: ["Laravel", "Blade", "Vue.js", "React", "Next.js", "Node.js", "WebSocket", "Meilisearch"],
                featured: false
            },
            {
                id: 4,
                title: "Freelance Full Stack Developer",
                company: "Dcarte Solutions",
                location: "Lac2, Tunis",
                period: "October 2021 - June 2022",
                type: "Freelance",
                description: "Provided technical leadership for an innovative NFC business card system, managing the complete project lifecycle from concept to production deployment.",
                achievements: [
                    "Provided technical leadership for an innovative NFC business card system, ensuring robust architecture and seamless deployment",
                    "Developed responsive web interfaces and cross-platform mobile apps, improving accessibility across devices",
                    "Managed full project lifecycle from analysis to deployment, delivering on time and within scope using agile practices",
                    "Mentored team on best practices, enhancing code quality and collaboration through code reviews and training"
                ],
                skills: ["React", "React Native", "Django", "Laravel", "MySQL", "PostgreSQL", "TailwindCSS", "NFC"],
                featured: false
            },
            {
                id: 5,
                title: "Master's Project Engineer",
                company: "PHYSIOMEDICA",
                location: "Mégrine, Tunis",
                period: "February 2018 - August 2018",
                type: "Internship",
                description: "Conducted R&D for an innovative medical electronic system, focusing on hardware-software integration and clinical validation.",
                achievements: [
                    "Conducted R&D for an innovative medical electronic system, focusing on hardware-software integration",
                    "Designed a portable slimming device with Android interface, optimizing for user-friendly controls",
                    "Integrated Bluetooth and communication protocols, ensuring reliable data transfer and device connectivity",
                    "Performed clinical validation and ensured compliance with medical standards, contributing to product certification"
                ],
                skills: ["Java", "Android", "Bluetooth", "C/C++", "Altium Designer"],
                featured: false
            }
        ],
        education: {
            title: "Education & Certifications",
            items: [
                {
                    degree: "Master's in Biomedical Instrumentation",
                    institution: "Higher Institute of Medical Technologies, Tunis",
                    date: "2016 - 2018",
                    description: "Specialization in medical electronic systems and precision instrumentation"
                },
                {
                    degree: "Bachelor's in Biomedical Instrumentation",
                    institution: "Higher Institute of Medical Technologies, Tunis",
                    date: "2013 - 2016",
                    description: "In-depth technical training in electronics and embedded systems"
                },
                {
                    degree: "MEAN Stack Certification",
                    institution: "Technologia Academy",
                    date: "2021",
                    description: "Full-stack development: MongoDB, Express.js, Angular, Node.js"
                },
                {
                    degree: "Self-Taught Full Stack Training",
                    institution: "Ongoing Training",
                    date: "2019 - 2024",
                    description: "Continuous learning of modern web technologies and development best practices"
                }
            ]
        },
        skills: {
            title: "Technical Skills",
            categories: [
                {
                    name: "Frontend",
                    items: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "Bootstrap", "shadcn/ui"]
                },
                {
                    name: "Backend",
                    items: ["Laravel", "Django", "Node.js", "Express.js", "PHP", "Python", "REST API", "GraphQL"]
                },
                {
                    name: "Mobile",
                    items: ["React Native", "Ionic", "Flutter"]
                },
                {
                    name: "Databases",
                    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"]
                },
                {
                    name: "DevOps & Tools",
                    items: ["Docker", "Git", "CI/CD", "AWS S3", "WebSocket", "Meilisearch"]
                },
                {
                    name: "Methodologies",
                    items: ["Agile", "Scrum", "TDD", "Code Review", "Microservices"]
                }
            ]
        },
        languages: {
            title: "Languages",
            items: [
                { lang: "Arabic", level: "Native", percentage: 100 },
                { lang: "French", level: "Fluent (C1)", percentage: 100 },
                { lang: "English", level: "Intermediate (B2)", percentage: 85 },
                { lang: "Spanish", level: "Basic (A2)", percentage: 40 }
            ]
        },
        social: {
            title: "Professional Networks",
            items: [
                { platform: "LinkedIn", username: "akram-hafaiedh" },
                { platform: "GitHub", username: "@akramhafaiedh" },
                { platform: "GitLab", username: "Hafaiedh.Akram" }
            ]
        }
    },
    fr: {
        pageTitle: "Expérience Professionnelle",
        subtitle: "Développeur Full Stack Senior",
        downloadBtn: "Télécharger CV",
        languageToggle: "English",
        viewAllBtn: "Voir Toute l'Expérience",
        keyAchievements: "Réalisations Clés",
        technologiesUsed: "Technologies Utilisées",
        contact: {
            email: "hafaiedhakram@gmail.com",
            phone: "+216 50 569 298",
            location: "Carthage, Tunis, Tunisie"
        },
        profile: {
            title: "Profil Professionnel",
            text: "Développeur Full Stack Senior dynamique avec plus de 4 ans d'expertise avérée dans l'architecture et la livraison de solutions web scalables à travers divers secteurs. Passionné par l'utilisation de technologies de pointe comme React, Vue.js, Next.js, Laravel, Django et Node.js pour construire des applications haute performance qui stimulent la croissance business."
        },
        experienceSection: {
            title: "Mon Parcours",
            subtitle: "Construire des solutions impactantes à travers diverses technologies et industries",
            badge: "Parcours Professionnel"
        },
        experiences: [
            {
                id: 1,
                title: "Développeur Full Stack Freelance",
                company: "Casagroup",
                location: "Allemagne (Remote)",
                period: "Juillet 2025 - Octobre 2025",
                type: "Freelance",
                description: "Conçu un dashboard complet de gestion d'entreprise adapté au marché allemand, améliorant l'efficacité opérationnelle via une architecture modulaire et des technologies de pointe.",
                achievements: [
                    "Conçu un dashboard complet de gestion d'entreprise adapté au marché allemand, améliorant l'efficacité opérationnelle via une architecture modulaire",
                    "Développé des systèmes modulaires pour assurances, comptabilité, fiscalité, RH et congés, garantissant une intégration fluide et une scalabilité accrue",
                    "Intégré des fonctionnalités avancées comme un système d'emailing, notifications en temps réel via WebSockets et logs d'activité, augmentant l'engagement utilisateur de 30%",
                    "Construit une interface React moderne avec shadcn/ui et Tailwind CSS, offrant une expérience premium avec des performances optimisées"
                ],
                skills: ["React", "shadcn/ui", "TailwindCSS", "PHP", "Laravel", "TypeScript", "Node.js", "MySQL"],
                featured: true
            },
            {
                id: 2,
                title: "Développeur Full Stack Confirmé",
                company: "Iberis",
                location: "Lac1, Tunis",
                period: "Décembre 2023 - Juin 2025",
                type: "Temps plein",
                description: "Dirigé la migration complète de la plateforme SaaS Iberis avec Vue.js et Laravel, résultant en une amélioration de 40% des performances et une croissance de 1k à 9k utilisateurs actifs.",
                achievements: [
                    "Dirigé la migration complète de la plateforme SaaS Iberis avec Vue.js et Laravel, résultant en une amélioration de 40% des performances et de la fiabilité",
                    "Développé des modules Fintech SaaS avec modèles PDF personnalisables, en-têtes/pieds dynamiques, support multilingue (FR/AR), multi-devises (XOF/XAF) et numérotation automatique",
                    "Conçu un module PDV autonome avec synchronisation stocks en temps réel, traitement paiements et configurations fiscales multi-devises, réduisant les temps de transaction de 25%",
                    "Implémenté une monétisation d'abonnements avec fonctionnalités premium (+1000 appels API/mois) et intégration Konnect, augmentant les revenus via des niveaux d'utilisateurs améliorés",
                    "Créé des portails clients/fournisseurs sécurisés avec invitations, intégration Google Calendar et permissions granulaires",
                    "Optimisé le traitement des données avec imports Excel par lots (10k+ articles) et tableaux interactifs avec filtres/exports, gérant efficacement de grands ensembles via Redis",
                    "Piloté une croissance significative des utilisateurs de 1k à 9k actifs grâce à une architecture multi-tenant scalable et des améliorations de performance"
                ],
                skills: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Redis", "WebSocket", "Ionic", "Konnect", "Yajra", "Datatables", "Blade"],
                featured: true
            },
            {
                id: 3,
                title: "Développeur Full Stack",
                company: "Next Consulting",
                location: "Tunis",
                period: "Août 2023 - Novembre 2023",
                type: "Temps plein",
                description: "Développé des applications métier complexes avec capacités temps réel, incluant systèmes de gestion patients, solutions de transport et marketplaces immobilières.",
                achievements: [
                    "Développé des applications métier complexes avec messagerie en temps réel via WebSockets, réduisant la latence de communication de 50%",
                    "Conçu une solution de transport avec notifications push (Pusher), améliorant la réactivité utilisateur et l'efficacité opérationnelle",
                    "Construit une marketplace immobilier avec moteur de recherche avancé (Meilisearch), augmentant la précision et la vitesse des recherches",
                    "Implémenté une architecture microservices pour booster la scalabilité, supportant des charges élevées avec un code modulaire et maintenable"
                ],
                skills: ["Laravel", "Blade", "Vue.js", "React", "Next.js", "Node.js", "WebSocket", "Meilisearch"],
                featured: false
            },
            {
                id: 4,
                title: "Développeur Full Stack Freelance",
                company: "Dcarte Solutions",
                location: "Lac2, Tunis",
                period: "Octobre 2021 - Juin 2022",
                type: "Freelance",
                description: "Assuré le leadership technique pour un système innovant de cartes de visite NFC, gérant le cycle de vie complet du projet du concept au déploiement en production.",
                achievements: [
                    "Assuré le leadership technique pour un système innovant de cartes de visite NFC, garantissant une architecture robuste et un déploiement fluide",
                    "Développé des interfaces web responsives et applications mobiles cross-platform, améliorant l'accessibilité sur divers appareils",
                    "Géré le cycle de vie complet du projet de l'analyse au déploiement, livrant dans les délais et le scope via des pratiques agiles",
                    "Encadré l'équipe sur les bonnes pratiques, améliorant la qualité du code et la collaboration via des revues de code et formations"
                ],
                skills: ["React", "React Native", "Django", "Laravel", "MySQL", "PostgreSQL", "TailwindCSS", "NFC"],
                featured: false
            },
            {
                id: 5,
                title: "Ingénieur Projet de Master",
                company: "PHYSIOMEDICA",
                location: "Mégrine, Tunis",
                period: "Février 2018 - Août 2018",
                type: "Stage",
                description: "Mené la R&D pour un système électronique médical innovant, en se focalisant sur l'intégration hardware-software et la validation clinique.",
                achievements: [
                    "Mené la R&D pour un système électronique médical innovant, en se focalisant sur l'intégration hardware-software",
                    "Conçu un dispositif portable d'amincissement avec interface Android, optimisé pour des contrôles conviviaux",
                    "Intégré Bluetooth et protocoles de communication, assurant un transfert de données fiable et une connectivité des appareils",
                    "Réalisé la validation clinique et assuré la conformité aux normes médicales, contribuant à la certification du produit"
                ],
                skills: ["Java", "Android", "Bluetooth", "C/C++", "Altium Designer"],
                featured: false
            }
        ],
        education: {
            title: "Formation & Certifications",
            items: [
                {
                    degree: "Master en Instrumentation Biomédicale",
                    institution: "Institut Supérieur des Technologies Médicales, Tunis",
                    date: "2016 - 2018",
                    description: "Spécialisation en systèmes électroniques médicaux et instrumentation de précision"
                },
                {
                    degree: "Licence en Instrumentation Biomédicale",
                    institution: "Institut Supérieur des Technologies Médicales, Tunis",
                    date: "2013 - 2016",
                    description: "Formation technique approfondie en électronique et systèmes embarqués"
                },
                {
                    degree: "Certification MEAN Stack",
                    institution: "Technologia Academy",
                    date: "2021",
                    description: "Développement full-stack : MongoDB, Express.js, Angular, Node.js"
                },
                {
                    degree: "Formation Full Stack Autodidacte",
                    institution: "Formation Continue",
                    date: "2019 - 2024",
                    description: "Apprentissage continu des technologies web modernes et des meilleures pratiques du développement"
                }
            ]
        },
        skills: {
            title: "Compétences Techniques",
            categories: [
                {
                    name: "Frontend",
                    items: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "Bootstrap", "shadcn/ui"]
                },
                {
                    name: "Backend",
                    items: ["Laravel", "Django", "Node.js", "Express.js", "PHP", "Python", "REST API", "GraphQL"]
                },
                {
                    name: "Mobile",
                    items: ["React Native", "Ionic", "Flutter"]
                },
                {
                    name: "Bases de Données",
                    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"]
                },
                {
                    name: "DevOps & Outils",
                    items: ["Docker", "Git", "CI/CD", "AWS S3", "WebSocket", "Meilisearch"]
                },
                {
                    name: "Méthodologies",
                    items: ["Agile", "Scrum", "TDD", "Code Review", "Microservices"]
                }
            ]
        },
        languages: {
            title: "Langues",
            items: [
                { lang: "Arabe", level: "Langue maternelle", percentage: 100 },
                { lang: "Français", level: "Courant (C1)", percentage: 100 },
                { lang: "Anglais", level: "Intermédiaire (B2)", percentage: 85 },
                { lang: "Espagnol", level: "Notions (A2)", percentage: 40 }
            ]
        },
        social: {
            title: "Réseaux Professionnels",
            items: [
                { platform: "LinkedIn", username: "akram-hafaiedh" },
                { platform: "GitHub", username: "@akramhafaiedh" },
                { platform: "GitLab", username: "Hafaiedh.Akram" }
            ]
        }
    }
};

// Helper functions
export const getFeaturedExperiences = (lang: Language, count = 2) => {
    return professionalData[lang].experiences
        .filter(exp => exp.featured)
        .slice(0, count);
};

export const getAllExperiences = (lang: Language) => {
    return professionalData[lang].experiences;
};

export const getProfessionalData = (lang: Language) => {
    return professionalData[lang];
};