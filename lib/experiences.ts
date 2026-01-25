//lib/experiences.ts
export const allExperiences = [

    {
        id: 1,
        title: "Full Stack Developer | Freelance",
        company: "Casagroup",
        location: "Germany (Remote)",
        period: "July 2025 - October 2025",
        type: "Freelance",
        description: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
        achievements: [
            "Built comprehensive home services management platform",
            "Implemented advanced search functionality with Meilisearch",
            "Integrated AWS S3 for document storage and PDF generation",
            "Developed CV generation system with customizable templates"
        ],
        skills: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js", "AWS S3", "Meilisearch"],
        featured: true
    },
    {
        id: 2,
        title: "Full Stack Developer",
        company: "Iberis",
        location: "Lac1, Tunis",
        period: "December 2023 - June 2025",
        type: "Full-time",
        description: "Migrated and enhanced UI/UX of Iberis online management and billing platform by integrating Vue.js with Laravel, improving key features like invoicing, expense tracking, client and stock management.",
        achievements: [
            "Successfully migrated legacy system to modern Vue.js frontend",
            "Improved user experience and interface design",
            "Enhanced billing and invoicing system functionality",
            "Optimized database queries and performance"
        ],
        skills: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Git", "Docker"],
        featured: true
    },

    {
        id: 3,
        title: "Full Stack Developer",
        company: "Next Consulting",
        location: "Tunis",
        period: "August 2023 - November 2024",
        type: "Full-time",
        description: "Patient management app with real-time messaging via WebSockets. Transport solution with push notifications via Pusher. Real estate marketplace with advanced search engine (Melisearch).",
        achievements: [
            "Developed real-time patient management system with WebSocket integration",
            "Built transport solution with push notification system",
            "Created real estate marketplace with advanced search capabilities",
            "Implemented real-time messaging features"
        ],
        skills: ["Laravel", "Vue.js", "Next.js", "Node.js", "WebSocket", "Pusher", "Meilisearch"],
        featured: false
    },
    {
        id: 4,
        title: "Full Stack Developer",
        company: "Dcarte Solutions",
        location: "Lac2, Tunis",
        period: "March 2022 - October 2023",
        type: "Full-time",
        description: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
        achievements: [
            "Led development of NFC business card system from concept to production",
            "Built both web interface and mobile application",
            "Managed complete project lifecycle and deployment",
            "Implemented NFC technology integration"
        ],
        skills: ["React", "React Native", "Django", "Laravel", "TailwindCSS", "NFC", "Mobile Development"],
        featured: false
    }
];


export const getFeaturedExperiences = (count = 2) => {
    return allExperiences
        .filter(exp => exp.featured)
        .slice(0, count)
        .map(({ id, title, company, location, period, description, skills }) => ({
            id, title, company, location, period, description, skills
        }));
};

export const getAllExperiences = () => allExperiences;