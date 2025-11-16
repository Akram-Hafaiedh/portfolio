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

export const projects: Project[] = [
    {
        id: 1,
        title: "Personal Portfolio",
        shortDescription: "Modern, full-stack portfolio with real-time booking system, multi-language resume, and automated email communications. Built with cutting-edge technologies to showcase my work and streamline client interactions.",
        longDescription: "A comprehensive portfolio platform that goes beyond traditional showcases by integrating real client interaction tools. Features include a Google Calendar booking system with automated Google Meet creation, multi-language resume with PDF generation, and seamless email communications via Resend.",
        fullDescription: "Designed and developed a full-stack portfolio website that serves as both a project showcase and a client interaction platform. The site features a real-time booking system integrated with Google Calendar and Google Meet, automated email notifications using Resend, a dynamic multi-language resume system with live preview and PDF download capabilities, and a modern, responsive design built with Next.js and TailwindCSS. The portfolio demonstrates advanced full-stack development skills while solving real business needs for client acquisition and communication.",
        image: "/projects/portfolio.png", // You'll want to add a screenshot
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
                caption: 'Automated Calendar Invitations - Google Meet Integration with .ics Attachmentss',
                category: 'Performance'
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
            "Managing multi-language content without compromising performance",
            "Ensuring email deliverability across different providers",
            "Maintaining consistent design across all pages and components",
            "Implementing secure contact form with spam protection"
        ],
        solutions: [
            "Used Google Calendar API with OAuth 2.0 for secure calendar access",
            "Implemented server-side PDF generation with dynamic content",
            "Created a custom i18n solution for seamless language switching",
            "Used Resend for reliable email delivery with React Email templates",
            "Implemented rate limiting and validation on contact forms",
            "Created reusable component system for design consistency",
            "Used optimistic UI updates for better user experience"
        ],
        results: [
            "Reduced client booking time from email chains to one-click scheduling",
            "Automated 100% of appointment confirmation and reminder emails",
            "Enabled seamless resume access in both digital and printable formats",
            "Improved page load performance with 95+ Lighthouse score",
            "Increased client inquiries by implementing streamlined contact methods",
            "Created a scalable foundation for continuous feature additions"
        ],
        learnings: [
            "Advanced API integration patterns with Google services",
            "Server-side PDF generation and dynamic content rendering",
            "Email template design and deliverability optimization",
            "Internationalization (i18n) implementation strategies",
            "Performance optimization in data-intensive applications",
            "User experience design for conversion optimization"
        ],
        gradient: "from-orange-500 to-red-600",
        liveUrl: "https://portfolio-six-mu-c3zpt9l3gd.vercel.app", // Your actual portfolio URL
        githubUrl: "https://github.com/Akram-Hafaiedh/portfolio", // If it's public
        featured: true, // Definitely feature this!
    },
    {
        id: 2,
        title: "Casa-Group.ch",
        shortDescription: "Internal operations management platform for insurance company, featuring comprehensive client/employee management, insurance policy tracking, document management, email communication system, project management, vacation workflows, and granular role-based permissions across 300+ system actions.",
        longDescription: "Built for a German insurance company struggling with employee coordination, client management, insurance documentation, and email tracking. The platform centralizes all business operations with multi-step client onboarding, insurance policy management, file organization, internal email system with templates, project tracking with budgets, vacation approval workflows, and enterprise-level permissions for 10+ role types across all departments.",
        fullDescription: `Built a comprehensive operations platform for Casa-Group, a German insurance company struggling with scattered client data, lost insurance documents, and untraceable emails. The platform centralizes all business operations through integrated modules that eliminated their chaos.

            Implemented a guided 5-step client onboarding wizard (information → insurance → accounting → taxes → review) ensuring complete data capture. Document management with server-based storage on OVH Cloud turned hours of searching into instant retrieval through category-based organization (policies, contracts, claims, client documents).

            The email communication system includes templated emails for common insurance scenarios, automatic logging of all communications, and searchable history with complete audit trails. Employee coordination features comprehensive HR management with vacation approval workflows, department organization, and real-time availability tracking.

            Added project management with budget tracking and team assignments, plus an enterprise permissions system with 300+ granular permissions across all modules. Created 10 predefined roles matching their organizational structure with complete activity logging for compliance. The platform transformed Casa-Group from constantly losing information to having every operation tracked, searchable, and secure.`,
        image: "/projects/casagroup.png",
        gallery: [
            {
                url: '/projects/casagroup-dashboard.png',
                caption: 'Dashboard Overview - Task tracking, client demographics, and team performance analytics',
                category: 'Dashboard'
            },
            {
                url: '/projects/casagroup-client-profile.png',
                caption: 'Client Profile - Complete insurance information, accounting details, and activity history',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-client-creation.png',
                caption: 'Multi-Step Client Onboarding - Insurance, accounting, and tax information wizard',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-departments.png',
                caption: 'Department Management - Organizational structure and team coordination',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-email-compose.png',
                caption: 'Email System - Internal communication with attachments and templates',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-email-settings.png',
                caption: 'Email Configuration - Company branding and signature templates',
                category: 'Configuration'
            },
            {
                url: '/projects/casagroup-email-logs.png',
                caption: 'Email History Tracking - Complete communication audit trail',
                category: 'Analytics'
            },
            {
                url: '/projects/casagroup-employee-profile.png',
                caption: 'Employee Management - HR details, contracts, and performance tracking',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-employee-creation.png',
                caption: 'Employee Onboarding - Comprehensive HR information wizard',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-project-creation.png',
                caption: 'Project Management - Budget tracking, team assignment, and file management',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-permissions.png',
                caption: 'Granular Permissions Matrix - 300+ actions across all system modules',
                category: 'Security'
            },
            {
                url: '/projects/casagroup-roles.png',
                caption: 'Role Management - 10 predefined roles with customizable permissions',
                category: 'Security'
            },
            {
                url: '/projects/casagroup-vacation-calendar.png',
                caption: 'Vacation Calendar - Team availability and time-off tracking',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-vacation-management.png',
                caption: 'Vacation Approval Workflow - Request management with balance tracking',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-file-manager.png',
                caption: 'Document Management - Organized file storage with category-based access',
                category: 'Feature'
            },
            {
                url: '/projects/casagroup-activity-logs.png',
                caption: 'Activity Logs - Complete audit trail of all system actions',
                category: 'Analytics'
            }
        ],
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Jun 2025 - Oct 2025",
        company: "Casa-Group (Germany)",
        status: "Completed",
        technologies: [
            "React",
            "shadcn/ui",
            "TailwindCSS",
            "Laravel",
            "MySQL",
            "OVH Cloud Hosting",
            "RESTful API",
            "Email Integration",
            "Docker",
            "Git"
        ],
        features: [
            'Multi-step client onboarding wizard (Info → Insurance → Accounting → Taxes → Review)',
            'Comprehensive insurance policy tracking and management',
            'Organized file management system with category-based access (Policies, Contracts, Claims)',
            'Server-based secure document storage with access controls',
            'Internal email system with templated communications',
            'Complete email history tracking with sender/recipient logs',
            'Searchable email archives for client communication audit',
            'Employee management with HR details and department organization',
            'Project management with budget tracking and team assignment',
            'Vacation calendar with approval workflow and balance tracking',
            'Granular role-based permissions across 300+ system actions',
            '10 predefined roles with customizable access levels',
            'Complete activity logging for all user actions',
            'Department-based organizational structure',
            'Client demographics analytics and reporting',
            'Task management with completion tracking',
            'Time log management for projects',
            'Responsive design with dark mode support'
        ],
        challenges: [
            "Consolidating scattered client and employee information into unified system",
            "Tracking insurance policies across multiple clients without losing documentation",
            "Managing email communications that were previously lost or hard to find",
            "Creating intuitive multi-step workflows for insurance-specific data entry",
            "Implementing secure file storage with proper access controls for sensitive insurance documents",
            "Designing granular permission system for diverse roles (from CEO to regular employees)",
            "Building vacation approval workflow that doesn't disrupt business operations",
            "Ensuring data privacy compliance for insurance client information",
            "Creating searchable email history without overwhelming storage",
            "Managing complex relationships between clients, policies, employees, and projects"
        ],
        solutions: [
            'Built multi-step wizard interface for structured client data entry with validation at each step',
            'Created centralized client profile aggregating all insurance policies, documents, and communications',
            'Implemented internal email system with automatic logging and categorization',
            'Used server-based storage with folder-based organization (Clients, Policies, Projects, Employees)',
            'Designed 300+ granular permissions mapped to business operations across all modules',
            'Created 10 role templates matching company hierarchy for easy assignment',
            'Built vacation calendar with automatic balance calculation and manager approval workflow',
            'Implemented activity logging middleware tracking all CRUD operations with user attribution',
            'Used full-text search on email content and metadata for quick retrieval',
            'Applied Laravel relationships and eager loading for efficient data querying across entities',
            'Created department-based data scoping for organizational structure',
            'Built file manager with category-based folders and access controls'
        ],
        results: [
            'Eliminated lost client information - all data now centralized and searchable',
            'Reduced time to find client insurance documents from hours to seconds',
            'Complete email communication history - no more lost correspondence',
            'Streamlined client onboarding from scattered forms to structured 5-step wizard',
            'Improved team coordination with visibility into employee workload and availability',
            'Automated vacation approval workflow reducing HR administrative overhead',
            'Enhanced security with role-based access ensuring employees only see relevant data',
            'Enabled management oversight with complete activity logs and analytics',
            'Improved project tracking with budget monitoring and team assignment visibility',
            'Decreased onboarding time for new employees with clear role-based permissions',
            'Enhanced compliance with audit trails for all sensitive operations'
        ],
        learnings: [
            'Insurance industry workflow requirements and compliance needs',
            'Designing multi-step forms with data persistence and validation',
            'Email system integration with automatic logging and archiving',
            'Server-based file organization strategies for business document management',
            'Granular permission system design for enterprise applications',
            'Building approval workflows without blocking business operations',
            'Activity logging patterns for audit trail compliance',
            'Department-based organizational structure in software design',
            'User experience design for non-technical insurance industry users',
            'Data privacy considerations for sensitive client information',
            'File management UX for quick document retrieval',
            'Role-based access control at scale (300+ permissions)'
        ],
        gradient: "from-green-500 to-teal-600",
        liveUrl: "#",
        githubUrl: "#",
        featured: true
    },
    {
        id: 3,
        title: "Iberis.io",
        shortDescription: "Multi-tenant SaaS ERP with three-tier architecture: Master Admin (company management), Business Dashboard (ERP operations), and Client Portal (supplier/customer access). Features automated subscription billing, shareholder analytics, recursive self-management, and complete business lifecycle automation.",
        longDescription: "A multi-tenant SaaS ERP platform with recursive architecture - Iberis uses its own system to manage customer subscriptions, generate invoices, and track revenue. The platform handles complete business lifecycle: sales, purchases, inventory, accounting, with automated subscription-to-invoice pipeline. When customers subscribe or add modules (POS, extra users, API calls), the system automatically generates invoices and tracks payments - effectively managing itself. Built with Vue.js frontend and Laravel backend, featuring Open API for third-party integrations and optional Point of Sale module for retail operations.",
        fullDescription: `Led the development of a multi-tenant SaaS ERP platform with recursive, self-managing architecture. The unique aspect: Iberis uses its own system to manage customer subscriptions and billing—when customers subscribe or purchase add-ons (POS modules, extra users, API quotas), the system automatically generates invoices and tracks payments through the same ERP it provides to customers.

This creates a self-sustaining business operations loop. Implemented complete sales cycle (quotes, delivery notes, invoices, credit notes, payment tracking), full purchase management (orders, receipts, supplier invoices), expense tracking with multiple document types, and multi-warehouse inventory control.

Added enterprise-grade features including multi-user collaboration with granular role-based permissions, comprehensive activity logging across all modules, two-factor authentication, Open API with usage limits for third-party integrations, and an optional Point of Sale module for retail operations.

Built automated subscription-to-invoice pipeline that transforms subscription purchases into accounting entries. The platform now supports complete audit trails and multi-tenant architecture, allowing Iberis to scale infinitely while managing its own operations through the same system it sells.`,
        image: "/projects/iberis.png",
        gallery: [ // This is the new property for ProjectGallery component
            {
                url: '/projects/iberis-dashboard.png',
                caption: 'Main Dashboard - Real-time Business Insights & Analytics',
                category: 'Dashboard'
            },
            {
                url: '/projects/iberis-invoicing.png',
                caption: 'Invoice Management System - Multi-currency/Statuses Support & PDF Generation',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-invoice-creation.png',
                caption: 'Invoice Creation Interface - Intuitive Form with Real-time Calculations',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-invoice-editing.png',
                caption: 'Invoice Management - Edit, Track & Generate Professional PDFs',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-clients.png',
                caption: 'Client Management - Comprehensive Contact & History Tracking',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-providers.png',
                caption: 'Providers Management - Comprehensive Contact & History Tracking',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-item-form.png',
                caption: 'Item Management - Comprehensive product creation with image upload and pricing',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-stock-synthesis.png',
                caption: 'Stock Synthesis - Quick access to inventory metrics and article listing',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-warehouse.png',
                caption: 'Warehouse Management - Multi-location inventory control',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-movements.png',
                caption: 'Stock Movements - Complete audit trail of inventory transactions',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-collaborators.png',
                caption: 'Team Collaboration - Multi-user management with activity tracking and analytics',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-permissions.png',
                caption: 'Role-Based Access Control - Granular permissions across all system modules',
                category: 'Security'
            },
            {
                url: '/projects/iberis-activity-logs.png',
                caption: 'Activity Logs - Comprehensive audit trail tracking all user actions with timestamps',
                category: 'Analytics'
            },
            {
                url: '/projects/iberis-sales-menu.png',
                caption: 'Sales Module - Complete sales cycle from quotes to payments (delivery notes, invoices, credit notes, recalls)',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-purchases-menu.png',
                caption: 'Purchase Management - Full procurement cycle (orders, receipts, supplier invoices, returns)',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-general-balance.png',
                caption: 'General Balance Sheet - Complete chart of accounts with debit/credit/balance tracking',
                category: 'Analytics'
            },
            {
                url: '/projects/iberis-balance-tiers.png',
                caption: 'Third-Party Balances - Client and supplier account balances with aging reports',
                category: 'Analytics'
            },
            {
                url: '/projects/iberis-chart-of-accounts.png',
                caption: 'Chart of Accounts - Comprehensive accounting plan with hierarchical structure',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-journal-entry.png',
                caption: 'Journal Entry Creation - Double-entry bookkeeping with automatic validation',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-expenses.png',
                caption: 'Expense Tracking & Financial Reporting',
                category: 'Feature'
            },
            {
                url: '/projects/iberis-user-security.png',
                caption: 'Security & Authentication - Two-factor authentication, session management, and account controls',
                category: 'Security'
            },
            {
                url: '/projects/iberis-api-management.png',
                caption: 'Open API Management - usage limits and API key generation',
                category: 'Developer'
            },
            {
                url: '/projects/iberis-api-documentation.png',
                caption: 'Open API Documentation - Developer access with API key',
                category: 'Developer'
            },
            {
                url: '/projects/iberis-subscription.png',
                caption: 'Subscription Management - Flexible pricing plans with add-ons (users, APIs, POS)',
                category: 'Business Model'
            },
            {
                url: '/projects/iberis-reports.png',
                caption: 'Automated Report Generation - Business Intelligence Dashboard',
                category: 'Analytics'
            }
        ],
        type: "Full Stack",
        role: "Full Stack Developer",
        timeline: "Dec 2023 - Jun 2025",
        company: "Iberis",
        status: "Completed",
        technologies: [
            "Laravel",
            "Yajra DataTables",
            "datatables.net",
            "Konnect API",
            "OAuth 2.0",
            "Two-Factor Authentication (2FA)",
            "RESTful API",
            "Vue.js",
            "MySQL",
            "Bootstrap",
            "Metronic 8",
            "REST API",
            "OpenAPI",
            "Webhooks",
            "Git",
            "Docker",
            "Stripe/Payment Integration"
        ],
        features: [
            'Multi-tenant SaaS architecture with recursive self-management',
            'Automated subscription-to-invoice pipeline (subscription → invoice → payment → accounting)',
            'Platform manages its own customer billing and revenue through the same system',
            'Master admin dashboard for managing all tenant companies',
            'Complete sales cycle: quotes, delivery notes, invoices, credit notes, payments',
            'Full purchase management: orders, receipts, supplier invoices, returns',
            'Optional Point of Sale module with real-time checkout and payment processing',
            'Open API with usage limits and developer documentation',
            'Subscription-based business model with flexible add-ons (users, POS, APIs)',
            'Two-factor authentication (2FA) and session management',
            'Referral/affiliate system for customer acquisition',
            'Integrated support ticketing system',
            'Highly customizable PDF generation with multiple templates for all document types',
            'Multi-user collaboration with role-based access control',
            'Comprehensive activity logging and audit trails',
            'Client and supplier management with transaction history',
            'Multi-warehouse inventory control with stock movements',
            'Expense tracking with multiple document types',
            'Granular permissions system across all modules',
            'User activity analytics and monitoring',
            'Automated accounting entries from business operations',
            'Responsive design for all devices',
            'Automated report generation',
            'Multi-currency and multi-tax support',
            'Customizable notification preferences'
        ],
        challenges: [
            "Designing multi-tenant architecture where the platform manages itself (recursive)",
            "Building automated subscription-to-invoice-to-accounting pipeline",
            "Implementing tenant isolation while maintaining code efficiency",
            "Creating flexible PDF generation system supporting multiple document types and formats across sales and purchases",
            "Implementing complete sales and purchase cycles with proper state management and business rules",
            "Building optional POS module that integrates seamlessly with existing inventory and invoicing",
            "Implementing comprehensive multi-user collaboration with granular permissions",
            "Building detailed activity logging system without performance impact",
            "Managing complex business workflows (quote → delivery → invoice → payment)",
            "Migrating legacy system without downtime",
            "Optimizing database queries for large datasets across multiple tenants",
            "Implementing real-time updates across multiple users and companies",
            "Ensuring data integrity and isolation between tenants"
        ],
        solutions: [
            'Implemented multi-tenant database architecture with tenant-aware middleware and query scopes',
            'Created automated event-driven subscription pipeline (webhook → invoice creation → payment tracking → accounting entry)',
            'Used Laravel tenant scoping to ensure complete data isolation between companies',
            'Built comprehensive PDF customization engine with template management, dynamic layouts, and signature integration for all document types',
            'Implemented state machine pattern for document workflows with proper validation and transitions',
            'Created modular POS system as optional add-on with payment gateway integration',
            'Implemented granular role-based access control system with module-level permissions',
            'Created efficient activity logging with indexed database queries and archiving strategy',
            'Used Laravel\'s event system and observers for complex business logic orchestration',
            'Implemented phased migration strategy with rollback capabilities',
            'Optimized database queries with eager loading, caching, and tenant-aware query optimization',
            'Used WebSockets with tenant isolation for real-time updates across sales, purchases, and inventory',
            'Created data validation scripts and backup systems with tenant-level granularity'
        ],
        results: [
            'Reduced loading times by 40%',
            'Improved user satisfaction by 60%',
            'Decreased support tickets by 35%',
            'Enabled real-time business insights across all operations',
            'Reduced manual data entry by 70%',
            'Automated complete sales-to-payment workflow',
            'Integrated POS module for retail operations',
            'Complete audit trail compliance for accounting regulations',
            'Built subscription-based revenue model with flexible add-ons',
            'Enabled third-party integrations via Open API',
            'Implemented enterprise-grade security with 2FA'
        ],
        learnings: [
            'Multi-tenant SaaS architecture patterns and tenant isolation strategies',
            'Recursive system design - building platforms that manage themselves',
            'Event-driven architecture for subscription lifecycle automation',
            'Importance of stakeholder communication in legacy migrations',
            'Performance optimization techniques for large datasets across multiple tenants',
            'Best practices for secure payment integrations',
            'User-centered design principles for business applications',
            'Customizing and extending Metronic Bootstrap template for business applications',
            'Complex workflow management with state machines',
            'Modular architecture for optional features (POS)',
            'ERP system design patterns and business logic orchestration',
            'Database optimization for multi-tenant applications',
            'Scaling strategies for SaaS platforms'
        ],
        gradient: "from-blue-500 to-purple-600",
        liveUrl: "https://finances.iberis.io/fr/",
        githubUrl: "#",
        featured: true,
    },

    {
        id: 4,
        title: "NFC Business Card System",
        shortDescription: "Developed web interface and mobile application for startup's NFC business card system. Full project lifecycle management, from design to production deployment.",
        longDescription: "An innovative NFC-based business card system that allows users to share contact information digitally. The system includes both web and mobile applications, enabling users to create, customize, and share digital business cards using NFC technology.",
        fullDescription: "Led the development of a cutting-edge NFC business card system from concept to production. The project involved creating a React web application for card management and customization, along with a React Native mobile app for scanning and sharing NFC cards. The system integrated hardware (NFC chips) with software to create a seamless digital business card experience.",
        image: "", // No image available
        gallery: undefined,
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
    },

];

export const featuredProjects = projects.filter(project => project.featured === true);

export const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id.toString() === id);
};