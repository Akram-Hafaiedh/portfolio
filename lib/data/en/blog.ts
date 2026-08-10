// lib/data/en/blog.ts
import { BlogPost } from '../blogTypes';

export const blogPosts: BlogPost[] = [
  {
    slug: "mastering-nextjs-15-optimizing-core-web-vitals",
    title: "Mastering Next.js 15: Optimizing Core Web Vitals & Rendering Stability",
    excerpt: "An in-depth exploration of Next.js 15 App Router rendering behavior, Server Components, dynamic pre-rendering, and techniques to minimize Cumulative Layout Shift (CLS).",
    date: "2026-02-05",
    readTime: "6 min read",
    category: "Engineering",
    tags: ["Next.js", "React 19", "Web Performance", "SEO"],
    image: "/blog/nextjs15-performance.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: true,
    content: `
# Mastering Next.js 15: Core Web Vitals & Rendering

Next.js 15 represents a massive leap forward for web application architecture. With features like the **React Server Components (RSC)** paradigm, nested layouts, and automated asset optimization, developers have more power than ever to create performant user experiences. 

However, building a *fast* website still requires deliberate planning. Let's explore key techniques to optimize Core Web Vitals, stabilize rendering, and prevent hydration issues in Next.js 15.

---

## 1. Eliminate Cumulative Layout Shift (CLS)

Cumulative Layout Shift is a visual stability metric that measures how much elements shift layout during rendering. In image-heavy sites, this is often caused by omitting width and height dimensions.

### The Problem:
\`\`\`tsx
// This causes layout shift as the browser fetches the image
<img src="/projects/hero.png" alt="Hero Banner" />
\`\`\`

### The Solution:
Use Next.js's native \`next/image\` component. It requires explicit dimensions or a fill layout, forcing the browser to allocate the spacing beforehand.

\`\`\`tsx
import Image from 'next/image';

export function Banner() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/projects/hero.png"
        alt="Hero Banner"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
      />
    </div>
  );
}
\`\`\`

Using \`priority\` on above-the-fold images also signals the browser to download them immediately, dramatically improving the **Largest Contentful Paint (LCP)** metric.

---

## 2. Resolving React 19 Hydration Mismatches

Hydration mismatches occur when the pre-rendered HTML from the server does not exactly match the initial HTML rendered by the client browser. 

### Common Causes:
*   Using browser-specific APIs (like \`window\` or \`localStorage\`) in the initial render path.
*   Nesting invalid HTML (e.g., placing a \`<div>\` inside a \`<p>\`).
*   Displaying dynamic content like dates/times (e.g., \`new Date().toLocaleTimeString()\`) directly.

### Best Practice for Window APIs:
Ensure code that accesses browser APIs only runs after the component has mounted on the client.

\`\`\`tsx
import { useState, useEffect } from 'react';

export function ThemeComponent() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // This runs strictly on the client after mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  return <div className="p-4">Current Theme: {theme}</div>;
}
\`\`\`

---

## 3. Server vs. Client Components: Where to put Logic?

To maximize speed, keep the majority of your application in **Server Components**. They fetch data directly on the server, resulting in zero additional JavaScript sent to the client.

| Component Type | Needs User Interaction? | Needs Browser APIs? | Recommendation |
| :--- | :--- | :--- | :--- |
| **Server** | No | No | Use by default for headers, lists, static layout. |
| **Client** | Yes (e.g., clicks, inputs) | Yes (e.g., \`window\`, \`useEffect\`) | Use strictly for interactive islands. |

![Next.js Server and Client Rendering Pipeline](/blog/nextjs-rendering-flow.png)

By separating interactivity from content, your bundle sizes remain small and pages load instantly.
`
  },
  {
    slug: "laravel-global-scopes-multi-tenancy-isolation",
    title: "Strict Tenant Data Isolation in Laravel using Global Scopes",
    excerpt: "How to enforce automatic multi-tenant data isolation at the ORM layer to prevent cross-tenant data leaks in enterprise SaaS applications.",
    date: "2026-02-15",
    readTime: "6 min read",
    category: "Architecture",
    tags: ["Laravel", "Multi-Tenancy", "Security", "PHP"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Multi-Tenant Data Isolation in Laravel

In multi-tenant SaaS platforms, the absolute isolation of tenant data is paramount. A single leakage of financial or client data can destroy business trust. Let's explore how to implement an automated and bulletproof tenant isolation layer using **Laravel Global Scopes**.

---

## The Core Concept: Single Database Multi-Tenancy

In a shared-database multi-tenant structure, every tenant-specific table (e.g., \`invoices\`, \`clients\`) contains a \`tenant_id\` column. Rather than manually appending \`->where('tenant_id', $currentTenantId)\` to every eloquent query, we can delegate this responsibility to a Laravel Global Scope.

---

## 1. Creating the Tenant Global Scope

The Global Scope intercepts all eloquent builders queries automatically and constrains the search result to the authenticated tenant.

\`\`\`php
namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        // constrains queries only if a tenant is resolved in session/auth
        if (auth()->check() && auth()->user()->tenant_id) {
            $builder->where($model->getTable() . '.tenant_id', auth()->user()->tenant_id);
        }
    }
}
\`\`\`

---

## 2. Setting up a Reusable Trait

To easily apply this scope to any tenant-related model, define a trait that registers the scope and handles automatic \`tenant_id\` insertion during record creation.

\`\`\`php
namespace App\Models\Traits;

use App\Models\Scopes\TenantScope;

trait BelongsToTenant
{
    public static function bootBelongsToTenant()
    {
        static::addGlobalScope(new TenantScope);

        // Auto-assign tenant_id when creating models
        static::creating(function ($model) {
            if (auth()->check() && auth()->user()->tenant_id) {
                $model->tenant_id = auth()->user()->tenant_id;
            }
        });
    }
}
\`\`\`

Now, applying this trait to your \`Invoice\` model automatically restricts read and write operations:

\`\`\`php
namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use BelongsToTenant; // Everything is isolated automatically now!
}
\`\`\`

---

## 3. Bypassing Isolation for System Admins

When building a Master Admin dashboard, you will need to view all invoices. You can bypass the tenant scope using the \`withoutGlobalScope\` method:

\`\`\`php
// Bypasses tenant scope and fetches invoices across all tenants
$allInvoices = Invoice::withoutGlobalScope(TenantScope::class)->get();
\`\`\`

By utilizing scopes, you prevent data cross-contamination completely at the framework level, ensuring full enterprise-grade compliance.
`
  },
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
  },
  {
    slug: "redis-caching-queue-workers-laravel",
    title: "Scaling Batch Processing: Redis and Queues for Large Data Imports",
    excerpt: "Prevent PHP gateway timeouts by offloading heavy Excel/CSV parsing to Redis-backed background queue workers.",
    date: "2026-01-05",
    readTime: "4 min read",
    category: "DevOps",
    tags: ["Redis", "Laravel Queues", "Fintech", "Docker"],
    image: "/blog/covers/realtime-websockets.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Scaling Batch Processing with Redis and Queues

Handling large Excel or CSV imports of 10,000+ entries in a web request is a common mistake that leads to HTTP 504 Gateway Timeouts. Let's explore how to design a resilient, non-blocking upload pipeline using **Redis** and **Laravel Queues**.

---

## The Non-blocking Pipeline Architecture

1.  **Direct Upload**: User uploads file.
2.  **Job Dispatch**: The file is stored, and an import job is pushed to the Redis queue. The server responds with 200 OK instantly.
3.  **Worker Processing**: A background queue worker retrieves the job, parses the rows in chunks, and updates progress.
4.  **Real-Time Broadcast**: The user gets live progress updates via WebSockets.

---

## 1. Storing File and Dispatching Job

Instead of parsing files synchronously, we dispatch an asynchronous Job to the queue.

\`\`\`php
// app/Http/Controllers/ImportController.php
namespace App\Http\Controllers;

use App\Jobs\ProcessExcelImport;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|mimes:xlsx,csv']);
        
        // Save file to storage
        $path = $request->file('file')->store('imports');

        // Dispatch background job to Redis
        ProcessExcelImport::dispatch($path, auth()->user()->id);

        return response()->json([
            'message' => 'Upload successful. Processing in the background.',
        ]);
    }
}
\`\`\`

---

## 2. Implementing Chunks in the Background Job

Inside the Job, we read the data in chunks of 500 rows to optimize database query memory and avoid hitting execution limits.

\`\`\`php
// app/Jobs/ProcessExcelImport.php
namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;

class ProcessExcelImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;
    protected $userId;

    public function __construct($filePath, $userId)
    {
        $this->filePath = $filePath;
        $this->userId = $userId;
    }

    public function handle()
    {
        // Parse excel in chunks to save memory
        Excel::import(new InventoryImport($this->userId), $this->filePath);
    }
}
\`\`\`

Using **Redis** as a broker and background workers lets your application remain highly responsive and scalable under high user traffic load.
`
  },
  {
    slug: "hybrid-laravel-blade-vue3-datatables",
    title: "Hybrid Architecture: Embedding Vue 3 Datatables in a Laravel Blade Application",
    excerpt: "How to modernise legacy list views progressively by mounting Vue 3 dynamic components inside Laravel Blade templates without a full SPA rewrite.",
    date: "2026-02-12",
    readTime: "5 min read",
    category: "Engineering",
    tags: ["Vue 3", "Laravel", "Vite", "Frontend Migration"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Hybrid Architecture: Vue 3 Datatables in Laravel Blade

When managing large enterprise applications (like ERP or inventory platforms), list views for clients, stocks, warehouse movements, and suppliers are the core of daily operations. Over time, traditional jQuery Datatables or fully server-rendered lists become slow, unresponsive, and hard to maintain.

However, a full Single Page Application (SPA) rewrite is risky and expensive. Let's look at how to implement a **hybrid architecture** by progressively embedding reactive Vue 3 Datatables inside existing Laravel Blade templates.

---

## The Hybrid Concept: Progressive Mounting

Instead of converting the entire application to Vue, we keep the main layouts, sidebar, and routing in Laravel Blade. We then mount Vue 3 components on specific HTML elements on demand:

\`\`\`html
<!-- Laravel Blade Template: inventories/index.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container mx-auto py-6">
    <h1 class="text-2xl font-bold mb-6">Inventory Management</h1>
    
    <!-- Mounting element for Vue 3 -->
    <div id="vue-stock-listing" data-api-url="{{ route('api.inventory.index') }}"></div>
</div>
@endsection
\`\`\`

---

## 1. Setting up Vite for Hybrid Compilations

If your Laravel application uses Vite, configure it to load the Vue 3 plugin and build single-file components (.vue).

\`\`\`ts
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
\`\`\`

---

## 2. Bootstrapping Vue 3 Selector Mounting

In your main entry script, check if the specific container exists before mounting the Vue app. This prevents runtime errors on other pages that do not have Vue components.

\`\`\`js
// resources/js/app.js
import { createApp } from 'vue';
import StockListing from './components/StockListing.vue';

const targetElement = document.getElementById('vue-stock-listing');

if (targetElement) {
    const apiUrl = targetElement.getAttribute('data-api-url');
    
    const app = createApp(StockListing, {
        apiUrl: apiUrl
    });
    
    app.mount(targetElement);
}
\`\`\`

---

## 3. Creating the Reusable Vue 3 Datatable Component

Now, we build a high-performance listing component that queries our Laravel controller endpoint, handles filters, and manages pagination state reactively.

\`\`\`vue
<!-- resources/js/components/StockListing.vue -->
<template>
  <div class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <input 
        v-model="search" 
        @input="debouncedFetch"
        placeholder="Search stock..." 
        class="border rounded-lg px-4 py-2 text-sm w-64"
      />
    </div>

    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <th class="p-4">SKU</th>
          <th class="p-4">Name</th>
          <th class="p-4">Quantity</th>
          <th class="p-4">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
          <td class="p-4 font-mono">{{ item.sku }}</td>
          <td class="p-4 font-semibold">{{ item.name }}</td>
          <td class="p-4">{{ item.qty }} units</td>
          <td class="p-4">{{ item.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  apiUrl: String
});

const items = ref([]);
const search = ref('');

const fetchItems = async () => {
  try {
    const response = await axios.get(props.apiUrl, {
      params: { q: search.value }
    });
    items.value = response.data.data;
  } catch (error) {
    console.error("Failed to load inventory data:", error);
  }
};

onMounted(() => {
  fetchItems();
});
</script>
\`\`\`

This progressive approach lets you transition your legacy ERP views to a modern user interface block-by-block without breaking the overall system flow.
`
  },
  {
    slug: "securing-saas-auth-oauth-password-recovery",
    title: "Securing SaaS Auth: Resolving Social OAuth Loops and Reliable Password Recovery Workflows",
    excerpt: "Practical guide to implementing bulletproof authentication pipelines with Google/Facebook login integration and queued email recovery systems.",
    date: "2026-02-18",
    readTime: "4 min read",
    category: "Security",
    tags: ["OAuth 2.0", "Laravel Socialite", "SMTP", "Security"],
    image: "/blog/covers/security-rbac.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Securing SaaS Auth: OAuth Loops & Mail Recovery

Authentication is the front door of any SaaS platform. In production, users expect dual options: seamless social login (Google/Facebook) and traditional email/password workflows. 

However, two major problems occur frequently: duplicate account creation loops (when an email-registered user tries to click Google login) and slow or failing password recovery emails. Let's look at how to secure these flows.

---

## 1. Structuring the Database for Social Accounts

To prevent duplicate account conflicts, never link a social login directly to the main \`users\` table as a single provider string. Instead, use a dedicated \`social_accounts\` table. This allows a single user to link both Google and Facebook to their profile.

\`\`\`php
// Database migration
Schema::create('linked_social_accounts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('provider_name'); // 'google', 'facebook'
    $table->string('provider_id');   // OAuth Unique User ID
    $table->timestamps();
});
\`\`\`

---

## 2. Resolving Social Registration Loops

When a user triggers social login, resolve their email first. If the email exists, link the social provider to the existing account rather than registering a duplicate user.

\`\`\`php
// app/Services/SocialAccountsService.php
namespace App\Services;

use App\Models\User;
use App\Models\LinkedSocialAccount;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountsService
{
    public function findOrCreate(ProviderUser $providerUser, string $providerName): User
    {
        // 1. Search for existing social link
        $account = LinkedSocialAccount::where('provider_name', $providerName)
            ->where('provider_id', $providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        }

        // 2. Search for existing user email
        $user = User::where('email', $providerUser->getEmail())->first();

        if (!$user) {
            // Register a new user if it doesn't exist
            $user = User::create([
                'name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'password' => bcrypt(str_random(24)), // Generate secure random password
            ]);
        }

        // 3. Link the social account to the user
        LinkedSocialAccount::create([
            'user_id' => $user->id,
            'provider_name' => $providerName,
            'provider_id' => $providerUser->getId(),
        ]);

        return $user;
    }
}
\`\`\`

---

## 3. Offloading Password Recovery Emails to Redis

Sending password reset emails synchronously inside a web request delays the client dashboard response and risks throwing HTTP 504 gateway timeouts if SMTP servers respond slowly.

Make sure your password reset notification implements the \`ShouldQueue\` contract, delegating the email transmission to a Redis queue.

\`\`\`php
// app/Notifications/ResetPasswordQueued.php
namespace App\\Notifications;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Notifications\\Messages\\MailMessage;
use Illuminate\\Notifications\\Notification;

class ResetPasswordQueued extends Notification implements ShouldQueue
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->subject('Reset Password Notification')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', $url)
            ->line('This password reset link will expire in 60 minutes.');
    }
}
\`\`\`

By queueing notification dispatches and linking social accounts dynamically, you guarantee a fast, secure, and user-friendly authentication system.
`
  },
  {
    slug: "state-persistence-session-management-multi-tenant",
    title: "Resolving Session Loss: State Persistence in Multi-Company SaaS Dashboards",
    excerpt: "How to design a reliable session and state synchronization layer in hybrid client-server apps to prevent authentication drops during tenant switching.",
    date: "2026-02-22",
    readTime: "5 min read",
    category: "Engineering",
    tags: ["Vue 3", "State Management", "Sessions", "Security"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Resolving Session Loss in Multi-Company SaaS

In multi-tenant business platforms (like ERP or billing systems), users frequently manage or switch between multiple companies. Designing this flow requires a robust session management system. 

A common issue in hybrid SPA architectures is the loss of session persistence: users refreshing the browser or switching between companies suddenly find themselves logged out due to state mismatches between the client local storage and the server session cookies. Let's look at how to build a synchronization layer to resolve this.

---

## The Root Cause: Out-of-Sync Token States

When a user switches from "Company A" to "Company B," the application makes API requests to fetch new datasets. If the client updates its internal \`active_company_id\` in LocalStorage, but the server's session token or CSRF cookie is not correctly renewed or linked, request interceptors will return a \`401 Unauthorized\` or \`419 Page Expired\` error, forcing an unnecessary logout.

---

## 1. Implementing a Synchronized Auth Interceptor

To prevent token drops during quick navigation, use an Axios interceptor that dynamically syncs active headers on every outgoing request.

\`\`\`ts
// lib/http-client.ts
import axios from 'axios';

const httpClient = axios.create({
    baseURL: '/api',
    withCredentials: true, // Crucial to pass server-side cookies
});

httpClient.interceptors.request.use((config) => {
    const activeCompanyId = localStorage.getItem('active_company_id');
    
    if (activeCompanyId) {
        config.headers['X-Company-ID'] = activeCompanyId;
    }
    
    // Automatically retrieve the CRSF token from document cookies for Laravel/Sanctum
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
\`\`\`

---

## 2. Server-Side Context Verification Middleware

In your backend framework, verify that the requested company ID header matches the list of companies associated with the authenticated user. If a mismatch or session expiry is detected, handle the response gracefully rather than wiping the session.

\`\`\`php
// app/Http/Middleware/TenantContextMiddleware.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class TenantContextMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $companyId = $request->header('X-Company-ID');
        $user = $request->user();

        if ($companyId && $user) {
            // Confirm the authenticated user belongs to the requested company
            $hasAccess = $user->companies()->where('companies.id', $companyId)->exists();
            
            if ($hasAccess) {
                // Bind the active tenant globally to the request context
                app()->instance('active_company', $user->companies()->find($companyId));
            } else {
                return response()->json([
                    'error' => 'Unauthorized company context. Please refresh your session.'
                ], 403);
            }
        }

        return $next($request);
    }
}
\`\`\`

---

## 3. Graceful Client-Side Session Recovery

If an HTTP request fails with a \`401\` or \`419\` error code, try to silently refresh the session token before forcing the user back to the login screen.

\`\`\`ts
// lib/http-client.ts (Response Interceptor)
httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 419) && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Request a silent CSRF/Session token renewal
                await axios.get('/api/csrf-cookie');
                
                // Retry the original request
                return httpClient(originalRequest);
            } catch (refreshError) {
                // Force redirection to login only if silent renewal fails
                localStorage.removeItem('active_company_id');
                window.location.href = '/login?session_expired=true';
            }
        }
        return Promise.reject(error);
    }
);
\`\`\`

Using a synchronized interceptor and context validation middleware preserves user sessions during navigation and simplifies multi-company account handling.
`
  },
  {
    slug: "subscription-billing-engine-payment-sync",
    title: "Architecting a Subscription Billing Engine: Syncing Payment Services with Admin Panels",
    excerpt: "How to decouple invoices from subscriptions, resolve pricing discrepancies, and synchronize payment gateway webhook payloads with support administration dashboards.",
    date: "2026-02-26",
    readTime: "4 min read",
    category: "Backend",
    tags: ["Fintech", "Payment Gateways", "Laravel", "APIs"],
    image: "/blog/covers/fintech-monetization.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Architecting a Subscription Billing Engine

In subscription-based SaaS applications, billing complexity increases when you mix customer-facing invoices, dynamic subscription tiers, and internal admin panels. 

A common issue in billing development is failing to decouple invoices from actual subscription states: users see their active plans represented as a simple list of invoices, while support representatives view mismatched pricing in the admin panel due to asynchronous payment gateway Webhook drops. Let's look at how to build a unified syncing architecture.

---

## The Architecture: Decoupling Invoices from Subscriptions

A robust billing database requires separate tables to map out the customer lifecycle:
1.  **Subscriptions Table**: Manages status (\`active\`, \`canceled\`, \`past_due\`), plan tier, and renewal date.
2.  **Invoices Table**: Records historical payment transactions, invoice PDFs, and payment status.
3.  **Support Admin Dashboard**: Queries a unified billing engine API rather than calculating raw sums from partial database tables.

---

## 1. Designing the Relational Database

\`\`\`php
// Subscriptions Table Schema
Schema::create('subscriptions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->string('stripe_subscription_id')->unique();
    $table->string('stripe_price_id');
    $table->string('status'); // active, past_due, trialing, canceled
    $table->timestamp('trial_ends_at')->nullable();
    $table->timestamp('ends_at')->nullable(); // Subscription end date
    $table->timestamps();
});

// Invoices Table Schema
Schema::create('invoices', function (Blueprint $table) {
    $table->id();
    $table->foreignId('subscription_id')->constrained();
    $table->string('stripe_invoice_id')->unique();
    $table->integer('amount_paid'); // Stored in cents (e.g., 2900 for $29.00)
    $table->string('currency');
    $table->string('status'); // paid, open, uncollectible
    $table->timestamps();
});
\`\`\`

---

## 2. Syncing Gateway Webhooks Securely

To resolve pricing mismatches on admin dashboards, implement a robust Webhook receiver that updates the database state as soon as Stripe/PayPal registers a transaction.

\`\`\`php
// app/Http/Controllers/BillingWebhookController.php
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Subscription;
use App\\Models\\Invoice;

class BillingWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();
        $eventType = $payload['type'];

        switch ($eventType) {
            case 'invoice.payment_succeeded':
                $this->processPaymentSucceeded($payload['data']['object']);
                break;
            case 'customer.subscription.updated':
                $this->processSubscriptionUpdated($payload['data']['object']);
                break;
        }

        return response('Webhook Handled', 200);
    }

    protected function processPaymentSucceeded(array $invoiceData)
    {
        $subscription = Subscription::where('stripe_subscription_id', $invoiceData['subscription'])->first();

        if ($subscription) {
            Invoice::updateOrCreate(
                ['stripe_invoice_id' => $invoiceData['id']],
                [
                    'subscription_id' => $subscription->id,
                    'amount_paid' => $invoiceData['amount_paid'], // Stored in cents
                    'currency' => $invoiceData['currency'],
                    'status' => 'paid',
                ]
            );
        }
    }
}
\`\`\`

---

## 3. Resolving Support Admin Panel Sum Discrepancies

When computing user subscription prices for support administrators, format monetary values in cents, and convert currency using localized standard helpers. This eliminates floating-point rounding errors.

\`\`\`php
// app/Models/Invoice.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    // Accessor: Convert cents to dollars for display
    public function getFormattedAmountAttribute()
    {
        return '$' . number_format($this->amount_paid / 100, 2);
    }
}
\`\`\`

By separating subscriptions from invoice histories and using atomic Webhook handlers, your application ensures a clean, reliable, and discrepancy-free billing pipeline.
`
  },
  {
    slug: "route-overloading-reusable-form-components",
    title: "Avoiding Route Overloading: Designing Reusable CRUD Forms for Complex SaaS Entities",
    excerpt: "How to orchestrate conditional form layouts, state toggles, and dynamic data loading under overloaded creation and edition route templates.",
    date: "2026-03-02",
    readTime: "4 min read",
    category: "Frontend",
    tags: ["Vue 3", "Laravel", "Routing", "UX"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Reusable CRUD Forms for Complex SaaS Entities

In SaaS development, managing entity pages (like creating, editing, and displaying company details) often leads to route overloading. Teams frequently build separate pages for each operation, duplication of HTML input markup, or overload a single route with confusing client-side state flags.

A clean solution is to create a unified, reusable Form Component that dynamically alters its behavior (View-Only, Create, or Edit) based on the route context. Let's look at how to implement this pattern.

---

## The Challenge: Dynamic Context Detection

We need a single form layout to manage three contexts:
1.  **Create mode**: Inputs are editable, submit button fires a \`POST\` request.
2.  **Edit mode**: Inputs are loaded with existing data, submit button fires a \`PUT\` request.
3.  **View mode**: Inputs are read-only, buttons are replaced with an "Edit Profile" link.

---

## 1. Designing the Reusable Form Component

Define explicit props for the form mode and data inputs to separate presentation markup from routing logic.

\`\`\`vue
<!-- components/CompanyForm.vue (Vue 3 / Composition API) -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Company Name Input -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Company Name</label>
        <input 
          v-model="form.name" 
          :disabled="isReadOnly" 
          type="text" 
          required
          class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-50"
        />
      </div>

      <!-- Company Tax ID -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Tax ID / VAT</label>
        <input 
          v-model="form.tax_id" 
          :disabled="isReadOnly" 
          type="text"
          class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-50"
        />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 mt-6">
      <button 
        v-if="!isReadOnly" 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase"
      >
        {{ mode === 'create' ? 'Create Company' : 'Save Changes' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', tax_id: '' })
  },
  mode: {
    type: String, // 'create', 'edit', 'view'
    required: true
  }
});

const emit = defineEmits(['submit']);
const form = ref({ ...props.initialData });

const isReadOnly = computed(() => props.mode === 'view');

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>
\`\`\`

---

## 2. Orchestrating Route Parameter State

By wrapping the component in a route handler, you load data dynamically and toggle the form mode based on the current URL path pattern (e.g. \`/companies/new\`, \`/companies/:id\`, \`/companies/:id/edit\`).

\`\`\`ts
// router/index.js (Route Definition Examples)
{
    path: '/companies/new',
    component: CompanyPageWrapper,
    props: { mode: 'create' }
},
{
    path: '/companies/:id',
    component: CompanyPageWrapper,
    props: { mode: 'view' }
},
{
    path: '/companies/:id/edit',
    component: CompanyPageWrapper,
    props: { mode: 'edit' }
}
\`\`\`

Inside \`CompanyPageWrapper.vue\`, parse the ID parameter, fetch data if in edit or view mode, and render the form:

\`\`\`vue
<!-- pages/CompanyPageWrapper.vue -->
<template>
  <div class="max-w-3xl mx-auto py-12 px-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-black">{{ pageTitle }}</h1>
      <router-link 
        v-if="mode === 'view'" 
        :to="\`/companies/\${companyId}/edit\`" 
        class="text-xs font-bold uppercase tracking-wider text-blue-600 hover:underline"
      >
        Edit Company
      </router-link>
    </div>

    <CompanyForm 
      v-if="!loading" 
      :initial-data="companyData" 
      :mode="mode" 
      @submit="handleFormSubmit" 
    />
    <div v-else class="text-center py-12">Loading data...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CompanyForm from '../components/CompanyForm.vue';
import axios from 'axios';

const props = defineProps({
  mode: String
});

const route = useRoute();
const loading = ref(props.mode !== 'create');
const companyData = ref({ name: '', tax_id: '' });
const companyId = computed(() => route.params.id);

const pageTitle = computed(() => {
  if (props.mode === 'create') return 'Create Company';
  if (props.mode === 'view') return 'Company Information';
  return 'Edit Company Details';
});

const loadCompany = async () => {
  try {
    const response = await axios.get(\`/api/companies/\${companyId.value}\`);
    companyData.value = response.data;
  } catch (error) {
    console.error('Failed to load company details', error);
  } finally {
    loading.value = false;
  }
};

const handleFormSubmit = async (formData) => {
  const url = props.mode === 'create' ? '/api/companies' : \`/api/companies/\${companyId.value}\`;
  const method = props.mode === 'create' ? 'post' : 'put';
  
  await axios[method](url, formData);
  alert('Company record saved successfully!');
};

onMounted(() => {
  if (props.mode !== 'create') {
    loadCompany();
  }
});
</script>
\`\`\`

By binding form attributes to route parameters and abstracting inputs, you maintain a single reusable form layout while cleanly supporting view-only, edit, and create workflows.
`
  },
  {
    slug: "rbac-collaborator-permissions-saas-subscription-feature-gating",
    title: "Building Granular RBAC & Cascading Subscription Feature Gates in Multi-User SaaS",
    excerpt: "How to implement granular sub-user permissions, enforce tenant-wide subscription lockouts, and turn team collaboration into a paid SaaS add-on.",
    date: "2026-03-06",
    readTime: "5 min read",
    category: "Architecture",
    tags: ["Laravel", "RBAC", "SaaS Monetization", "Security"],
    image: "/blog/covers/security-rbac.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Granular RBAC & Tenant Subscription Feature Gates

In B2B SaaS platforms (like ERP or billing systems), workspace owners frequently invite sub-users (referred to as **Collaborators**) to manage day-to-day operations. However, delegating access presents two critical engineering challenges:

1. **Granular Permission Scoping**: Collaborators must not have blanket admin privileges. A warehouse manager might create inventory items but must be restricted from deleting invoices or editing tax settings.
2. **Cascading Tenant Lockouts**: When a primary account's subscription expires, document creation (sales, expenses, invoices) must be instantly blocked across **all linked collaborators**, preventing sub-users from bypassing billing expiration checks.

Here is how we designed a secure Role-Based Access Control (RBAC) pipeline and turned the "Collaborator Management" module into a revenue-generating subscription add-on.

---

## 1. Designing Granular Module Permissions

Instead of assigning rigid global roles (\`admin\`, \`staff\`), create a granular permission schema mapping specific actions (\`invoices.create\`, \`invoices.delete\`, \`expenses.view\`) to custom roles defined by the account owner.

\`\`\`php
// app/Services/PermissionService.php
namespace App\\Services;

use App\\Models\\User;

class PermissionService
{
    public static function canUserPerform(User $user, string $permission): bool
    {
        // 1. Primary workspace owners bypass granular checks
        if ($user->is_workspace_owner) {
            return true;
        }

        // 2. Fetch collaborator role permissions
        $permissions = $user->role ? $user->role->permissions->pluck('name')->toArray() : [];

        return in_array($permission, $permissions);
    }
}
\`\`\`

You can then enforce these rules cleanly inside Laravel Middleware or Policy definitions:

\`\`\`php
// app/Http/Middleware/CheckModulePermission.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use App\\Services\\PermissionService;

class CheckModulePermission
{
    public function handle(Request $request, Closure $next, string $permission)
    {
        $user = $request->user();

        if (!PermissionService::canUserPerform($user, $permission)) {
            return response()->json([
                'error' => 'You do not have permission to execute this action.'
            ], 403);
        }

        return $next($request);
    }
}
\`\`\`

---

## 2. Cascading Subscription Lockouts to Collaborators

A common security vulnerability occurs when subscription expiration checks only target the currently logged-in user. If a sub-user logs in, their individual account status might appear active, allowing them to create sales and expense documents even after the workspace owner's subscription has expired.

To fix this, resolve the **primary tenant's subscription status** during every document creation request:

\`\`\`php
// app/Http/Middleware/EnsureActiveSubscription.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class EnsureActiveSubscription
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        // Resolve the workspace owner (primary tenant)
        $owner = $user->is_workspace_owner ? $user : $user->workspaceOwner;

        if (!$owner || !$owner->hasActiveSubscription()) {
            return response()->json([
                'error' => 'Subscription expired. Please ask your account administrator to extend your plan.',
                'code' => 'SUBSCRIPTION_EXPIRED'
            ], 402);
        }

        return $next($request);
    }
}
\`\`\`

---

## 3. Monetizing Collaborator Access as a Paid SaaS Add-On

After building a reliable RBAC system and securing sub-user access controls, the team recognized that multi-user collaboration was a key differentiator for growing businesses.

Instead of bundling collaborator management into all base plans, we gated the feature behind a **paid subscription add-on**:

\`\`\`php
// app/Models/Workspace.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Workspace extends Model
{
    public function canAddCollaborators(): bool
    {
        // Check if tenant has purchased the Collaborators Add-On or has Enterprise Tier
        return $this->hasAddon('collaborators_module') || $this->plan_tier === 'enterprise';
    }

    public function maxCollaboratorLimit(): int
    {
        if (!$this->canAddCollaborators()) {
            return 0; // Free / Standard plan without add-on
        }

        return $this->addon_seats ?? 5;
    }
}
\`\`\`

By combining granular permission scoping, tenant-wide subscription enforcement, and feature gating, we turned an internal user management feature into a secure, revenue-generating SaaS module.
`
  },
  {
    slug: "monetizing-api-rate-limits-multi-company-saas-pricing",
    title: "Monetizing API Quotas & Multi-Company Tier Gating: Designing Dynamic SaaS Pricing & Add-On Management",
    excerpt: "How to structure rate-limited developer APIs, enforce extra company slot limits, and build a transparent add-on management pricing portal.",
    date: "2026-03-10",
    readTime: "5 min read",
    category: "Architecture",
    tags: ["SaaS Pricing", "API Rate Limiting", "Laravel", "Monetization"],
    image: "/blog/covers/fintech-monetization.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Monetizing API Quotas & Multi-Company Tier Gating

As SaaS platforms mature, revenue growth often shifts from simple per-user pricing to **usage-based monetization** and **feature add-ons**. Two key expansion vectors for B2B platforms are:

1. **Open API Rate Limits**: Charging for developer API throughput and third-party integrations beyond base monthly call quotas.
2. **Multi-Company Workspace Slots**: Charging accounts for managing multiple legal entities or subsidiary companies under a single master billing dashboard.

Here is how we architected API rate-limiting middleware, multi-tenant company slot enforcement, and an intuitive pricing portal for both guest prospects and active subscribers.

---

## 1. Rate-Limiting Developer APIs by Subscription Tier

To monetize API usage without breaking existing integrations, assign rate limits dynamically based on the account's active plan or purchased API add-on.

\`\`\`php
// app/Http/Middleware/MonetizedApiThrottleMiddleware.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\RateLimiter;

class MonetizedApiThrottleMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        $rateLimitKey = 'api-user:' . $user->id;

        // Determine max requests per minute based on plan tier
        $maxAttempts = match ($user->plan_tier) {
            'enterprise' => 500,
            'pro' => 120,
            default => 30, // Free / Basic Tier
        };

        // Add additional quota if the user purchased the "API Unlimited" add-on
        if ($user->hasAddon('api_boost')) {
            $maxAttempts += 1000;
        }

        if (RateLimiter::tooManyAttempts($rateLimitKey, $maxAttempts)) {
            return response()->json([
                'error' => 'API rate limit exceeded. Upgrade your subscription plan or add an API quota pack.',
                'retry_after' => RateLimiter::availableIn($rateLimitKey)
            ], 429);
        }

        RateLimiter::hit($rateLimitKey);

        return $next($request);
    }
}
\`\`\`

---

## 2. Enforcing Multi-Company Workspace Slots

Allowing users to manage multiple companies requires enforcing company slot limits during creation workflows.

\`\`\`php
// app/Http/Controllers/CompanyController.php
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $currentCompanyCount = $user->companies()->count();
        $allowedSlots = $user->purchased_company_slots ?? 1; // Default 1 company

        if ($currentCompanyCount >= $allowedSlots) {
            return response()->json([
                'error' => 'Company limit reached. Upgrade your subscription to add extra company slots.',
                'code' => 'UPGRADE_REQUIRED'
            ], 403);
        }

        // Proceed to create company record...
    }
}
\`\`\`

---

## 3. Dynamic Pricing & Add-On Management Portal

To ensure transparency, build a unified pricing component that serves two distinct states:
- **Guest Prospects**: View plan comparisons, feature matrices, and transparent add-on pricing (extra companies, extra API calls, collaborator seats).
- **Subscribed Members**: View current plan consumption, purchase instant add-on expansions, and calculate pro-rated invoice updates in real time.

\`\`\`vue
<!-- components/PricingAddonManager.vue (Vue 3 / Composition API) -->
<template>
  <div class="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800">
    <h2 class="text-2xl font-bold mb-4">Manage Subscription & Add-Ons</h2>

    <!-- Company Slots Add-On -->
    <div class="flex justify-between items-center py-4 border-b border-slate-800">
      <div>
        <h3 class="font-semibold text-sm">Extra Company Workspaces</h3>
        <p class="text-xs text-slate-400">Manage multiple legal entities under one account</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="updateCompanySlots(-1)" class="w-8 h-8 rounded-lg bg-slate-800 font-bold">-</button>
        <span class="font-mono text-sm font-bold">{{ companySlots }} slots ($15/mo each)</span>
        <button @click="updateCompanySlots(1)" class="w-8 h-8 rounded-lg bg-blue-600 font-bold">+</button>
      </div>
    </div>

    <!-- API Rate Limit Boost -->
    <div class="flex justify-between items-center py-4">
      <div>
        <h3 class="font-semibold text-sm">Developer API Boost (+1,000 req/min)</h3>
        <p class="text-xs text-slate-400">High-throughput webhooks and CRM integrations</p>
      </div>
      <button 
        @click="toggleApiBoost" 
        :class="hasApiBoost ? 'bg-emerald-600' : 'bg-slate-800'"
        class="px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors"
      >
        {{ hasApiBoost ? 'Active ($29/mo)' : 'Add to Plan' }}
      </button>
    </div>
  </div>
</template>
\`\`\`

Monetizing API throughput and multi-company slots transforms static pricing plans into a flexible, usage-driven revenue model.
`
  },
  {
    slug: "migrating-legacy-laravel-blog-vue3-search-recommendations",
    title: "Modernizing a Legacy Content Engine: Migrating a Laravel Blade Blog to Vue 3 with Search & Smart Recommendations",
    excerpt: "How we revamped a legacy Laravel Blade marketing blog, unlocked hidden articles, implemented real-time search, responsive pagination, and an intelligent recommendation engine.",
    date: "2026-03-15",
    readTime: "5 min read",
    category: "Frontend",
    tags: ["Vue 3", "Laravel", "Search", "Content Migration"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Modernizing a Legacy Content Engine: Laravel Blade to Vue 3

Content engines drive organic user acquisition for SaaS platforms. However, marketing blogs built in early startup stages often suffer from technical debt and abandoned UI features.

In our platform, the legacy blog was on hold: it consisted only of a basic homepage and single article view. Critical navigation features — such as the "Load More" button — were commented out in the codebase, restricting user access to older articles!

Here is how we refactored and migrated the legacy Laravel Blade blog into a modern Vue 3 application complete with dedicated article listings, real-time search, responsive pagination, tag filtering, and a related article recommendation engine.

---

## 1. Unlocking Articles with Dedicated Vue 3 Routing

To solve the dead-end navigation issue, we established a dedicated \`/articles\` route and built an asynchronous pagination handler replacing commented legacy code.

\`\`\`ts
// router/index.js
{
    path: '/blog',
    component: BlogHomeView,
},
{
    path: '/blog/articles',
    component: ArticleListingView,
},
{
    path: '/blog/articles/:slug',
    component: ArticleDetailView,
}
\`\`\`

---

## 2. Real-Time Search & Tag Filtering System

We built a reactive listing component that filters articles dynamically by title, tag, or category with debounced API queries to prevent unnecessary server requests.

\`\`\`vue
<!-- components/ArticleListingView.vue -->
<template>
  <div class="max-w-6xl mx-auto py-12 px-4">
    <!-- Search Bar & Tag Filter Pills -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-8">
      <input 
        v-model="searchQuery" 
        @input="debouncedSearch"
        placeholder="Search articles by keyword or tag..."
        class="w-full md:w-96 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div class="flex flex-wrap gap-2">
        <button 
          v-for="tag in availableTags" 
          :key="tag"
          @click="toggleTag(tag)"
          :class="selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase"
        >
          #{{ tag }}
        </button>
      </div>
    </div>

    <!-- Article Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <article v-for="article in paginatedArticles" :key="article.id" class="border rounded-2xl p-6 shadow-sm">
        <span class="text-xs font-bold uppercase text-blue-600 mb-2 block">{{ article.category }}</span>
        <h3 class="text-lg font-bold mb-2">{{ article.title }}</h3>
        <p class="text-xs text-slate-500 line-clamp-3 mb-4">{{ article.excerpt }}</p>
        <router-link :to="\`/blog/articles/\${article.slug}\`" class="text-xs font-bold text-blue-600 hover:underline">
          Read Article →
        </router-link>
      </article>
    </div>
  </div>
</template>
\`\`\`

---

## 3. Intelligent Recommendation Engine

To increase reader engagement, we implemented an algorithm on the article detail view that calculates topic relevance based on shared tags and category overlap:

\`\`\`ts
// utils/recommendationEngine.ts
export interface Article {
    id: number;
    title: string;
    category: string;
    tags: string[];
    slug: string;
}

export function getRecommendedArticles(currentArticle: Article, allArticles: Article[], limit = 3): Article[] {
    return allArticles
        .filter(article => article.id !== currentArticle.id)
        .map(article => {
            let score = 0;
            
            // Category match bonus
            if (article.category === currentArticle.category) score += 3;
            
            // Shared tags bonus
            const sharedTags = article.tags.filter(tag => currentArticle.tags.includes(tag));
            score += sharedTags.length * 2;

            return { article, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
Migrating the legacy blog to Vue 3, adding dedicated search and pagination, and embedding smart recommendations transformed an abandoned marketing page into an active, high-traffic user acquisition channel.
`
  },
  {
    slug: "realtime-websockets-laravel-echo-redis-stock-sync",
    title: "Architecting Real-Time Order & Stock Sync: Integrating WebSockets, Laravel Echo & Redis in Production",
    excerpt: "How to eliminate HTTP polling bottlenecks and stream instantaneous stock updates and order status changes using Laravel Echo, Redis pub/sub, and Soketi WebSockets.",
    date: "2026-03-20",
    readTime: "6 min read",
    category: "Architecture",
    tags: ["WebSockets", "Laravel Echo", "Redis", "Real-Time"],
    image: "/blog/covers/realtime-websockets.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Architecting Real-Time Order & Stock Sync with WebSockets

In high-volume ERP and e-commerce platforms, multiple warehouse staff and sales reps update stock levels concurrently. Relying on HTTP polling to reflect stock adjustments causes server overhead and delayed inventory states.

Here is how we built a scalable event-driven architecture using **Laravel WebSockets/Soketi**, **Redis Pub/Sub**, and **Laravel Echo + Vue 3** to push instantaneous inventory updates across tenant dashboards.

---

## 1. Broadcasting Domain Events in Laravel

Whenever a sales order is completed or stock adjustment occurs, dispatch a broadcastable event implement \`ShouldBroadcastNow\`:

\`\`\`php
// app/Events/StockLevelUpdatedEvent.php
namespace App\\Events;

use App\\Models\\Product;
use Illuminate\\Broadcasting\\Channel;
use Illuminate\\Broadcasting\\InteractsWithSockets;
use Illuminate\\Broadcasting\\PrivateChannel;
use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcastNow;
use Illuminate\\Foundation\\Events\\Dispatchable;
use Illuminate\\Queue\\SerializesModels;

class StockLevelUpdatedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Product $product,
        public int $companyId
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('company.' . $this->companyId)
        ];
    }

    public function broadcastAs(): string
    {
        return 'stock.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'product_id' => $this->product->id,
            'name' => $this->product->name,
            'new_quantity' => $this->product->stock_quantity,
            'updated_at' => now()->toIso8601String(),
        ];
    }
}
\`\`\`

---

## 2. Authenticating Private Workspace Channels

To ensure multi-tenant security, authorize channel access by matching the authenticated user's active company context:

\`\`\`php
// routes/channels.php
use App\\Models\\User;

Broadcast::channel('company.{companyId}', function (User $user, int $companyId) {
    return (int) $user->active_company_id === (int) $companyId;
});
\`\`\`

---

## 3. Listening to Live Updates in Vue 3

On the Vue 3 frontend, initialize Laravel Echo with WebSocket client credentials and listen to incoming event streams:

\`\`\`ts
// composables/useStockWebSocket.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { onMounted, onUnmounted } from 'vue';

window.Pusher = Pusher;

export function useStockWebSocket(companyId: number, onStockUpdated: (data: any) => void) {
    let echoInstance: Echo | null = null;

    onMounted(() => {
        echoInstance = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
            wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });

        echoInstance
            .private(\`company.\${companyId}\`)
            .listen('.stock.updated', (eventData: any) => {
                console.log('Real-time stock update received:', eventData);
                onStockUpdated(eventData);
            });
    });

    onUnmounted(() => {
        if (echoInstance) {
            echoInstance.leaveChannel(\`company.\${companyId}\`);
        }
    });
}
\`\`\`

Replacing periodic HTTP polling with WebSocket event streaming reduced backend API load by 70% while guaranteeing sub-second stock synchronization across active team members.
`
  },
  {
    slug: "memory-efficient-streaming-exports-laravel-vue3",
    title: "Streaming Large Financial Exports: Preventing Memory Overflows in Laravel & Vue 3",
    excerpt: "How to export 100,000+ row financial ledgers and stock movements using chunked database cursors and HTTP streaming without hitting PHP memory limits.",
    date: "2026-03-25",
    readTime: "5 min read",
    category: "Backend",
    tags: ["Laravel", "Performance", "Data Exports", "Vue 3"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Streaming Large Financial Exports: Preventing Memory Overflows

Exporting financial ledgers, invoice lists, or inventory movement logs containing tens of thousands of records can easily trigger PHP memory limit crashes (\`Fatal error: Allowed memory size exhausted\`).

Loading entire Eloquent collection models into memory prior to writing a CSV or Excel file is an anti-pattern. Here is how we engineered a chunked HTTP stream response using database cursors to output large files with a constant memory footprint under 10MB.

---

## 1. Utilizing Eloquent Cursors for Low Memory Overhead

Instead of calling \`->get()\`, use \`->cursor()\`. Eloquent Cursors fetch single database rows sequentially using PDO generators without hydrating all records simultaneously into memory.

\`\`\`php
// app/Http/Controllers/FinancialExportController.php
namespace App\\Http\\Controllers;

use App\\Models\\Transaction;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\StreamedResponse;

class FinancialExportController extends Controller
{
    public function exportCsv(Request $request): StreamedResponse
    {
        $companyId = $request->user()->active_company_id;
        $fileName = 'financial_export_' . date('Y_m_d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->stream(function () use ($companyId) {
            $output = fopen('php://output', 'w');

            // Write CSV BOM for UTF-8 compatibility with MS Excel
            fputs($output, $bom = (chr(0xEF) . chr(0xBB) . chr(0xBF)));

            // Write CSV Header Row
            fputcsv($output, ['Transaction ID', 'Date', 'Type', 'Amount', 'Status']);

            // Stream rows via Lazy Query Cursor
            Transaction::where('company_id', $companyId)
                ->orderBy('created_at', 'desc')
                ->cursor()
                ->each(function (Transaction $tx) use ($output) {
                    fputcsv($output, [
                        $tx->reference_number,
                        $tx->created_at->format('Y-m-d H:i:s'),
                        strtoupper($tx->type),
                        number_format($tx->amount, 2, '.', ''),
                        $tx->status,
                    ]);
                });

            fclose($output);
        }, 200, $headers);
    }
}
\`\`\`

---

## 2. Handling Streamed Downloads in Vue 3 with Blob Responses

To download streamed binary or text endpoints without breaking single-page application context:

\`\`\`ts
// services/exportService.ts
import axios from 'axios';

export async function downloadFinancialExport(): Promise<void> {
    const response = await axios.get('/api/exports/financial-csv', {
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', \`financial_export_\${Date.now()}.csv\`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
\`\`\`

Streamed HTTP cursor responses enabled our platform to process 100,000+ transaction logs instantaneously with zero memory spikes or worker timeouts.
`
  },
  {
    slug: "multi-tenant-database-query-indexing-optimization",
    title: "Eliminating N+1 Queries & Indexing Multi-Tenant Tables: Optimizing Slow Database Queries under Heavy SaaS Load",
    excerpt: "How we diagnosed slow database queries, implemented composite indexes on multi-tenant tables, and eliminated hidden N+1 query bottlenecks in production.",
    date: "2026-03-30",
    readTime: "6 min read",
    category: "Backend",
    tags: ["MySQL", "Database Optimization", "Laravel", "Multi-Tenancy"],
    image: "/blog/covers/database-optimization.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    featured: false,
    content: `
# Multi-Tenant Query & Database Indexing Optimization

As multi-tenant SaaS databases grow into millions of records, unindexed queries and hidden N+1 query bottlenecks degrade application performance.

When fetching tenant records like invoices, customer movements, or stock items, filtering by \`company_id\` without composite index strategies causes full table scans. Here is how we optimized multi-tenant database queries and query execution times under heavy SaaS load.

---

## 1. Designing Composite Database Indexes for Multi-Tenant Models

In multi-tenant schemas, queries almost always filter by \`company_id\` alongside filtering parameters like \`status\` or \`created_at\`. Single-column indexes are inefficient for multi-clause \`WHERE\` statements.

\`\`\`php
// database/migrations/2026_03_30_000000_add_composite_indexes_to_invoices_table.php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // Composite index ordered by (company_id, status, created_at)
            $table->index(['company_id', 'status', 'created_at'], 'idx_invoices_tenant_status_date');
            
            // Composite index for customer invoice searches
            $table->index(['company_id', 'customer_id'], 'idx_invoices_tenant_customer');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropIndex('idx_invoices_tenant_status_date');
            $table->dropIndex('idx_invoices_tenant_customer');
        });
    }
};
\`\`\`

---

## 2. Detecting & Eliminating N+1 Query Patterns

N+1 queries occur when a list of parent models iterates over child relationships without eager loading.

### Problematic N+1 Code:
\`\`\`php
// Executes 1 query for invoices + N queries for customer details!
$invoices = Invoice::where('company_id', $companyId)->get();

foreach ($invoices as $invoice) {
    echo $invoice->customer->name; // Triggering separate SQL queries per row!
}
\`\`\`

### Optimized Eager-Loaded Code:
\`\`\`php
// Executes exactly 2 optimized SQL queries regardless of invoice count!
$invoices = Invoice::where('company_id', $companyId)
    ->with(['customer:id,name,email', 'items:id,invoice_id,quantity,unit_price'])
    ->select(['id', 'company_id', 'customer_id', 'total_amount', 'status', 'created_at'])
    ->paginate(25);
\`\`\`

---

## 3. Profiling Execution Plans with EXPLAIN Queries

Using MySQL \`EXPLAIN\` analysis, verify that your composite indexes eliminate full table scans:

\`\`\`sql
EXPLAIN SELECT id, total_amount, status 
FROM invoices 
WHERE company_id = 42 AND status = 'PAID' 
ORDER BY created_at DESC;
\`\`\`

- **Key used**: \`idx_invoices_tenant_status_date\`
- **Rows scanned**: Reduced from 450,000+ rows down to 12 rows.
- **Query Execution Time**: Dropped from **1,450ms** to **4ms**!

Implementing composite multi-tenant indexes and eager loading relationships eliminated database latency spikes and ensured smooth sub-50ms page load times across the application.
`
  }
];
