export interface Project {
    id: number;
    title: string;
    shortDescription?: string;
    longDescription: string;
    fullDescription?: string;
    image: string;
    images?: string[];
    type: 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Freelance';
    role: string;
    timeline: string;
    company?: string;
    status?: 'Completed' | 'In Progress' | 'On Hold' | 'Abandoned';
    technologies: string[];
    features: string[];
    challenges: string[];
    solutions?: string[];
    results?: string[];
    liveUrl?: string;
    githubUrl?: string;
    learnings?: string[];
    featured: boolean;
    gradient: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Iberis.io",
        shortDescription: "Migrated and enhanced UI/UX of online management and billing platform with Vue.js and Laravel, improving invoicing, expense tracking, client and stock management.",
        longDescription: "A comprehensive business management platform that handles all aspects of company operations including invoicing, expense tracking, client management, and inventory control. The project involved migrating from a legacy system to a modern Vue.js frontend with Laravel backend, significantly improving user experience and system performance.",
        fullDescription: 'Led the complete overhaul of Iberis\'s management platform, transforming a legacy system into a modern, efficient web application. The project involved migrating from outdated technologies to a Vue.js frontend with Laravel backend, significantly improving user experience and system performance. Implemented real-time features, optimized database queries, and created an intuitive user interface that reduced training time for new users.',
        image: "/projects/iberis.png",
        images: [
            '/projects/iberis-dashboard.jpg',
            '/projects/iberis-invoicing.jpg',
            '/projects/iberis-clients.jpg'
        ],
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Dec 2023 - Present",
        company: "Iberis",
        status: "Completed",
        technologies: ["Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Git", "Docker"],
        features: [
            'Real-time invoicing and billing system',
            'Client and stock management dashboard',
            'Expense tracking and reporting',
            'User authentication and role-based access',
            'Responsive design for all devices',
            'Automated report generation',
            'Multi-currency support'
        ],
        challenges: [
            "Migrating legacy system without downtime",
            "Optimizing database queries for large datasets",
            "Implementing real-time updates across multiple users",
            "Ensuring data integrity during migration",
            "Training non-technical staff on new system"
        ],
        solutions: [
            'Implemented phased migration strategy with rollback capabilities',
            'Optimized database queries and added caching layer',
            'Used WebSockets for real-time updates',
            'Created data validation scripts and backup systems',
            'Developed comprehensive user documentation and training materials'
        ],
        results: [
            'Reduced loading times by 40%',
            'Improved user satisfaction by 60%',
            'Decreased support tickets by 35%',
            'Enabled real-time business insights',
            'Reduced manual data entry by 70%'
        ],
        learnings: [
            'Importance of stakeholder communication in legacy migrations',
            'Performance optimization techniques for large datasets',
            'Best practices for secure payment integrations',
            'User-centered design principles for business applications'
        ],
        gradient: "from-blue-500 to-purple-600",
        liveUrl: "https://finances.iberis.io/fr/",
        githubUrl: "#",
        featured: true,
    },
    {
        id: 2,
        title: "Casa-Group.ch",
        shortDescription: "Home services platform with resource management system, PDF generation (AWS S3), CV generation app with advanced search (Melisearch), and planning management.",
        longDescription: "A comprehensive platform for managing home services, connecting service providers with customers. Features include advanced search functionality, document generation, CV management for service providers, and comprehensive planning tools for service scheduling and management.",
        fullDescription: "Developed a full-stack home services platform that revolutionizes how service providers connect with clients. The platform includes advanced search capabilities powered by Meilisearch, automated PDF generation for quotes and invoices stored on AWS S3, and a sophisticated CV generation system for service providers to showcase their skills and experience.",
        image: "/projects/casagroup.png",
        images: [
            '/projects/casagroup-dashboard.jpg',
            '/projects/casagroup-search.jpg',
            '/projects/casagroup-booking.jpg'
        ],
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Jan 2024 - Jun 2025",
        company: "Casagroup (Germany)",
        status: "Completed",
        technologies: ["React", "shadcn/ui", "TailwindCSS", "Laravel", "Node.js", "AWS S3", "Meilisearch", "Docker"],
        features: [
            "Advanced search with Meilisearch integration",
            "PDF generation and document management with AWS S3",
            "CV generation system for service providers",
            "Real-time booking and scheduling",
            "Payment integration and invoicing",
            "Mobile-responsive design",
            "Multi-language support"
        ],
        challenges: [
            "Implementing complex search algorithms across multiple data types",
            "Integrating multiple third-party services (AWS, payment gateways)",
            "Optimizing PDF generation for large documents",
            "Managing real-time data synchronization between providers and clients",
            "Ensuring data privacy and security for user documents"
        ],
        solutions: [
            "Implemented Meilisearch for fast, relevant search results",
            "Used AWS S3 for secure document storage with proper access controls",
            "Created a PDF microservice for efficient document generation",
            "Implemented WebSocket connections for real-time updates",
            "Applied encryption and access control for sensitive data"
        ],
        results: [
            "Reduced search response time to under 200ms",
            "Automated 90% of document generation processes",
            "Increased booking conversion rate by 25%",
            "Improved user engagement with real-time notifications"
        ],
        learnings: [
            "Advanced search implementation with Meilisearch",
            "AWS S3 integration and file management best practices",
            "Real-time application architecture with WebSockets",
            "Multi-tenant application security considerations"
        ],
        gradient: "from-green-500 to-teal-600",
        liveUrl: "#",
        githubUrl: "#",
        featured: true
    },
    {
        id: 3,
        title: "NFC Business Card System",
        shortDescription: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
        longDescription: "An innovative NFC-based business card system that allows users to share contact information digitally. The system includes both web and mobile applications, enabling users to create, customize, and share digital business cards using NFC technology.",
        fullDescription: "Led the development of a cutting-edge NFC business card system from concept to production. The project involved creating a React web application for card management and customization, along with a React Native mobile app for scanning and sharing NFC cards. The system integrated hardware (NFC chips) with software to create a seamless digital business card experience.",
        image: "", // No image available
        images: [], // No additional images
        type: "Full Stack",
        role: "Full Stack Developer & Project Lead",
        timeline: "Mar 2022 - Oct 2023",
        company: "Dcarte Solutions",
        status: "Abandoned",
        technologies: ["React", "React Native", "Django", "Laravel", "TailwindCSS", "NFC Technology", "Mobile Development", "Python", "JavaScript"],
        features: [
            "NFC technology integration for contactless sharing",
            "Cross-platform mobile application (iOS & Android)",
            "Customizable business card templates and themes",
            "Contact information management and analytics",
            "Offline functionality for card scanning",
            "Social media integration",
            "QR code generation as fallback"
        ],
        challenges: [
            "Integrating NFC technology across different mobile devices and platforms",
            "Ensuring cross-platform compatibility for both web and mobile",
            "Managing offline data synchronization for scanned cards",
            "Implementing secure data transfer via NFC",
            "Hardware-software integration challenges",
            "Battery consumption optimization for continuous NFC scanning"
        ],
        solutions: [
            "Developed platform-specific NFC implementations for iOS and Android",
            "Used React Native for cross-platform mobile development",
            "Implemented local storage with periodic cloud synchronization",
            "Applied encryption for NFC data transmission",
            "Created hardware testing protocols for NFC chip compatibility",
            "Optimized scanning intervals to balance functionality and battery life"
        ],
        results: [
            "Successfully prototyped and tested with 50+ users",
            "Achieved 95% NFC scanning success rate across devices",
            "Reduced mobile app size by 30% through optimization",
            "Created scalable architecture for future feature additions"
        ],
        learnings: [
            "Hardware-software integration challenges and solutions",
            "Mobile development best practices for battery optimization",
            "Cross-platform development considerations",
            "Startup product development lifecycle",
            "Importance of market validation before full-scale development"
        ],
        gradient: "from-purple-500 to-pink-600",
        liveUrl: "#",
        githubUrl: "#",
        featured: false
    }
];

export const featuredProjects = projects.filter(project => project.featured);

export const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id.toString() === id);
};