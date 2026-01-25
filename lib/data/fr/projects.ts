// lib/data/fr/projects.ts
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
        title: "Portfolio Personnel",
        shortDescription: "Portfolio moderne full-stack avec système de réservation en temps réel, CV multilingue et communications par email automatisées. Construit avec des technologies de pointe pour présenter mon travail et rationaliser les interactions clients.",
        longDescription: "Une plateforme portfolio complète qui va au-delà des vitrines traditionnelles en intégrant de véritables outils d'interaction client. Les fonctionnalités incluent un système de réservation Google Calendar avec création automatisée de Google Meet, un CV multilingue avec génération de PDF, et des communications par email transparentes via Resend.",
        fullDescription: "Conception et développement d'un site web portfolio full-stack servant à la fois de vitrine de projets et de plateforme d'interaction client. Le site dispose d'un système de réservation en temps réel intégré à Google Calendar et Google Meet, de notifications par email automatisées utilisant Resend, d'un système de CV multilingue dynamique avec aperçu en direct et capacités de téléchargement PDF, et d'un design moderne et réactif construit avec Next.js et TailwindCSS. Le portfolio démontre des compétences avancées en développement full-stack tout en répondant à de réels besoins commerciaux pour l'acquisition et la communication client.",
        image: "/projects/portfolio.png",
        gallery: [
            {
                url: '/projects/portfolio-architecture.png',
                caption: 'Architecture Système Complète - Next.js 15, TypeScript, API Google, Email Resend',
                category: 'Architecture'
            },
            {
                url: '/projects/portfolio-deployment.png',
                caption: 'Historique de Déploiement Vercel - Temps de Build Rapides & Déploiement Continu',
                category: 'DevOps'
            },
            {
                url: '/projects/portfolio-booking-interface.png',
                caption: 'Expérience de Réservation Complète - Sélection de Date, Créneaux & Formulaire',
                category: 'Fonctionnalité'
            }
        ],
        type: "Full Stack",
        role: "Développeur Full Stack & Designer",
        timeline: "Oct 2025 - Présent",
        company: "Projet Personnel",
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
            "Génération PDF",
            "Vercel",
            "Framer Motion"
        ],
        features: [
            "Réservation de rendez-vous en temps réel avec intégration Google Calendar",
            "Création automatisée de Google Meet pour les appels programmés",
            "Notifications email bilingues (Resend) pour les deux parties",
            "CV interactif multilingue avec aperçu en direct",
            "Génération de CV PDF avec persistance de la langue",
            "Formulaire de contact avec livraison d'email automatisée",
            "Design responsive avec support du mode sombre/clair"
        ],
        challenges: [
            "Intégration transparente de multiples API Google (Calendar et Meet)",
            "Mise en œuvre de la synchronisation de la disponibilité du calendrier en temps réel",
            "Création d'un système de génération de PDF réactif préservant le formatage",
            "Gestion du contenu multilingue sans compromettre les performances"
        ],
        solutions: [
            "Utilisation de l'API Google Calendar avec OAuth 2.0 pour un accès sécurisé au calendrier",
            "Mise en œuvre de la génération de PDF côté serveur avec contenu dynamique",
            "Création d'une solution i18n personnalisée pour un changement de langue transparent",
            "Utilisation de Resend pour une livraison d'email fiable avec modèles React Email"
        ],
        results: [
            "Réduction du temps de réservation client des chaînes d'emails à la planification en un clic",
            "Automatisation de 100% des emails de confirmation et de rappel de rendez-vous",
            "Activation de l'accès au CV transparent aux formats numérique et imprimable",
            "Amélioration des performances de chargement de page avec un score Lighthouse de 95+"
        ],
        learnings: [
            "Modèles d'intégration API avancés avec les services Google",
            "Génération de PDF côté serveur et rendu de contenu dynamique",
            "Design de modèles d'email et optimisation de la délivrabilité",
            "Stratégies de mise en œuvre de l'internationalisation (i18n)"
        ],
        gradient: "from-orange-500 to-red-600",
        liveUrl: "https://portfolio-six-mu-c3zpt9l3gd.vercel.app",
        githubUrl: "https://github.com/Akram-Hafaiedh/portfolio",
        featured: true,
    },
    {
        id: 2,
        title: "Casa-Group.ch",
        shortDescription: "Plateforme de gestion des opérations internes pour une compagnie d'assurance, comprenant la gestion complète des clients/employés, le suivi des polices d'assurance, la gestion documentaire, le système de communication par email, la gestion de projet, les flux de travail de congés et des permissions granulaires basées sur les rôles.",
        longDescription: "Construit pour une compagnie d'assurance allemande aux prises avec la coordination des employés, la gestion des clients, la documentation d'assurance et le suivi des emails. La plateforme centralise toutes les opérations commerciales avec une intégration client en plusieurs étapes, la gestion des polices d'assurance, l'organisation des fichiers, un système d'email interne avec modèles, le suivi de projet avec budgets, les flux d'approbation de congés et des permissions au niveau de l'entreprise pour plus de 10 types de rôles dans tous les départements.",
        fullDescription: "Création d'une plateforme d'opérations complète pour Casa-Group, une compagnie d'assurance allemande. La plateforme centralise toutes les opérations commerciales grâce à des modules intégrés qui ont éliminé leur chaos. Mise en œuvre d'un assistant d'intégration client guidé en 5 étapes. Gestion documentaire avec stockage sur serveur sur OVH Cloud transformant des heures de recherche en récupération instantanée. Le système de communication par email comprend des emails modèles, l'enregistrement automatique de toutes les communications et un historique consultable.",
        image: "/projects/casagroup.png",
        gallery: [],
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Juin 2025 - Oct 2025",
        company: "Casa-Group (Allemagne)",
        status: "Completed",
        technologies: [
            "React", "shadcn/ui", "TailwindCSS", "Laravel", "MySQL", "OVH Cloud Hosting", "API RESTful", "Intégration Email", "Docker", "Git"
        ],
        features: [
            "Assistant d'intégration client multi-étapes",
            "Suivi et gestion complets des polices d'assurance",
            "Système de gestion de fichiers organisé avec accès basé sur les catégories",
            "Stockage sécurisé de documents sur serveur avec contrôles d'accès",
            "Système d'email interne avec communications modélisées",
            "Suivi complet de l'historique des emails",
            "Gestion des employés avec détails RH"
        ],
        challenges: [
            "Consolidation des informations clients et employés dispersées dans un système unifié",
            "Suivi des polices d'assurance à travers plusieurs clients",
            "Gestion des communications par email précédemment perdues",
            "Création de flux de travail multi-étapes intuitifs"
        ],
        solutions: [
            "Construction d'une interface assistant multi-étapes pour la saisie structurée des données clients",
            "Création d'un profil client centralisé agrégeant polices, documents et communications",
            "Mise en œuvre d'un système d'email interne avec journalisation automatique",
            "Utilisation de stockage sur serveur avec organisation basée sur les dossiers"
        ],
        results: [
            "Élimination des informations clients perdues - toutes les données sont maintenant centralisées et consultables",
            "Réduction du temps de recherche de documents d'assurance de plusieurs heures à quelques secondes",
            "Historique complet des communications par email",
            "Rationalisation de l'intégration client"
        ],
        learnings: [
            "Exigences de flux de travail de l'industrie de l'assurance et besoins de conformité",
            "Conception de formulaires multi-étapes avec persistance des données",
            "Intégration de système d'email avec journalisation automatique et archivage"
        ],
        gradient: "from-green-500 to-teal-600",
        liveUrl: "#",
        githubUrl: "#",
        featured: true
    },
    {
        id: 3,
        title: "Iberis.io",
        shortDescription: "ERP SaaS multi-locataire avec architecture à trois niveaux : Administrateur Principal, Tableau de Bord Business et Portail Client. Fonctionnalités de facturation d'abonnement automatisée, analyses des actionnaires, auto-gestion récursive et automatisation complète du cycle de vie de l'entreprise.",
        longDescription: "Une plateforme ERP SaaS multi-locataire avec architecture récursive - Iberis utilise son propre système pour gérer les abonnements clients, générer des factures et suivre les revenus. La plateforme gère le cycle de vie complet de l'entreprise : ventes, achats, inventaire, comptabilité, avec pipeline abonnement-vers-facture automatisé.",
        fullDescription: "Direction du développement d'une plateforme ERP SaaS multi-locataire avec architecture récursive et auto-gérée. L'aspect unique : Iberis utilise son propre système pour gérer les abonnements clients et la facturation. Cela crée une boucle d'opérations commerciales autonome. Mise en œuvre du cycle de vente complet, gestion complète des achats, suivi des dépenses et contrôle d'inventaire multi-entrepôts.",
        image: "/projects/iberis.png",
        gallery: [],
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Déc 2023 - Juin 2025",
        company: "Iberis",
        status: "Completed",
        technologies: [
            "Laravel", "Vue.js", "MySQL", "Bootstrap", "API REST", "OpenAPI", "Webhooks", "Git", "Docker", "Stripe"
        ],
        features: [
            "Architecture SaaS multi-locataire avec auto-gestion récursive",
            "Pipeline abonnement-vers-facture automatisé",
            "Tableau de bord administrateur principal",
            "Cycle de vente complet : devis, bons de livraison, factures",
            "Gestion complète des achats",
            "API Open avec limites d'utilisation"
        ],
        challenges: [
            "Conception d'une architecture multi-locataire où la plateforme se gère elle-même (récursif)",
            "Construction d'un pipeline automatisé abonnement-vers-facture-vers-comptabilité",
            "Mise en œuvre de l'isolation des locataires tout en maintenant l'efficacité du code"
        ],
        solutions: [
            "Mise en œuvre d'une architecture de base de données multi-locataire",
            "Création d'un pipeline d'abonnement automatisé piloté par événements",
            "Utilisation de la portée des locataires Laravel pour assurer une isolation complète des données"
        ],
        results: [
            "Réduction des temps de chargement de 40%",
            "Amélioration de la satisfaction utilisateur de 60%",
            "Diminution des tickets de support de 35%",
            "Activation d'informations commerciales en temps réel"
        ],
        learnings: [
            "Modèles d'architecture SaaS multi-locataire",
            "Conception de système récursif",
            "Architecture pilotée par événements"
        ],
        gradient: "from-blue-500 to-purple-600",
        liveUrl: "https://finances.iberis.io/fr/",
        githubUrl: "#",
        featured: true,
    },
    {
        id: 4,
        title: "Système de Carte de Visite NFC",
        shortDescription: "Développement de l'interface web et de l'application mobile pour le système de cartes de visite NFC d'une startup. Gestion complète du cycle de vie du projet, de la conception au déploiement en production.",
        longDescription: "Un système de carte de visite innovant basé sur NFC qui permet aux utilisateurs de partager des informations de contact numériquement.",
        fullDescription: "Direction du développement d'un système de carte de visite NFC de pointe de la conception à la production.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Développeur Full Stack & Chef de Projet",
        timeline: "Mars 2022 - Oct 2023",
        company: "Dcarte Solutions",
        status: "Abandoned",
        technologies: ["React", "React Native", "Django", "Laravel", "TailwindCSS", "NFC", "Mobile Development"],
        features: [
            "Intégration de la technologie NFC",
            "Application mobile multiplateforme",
            "Modèles de cartes de visite personnalisables"
        ],
        challenges: [
            "Intégration de la technologie NFC sur différents appareils",
            "Assurance de la compatibilité multiplateforme"
        ],
        solutions: [
            "Développement d'implémentations NFC spécifiques à la plateforme",
            "Utilisation de React Native pour le développement cross-platform"
        ],
        results: [
            "Prototype et test réussi avec 50+ utilisateurs",
            "Taux de réussite de scan NFC de 95%"
        ],
        learnings: [
            "Défis et solutions d'intégration matériel-logiciel",
            "Meilleures pratiques de développement mobile"
        ],
        gradient: "from-purple-500 to-pink-600",
        liveUrl: "#",
        githubUrl: "#",
        featured: false
    }
];
