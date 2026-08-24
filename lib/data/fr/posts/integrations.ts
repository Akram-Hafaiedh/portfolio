// lib/data/fr/posts/integrations.ts
import { BlogPost } from '../../blogTypes';

export const integrationsPosts: BlogPost[] = [
{
    slug: "building-calendar-booking-integrations-nextjs",
    title: "Intégration d'un Système de Réservation avec Google Calendar & Meet dans Next.js",
    excerpt: "Comment connecter les API Google Calendar & Meet avec Next.js App Router et les Server Actions pour automatiser la prise de rendez-vous stratégique.",
    date: "2026-01-20",
    readTime: "5 min de lecture",
    category: "Backend",
    tags: ["Intégration API", "API Google", "OAuth 2.0", "Next.js"],
    image: "/blog/calendar-booking.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Intégration de Google Calendar & Meet dans Next.js

L'automatisation des processus de réservation réduit la charge administrative et facilite la mise en relation avec des clients potentiels ou des recruteurs. Voyons comment mettre en œuvre un flux de réservation sécurisé en utilisant les **Next.js Server Actions** et les **API Google**.

---

## Architecture de Fonctionnement

Lorsqu'un utilisateur sélectionne une date et un créneau horaire disponibles, la séquence suivante est déclenchée :

1.  **Soumission du Formulaire** : L'utilisateur saisit ses coordonnées et valide le formulaire client.
2.  **Exécution de la Server Action** : Le backend se connecte de manière sécurisée aux API Google à l'aide de ses identifiants.
3.  **Création de l'Événement** : Un événement est planifié sur votre Google Calendar, avec un lien de visioconférence **Google Meet** généré automatiquement.
4.  **Notifications** : Les invitations de calendrier (.ics) sont envoyées au client, et des e-mails de confirmation sont transmis via Resend.

![Architecture de Réservation d'Agenda Google API & Resend](/blog/calendar-booking-architecture.png)

---

## 1. Configuration du Client OAuth Google

Enregistrez vos identifiants OAuth en toute sécurité dans votre fichier \`.env\`. Ensuite, configurez le client dans un module serveur sécurisé.

\`\`\`ts
// lib/google-auth.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Configuration dynamique des tokens depuis la base de données ou le store
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
\`\`\`

---

## 2. Génération Dynamique de la Réunion

Lors de la création de l'événement, vous pouvez demander à Google de générer automatiquement un lien de visioconférence unique en spécifiant \`conferenceDataVersion: 1\`.

\`\`\`ts
// app/actions/createMeeting.ts
'use server';

import { calendar } from '@/lib/google-auth';

export async function createMeeting(clientData: { name: string; email: string; dateTime: string }) {
  try {
    const event = {
      summary: \`Session Stratégique avec \${clientData.name}\`,
      description: 'Discussion autour des exigences et de la portée du projet.',
      start: {
        dateTime: clientData.dateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(clientData.dateTime).getTime() + 30 * 60 * 1000).toISOString(), // +30 minutes
        timeZone: 'UTC',
      },
      attendees: [
        { email: clientData.email },
        { email: 'votre-email@example.com' } // Organisateur
      ],
      conferenceData: {
        createRequest: {
          requestId: \`meet-\${Date.now()}\`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1, // Crucial pour la génération du lien Google Meet
    });

    return {
      success: true,
      meetUrl: response.data.conferenceData?.entryPoints?.[0]?.uri || null,
    };
  } catch (error) {
    console.error('Erreur lors de la création de l\\'événement de calendrier:', error);
    return { success: false, error: 'La réservation a échoué' };
  }
}
\`\`\`

---

## 3. Bonnes Pratiques pour la Fiabilité

*   **Renouvellement des Jetons (Token Refresh)** : Mettez en place un écouteur sur le rafraîchissement des jetons pour synchroniser votre base de données.
*   **Vérification du Fuseau Horaire** : Assurez-vous que toutes les dates sélectionnées sont formatées en chaînes ISO avec un décalage de fuseau horaire explicite.
*   **Alternative de Secours** : En cas de défaillance de l'API, proposez un lien vers un outil externe ou un formulaire de contact direct pour éviter de bloquer l'utilisateur.
`
  },

{
    slug: "instant-search-meilisearch-nextjs",
    title: "Recherche en Moins de 50ms: Intégration de Meilisearch dans Next.js",
    excerpt: "Comment implémenter un moteur de recherche ultra-rapide et tolérant aux fautes de frappe avec PostgreSQL, Prisma et Meilisearch.",
    date: "2026-01-15",
    readTime: "3 min de lecture",
    category: "Engineering",
    tags: ["Next.js", "Prisma", "Meilisearch", "Base de données"],
    image: "/blog/covers/database-optimization.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Recherche Instantanée en Moins de 50ms avec Next.js

Les utilisateurs modernes s'attendent à des résultats de recherche instantanés. Les requêtes SQL \`LIKE\` classiques ralentissent rapidement sur de larges volumes de données et ne tolèrent pas les fautes de frappe. Voyons comment coupler **Meilisearch** avec **Next.js** et **Prisma** pour afficher des résultats de recherche en moins de 50 ms.

---

## Pourquoi Meilisearch ?

Contrairement à Elasticsearch, qui requiert beaucoup de mémoire et une configuration fastidieuse, Meilisearch est très léger, intègre d'office la tolérance aux fautes de frappe (typo tolerance) et a été conçu spécialement pour la recherche instantanée au fil de la saisie.

---

## 1. Synchronisation des Données avec un Middleware Prisma

À chaque création ou modification de fiche en base PostgreSQL, nous devons mettre à jour l'index Meilisearch. Nous pouvons réaliser cela de façon élégante en utilisant le middleware de Prisma :

\`\`\`ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { MeiliSearch } from 'meilisearch';

const prisma = new PrismaClient();
const searchClient = new MeiliSearch({ host: 'http://localhost:7700', apiKey: 'masterKey' });

prisma.$use(async (params, next) => {
  const result = await next(params);

  // Synchronise avec l'index Meilisearch
  if (params.model === 'Listing' && ['create', 'update'].includes(params.action)) {
    const searchIndex = searchClient.index('listings');
    await searchIndex.addDocuments([{
      id: result.id,
      title: result.title,
      description: result.description,
      price: result.price,
      city: result.city,
    }]);
  }

  return result;
});
\`\`\`

---

## 2. Interrogation de l'Index via les Server Actions Next.js

Requêter l'index Meilisearch est particulièrement rapide, assurant ainsi un temps de réponse minime pour vos APIs.

\`\`\`ts
// app/actions/search.ts
'use server';

import { MeiliSearch } from 'meilisearch';

const searchClient = new MeiliSearch({ host: 'http://localhost:7700', apiKey: 'masterKey' });

export async function searchListings(query: string) {
  try {
    const index = searchClient.index('listings');
    const searchResults = await index.search(query, {
      limit: 10,
      attributesToHighlight: ['title'],
    });

    return { success: true, hits: searchResults.hits };
  } catch (error) {
    console.error('Erreur de recherche Meilisearch:', error);
    return { success: false, hits: [] };
  }
}
\`\`\`

En déléguant la recherche à un index optimisé pour cela, votre base de données SQL n'est pas surchargée, et vos utilisateurs profitent d'une interface d'une réactivité incomparable.
`
  }
];
