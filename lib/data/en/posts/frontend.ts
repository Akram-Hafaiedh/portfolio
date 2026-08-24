// lib/data/en/posts/frontend.ts
import { BlogPost } from '../../blogTypes';

export const frontendPosts: BlogPost[] = [
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
  }
];
