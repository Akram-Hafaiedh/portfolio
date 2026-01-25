export const dictionary = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            experience: "Experience",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
        },
        sections: {
            recentExperience: "Recent Experience",
            viewAllExperience: "View All Experience",
            professionalJourney: "Professional Journey",
            experienceSubtitle: "Building impactful solutions across diverse technologies and industries",
            featuredWork: "Featured Work",
            projectsTitle: "Projects That Make a Difference",
            projectsSubtitle: "Real-world applications that solve problems and deliver results",
            viewAllProjects: "View All Projects",
            projectsFooter: "Explore detailed case studies and technical documentation",
            contactTitle: "Get In Touch",
            contactHeadline: "Let's Work Together",
            contactSubtitle: "Ready to start your project? Choose how you'd like to connect",
            emailMe: "Email Me",
            callMe: "Call Me",
            location: "Location",
            sendMessage: "Send a Message",
            sendMessageSubtitle: "Fill out the form and I'll get back to you within 24 hours",
            freeConsultation: "Free Consultation",
            bookMeeting: "Book a Meeting",
            connectWithMe: "Connect With Me",
            availability: "Availability"
        }
    },
    fr: {
        nav: {
            home: "Accueil",
            about: "À propos",
            experience: "Expérience",
            skills: "Compétences",
            projects: "Projets",
            contact: "Contact",
        },
        sections: {
            recentExperience: "Expériences Récentes",
            viewAllExperience: "Voir Toute l'Expérience",
            professionalJourney: "Parcours Professionnel",
            experienceSubtitle: "Création de solutions percutantes à travers diverses technologies et industries",
            featuredWork: "Travaux en Vedette",
            projectsTitle: "Des Projets Qui Font la Différence",
            projectsSubtitle: "Des applications concrètes qui résolvent des problèmes et donnent des résultats",
            viewAllProjects: "Voir Tous les Projets",
            projectsFooter: "Explorez des études de cas détaillées et la documentation technique",
            contactTitle: "Contactez-moi",
            contactHeadline: "Travaillons Ensemble",
            contactSubtitle: "Prêt à démarrer votre projet ? Choisissez comment vous souhaitez vous connecter",
            emailMe: "Envoyez-moi un email",
            callMe: "Appelez-moi",
            location: "Localisation",
            sendMessage: "Envoyer un message",
            sendMessageSubtitle: "Remplissez le formulaire et je vous répondrai dans les 24 heures",
            freeConsultation: "Consultation Gratuite",
            bookMeeting: "Prendre Rendez-vous",
            connectWithMe: "Connectez-vous avec moi",
            availability: "Disponibilité"
        }
    },
};

export type Dictionary = typeof dictionary.en;
export type Language = keyof typeof dictionary;
