export const contactPageContent = {
    hero: {
        badge: "Connectons-nous",
        titlePrefix: "Prêt à démarrer votre",
        titleHighlight: "Prochain Projet ?",
        description: "Je suis là pour donner vie à vos idées. Choisissez votre moyen de communication préféré et je vous répondrai rapidement."
    },
    methods: [
        {
            iconName: "FaEnvelope",
            title: "Email",
            description: "Idéal pour les discussions détaillées",
            action: "hafaiedhakram@gmail.com",
            color: "blue"
        },
        {
            iconName: "FaPhone",
            title: "Téléphone",
            description: "Questions rapides et consultations",
            action: "+216 50 569 298",
            color: "green"
        },
        {
            iconName: "FaCalendar",
            title: "Appel Vidéo",
            description: "Consultation gratuite de 30 min",
            action: "Prendre Rendez-vous",
            color: "purple"
        },
    ],
    responseTime: {
        title: "Temps de Réponse",
        subtitle: "Je privilégie les réponses rapides et utiles",
        items: [
            { time: "< 2 heures", type: "Demandes Urgentes", color: "from-red-500 to-orange-500" },
            { time: "< 24 heures", type: "Messages Généraux", color: "from-blue-500 to-purple-500" },
            { time: "< 48 heures", type: "Propositions de Projet", color: "from-green-500 to-emerald-500" },
        ]
    },
    whyMe: {
        title: "Pourquoi Travailler Avec Moi ?",
        subtitle: "Ce que vous pouvez attendre de notre collaboration",
        items: [
            { iconName: "FaCheckCircle", title: "Qualité d'Abord", description: "Code propre et maintenable suivant les meilleures pratiques" },
            { iconName: "FaCheckCircle", title: "Communication Claire", description: "Mises à jour régulières et suivi transparent" },
            { iconName: "FaCheckCircle", title: "Livraison à Temps", description: "Respect des délais sans compromettre la qualité" },
            { iconName: "FaCheckCircle", title: "Support Après-Lancement", description: "Assistance continue après la fin du projet" },
        ]
    },
    faq: {
        title: "Questions Fréquemment Posées",
        subtitle: "Questions courantes sur notre collaboration"
    },
    cta: {
        title: "Construisons Quelque Chose d'Incroyable Ensemble",
        description: "Prêt à passer à l'étape suivante ? Choisissez comment vous souhaitez vous connecter et discutons de votre projet.",
        schedule: "Planifier un Appel",
        email: "Envoyer un Email"
    }
};
