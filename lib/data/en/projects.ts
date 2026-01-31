// lib/data/en/projects.ts

export interface ProjectImage {
    url: string;
    caption: string;
    category?: string;
}

export interface Project {
    id: number;
    title: string;
    shortDescription?: string;
    longDescription: string;
    fullDescription?: string;
    image: string;
    gallery?: ProjectImage[];
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

export const projectsPageContent = {
    hero: {
        badge: "Projects",
        projectsCount: "Projects Built & Counting",
        mainTitle: "Crafting Digital",
        mainTitleSecond: "Experiences",
        subtitle: "Turning",
        subtitleHighlight1: "complex problems",
        subtitleMiddle: "into",
        subtitleHighlight2: "elegant solutions",
        subtitleEnd: "through code, creativity, and innovation",
        scrollText: "Scroll to explore projects"
    },
    stats: {
        completed: "Completed",
        inProgress: "In Progress",
        technologies: "Technologies",
        experience: "Years Exp"
    },
    featured: {
        title: "Featured Projects",
        description: "Highlighting my best work and achievements"
    },
    technologies: {
        title: "Technologies I Work With",
        subtitle: "A diverse tech stack powering innovative solutions"
    },
    filters: {
        all: "All Projects",
        saas: "SaaS & ERP",
        enterprise: "Enterprise",
        mobile: "Mobile & R&D",
        personal: "Personal"
    },
    search: {
        placeholder: "Search projects, technologies...",
        grid: "Grid",
        list: "List"
    },
    results: {
        showing: "Showing",
        of: "of",
        projects: "projects",
        in: "in",
        matching: "matching",
        noProjects: "No projects found",
        noResults: "No results matching",
        noType: "No",
        available: "projects available",
        showAll: "Show All Projects"
    },
    loadMore: {
        button: "Load More Projects",
        remaining: "remaining"
    },
    cta: {
        title: "Ready to Start Your Project?",
        description: "I'm passionate about turning ideas into reality. Let's discuss how we can bring your vision to life with cutting-edge technology and exceptional user experiences.",
        bookCall: "Book a Project Call",
        viewExperience: "View My Experience"
    },
};

export const projectDetailsContent = {
    backButton: "Back to Projects",
    status: {
        completed: "Completed",
        inProgress: "In Progress",
        onHold: "On Hold",
        cancelled: "Cancelled"
    },
    badges: {
        featured: "Featured"
    },
    buttons: {
        viewLiveDemo: "View Live Demo",
        viewSourceCode: "View Source Code",
        bookCall: "Book a Call",
        getInTouch: "Get in Touch"
    },
    meta: {
        role: "Role",
        timeline: "Timeline",
        company: "Company",
        personal: "Personal",
        technologies: "Technologies"
    },
    sections: {
        projectOverview: "Project Overview",
        projectGallery: "Project Gallery",
        keyFeatures: "Key Features",
        challengesSolutions: "Challenges & Solutions",
        challenge: "Challenge:",
        solution: "Solution:",
        resultsImpact: "Results & Impact",
        techStack: "Tech Stack",
        keyLearnings: "Key Learnings",
        quickLinks: "Quick Links",
        liveDemo: "Live Demo",
        sourceCode: "Source Code",
        allProjects: "All Projects",
        relatedProjects: "Related Projects you might like"
    },
    cta: {
        title: "Interested in working together?",
        description: "Let's discuss your project and create something amazing together."
    },
    comingSoon: {
        title: "Coming Soon",
        description: "This project is currently under active development. Stay tuned for updates!",
        featuresTitle: "Planned Features",
        techTitle: "Tech Stack Under Consideration",
        notifyText: "Want to be notified when it's live?"
    }
};

export const projects: Project[] = [
    {
        id: 1,
        title: "Personal Portfolio",
        shortDescription: "Modern, full-stack portfolio with real-time booking system, multi-language resume, and automated email communications. Built with cutting-edge technologies to showcase my work and streamline client interactions.",
        longDescription: "A comprehensive portfolio platform that goes beyond traditional showcases by integrating real client interaction tools. Features include a Google Calendar booking system with automated Google Meet creation, multi-language resume with PDF generation, and seamless email communications via Resend.",
        fullDescription: "Designed and developed a full-stack portfolio website that serves as both a project showcase and a client interaction platform. The site features a real-time booking system integrated with Google Calendar and Google Meet, automated email notifications using Resend, a dynamic multi-language resume system with live preview and PDF download capabilities, and a modern, responsive design built with Next.js and TailwindCSS. The portfolio demonstrates advanced full-stack development skills while solving real business needs for client acquisition and communication.",
        image: "/projects/portfolio.png",
        gallery: [
            {
                url: '/projects/portfolio-architecture.png',
                caption: 'Full System Architecture - Next.js 15, TypeScript, Google APIs, Resend Email',
                category: 'Architecture'
            },
            {
                url: '/projects/portfolio-deployment.png',
                caption: 'Vercel Deployment History - Fast Build Times & Continuous Deployment',
                category: 'DevOps'
            },
            {
                url: '/projects/portfolio-booking-interface.png',
                caption: 'Complete Booking Experience - Date Selection, Time Slots & Information Form',
                category: 'Feature'
            },
            {
                url: '/projects/portfolio-booking-admin-email.png',
                caption: 'Admin Notification Email - Automated Meeting Alerts with Client Details',
                category: 'Feature'
            },
            {
                url: '/projects/portfolio-booking-calendar-invite.png',
                caption: 'Automated Calendar Invitations - Google Meet Integration with .ics Attachments',
                category: 'Performance'
            },
            {
                url: '/projects/resume-preview.png',
                caption: 'Interactive Resume Preview - Multi-language Support with Live PDF Sync',
                category: 'Feature'
            },
            {
                url: '/projects/pdf-generation.png',
                caption: 'Server-side PDF Generation - Clean, Printable Format Preservation',
                category: 'Technical'
            }
        ],
        type: "Full Stack",
        role: "Full Stack Developer & Designer",
        timeline: "Oct 2025 - Present",
        company: "Personal Project",
        status: "In Progress",
        technologies: [
            "Next.js 14",
            "TypeScript",
            "TailwindCSS",
            "Resend",
            "Google Calendar API",
            "Google Meet API",
            "React Email",
            "i18n",
            "PDF Generation",
            "Vercel",
            "Framer Motion"
        ],
        features: [
            "Real-time appointment booking with Google Calendar integration",
            "Automated Google Meet creation for scheduled calls",
            "Dual-language email notifications (Resend) for both parties",
            "Interactive multi-language resume with live preview",
            "PDF resume generation with language persistence",
            "Contact form with automated email delivery",
            "Responsive design with dark/light mode support",
            "Project showcase with advanced filtering",
            "LinkedIn-style experience timeline",
            "Custom footer with terms and privacy policy",
            "Smooth animations and micro-interactions"
        ],
        challenges: [
            "Integrating multiple Google APIs (Calendar and Meet) seamlessly",
            "Implementing real-time calendar availability synchronization",
            "Creating a responsive PDF generation system that preserves formatting",
            "Managing multi-language content without compromising performance"
        ],
        solutions: [
            "Used Google Calendar API with OAuth 2.0 for secure calendar access",
            "Implemented server-side PDF generation with dynamic content",
            "Created a custom i18n solution for seamless language switching",
            "Leveraged Resend for reliable email delivery with React Email templates"
        ],
        results: [
            "Reduced client booking time from email chains to one-click scheduling",
            "Automated 100% of appointment confirmation and reminder emails",
            "Enabled seamless resume access in both digital and printable formats",
            "Improved page load performance with a 95+ Lighthouse score"
        ],
        learnings: [
            "Advanced API integration patterns with Google services",
            "Server-side PDF generation and dynamic content rendering",
            "Email template design and deliverability optimization",
            "Internationalization (i18n) implementation strategies"
        ],
        featured: true,
        gradient: "from-blue-600 to-purple-600",
        liveUrl: "https://portfolio-six-mu-c3zpt9l3gd.vercel.app",
        githubUrl: "https://github.com/Akram-Hafaiedh/portfolio"
    },
    {
        id: 2,
        title: "Casa-Group.ch",
        shortDescription: "Internal operations management platform for an insurance company, featuring complete client/employee management, insurance policy tracking, document management, email communication system, project management, and granular role-based permissions.",
        longDescription: "Built for a German insurance company struggling with employee coordination, client management, insurance documentation, and email tracking. The platform centralizes all business operations with a multi-step client onboarding, insurance policy management, file organization, internal email system with templates, project tracking with budgets, leave approval workflows, and enterprise-level permissions.",
        fullDescription: "Created a comprehensive operations platform for Casa-Group, a German insurance company. The platform centralizes all business operations through integrated modules that eliminated their chaos. Engineered a modular architecture for insurance, accounting, taxation, HR, and leave management, ensuring seamless integration and scalability. Integrated advanced features including internal email systems with templates, real-time notifications via WebSockets, and detailed activity logs. The document management system, integrated with OVH Cloud, transformed hours of searching into instant retrieval.",
        image: "/projects/casagroup.png",
        gallery: [],
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "June 2025 - Oct 2025",
        company: "Casa-Group (Germany)",
        status: "Completed",
        technologies: [
            "React", "shadcn/ui", "TailwindCSS", "TypeScript", "Node.js", "Laravel", "MySQL", "OVH Cloud", "WebSockets", "Docker"
        ],
        features: [
            "Modular enterprise dashboard for decentralized operations",
            "Multilingual insurance policy tracking & lifecycle management",
            "Internal templated email system with automatic logging",
            "HR & Leave management workflow with notification system",
            "Real-time activity logs and system audit trails",
            "Secure file management integrated with OVH Cloud storage",
            "Granular role-based access control (RBAC) for 10+ role types"
        ],
        challenges: [
            "Consolidating scattered client and employee information into a unified system",
            "Implementing complex leave approval workflows with conflicting permissions",
            "Managing large-scale document storage with secure, tiered access",
            "Synchronizing real-time notifications across multiple departments"
        ],
        solutions: [
            "Built a multi-step wizard interface for structured client data entry",
            "Developed a flexible state-machine based workflow engine for leave requests",
            "Utilized OVH Cloud with signed URLs for secure document hosting",
            "Implemented a WebSocket server for instant department-wide alerts"
        ],
        results: [
            "Improved user engagement by 30% through intuitive dashboard design",
            "Reduced insurance document retrieval time from hours to seconds",
            "Eliminated client data loss through centralized records management",
            "Streamlined HR processes, reducing administrative overhead by 20%"
        ],
        learnings: [
            "Insurance industry compliance and data security standards",
            "Complex state management in large-scale React applications",
            "Designing scalable modular architectures for enterprise software"
        ],
        featured: true,
        gradient: "from-green-500 to-teal-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Iberis.io",
        shortDescription: "Multi-tenant SaaS ERP with a three-tier architecture: Master Admin, Business Dashboard, and Client Portal. Features automated subscription billing, shareholder analytics, recursive self-management, and full business lifecycle automation.",
        longDescription: "A multi-tenant SaaS ERP platform with recursive architecture - Iberis uses its own system to manage client subscriptions, generate invoices, and track revenue. The platform handles the full business lifecycle: sales, purchases, inventory, accounting, with automated subscription-to-invoice pipeline.",
        fullDescription: "Led the development of a multi-tenant SaaS ERP platform with recursive, self-managed architecture. The unique aspect: Iberis uses its own system to manage client subscriptions and billing. This creates a self-sustaining cycle of business operations. Implemented complete sales cycle, full purchase management, expense tracking, and multi-warehouse inventory control.\n\nKey technical highlights include engineering Fintech SaaS modules with customizable PDF templates, dynamic headers/footers, and multilingual support (FR/AR). Developed a standalone POS module with real-time stock synchronization and payment processing. Optimized data processing with batch Excel imports handling datasets of 10k+ items efficiently via Redis caching.",
        image: "/projects/iberis.png",
        gallery: [],
        type: "Full Stack",
        role: "Senior Full Stack Developer",
        timeline: "Dec 2023 - June 2025",
        company: "Iberis",
        status: "Completed",
        technologies: [
            "Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Redis", "WebSocket", "Ionic", "Konnect", "Yajra", "Stripe", "Docker"
        ],
        features: [
            "Multi-tenant SaaS architecture with recursive self-management",
            "Automated subscription-to-invoice pipeline",
            "Fintech modules with customizable PDF templates",
            "Standalone POS module with real-time stock synchronization",
            "Secure client/supplier portals with invitation systems",
            "Batch Excel imports (10k+ items) with Redis optimization",
            "Multi-currency support (XOF/XAF) and tax configurations"
        ],
        challenges: [
            "Designing a recursive architecture where the platform manages its own billing",
            "Handling large-scale Excel imports without system timeouts",
            "Implementing strict tenant isolation in a shared database environment",
            "Ensuring real-time stock accuracy across multiple POS terminals"
        ],
        solutions: [
            "Implemented an event-driven subscription pipeline using Laravel Observers",
            "Developed background queue processing with Redis for batch operations",
            "Utilized Laravel Global Scopes for automated tenant data isolation",
            "Created a centralized stock management engine with pessimistic locking"
        ],
        results: [
            "Reduced loading times by 40% through aggressive caching and query optimization",
            "Drove user growth from 1,000 to over 9,000 active users",
            "Reduced support tickets by 35% through self-service portal implementation",
            "Achieved 25% reduction in POS transaction times"
        ],
        learnings: [
            "Mastered multi-tenant SaaS architecture and data isolation patterns",
            "Optimizing complex fintech workflows and document generation",
            "Scaling applications to handle high-volume user traffic and data"
        ],
        featured: true,
        gradient: "from-blue-500 to-purple-600",
        liveUrl: "https://finances.iberis.io/fr/",
        githubUrl: "#"
    },
    {
        id: 4,
        title: "Real-Time Patient Management",
        shortDescription: "Advanced healthcare platform with real-time patient tracking and professional messaging via WebSockets. Designed for clinical settings to improve communication latency and data accuracy.",
        longDescription: "A specialized healthcare application built to optimize patient management workflows in medical facilities. Features include a dynamic patient database, real-time messaging between healthcare providers via WebSockets, and a modular architecture for easy scalability in medical environments.",
        fullDescription: "Developed a complex business application for healthcare providers with real-time capabilities. The core feature is a custom messaging system built on WebSockets that reduced communication latency by 50% compared to traditional methods. Implemented a robust patient record system with granular access controls, history tracking, and interactive dashboards to visualize patient status in real-time.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Aug 2023 - Nov 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Laravel", "Vue.js", "MySQL", "WebSockets", "TailwindCSS", "REST API"],
        features: [
            "Real-time professional messaging via WebSockets",
            "Centralized patient record management system",
            "Granular role-based access control for medical staff",
            "Interactive patient tracking dashboard",
            "Audit logs for all patient record modifications"
        ],
        challenges: [
            "Ensuring 100% reliable messaging delivery in critical medical contexts",
            "Managing complex database schemas with high relational integrity",
            "Optimizing WebSocket performance for concurrent users"
        ],
        solutions: [
            "Implemented acknowledgment-based message delivery tracking",
            "Utilized Laravel Eloquent with strict foreign key constraints",
            "Developed a scalable WebSocket server using Node.js for offloading"
        ],
        results: [
            "Reduced communication latency between departments by 50%",
            "Improved data entry accuracy by 30% through structured forms",
            "Successfully deployed to 3 different clinical departments"
        ],
        learnings: [
            "Real-time data synchronization patterns in healthcare",
            "Architecting highly reliable messaging systems",
            "Healthcare data privacy and security considerations"
        ],
        featured: false,
        gradient: "from-blue-400 to-emerald-500",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 5,
        title: "Transport Logistics & Tracking",
        shortDescription: "Transportation solution featuring real-time push notifications and logistics tracking. Streamlines the communication between transport hubs and mobile units.",
        longDescription: "A comprehensive logistics management platform designed to track transportation units and facilitate instant communication via push notifications. Built to handle high-frequency status updates and coordinate multi-unit logistics effectively.",
        fullDescription: "Engineered a transportation solution centered around real-time responsiveness. Leveraged Pusher for a robust push notification system that enhanced user responsiveness and operational efficiency by 40%. The platform includes detailed unit tracking, route management, and status reporting dashboards for logistics coordinators.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Oct 2023 - Nov 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Laravel", "Vue.js", "Pusher", "MySQL", "TailwindCSS"],
        features: [
            "Instant push notification system via Pusher integration",
            "Real-time transportation unit status tracking",
            "Logistics dashboard for multi-unit coordination",
            "Dynamic route management and reporting",
            "Mobile-responsive portal for on-the-field units"
        ],
        challenges: [
            "Coordinating state updates between web and mobile interfaces",
            "Ensuring reliable notification delivery across varied network conditions",
            "Managing high-frequency location and status data"
        ],
        solutions: [
            "Designed a shared event-driven architecture for unified state management",
            "Implemented fall-back notification mechanisms for offline states",
            "Optimized database indexing for time-series status tracking"
        ],
        results: [
            "Enhanced operational responsiveness by 40%",
            "Reduced coordination errors between dispatch and units by 25%",
            "Achieved near-zero latency for status update notifications"
        ],
        learnings: [
            "Advanced event-driven architecture with Pusher",
            "Logistics-specific data modeling and performance tuning",
            "User interface design for high-pressure operational environments"
        ],
        featured: false,
        gradient: "from-orange-500 to-yellow-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 6,
        title: "Real Estate Marketplace",
        shortDescription: "High-performance real estate platform featuring an advanced search engine. Built for speed and accuracy in project discovery and property listing management.",
        longDescription: "A sophisticated real estate marketplace that prioritizes search efficiency. Utilizing Meilisearch, the platform provides instantaneous, typo-tolerant search results across thousands of listings, paired with a modern UI for property exploration.",
        fullDescription: "Built a real estate marketplace with a primary focus on search accuracy and speed. Integrated Meilisearch as the core search engine, resulting in a significant increase in search relevance and user engagement. Developed flexible property filtering systems, interactive map views, and a streamlined listing submission process for agents.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Aug 2023 - Oct 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Next.js", "Node.js", "Meilisearch", "PostgreSQL", "TailwindCSS", "Prisma"],
        features: [
            "Ultra-fast search engine integration with Meilisearch",
            "Advanced property filtering and categorization",
            "Interactive property map view (Leaflet/Mapbox)",
            "Dynamic listing management portal for agents",
            "Highly responsive and SEO-optimized property pages"
        ],
        challenges: [
            "Synchronizing relational database data with a search engine index in real-time",
            "Implementing complex multi-criteria filters with high performance",
            "Ensuring excellent SEO for dynamic property listings"
        ],
        solutions: [
            "Developed event-driven index synchronization via database triggers",
            "Used server-side rendering (SSR) for property pages to maximize SEO",
            "Utilized Prisma for efficient and type-safe data fetching"
        ],
        results: [
            "Search response times reduced to under 50ms",
            "30% increase in user session duration through improved search discovery",
            "Successful indexing of 5,000+ property listings"
        ],
        learnings: [
            "Implementing advanced search engines (Meilisearch) in web apps",
            "SEO strategies for large-scale dynamic marketplaces",
            "High-performance data fetching with Prisma and Next.js"
        ],
        featured: false,
        gradient: "from-cyan-500 to-blue-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 7,
        title: "Physiomedica: Medical R&D",
        shortDescription: "Research and development project for an innovative medical electronic system. Focused on hardware-software integration for a portable slimming device.",
        longDescription: "A specialized R&D project involving the design and engineering of a medical device controlled via an Android interface. Features hardware communication via Bluetooth and strict clinical validation for medical efficacy.",
        fullDescription: "Master's level R&D project for PHYSIOMEDICA. Designed a portable medical slimming device that integrates hardware controls with a custom Android application. Engineered the Bluetooth communication protocol for reliable data transfer and device commands. The project included complete clinical validation and ensured compliance with medical safety standards.",
        image: "",
        gallery: undefined,
        type: "Mobile",
        role: "R&D Project Engineer",
        timeline: "Feb 2018 - Aug 2018",
        company: "Physiomedica",
        status: "Completed",
        technologies: ["Java", "Android", "Bluetooth", "C/C++", "Altium Designer", "Embedded Systems"],
        features: [
            "Hardware control via custom Android application",
            "Bluetooth-based device communication protocol",
            "Portable medical device hardware design",
            "Real-time monitoring of device clinical parameters",
            "Strict compliance with medical electronic safety standards"
        ],
        challenges: [
            "Ensuring noise-free data acquisition from high-sensitivity medical hardware",
            "Maintaining stable Bluetooth connectivity in clinical environments",
            "Integrating low-level C++ firmware with high-level Android Java"
        ],
        solutions: [
            "Implemented hardware-level digital filters for signal processing",
            "Developed a robust auto-reconnection Bluetooth management layer",
            "Utilized JNI (Java Native Interface) for efficient mobile-hardware communication"
        ],
        results: [
            "Successful development of a functional portable prototype",
            "100% pass rate on initial clinical validation tests",
            "Seamless hardware-to-app communication with zero data packet loss"
        ],
        learnings: [
            "Medical hardware-software integration and R&D lifecycle",
            "Low-level protocol design and embedded systems communication",
            "Clinical validation processes and medical certification requirements"
        ],
        featured: false,
        gradient: "from-indigo-600 to-blue-700",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 8,
        title: "NFC Business Card System",
        shortDescription: "Cross-platform mobile and web application for a startup's NFC business card system. Managed full project lifecycle from design to production.",
        longDescription: "An innovative NFC-based business card system allowing users to share profiles digitally via physical cards. The platform includes a web management portal and a mobile app for profile editing and NFC writing.",
        fullDescription: "Led the development of a cutting-edge NFC business card system. Provided technical leadership for the architecture and deployment of both the web interface and mobile application. Managed the full project lifecycle using Agile practices, focusing on hardware-software integration challenges across different mobile platforms.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Technical Lead",
        timeline: "Mar 2022 - Oct 2023",
        company: "Dcarte Solutions",
        status: "Abandoned",
        technologies: ["React", "React Native", "Django", "Laravel", "PostgreSQL", "NFC", "TailwindCSS"],
        features: [
            "NFC hardware-to-digital profile integration",
            "Cross-platform mobile application (iOS/Android)",
            "Dynamic digital business card profile management",
            "Scalable web portal for enterprise card management",
            "Team management and analytics for business cards"
        ],
        challenges: [
            "Inconsistent NFC behavior across different Android/iOS hardware variants",
            "Ensuring data security in open-air NFC communication",
            "Managing large-scale deployment of physical NFC assets"
        ],
        solutions: [
            "Developed platform-specific NFC handlers to ensure maximum compatibility",
            "Implemented encrypted data packets for NFC payload security",
            "Built a centralized NFC asset tracking system for production lifecycle"
        ],
        results: [
            "95% NFC scan success rate across 50+ tested devices",
            "Successful prototype deployment and positive initial user feedback",
            "Established a robust architecture for multi-tenant business card management"
        ],
        learnings: [
            "NFC technology integration and hardware-software communication",
            "Technical leadership and Agile project management in a startup context",
            "Cross-platform development strategies for specialized hardware features"
        ],
        featured: false,
        gradient: "from-purple-500 to-pink-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 9,
        title: "The Gourmet Haven",
        shortDescription: "A premium restaurant website featuring a dynamic menu, table reservation system, and an immersive dining experience showcase. Built for a high-end culinary establishment.",
        longDescription: "The Gourmet Haven is a sophisticated web platform designed for luxury restaurants. It provides an elegant interface for customers to explore seasonal menus, book tables in real-time, and discover the restaurant's unique ambiance and culinary philosophy.",
        fullDescription: "Currently under development, The Gourmet Haven aims to redefine the digital presence of fine dining. The platform will feature a high-performance menu system with categorization and filtering, a secure table reservation engine with instant confirmation, and a visually stunning gallery showcasing the restaurant's interior and signature dishes. The project focuses on high-end aesthetics, smooth transitions (Framer Motion), and SEO optimization to ensure maximum visibility for the establishment.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Lead Full Stack Developer",
        timeline: "Jan 2026 - Present",
        company: "Freelance Project",
        status: "In Progress",
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Framer Motion", "Resend"],
        features: [
            "Elegant, responsive design with premium typography",
            "Dynamic menu management with dietary filters",
            "Real-time table reservation system",
            "Automated booking confirmation emails",
            "SEO-optimized content for culinary search visibility",
            "Interactive chef's special showcase"
        ],
        challenges: [
            "Creating an interface that conveys luxury and attention to detail",
            "Managing reservation availability in a high-demand environment",
            "Optimizing image-heavy content for fast loading times"
        ],
        solutions: [
            "Utilizing a minimalist, high-contrast design system",
            "Implementing a server-side availability engine with Prisma",
            "Leveraging Next.js image optimization and lazy loading"
        ],
        results: [],
        learnings: [
            "High-end UI design principles for the hospitality industry",
            "Managing real-time scheduling constraints",
            "Performance optimization for media-rich branding sites"
        ],
        featured: false,
        gradient: "from-amber-500 to-rose-700",
        liveUrl: "#",
        githubUrl: "#"
    }
];
