// lib/data/fr/posts/frontend.ts
import { BlogPost } from '../../blogTypes';

export const frontendPosts: BlogPost[] = [
{
    slug: "mastering-nextjs-15-optimizing-core-web-vitals",
    title: "Maîtriser Next.js 15: Optimisation des Core Web Vitals et de la Stabilité de Rendu",
    excerpt: "Une exploration approfondie du comportement de rendu de Next.js 15 App Router, des Server Components, du pré-rendu dynamique et des techniques pour minimiser le Cumulative Layout Shift (CLS).",
    date: "2026-02-05",
    readTime: "6 min de lecture",
    category: "Engineering",
    tags: ["Next.js", "React 19", "Performance Web", "SEO"],
    image: "/blog/nextjs15-performance.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: true,
    content: `
# Maîtriser Next.js 15: Core Web Vitals et Rendu

Next.js 15 représente une avancée majeure dans l'architecture des applications Web. Avec l'introduction du paradigme **React Server Components (RSC)**, des mises en page imbriquées et de l'optimisation automatisée des ressources, les développeurs disposent de plus de puissance que jamais pour créer des expériences utilisateur performantes.

Cependant, la création d'un site Web *rapide* nécessite toujours une planification délibérée. Explorons les techniques clés pour optimiser vos Core Web Vitals, stabiliser le rendu et prévenir les erreurs d'hydratation dans Next.js 15.

---

## 1. Éliminer le Cumulative Layout Shift (CLS)

Le Cumulative Layout Shift est une métrique de stabilité visuelle qui mesure l'ampleur des déplacements inattendus des éléments de mise en page pendant le chargement. Sur les sites riches en images, cela est souvent causé par l'omission des dimensions de largeur et de hauteur.

### Le Problème :
\`\`\`tsx
// Cela provoque un décalage de mise en page pendant le chargement de l'image
<img src="/projects/hero.png" alt="Bannière principale" />
\`\`\`

### La Solution :
Utilisez le composant natif \`next/image\` de Next.js. Il nécessite des dimensions explicites ou une disposition de remplissage, forçant le navigateur à allouer l'espace à l'avance.

\`\`\`tsx
import Image from 'next/image';

export function Banner() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/projects/hero.png"
        alt="Bannière principale"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
      />
    </div>
  );
}
\`\`\`

L'utilisation de la propriété \`priority\` sur les images au-dessus de la ligne de flottaison indique également au navigateur de les télécharger immédiatement, ce qui améliore considérablement le score **Largest Contentful Paint (LCP)**.

---

## 2. Résoudre les Erreurs d'Hydratation React 19

Des incohérences d'hydratation se produisent lorsque le code HTML pré-rendu par le serveur ne correspond pas exactement au code HTML initial généré par le navigateur client.

### Causes Fréquentes :
*   Utilisation d'API spécifiques au navigateur (comme \`window\` ou \`localStorage\`) lors du premier rendu.
*   Imbrication de balises HTML non valides (ex. placer un \`<div>\` dans un \`<p>\`).
*   Affichage direct de données dynamiques liées à l'heure locale (ex. \`new Date().toLocaleTimeString()\`).

### Bonne Pratique pour les API Window :
Assurez-vous que le code accédant aux API du navigateur ne s'exécute qu'après le montage du composant sur le client.

\`\`\`tsx
import { useState, useEffect } from 'react';

export function ThemeComponent() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // S'exécute strictement côté client après le montage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  return <div className="p-4">Thème actuel : {theme}</div>;
}
\`\`\`

---

## 3. Server vs. Client Components : Où placer la Logique ?

Pour maximiser la vitesse de chargement, conservez la majorité de votre application dans des **Server Components**. Ils effectuent les requêtes de données directement sur le serveur, éliminant tout JavaScript supplémentaire envoyé au client.

| Type de Composant | Besoin d'interactions ? | Besoin d'API Navigateur ? | Recommandation |
| :--- | :--- | :--- | :--- |
| **Server** | Non | Non | À utiliser par défaut pour les en-têtes, listes, structures. |
| **Client** | Oui (ex. clics, inputs) | Oui (ex. \`window\`, \`useEffect\`) | À réserver uniquement pour les éléments interactifs. |

![Flux de Rendu des Composants Serveur et Client Next.js](/blog/nextjs-rendering-flow.png)

En séparant l'interactivité du contenu, vous optimisez la taille de vos bundles et accélérez le chargement de vos pages.
`
  },

{
    slug: "route-overloading-reusable-form-components",
    title: "Éviter la Surcharge de Routes : Formulaires CRUD Dynamiques et Réutilisables",
    excerpt: "Comment orchestrer des mises en page conditionnelles et le chargement asynchrone des données sur des routes partagées de création et d'édition.",
    date: "2026-03-02",
    readTime: "4 min de lecture",
    category: "Frontend",
    tags: ["Vue 3", "Laravel", "Routing", "UX"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Formulaires CRUD Réutilisables en Environnement SaaS

En développement SaaS, la gestion des fiches d'entités (telles que la création, la modification et la consultation d'une entreprise) entraîne souvent une surcharge de routes. Les équipes ont tendance à dupliquer les pages, à répéter le balisage des entrées ou à surcharger une route unique avec des drapeaux d'état complexes côté client.

Une solution élégante consiste à concevoir un composant de formulaire unique et réutilisable qui adapte son comportement (Lecture seule, Création, Modification) selon le contexte de routage.

---

## Le Défi : Détection Dynamique du Contexte

Nous devons orchestrer une structure de saisie unique pour trois contextes :
1.  **Mode Création** : Champs vides éditables, bouton de soumission déclenchant un \`POST\`.
2.  **Mode Édition** : Champs pré-remplis de données existantes, bouton déclenchant un \`PUT\`.
3.  **Mode Consultation** : Champs désactivés (Lecture seule), boutons d'action remplacés par un lien de modification.

---

## 1. Conception du Formulaire Réactif Unique

Définissez des propriétés explicites pour le mode et les données afin de séparer la présentation de la logique de routage.

\`\`\`vue
<!-- components/CompanyForm.vue (Vue 3 / Composition API) -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Saisie du Nom de l'entreprise -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Nom de l'entreprise</label>
        <input 
          v-model="form.name" 
          :disabled="isReadOnly" 
          type="text" 
          required
          class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-50"
        />
      </div>

      <!-- Numéro de TVA / Taxe -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Identifiant Fiscal / TVA</label>
        <input 
          v-model="form.tax_id" 
          :disabled="isReadOnly" 
          type="text"
          class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-50"
        />
      </div>
    </div>

    <!-- Boutons d'Action -->
    <div class="flex justify-end gap-3 mt-6">
      <button 
        v-if="!isReadOnly" 
        type="submit" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase"
      >
        {{ mode === 'create' ? "Créer l'entreprise" : 'Enregistrer les modifications' }}
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

## 2. Routage et Injection d'État de Contexte

En encapsulant le composant de formulaire dans un contrôleur de page, vous chargez dynamiquement les données et paramétrez le mode selon l'URL (ex: \`/companies/new\`, \`/companies/:id\`, \`/companies/:id/edit\`).

\`\`\`ts
// router/index.js (Exemple de configuration de routes)
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

Dans votre page de contrôle \`CompanyPageWrapper.vue\`, récupérez l'identifiant, chargez les données si nécessaire, puis transmettez les paramètres :

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
        Modifier l'entreprise
      </router-link>
    </div>

    <CompanyForm 
      v-if="!loading" 
      :initial-data="companyData" 
      :mode="mode" 
      @submit="handleFormSubmit" 
    />
    <div v-else class="text-center py-12">Chargement des données...</div>
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
  if (props.mode === 'create') return "Créer une entreprise";
  if (props.mode === 'view') return "Informations sur l'entreprise";
  return "Modifier l'entreprise";
});

const loadCompany = async () => {
  try {
    const response = await axios.get(\`/api/companies/\${companyId.value}\`);
    companyData.value = response.data;
  } catch (error) {
    console.error("Erreur de chargement des informations", error);
  } finally {
    loading.value = false;
  }
};

const handleFormSubmit = async (formData) => {
  const url = props.mode === 'create' ? '/api/companies' : \`/api/companies/\${companyId.value}\`;
  const method = props.mode === 'create' ? 'post' : 'put';
  
  await axios[method](url, formData);
  alert('Modifications enregistrées !');
};

onMounted(() => {
  if (props.mode !== 'create') {
    loadCompany();
  }
});
</script>
\`\`\`

En mappant les formulaires CRUD réutilisables sur les paramètres d'URL, vous maintenez un code propre et factorisé tout en fournissant une expérience de modification intuitive.
`
  },

{
    slug: "migrating-legacy-laravel-blog-vue3-search-recommendations",
    title: "Moderniser un Moteur de Contenu : Migration d'un Blog Laravel Blade vers Vue 3 avec Recherche & Recommandations",
    excerpt: "Comment nous avons refondu le blog Laravel Blade hérité, débloqué les articles masqués, intégré la recherche en temps réel, la pagination et un moteur de recommandation intelligent.",
    date: "2026-03-15",
    readTime: "5 min de lecture",
    category: "Frontend",
    tags: ["Vue 3", "Laravel", "Recherche", "Migration de Contenu"],
    image: "/blog/covers/backend-tenancy.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Moderniser un Moteur de Contenu : Laravel Blade vers Vue 3

Les blogs et moteurs de contenu sont au cœur de l'acquisition d'utilisateurs en SaaS. Néanmoins, les blogs marketing créés dans les premières phases d'un projet accumulent souvent de la dette technique.

Dans notre cas, le blog hérité était au point mort : il ne comportait qu'une page d'accueil basique et une vue d'article unitaire. Des éléments de navigation essentiels — tels que le bouton "Charger plus" — étaient littéralement commentés dans le code d'origine, bloquant l'accès aux articles plus anciens !

Voici comment nous avons refondu et migré le blog Laravel Blade vers une application Vue 3 réactive incluant un catalogue complet, la recherche instantanée, la pagination dynamique, des filtres par tags et un moteur de recommandation d'articles.

---

## 1. Débloquer la Navigation avec le Routage Vue 3

Pour corriger la navigation bloquée, nous avons créé une route dédiée \`/articles\` et développé un gestionnaire de pagination asynchrone remplaçant le code hérité commenté.

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

## 2. Système de Recherche et de Filtrage par Tags

Nous avons développé un composant de liste réactif qui filtre les articles dynamiquement par titre, tag ou catégorie avec des requêtes temporisées (debounced) pour optimiser les performances serveur.

\`\`\`vue
<!-- components/ArticleListingView.vue -->
<template>
  <div class="max-w-6xl mx-auto py-12 px-4">
    <!-- Barre de recherche & Puces de tags -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-8">
      <input 
        v-model="searchQuery" 
        @input="debouncedSearch"
        placeholder="Rechercher des articles par mot-clé ou tag..."
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

    <!-- Grille de Cartes d'Articles -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <article v-for="article in paginatedArticles" :key="article.id" class="border rounded-2xl p-6 shadow-sm">
        <span class="text-xs font-bold uppercase text-blue-600 mb-2 block">{{ article.category }}</span>
        <h3 class="text-lg font-bold mb-2">{{ article.title }}</h3>
        <p class="text-xs text-slate-500 line-clamp-3 mb-4">{{ article.excerpt }}</p>
        <router-link :to="\`/blog/articles/\${article.slug}\`" class="text-xs font-bold text-blue-600 hover:underline">
          Lire l'article →
        </router-link>
      </article>
    </div>
  </div>
</template>
\`\`\`

---

## 3. Moteur de Recommandation Intelligent

Pour stimuler l'engagement des lecteurs, nous avons implémenté un algorithme sur la page de détail calculant la pertinence thématique d'après le recoupement des tags et des catégories :

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
            
            // Bonus catégorie identique
            if (article.category === currentArticle.category) score += 3;
            
            // Bonus tags partagés
            const sharedTags = article.tags.filter(tag => currentArticle.tags.includes(tag));
            score += sharedTags.length * 2;

            return { article, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
La migration du blog hérité vers Vue 3, l'ajout de la recherche et de la pagination, ainsi que l'intégration des recommandations intelligentes ont transformé une page marketing à l'abandon en un canal actif d'acquisition d'utilisateurs.
`
  }
];
