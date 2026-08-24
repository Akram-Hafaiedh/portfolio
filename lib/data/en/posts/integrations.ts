// lib/data/en/posts/integrations.ts
import { BlogPost } from '../../blogTypes';

export const integrationsPosts: BlogPost[] = [
{
    slug: "building-calendar-booking-integrations-nextjs",
    title: "Integrating Secure Google Calendar & Meet Bookings in Next.js",
    excerpt: "How to connect Google Calendar & Meet APIs with Next.js App Router and Server Actions to automate client strategy sessions and discovery calls.",
    date: "2026-01-20",
    readTime: "5 min read",
    category: "Backend",
    tags: ["API Integration", "Google APIs", "OAuth 2.0", "Next.js"],
    image: "/blog/calendar-booking.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Integrating Google Calendar & Meet in Next.js

Automating booking processes reduces administrative overhead and makes it easy for potential clients or recruiters to get in touch. Let's break down how to implement a secure booking flow using **Next.js Server Actions** and the **Google APIs**.

---

## The Workflow Architecture

When a user selects an available date and time slot, the following sequence occurs:

1.  **Form Submission**: The user enters their details and submits the React client form.
2.  **Server Action Execution**: The backend securely connects to the Google API using environment credentials.
3.  **Calendar Event Creation**: An event is generated on your Google Calendar, with dynamic **Google Meet** video conference links attached.
4.  **Notifications**: Automated calendar invites (.ics) are sent to the client, and confirmation emails are dispatched using Resend.

![Google Calendar & Resend Scheduling API Architecture](/blog/calendar-booking-architecture.png)

---

## 1. Setting up Google OAuth & API Client

Store your OAuth Credentials safely in your \`.env\` file. Next, instantiate the client inside a secure server file.

\`\`\`ts
// lib/google-auth.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set tokens dynamically from database or token store
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
\`\`\`

---

## 2. Generating the Meeting dynamically

When inserting an event, you can request Google to automatically generate a unique Google Meet link using \`conferenceDataVersion: 1\`.

\`\`\`ts
// app/actions/createMeeting.ts
'use server';

import { calendar } from '@/lib/google-auth';

export async function createMeeting(clientData: { name: string; email: string; dateTime: string }) {
  try {
    const event = {
      summary: \`Strategy Session with \${clientData.name}\`,
      description: 'Discussing project requirements and scope.',
      start: {
        dateTime: clientData.dateTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(clientData.dateTime).getTime() + 30 * 60 * 1000).toISOString(), // +30 mins
        timeZone: 'UTC',
      },
      attendees: [
        { email: clientData.email },
        { email: 'your-email@example.com' } // Host email
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
      conferenceDataVersion: 1, // Crucial for Google Meet URL generation
    });

    return {
      success: true,
      meetUrl: response.data.conferenceData?.entryPoints?.[0]?.uri || null,
    };
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    return { success: false, error: 'Booking failed' };
  }
}
\`\`\`

---

## 3. Best Practices for Reliability

*   **Token Refreshing**: Always listen for token refresh events and update your persistent store.
*   **Timezone Verification**: Ensure all selected times are converted to ISO strings with explicit offsets.
*   **Fallback Scheduling**: If the API request fails, provide a fallback link to static booking software or a direct contact form to prevent user frustration.
`
  },

{
    slug: "instant-search-meilisearch-nextjs",
    title: "Instant Search Results Under 50ms: Integrating Meilisearch in Next.js",
    excerpt: "How to implement typo-tolerant, ultra-fast search in web applications with PostgreSQL, Prisma, and Meilisearch.",
    date: "2026-01-15",
    readTime: "3 min read",
    category: "Engineering",
    tags: ["Next.js", "Prisma", "Meilisearch", "Database"],
    image: "/blog/covers/database-optimization.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Instant Search Results Under 50ms in Next.js

Modern web search expects instant feedback. Standard SQL \`LIKE\` queries degrade rapidly when filtering thousands of rows or when typos occur. Let's look at how to implement **Meilisearch** alongside **Next.js** and **Prisma** to search listings under 50ms.

---

## Why Meilisearch?

Unlike Elasticsearch, which requires massive memory overhead and complex setups, Meilisearch is lightweight, typo-tolerant out of the box, and built for instant search-as-you-type interfaces.

---

## 1. Synchronizing Data with Prisma Middleware

Whenever a property listing is created or updated in PostgreSQL, we must synchronize it to our Meilisearch index. You can do this elegantly using Prisma middleware or DB events:

\`\`\`ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { MeiliSearch } from 'meilisearch';

const prisma = new PrismaClient();
const searchClient = new MeiliSearch({ host: 'http://localhost:7700', apiKey: 'masterKey' });

prisma.$use(async (params, next) => {
  const result = await next(params);

  // Sync to Meilisearch index on listing modifications
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

## 2. Searching Index from Next.js Server Actions

Querying the search engine is incredibly straightforward and keeps your API response latency minimal.

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
    console.error('Meilisearch search error:', error);
    return { success: false, hits: [] };
  }
}
\`\`\`

By offloading searching search filters to a specialized search-index, your main database operations remain fast, and users get a lightning-fast responsive interface.
`
  }
];
