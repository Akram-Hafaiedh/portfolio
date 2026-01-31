// lib/data/fr/contact.ts

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

export const bookingContent = {
    hero: {
        badge: "Réservation instantanée",
        title: "Planifier une réunion",
        subtitle: "Discutons de votre projet et donnons vie à vos idées",
        emphasis: "Choisissez un horaire qui vous convient."
    },
    calendar: {
        title: "Sélectionner la date et l'heure",
        dateLabel: "Choisir une date",
        durationLabel: "Durée de la réunion",
        slotsLabel: "Créneaux horaires disponibles",
        loadingSlots: "Chargement des créneaux disponibles...",
        noSlots: "Aucun créneau disponible pour cette date",
        selectedTime: "Heure de réunion sélectionnée",
        minutes: "minutes"
    },
    form: {
        title: "Vos informations",
        name: "Votre nom",
        email: "Adresse e-mail",
        subject: "Sujet de la réunion",
        subjectPlaceholder: "ex. Opportunité d'emploi, Discussion de projet, Entretien technique",
        message: "Message additionnel",
        messagePlaceholder: "Parlez-moi un peu de ce que vous aimeriez discuter, des exigences de votre projet ou de tout sujet spécifique que vous souhaitez aborder...",
        namePlaceholder: "Entrez votre nom complet",
        emailPlaceholder: "votre.email@exemple.com",
        required: "*",
        submit: "Planifier la réunion",
        submitting: "Planification en cours...",
        disclaimer: "En planifiant cette réunion, vous acceptez notre politique de confidentialité et nos conditions d'utilisation."
    },
    meetingDetails: {
        title: "Détails de la réunion",
        googleMeet: "Lien Google Meet sera fourni",
        calendar: "Invitation de calendrier avec rappels",
        remote: "Disponible pour les réunions à distance dans le monde entier",
        flexible: "Reprogrammation flexible disponible"
    },
    messages: {
        success: "Rendez-vous planifié avec succès ! Consultez votre e-mail pour le lien de réunion.",
        error: "Erreur lors de la planification du rendez-vous. Veuillez réessayer.",
        selectSlot: "Veuillez sélectionner un créneau horaire",
        fetchError: "Échec de la récupération de la disponibilité"
    },
    durations: {
        30: "30 minutes",
        45: "45 minutes",
        60: "1 heure",
        90: "1,5 heures",
        120: "2 heures"
    }
};
