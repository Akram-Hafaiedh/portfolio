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

export const projectsPageContent = {
    hero: {
        badge: "Projets",
        projectsCount: "Projets Créés et Plus",
        mainTitle: "Créer des Expériences",
        mainTitleSecond: "Numériques",
        subtitle: "Transformer des",
        subtitleHighlight1: "problèmes complexes",
        subtitleMiddle: "en",
        subtitleHighlight2: "solutions élégantes",
        subtitleEnd: "grâce au code, à la créativité et à l'innovation",
        scrollText: "Faites défiler pour explorer les projets"
    },
    stats: {
        completed: "Terminés",
        inProgress: "En Cours",
        technologies: "Technologies",
        experience: "Années d'Exp"
    },
    featured: {
        title: "Projets Vedettes",
        description: "Mettant en valeur mon meilleur travail et mes réalisations"
    },
    technologies: {
        title: "Technologies avec lesquelles je Travaille",
        subtitle: "Une pile technologique diversifiée alimentant des solutions innovantes"
    },
    filters: {
        all: "Tous les Projets",
        saas: "SaaS & ERP",
        enterprise: "Entreprise",
        mobile: "Mobile & R&D",
        personal: "Personnel"
    },
    search: {
        placeholder: "Rechercher des projets, technologies...",
        grid: "Grille",
        list: "Liste"
    },
    results: {
        showing: "Affichage de",
        of: "sur",
        projects: "projets",
        in: "dans",
        matching: "correspondant à",
        noProjects: "Aucun projet trouvé",
        noResults: "Aucun résultat pour",
        noType: "Aucun projet",
        available: "disponible",
        showAll: "Afficher Tous les Projets"
    },
    loadMore: {
        button: "Charger Plus de Projets",
        remaining: "restant"
    },
    cta: {
        title: "Prêt à Démarrer Votre Projet ?",
        description: "Je suis passionné par la transformation des idées en réalité. Discutons de la façon dont nous pouvons donner vie à votre vision avec une technologie de pointe et des expériences utilisateur exceptionnelles.",
        bookCall: "Réserver un Appel Projet",
        viewExperience: "Voir Mon Expérience"
    }
};

export const projectDetailsContent = {
    backButton: "Retour aux Projets",
    status: {
        completed: "Terminé",
        inProgress: "En Cours",
        onHold: "En Pause",
        cancelled: "Annulé"
    },
    badges: {
        featured: "Vedette"
    },
    buttons: {
        viewLiveDemo: "Voir la Démo en Direct",
        viewSourceCode: "Voir le Code Source",
        bookCall: "Réserver un Appel",
        getInTouch: "Me Contacter"
    },
    meta: {
        role: "Rôle",
        timeline: "Chronologie",
        company: "Entreprise",
        personal: "Personnel",
        technologies: "Technologies"
    },
    sections: {
        projectOverview: "Aperçu du Projet",
        projectGallery: "Galerie du Projet",
        keyFeatures: "Fonctionnalités Clés",
        challengesSolutions: "Défis et Solutions",
        challenge: "Défi :",
        solution: "Solution :",
        resultsImpact: "Résultats et Impact",
        techStack: "Stack Technologique",
        keyLearnings: "Apprentissages Clés",
        quickLinks: "Liens Rapides",
        liveDemo: "Démo en Direct",
        sourceCode: "Code Source",
        allProjects: "Tous les Projets"
    },
    cta: {
        title: "Intéressé à travailler ensemble ?",
        description: "Discutons de votre projet et créons quelque chose d'incroyable ensemble."
    },
    comingSoon: {
        title: "Prochainement",
        description: "Ce projet est actuellement en cours de développement. Restez à l'écoute pour les mises à jour !",
        featuresTitle: "Fonctionnalités Prévues",
        techTitle: "Stack Technique Envisagée",
        notifyText: "Vous voulez être averti quand il sera en ligne ?"
    }
};

export const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Personnel",
        shortDescription: "Portfolio moderne full-stack avec système de réservation en temps réel, CV multilingue et communications par email automatisées. Construit avec des technologies de pointe pour présenter mon travail et rationaliser les interactions clients.",
        longDescription: "Une plateforme portfolio complète qui va au-delà des vitrines traditionnelles en intégrant de véritables outils d'interaction client. Les fonctionnalités incluent un système de réservation Google Calendar avec création automatisée de Google Meet, un CV multilingue avec génération de PDF, et des communications par email transparentes via Resend.",
        fullDescription: "Conception et développement d'un site web portfolio full-stack servant à la fois de vitrine de projets et de plateforme d'interaction client. Le site dispose d'un système de réservation en temps réel intégré à Google Calendar et Google Meet, de notifications par email automatisées utilisant Resend, d'un système de CV multilingue dynamique avec aperçu en direct et capacités de téléchargement PDF, et d'un design moderne et réactif construit avec Next.js and TailwindCSS. Le portfolio démontre des compétences avancées en développement full-stack tout en répondant à de réels besoins commerciaux pour l'acquisition et la communication client.",
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
            },
            {
                url: '/projects/portfolio-booking-admin-email.png',
                caption: 'E-mail de Notification Admin - Alertes de Réunion Automatisées avec Détails Client',
                category: 'Fonctionnalité'
            },
            {
                url: '/projects/portfolio-booking-calendar-invite.png',
                caption: 'Invitations Calendrier Automatisées - Intégration Google Meet avec Pièces Jointes .ics',
                category: 'Performance'
            },
            {
                url: '/projects/resume-preview.png',
                caption: 'Aperçu du CV Interactif - Support Multilingue avec Synchronisation PDF en Direct',
                category: 'Fonctionnalité'
            },
            {
                url: '/projects/pdf-generation.png',
                caption: 'Génération de PDF Côté Serveur - Préservation du Format Propre et Imprimable',
                category: 'Technique'
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
        shortDescription: "Plateforme interne de gestion des opérations pour une compagnie d'assurance, comprenant la gestion complète des clients/employés, le suivi des polices d'assurance, la gestion documentaire, le système de communication par e-mail et des permissions granulaires basées sur les rôles.",
        longDescription: "Conçu pour une compagnie d'assurance allemande confrontée à des défis de coordination des employés et de gestion des clients. La plateforme centralise toutes les opérations commerciales avec une intégration client en plusieurs étapes, la gestion des polices d'assurance, l'organisation des fichiers, un système d'e-mail interne avec modèles, le suivi des projets avec budgets, les flux d'approbation des congés et des permissions d'entreprise granulaires.",
        fullDescription: "Création d'une plateforme d'opérations complète pour Casa-Group, une compagnie d'assurance allemande. La plateforme centralise toutes les opérations via des modules intégrés qui ont éliminé leur chaos organisationnel. Ingénierie d'une architecture modulaire pour l'assurance, la comptabilité, la fiscalité, les RH et la gestion des congés, assurant une intégration fluide et évolutive. Intégration de fonctionnalités avancées, notamment des systèmes d'e-mails internes avec modèles, des notifications en temps réel via WebSockets et des journaux d'activité détaillés. Le système de gestion documentaire, intégré à OVH Cloud, a transformé des heures de recherche en une récupération instantanée.",
        image: "/projects/casagroup.png",
        gallery: [],
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Juin 2025 - Oct 2025",
        company: "Casa-Group (Allemagne)",
        status: "Completed",
        technologies: [
            "React", "shadcn/ui", "TailwindCSS", "TypeScript", "Node.js", "Laravel", "MySQL", "OVH Cloud", "WebSockets", "Docker"
        ],
        features: [
            "Tableau de bord d'entreprise modulaire pour opérations décentralisées",
            "Suivi multilingue des polices d'assurance et gestion du cycle de vie",
            "Système d'e-mail interne avec modèles et journalisation automatique",
            "Flux de gestion des RH et des congés avec système de notification",
            "Journaux d'activité en temps réel et pistes d'audit système",
            "Gestion sécurisée des fichiers intégrée au stockage OVH Cloud",
            "Contrôle d'accès granulaire basé sur les rôles (RBAC) pour plus de 10 types de rôles"
        ],
        challenges: [
            "Consolidation d'informations éparpillées sur les clients et les employés dans un système unifié",
            "Mise en œuvre de flux d'approbation de congés complexes avec des permissions conflictuelles",
            "Gestion du stockage de documents à grande échelle avec un accès sécurisé et hiérarchisé",
            "Synchronisation des notifications en temps réel entre plusieurs services"
        ],
        solutions: [
            "Construction d'une interface d'assistant par étapes pour la saisie structurée des données clients",
            "Développement d'un moteur de workflow flexible basé sur une machine à états pour les demandes de congés",
            "Utilisation d'OVH Cloud avec des URL signées pour l'hébergement sécurisé des documents",
            "Mise en œuvre d'un serveur WebSocket pour des alertes instantanées à l'échelle du service"
        ],
        results: [
            "Amélioration de l'engagement des utilisateurs de 30% grâce à une conception intuitive du tableau de bord",
            "Réduction du temps de récupération des documents d'assurance de quelques heures à quelques secondes",
            "Élimination de la perte de données clients grâce à une gestion centralisée des dossiers",
            "Optimisation des processus RH, réduisant les frais administratifs de 20%"
        ],
        learnings: [
            "Normes de conformité et de sécurité des données du secteur des assurances",
            "Gestion d'état complexe dans les applications React à grande échelle",
            "Conception d'architectures modulaires évolutives pour les logiciels d'entreprise"
        ],
        featured: true,
        gradient: "from-green-500 to-teal-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Iberis.io",
        shortDescription: "ERP SaaS multi-tenant avec une architecture à trois niveaux : Master Admin, Dashboard Business et Portail Client. Comprend la facturation automatisée des abonnements, l'analyse des actionnaires et l'automatisation complète du cycle de vie de l'entreprise.",
        longDescription: "Une plateforme ERP SaaS multi-tenant avec une architecture récursive - Iberis utilise son propre système pour gérer les abonnements clients, générer les factures et suivre les revenus. La plateforme gère l'ensemble du cycle de vie de l'entreprise : ventes, achats, stocks, comptabilité, avec un pipeline automatisé abonnement-vers-facture.",
        fullDescription: "Direction du développement d'une plateforme ERP SaaS multi-tenant avec une architecture récursive et auto-gérée. Aspect unique : Iberis utilise son propre système pour gérer les abonnements et la facturation des clients, créant un cycle d'exploitation autonome. Implémentation du cycle de vente complet, gestion des achats, suivi des dépenses et contrôle des stocks multi-entrepôts.\n\nLes points techniques clés incluent l'ingénierie de modules SaaS Fintech avec des modèles PDF personnalisables, des en-têtes/pieds de page dynamiques et un support multilingue (FR/AR). Développement d'un module PDV autonome avec synchronisation des stocks en temps réel et traitement des paiements. Optimisation du traitement des données avec des imports Excel par lots gérant efficacement des ensembles de données de plus de 10 000 articles via le cache Redis.",
        image: "/projects/iberis.png",
        gallery: [],
        type: "Full Stack",
        role: "Développeur Full Stack Senior",
        timeline: "Déc 2023 - Juin 2025",
        company: "Iberis",
        status: "Completed",
        technologies: [
            "Laravel", "Vue.js", "MySQL", "Bootstrap", "REST API", "Redis", "WebSocket", "Ionic", "Konnect", "Yajra", "Stripe", "Docker"
        ],
        features: [
            "Architecture SaaS multi-tenant avec auto-gestion récursive",
            "Pipeline automatisé de l'abonnement à la facture",
            "Modules Fintech avec modèles PDF personnalisables",
            "Module PDV autonome avec synchronisation des stocks en temps réel",
            "Portails clients/fournisseurs sécurisés avec systèmes d'invitation",
            "Imports Excel par lots (10k+ articles) avec optimisation Redis",
            "Support multidevises (XOF/XAF) et configurations fiscales"
        ],
        challenges: [
            "Conception d'une architecture récursive où la plateforme gère sa propre facturation",
            "Gestion d'imports Excel à grande échelle sans dépassement de délai système",
            "Mise en œuvre d'une isolation stricte des locataires dans un environnement de base de données partagée",
            "Garantir la précision des stocks en temps réel sur plusieurs terminaux de point de vente"
        ],
        solutions: [
            "Mise en œuvre d'un pipeline d'abonnement piloté par les événements via les Observers Laravel",
            "Développement d'un traitement de file d'attente en arrière-plan avec Redis pour les opérations par lots",
            "Utilisation des Global Scopes Laravel pour l'isolation automatisée des données des locataires",
            "Création d'un moteur de gestion des stocks centralisé avec verrouillage pessimiste"
        ],
        results: [
            "Réduction des temps de chargement de 40% grâce à une mise en cache agressive et une optimisation des requêtes",
            "Croissance du nombre d'utilisateurs de 1 000 à plus de 9 000 utilisateurs actifs",
            "Réduction des tickets de support de 35% grâce à la mise en place du portail libre-service",
            "Réduction de 25% des temps de transaction en point de vente"
        ],
        learnings: [
            "Maîtrise de l'architecture SaaS multi-tenant et des modèles d'isolation de données",
            "Optimisation des flux de travail fintech complexes et de la génération de documents",
            "Mise à l'échelle d'applications pour gérer un volume élevé de trafic et de données"
        ],
        featured: true,
        gradient: "from-blue-500 to-purple-600",
        liveUrl: "https://finances.iberis.io/fr/",
        githubUrl: "#"
    },
    {
        id: 4,
        title: "Gestion des Patients en Temps Réel",
        shortDescription: "Plateforme de santé avancée avec suivi des patients en temps réel et messagerie professionnelle via WebSockets. Conçue pour améliorer la latence de communication en milieu clinique.",
        longDescription: "Une application de santé spécialisée conçue pour optimiser les flux de gestion des patients dans les établissements médicaux. Comprend une base de données patients dynamique, une messagerie en temps réel entre prestataires via WebSockets et une architecture modulaire.",
        fullDescription: "Développement d'une application métier complexe pour les prestataires de santé avec des capacités en temps réel. La fonctionnalité centrale est un système de messagerie personnalisé basé sur les WebSockets qui a réduit la latence de communication de 50% par rapport aux méthodes traditionnelles. Mise en œuvre d'un système de dossiers patients robuste avec des contrôles d'accès granulaires et des tableaux de bord interactifs.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Août 2023 - Nov 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Laravel", "Vue.js", "MySQL", "WebSockets", "TailwindCSS", "REST API"],
        features: [
            "Messagerie professionnelle en temps réel via WebSockets",
            "Système centralisé de gestion des dossiers patients",
            "Contrôle d'accès granulaire pour le personnel médical",
            "Tableau de bord interactif de suivi des patients",
            "Journaux d'audit pour toutes les modifications de dossiers"
        ],
        challenges: [
            "Garantir une livraison de messagerie 100% fiable en contexte médical critique",
            "Gestion de schémas de base de données complexes avec une haute intégrité",
            "Optimisation des performances WebSocket pour les utilisateurs simultanés"
        ],
        solutions: [
            "Mise en œuvre d'un suivi de livraison basé sur des accusés de réception",
            "Utilisation de Laravel Eloquent avec des contraintes de clés étrangères strictes",
            "Développement d'un serveur WebSocket évolutif utilisant Node.js"
        ],
        results: [
            "Réduction de la latence de communication inter-services de 50%",
            "Amélioration de la précision de saisie des données de 30%",
            "Déploiement réussi dans 3 services cliniques différents"
        ],
        learnings: [
            "Modèles de synchronisation de données en temps réel dans la santé",
            "Architecture de systèmes de messagerie hautement fiables",
            "Considérations de sécurité et de confidentialité des données médicales"
        ],
        featured: false,
        gradient: "from-blue-400 to-emerald-500",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 5,
        title: "Logistique de Transport & Suivi",
        shortDescription: "Solution de transport intégrant des notifications push en temps réel et un suivi logistique. Optimise la communication entre les centres de transport et les unités mobiles.",
        longDescription: "Une plateforme complète de gestion logistique conçue pour suivre les unités de transport et faciliter la communication instantanée via notifications push. Conçue pour gérer des mises à jour de statut fréquentes.",
        fullDescription: "Ingénierie d'une solution de transport centrée sur la réactivité en temps réel. Utilisation de Pusher pour un système de notifications push robuste qui a amélioré la réactivité opérationnelle de 40%. La plateforme comprend le suivi détaillé des unités, la gestion des itinéraires et des tableaux de bord de reporting.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Oct 2023 - Nov 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Laravel", "Vue.js", "Pusher", "MySQL", "TailwindCSS"],
        features: [
            "Système de notifications push instantanées via Pusher",
            "Suivi du statut des unités de transport en temps réel",
            "Tableau de bord logistique pour la coordination multi-unités",
            "Gestion dynamique des itinéraires et reporting",
            "Portail responsive pour les unités sur le terrain"
        ],
        challenges: [
            "Coordination des mises à jour d'état entre interfaces web et mobiles",
            "Garantir la livraison des notifications dans diverses conditions de réseau",
            "Gestion de données de localisation et de statut à haute fréquence"
        ],
        solutions: [
            "Conception d'une architecture partagée pilotée par les événements",
            "Mise en œuvre de mécanismes de notification de secours",
            "Optimisation de l'indexation de la base de données pour le suivi temporel"
        ],
        results: [
            "Amélioration de la réactivité opérationnelle de 40%",
            "Réduction des erreurs de coordination de 25%",
            "Latence quasi nulle pour les notifications de mise à jour de statut"
        ],
        learnings: [
            "Architecture avancée pilotée par les événements avec Pusher",
            "Modélisation de données logistiques et optimisation des performances",
            "Conception d'interfaces pour environnements opérationnels à haute pression"
        ],
        featured: false,
        gradient: "from-orange-500 to-yellow-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 6,
        title: "Marketplace Immobilier",
        shortDescription: "Plateforme immobilière haute performance dotée d'un moteur de recherche avancé. Conçue pour la rapidité et la précision dans la découverte de projets.",
        longDescription: "Une marketplace immobilière sophistiquée privilégiant l'efficacité de la recherche. Utilisant Meilisearch, la plateforme fournit des résultats instantanés et tolérants aux fautes de frappe.",
        fullDescription: "Construction d'une marketplace immobilière axée sur la précision et la rapidité de recherche. Intégration de Meilisearch comme moteur de recherche principal, entraînant une augmentation significative de la pertinence des recherches. Développement de systèmes de filtrage flexibles et de vues cartographiques interactives.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Développeur Full Stack",
        timeline: "Août 2023 - Oct 2023",
        company: "Next Consulting",
        status: "Completed",
        technologies: ["Next.js", "Node.js", "Meilisearch", "PostgreSQL", "TailwindCSS", "Prisma"],
        features: [
            "Intégration d'un moteur de recherche ultra-rapide avec Meilisearch",
            "Filtrage et catégorisation avancés des propriétés",
            "Vue cartographique interactive des propriétés",
            "Portail de gestion dynamique des annonces pour les agents",
            "Pages de propriétés hautement réactives et optimisées pour le SEO"
        ],
        challenges: [
            "Synchronisation des données de la base relationnelle avec l'index de recherche",
            "Mise en œuvre de filtres multicritères complexes avec haute performance",
            "Garantir un excellent SEO pour les annonces dynamiques"
        ],
        solutions: [
            "Développement d'une synchronisation d'index via des triggers de base de données",
            "Utilisation du rendu côté serveur (SSR) pour maximiser le SEO",
            "Utilisation de Prisma pour une récupération de données efficace et typée"
        ],
        results: [
            "Temps de réponse de recherche réduits à moins de 50ms",
            "Augmentation de 30% de la durée des sessions utilisateurs",
            "Indexation réussie de plus de 5 000 annonces immobilières"
        ],
        learnings: [
            "Mise en œuvre de moteurs de recherche avancés (Meilisearch)",
            "Stratégies SEO pour marketplaces dynamiques à grande échelle",
            "Récupération de données haute performance avec Prisma et Next.js"
        ],
        featured: false,
        gradient: "from-cyan-500 to-blue-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 7,
        title: "Physiomedica : R&D Médicale",
        shortDescription: "Projet de recherche et développement pour un système électronique médical innovant. Axé sur l'intégration matériel-logiciel pour un dispositif minceur portable.",
        longDescription: "Un projet de R&D spécialisé impliquant la conception d'un dispositif médical contrôlé via une interface Android. Comprend la communication via Bluetooth et une validation clinique stricte.",
        fullDescription: "Projet de R&D de niveau Master pour PHYSIOMEDICA. Conception d'un dispositif médical minceur portable intégrant des commandes matérielles avec une application Android personnalisée. Ingénierie du protocole de communication Bluetooth. Le projet comprenait une validation clinique complète et la conformité aux normes de sécurité médicale.",
        image: "",
        gallery: undefined,
        type: "Mobile",
        role: "Ingénieur Projet R&D",
        timeline: "Fév 2018 - Août 2018",
        company: "Physiomedica",
        status: "Completed",
        technologies: ["Java", "Android", "Bluetooth", "C/C++", "Altium Designer", "Embedded Systems"],
        features: [
            "Contrôle matériel via une application Android personnalisée",
            "Protocole de communication Bluetooth dédié",
            "Conception matérielle de dispositif médical portable",
            "Surveillance en temps réel des paramètres cliniques",
            "Conformité stricte aux normes de sécurité électronique médicale"
        ],
        challenges: [
            "Garantir une acquisition de données sans bruit pour le matériel médical",
            "Maintenir une connectivité Bluetooth stable en milieu clinique",
            "Intégration du firmware C++ bas niveau avec Java Android haut niveau"
        ],
        solutions: [
            "Mise en œuvre de filtres numériques au niveau matériel",
            "Développement d'une couche de gestion Bluetooth robuste",
            "Utilisation de JNI pour une communication mobile-matériel efficace"
        ],
        results: [
            "Développement réussi d'un prototype portable fonctionnel",
            "Taux de réussite de 100% aux tests de validation clinique initiaux",
            "Communication fluide matériel-application sans perte de données"
        ],
        learnings: [
            "Intégration matériel-logiciel médical et cycle de vie R&D",
            "Conception de protocoles bas niveau et systèmes embarqués",
            "Processus de validation clinique et certification médicale"
        ],
        featured: false,
        gradient: "from-indigo-600 to-blue-700",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 8,
        title: "Système de Cartes de Visite NFC",
        shortDescription: "Application mobile et web cross-platform pour un système de cartes de visite NFC. Gestion complète du cycle de vie du projet.",
        longDescription: "Un système innovant de cartes de visite basé sur le NFC permettant de partager des profils numériquement. La plateforme comprend un portail de gestion web et une application mobile.",
        fullDescription: "Direction du développement d'un système de cartes de visite NFC de pointe. Leadership technique pour l'architecture et le déploiement de l'interface web et de l'application mobile. Gestion du cycle de vie complet en suivant les pratiques Agile.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Lead Technique",
        timeline: "Mar 2022 - Oct 2023",
        company: "Dcarte Solutions",
        status: "Abandoned",
        technologies: ["React", "React Native", "Django", "Laravel", "PostgreSQL", "NFC", "TailwindCSS"],
        features: [
            "Intégration matériel NFC vers profil numérique",
            "Application mobile cross-platform (iOS/Android)",
            "Gestion dynamique des profils de cartes de visite",
            "Portail web évolutif pour la gestion d'entreprise",
            "Gestion d'équipe et analyses pour les cartes de visite"
        ],
        challenges: [
            "Comportement NFC incohérent selon les variantes matérielles Android/iOS",
            "Garantir la sécurité des données dans les communications NFC",
            "Gestion du déploiement à grande échelle des cartes NFC physiques"
        ],
        solutions: [
            "Développement de gestionnaires NFC spécifiques à chaque plateforme",
            "Mise en œuvre de paquets de données chiffrés pour la sécurité NFC",
            "Construction d'un système centralisé de suivi des actifs NFC"
        ],
        results: [
            "Taux de réussite des scans NFC de 95% sur plus de 50 appareils tests",
            "Déploiement réussi du prototype et retours utilisateurs initiaux positifs",
            "Établissement d'une architecture robuste pour la gestion multi-tenant"
        ],
        learnings: [
            "Intégration de la technologie NFC et communication matériel-logiciel",
            "Leadership technique et gestion de projet Agile en contexte startup",
            "Stratégies de développement cross-platform pour fonctions matérielles"
        ],
        featured: false,
        gradient: "from-purple-500 to-pink-600",
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        id: 9,
        title: "The Gourmet Haven",
        shortDescription: "Un site web de restaurant premium doté d'un menu dynamique, d'un système de réservation de tables et d'une vitrine d'expérience culinaire immersive. Conçu pour un établissement gastronomique haut de gamme.",
        longDescription: "The Gourmet Haven est une plateforme web sophistiquée conçue pour les restaurants de luxe. Elle offre une interface élégante permettant aux clients d'explorer les menus de saison, de réserver des tables en temps réel et de découvrir l'ambiance unique et la philosophie culinaire du restaurant.",
        fullDescription: "Actuellement en cours de développement, The Gourmet Haven vise à redéfinir la présence numérique de la gastronomie fine. La plateforme comprendra un système de menu haute performance avec catégorisation et filtrage, un moteur de réservation de tables sécurisé avec confirmation instantanée, et une galerie visuellement époustouflante présentant l'intérieur du restaurant et ses plats signatures. Le projet met l'accent sur une esthétique haut de gamme, des transitions fluides (Framer Motion) et une optimisation SEO pour garantir une visibilité maximale à l'établissement.",
        image: "",
        gallery: undefined,
        type: "Full Stack",
        role: "Développeur Full Stack Senior",
        timeline: "Jan 2026 - Présent",
        company: "Projet Freelance",
        status: "In Progress",
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Framer Motion", "Resend"],
        features: [
            "Design élégant et responsive avec une typographie premium",
            "Gestion dynamique du menu avec filtres diététiques",
            "Système de réservation de tables en temps réel",
            "E-mails de confirmation de réservation automatisés",
            "Contenu optimisé pour le SEO culinaire",
            "Vitrine interactive des spécialités du chef"
        ],
        challenges: [
            "Créer une interface qui transmet le luxe et l'attention aux détails",
            "Gérer la disponibilité des réservations dans un environnement à forte demande",
            "Optimiser le contenu riche en images pour des temps de chargement rapides"
        ],
        solutions: [
            "Utilisation d'un système de design minimaliste à fort contraste",
            "Mise en œuvre d'un moteur de disponibilité côté serveur avec Prisma",
            "Exploitation de l'optimisation d'images Next.js et du lazy loading"
        ],
        results: [],
        learnings: [
            "Principes de design UI haut de gamme pour l'industrie de l'hôtellerie",
            "Gestion des contraintes de planification en temps réel",
            "Optimisation des performances pour les sites de marque riches en médias"
        ],
        featured: false,
        gradient: "from-amber-500 to-rose-700",
        liveUrl: "#",
        githubUrl: "#"
    }
];
