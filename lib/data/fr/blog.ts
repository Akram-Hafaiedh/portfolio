// lib/data/fr/blog.ts
import { BlogPost } from '../blogTypes';

export const blogPosts: BlogPost[] = [
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
    slug: "multi-tenant-data-isolation-laravel",
    title: "Isolation Stricte des Données Multi-Locataires dans Laravel avec les Scopes Globaux",
    excerpt: "Comment concevoir une application SaaS multi-locataires sécurisée qui isole automatiquement les enregistrements en base de données pour éviter les fuites de données.",
    date: "2026-02-01",
    readTime: "4 min de lecture",
    category: "Backend",
    tags: ["Laravel", "SaaS", "Sécurité", "MySQL"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Isolation des Données Multi-Locataires dans Laravel

Dans les plateformes SaaS multi-locataires (multi-tenant), l'isolation absolue des données est essentielle. Une seule fuite de données financières ou clients peut détruire la confiance commerciale. Voyons comment implémenter une couche d'isolation automatique à l'aide des **Scopes Globaux de Laravel**.

---

## Le Concept Central : Base de Données Unique Multi-Tenant

Dans une structure de base de données partagée, chaque table spécifique à un locataire (ex. \`invoices\`, \`clients\`) contient une colonne \`tenant_id\`. Plutôt que d'ajouter manuellement \`->where('tenant_id', $currentTenantId)\` à chaque requête Eloquent, nous pouvons déléguer cela à un Scope Global Laravel.

---

## 1. Création du Scope Global Tenant

Le Scope Global intercepte automatiquement toutes les requêtes Eloquent et restreint le résultat au locataire authentifié.

\`\`\`php
namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        // applique la contrainte seulement si le locataire est connecté
        if (auth()->check() && auth()->user()->tenant_id) {
            $builder->where($model->getTable() . '.tenant_id', auth()->user()->tenant_id);
        }
    }
}
\`\`\`

---

## 2. Configuration d'un Trait Réutilisable

Pour appliquer facilement ce scope à n'importe quel modèle Eloquent lié au locataire, définissons un trait qui gère également l'attribution automatique du \`tenant_id\` lors des créations de fiches.

\`\`\`php
namespace App\Models\Traits;

use App\Models\Scopes\TenantScope;

trait BelongsToTenant
{
    public static function bootBelongsToTenant()
    {
        static::addGlobalScope(new TenantScope);

        // Assigne automatiquement le tenant_id à la création
        static::creating(function ($model) {
            if (auth()->check() && auth()->user()->tenant_id) {
                $model->tenant_id = auth()->user()->tenant_id;
            }
        });
    }
}
\`\`\`

En appliquant ce trait à votre modèle \`Invoice\`, les lectures et écritures sont isolées automatiquement :

\`\`\`php
namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use BelongsToTenant; // Tout est désormais isolé de façon transparente !
}
\`\`\`

---

## 3. Contourner l'Isolation pour les Administrateurs Système

Pour un tableau de bord d'administration globale, vous aurez besoin de voir toutes les factures de tous les clients. Vous pouvez désactiver temporairement ce scope avec la méthode \`withoutGlobalScope\` :

\`\`\`php
// Récupère toutes les factures sans filtrer par locataire
$allInvoices = Invoice::withoutGlobalScope(TenantScope::class)->get();
\`\`\`

En utilisant les scopes globaux, vous empêchez les contaminations croisées de données directement au niveau du framework, garantissant ainsi une conformité totale.
`
  },
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
    image: "/projects/portfolio.png",
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
  },
  {
    slug: "redis-caching-queue-workers-laravel",
    title: "Traitement de Données en Masse: Gérer la Charge avec Redis et les Files d'Attente",
    excerpt: "Évitez les erreurs HTTP 504 (Gateway Timeout) en déportant les traitements de fichiers Excel/CSV lourds vers des workers d'arrière-plan avec Redis.",
    date: "2026-01-05",
    readTime: "4 min de lecture",
    category: "DevOps",
    tags: ["Redis", "Laravel Queues", "Fintech", "Docker"],
    image: "/projects/portfolio-deployment.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Traitements en Arrière-plan avec Redis et Queues

L'importation de fichiers Excel ou CSV volumineux (plus de 10 000 lignes) au sein d'une simple requête HTTP classique est une erreur fréquente qui mène inévitablement à des erreurs HTTP 504 de dépassement de délai (Gateway Timeout). Voyons comment architecturer un pipeline d'importation asynchrone et résilient avec **Redis** et les **Files d'Attente Laravel**.

---

## L'Architecture du Pipeline Asynchrone

1.  **Téléchargement** : L'utilisateur soumet le fichier Excel.
2.  **Mise en File d'Attente** : Le fichier est stocké, et un Job d'importation est poussé dans la file d'attente Redis. Le serveur renvoie immédiatement un statut HTTP 200.
3.  **Traitement en Arrière-Plan** : Un worker récupère le Job en file, lit le fichier par morceaux (chunks) et écrit en base.
4.  **Notification en Temps Réel** : L'utilisateur suit l'avancement de l'import via des WebSockets.

---

## 1. Enregistrement du Fichier et Dispatch du Job

Plutôt que d'exécuter la lecture du fichier de manière synchrone, nous déléguons la tâche :

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
        
        // Enregistre le fichier temporairement
        $path = $request->file('file')->store('imports');

        // Lance le Job en arrière-plan sur Redis
        ProcessExcelImport::dispatch($path, auth()->user()->id);

        return response()->json([
            'message' => 'Upload effectué avec succès. Traitement en cours en arrière-plan.',
        ]);
    }
}
\`\`\`

---

## 2. Découpage en Morceaux (Chunks) du Job

Dans le Job, nous lisons les données par paquets de 500 lignes pour éviter la saturation de la mémoire PHP et les coupures serveurs.

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
        // Importation par paquets pour préserver la mémoire
        Excel::import(new InventoryImport($this->userId), $this->filePath);
    }
}
\`\`\`

L'utilisation de **Redis** comme courtier de messages combiné à des files d'attente maintient votre application ultra-réactive et résistante face aux montées en charge.
`
  },
  {
    slug: "hybrid-laravel-blade-vue3-datatables",
    title: "Architecture Hybride: Intégrer les Datatables Vue 3 dans une Application Laravel Blade",
    excerpt: "Comment moderniser progressivement vos vues de listes héritées en intégrant des composants réactifs Vue 3 au sein des templates Blade de Laravel sans réécriture SPA complète.",
    date: "2026-02-12",
    readTime: "5 min de lecture",
    category: "Engineering",
    tags: ["Vue 3", "Laravel", "Vite", "Migration Frontend"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Architecture Hybride: Datatables Vue 3 dans Laravel Blade

Lors de la gestion de grandes applications d'entreprise (comme un ERP ou des plateformes d'inventaire), les vues sous forme de listes pour les clients, les stocks, les mouvements et les fournisseurs constituent le cœur des opérations quotidiennes. Avec le temps, les listes traditionnelles basées sur jQuery Datatables ou générées côté serveur deviennent lentes, peu réactives et complexes à maintenir.

Cependant, réécrire l'intégralité du frontend en Single Page Application (SPA) s'avère risqué et coûteux. Voyons comment concevoir une **architecture hybride** en intégrant progressivement des tableaux dynamiques Vue 3 au sein de vos templates Laravel Blade existants.

---

## Le Concept Hybride : Montage Progressif

Plutôt que de convertir toute l'application, nous conservons le système de routage, les barres latérales et le layout global de Laravel Blade. Nous instancions ensuite les composants Vue 3 uniquement sur des sélecteurs HTML spécifiques en fonction des besoins :

\`\`\`html
<!-- Template Laravel Blade: inventories/index.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container mx-auto py-6">
    <h1 class="text-2xl font-bold mb-6">Gestion de Stock</h1>
    
    <!-- Élément cible pour Vue 3 -->
    <div id="vue-stock-listing" data-api-url="{{ route('api.inventory.index') }}"></div>
</div>
@endsection
\`\`\`

---

## 1. Configurer Vite pour une Compilation Hybride

Si votre application Laravel utilise Vite, configurez-le pour charger le plugin officiel de Vue 3 et compiler vos composants (.vue).

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

## 2. Instanciation Dynamique sur les Sélecteurs

Dans votre fichier JavaScript principal, vérifiez la présence du conteneur spécifique avant de monter l'application Vue. Cela évite les erreurs d'exécution sur les autres pages du projet.

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

## 3. Création du Composant Datatable Réactif

Nous écrivons ensuite le composant de liste réactif qui interroge l'endpoint du contrôleur Laravel, gère les filtres et administre l'état de la pagination.

\`\`\`vue
<!-- resources/js/components/StockListing.vue -->
<template>
  <div class="bg-white border rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <input 
        v-model="search" 
        @input="debouncedFetch"
        placeholder="Rechercher un article..." 
        class="border rounded-lg px-4 py-2 text-sm w-64"
      />
    </div>

    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <th class="p-4">SKU</th>
          <th class="p-4">Désignation</th>
          <th class="p-4">Quantité</th>
          <th class="p-4">Emplacement</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
          <td class="p-4 font-mono">{{ item.sku }}</td>
          <td class="p-4 font-semibold">{{ item.name }}</td>
          <td class="p-4">{{ item.qty }} unités</td>
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
    console.error("Impossible de charger les données :", error);
  }
};

onMounted(() => {
  fetchItems();
});
</script>
\`\`\`

Cette approche progressive vous permet de moderniser vos vues ERP bloc par bloc sans casser la cohérence globale du système.
`
  },
  {
    slug: "securing-saas-auth-oauth-password-recovery",
    title: "Sécurisation SaaS: Gérer l'OAuth (Google & Facebook) et Fiabiliser les Flux de Récupération",
    excerpt: "Guide pratique pour implémenter un pipeline d'authentification robuste avec l'intégration sécurisée de Socialite et l'envoi asynchrone des e-mails.",
    date: "2026-02-18",
    readTime: "4 min de lecture",
    category: "Security",
    tags: ["OAuth 2.0", "Laravel Socialite", "SMTP", "Sécurité"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Sécurisation SaaS: OAuth & Récupération par Email

L'authentification est la porte d'entrée de toute plateforme SaaS. En production, les utilisateurs s'attendent à deux options : une connexion sociale simplifiée (Google/Facebook) et des flux traditionnels par e-mail et mot de passe.

Cependant, deux problèmes majeurs surviennent fréquemment : les boucles de création de comptes doublons (lorsqu'un utilisateur inscrit par e-mail tente de se connecter via Google) et l'envoi d'e-mails de récupération lents ou bloquants. Voyons comment fiabiliser ces flux.

---

## 1. Structurer la Base de Données pour les Comptes Sociaux

Pour éviter les conflits et comptes doublons, ne liez pas un identifiant social directement à la table principale \`users\` sous forme de chaîne unique. Utilisez plutôt une table dédiée \`linked_social_accounts\`. Cela permet à un même utilisateur d'associer Google et Facebook à un profil unique.

\`\`\`php
// Migration de base de données
Schema::create('linked_social_accounts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('provider_name'); // 'google', 'facebook'
    $table->string('provider_id');   // ID Unique OAuth de l'utilisateur
    $table->timestamps();
});
\`\`\`

---

## 2. Résoudre les Boucles d'Inscription Doublons

Lorsqu'un utilisateur initie une connexion sociale, résolvez d'abord son adresse e-mail. Si l'adresse e-mail existe déjà en base de données, associez simplement le fournisseur social au compte utilisateur existant au lieu de créer un doublon.

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
        // 1. Recherche d'un lien social existant
        $account = LinkedSocialAccount::where('provider_name', $providerName)
            ->where('provider_id', $providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        }

        // 2. Recherche d'un utilisateur existant avec cet e-mail
        $user = User::where('email', $providerUser->getEmail())->first();

        if (!$user) {
            // Création d'un nouvel utilisateur si inexistant
            $user = User::create([
                'name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'password' => bcrypt(str_random(24)), // Génère un mot de passe sécurisé aléatoire
            ]);
        }

        // 3. Liaison du compte social à l'utilisateur
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

## 3. Déporter les E-mails de Récupération vers Redis

L'envoi synchrone d'e-mails lors d'une requête web ralentit considérablement le temps de réponse client et risque d'aboutir à un timeout HTTP 504 si les serveurs SMTP répondent lentement.

Assurez-vous que votre classe de notification de réinitialisation de mot de passe implémente l'interface \`ShouldQueue\` de Laravel afin de déléguer l'envoi d'e-mails à un worker Redis.

\`\`\`php
// app/Notifications/ResetPasswordQueued.php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

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
            ->subject('Réinitialisation de votre mot de passe')
            ->line('Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.')
            ->action('Réinitialiser le mot de passe', $url)
            ->line('Ce lien de réinitialisation expirera dans 60 minutes.');
    }
}
\`\`\`

En mettant en file d'attente vos notifications et en associant dynamiquement les connexions OAuth, vous garantissez un parcours d'authentification robuste, rapide et sécurisé.
`
  },
  {
    slug: "state-persistence-session-management-multi-tenant",
    title: "Gestion des Sessions SaaS : Persister l'État lors du Changement de Locataire",
    excerpt: "Comment concevoir une couche de synchronisation fiable des sessions dans les architectures hybrides pour éviter les déconnexions intempestives lors du changement d'entreprise.",
    date: "2026-02-22",
    readTime: "5 min de lecture",
    category: "Engineering",
    tags: ["Vue 3", "State Management", "Sessions", "Sécurité"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Persistance des Sessions dans un SaaS Multi-Entreprises

Dans les plateformes professionnelles multi-locataires (comme les ERP ou les outils de facturation), les utilisateurs gèrent ou naviguent souvent entre plusieurs entreprises. La conception de ce flux nécessite un système de gestion de session particulièrement robuste.

Un problème fréquent dans les architectures hybrides est la perte de persistance des sessions : lors du rechargement de la page ou du passage d'une entreprise à une autre, l'utilisateur se retrouve subitement déconnecté en raison d'un désalignement entre le LocalStorage client et les cookies de session du serveur. Voyons comment résoudre ce dysfonctionnement.

---

## La Cause Racine : Désynchronisation des États de Jetons

Lorsqu'un utilisateur bascule de l'entreprise A vers l'entreprise B, le client effectue des appels API pour charger les nouvelles données. Si le client met à jour son \`active_company_id\` dans le LocalStorage mais que le jeton de session ou le cookie CSRF côté serveur n'est pas correctement synchronisé ou renouvelé, les intercepteurs renvoient une erreur \`401 Unauthorized\` ou \`419 Page Expired\`, forçant une déconnexion intempestive.

---

## 1. Mettre en place un Intercepteur Authentifié Synchrone

Pour éviter la perte de jeton lors de navigations rapides, utilisez un intercepteur Axios chargeant dynamiquement les en-têtes d'envoi.

\`\`\`ts
// lib/http-client.ts
import axios from 'axios';

const httpClient = axios.create({
    baseURL: '/api',
    withCredentials: true, // Crucial pour inclure les cookies de session
});

httpClient.interceptors.request.use((config) => {
    const activeCompanyId = localStorage.getItem('active_company_id');
    
    if (activeCompanyId) {
        config.headers['X-Company-ID'] = activeCompanyId;
    }
    
    // Récupère automatiquement le jeton CSRF depuis les cookies du document
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

## 2. Middleware Serveur de Validation du Contexte Client

Côté backend, assurez-vous que l'identifiant de l'entreprise demandé dans les en-têtes correspond bien aux entreprises associées à l'utilisateur authentifié. En cas d'incohérence, renvoyez une réponse d'erreur maîtrisée plutôt que de détruire directement la session.

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
            // Vérifie que l'utilisateur appartient bien à l'entreprise demandée
            $hasAccess = $user->companies()->where('companies.id', $companyId)->exists();
            
            if ($hasAccess) {
                // Instancie l'entreprise active dans le conteneur global
                app()->instance('active_company', $user->companies()->find($companyId));
            } else {
                return response()->json([
                    'error' => 'Contexte entreprise invalide. Veuillez rafraîchir la page.'
                ], 403);
            }
        }

        return $next($request);
    }
}
\`\`\`

---

## 3. Mécanisme de Récupération Transparente de Session

Si une requête HTTP échoue avec un code \`401\` ou \`419\`, tentez de renouveler silencieusement le jeton de session avant de rediriger l'utilisateur vers la page de connexion.

\`\`\`ts
// lib/http-client.ts (Intercepteur de réponse)
httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 419) && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Demande de renouvellement de cookie de session
                await axios.get('/api/csrf-cookie');
                
                // Relance la requête originale
                return httpClient(originalRequest);
            } catch (refreshError) {
                // Redirection forcée uniquement si le renouvellement échoue
                localStorage.removeItem('active_company_id');
                window.location.href = '/login?session_expired=true';
            }
        }
        return Promise.reject(error);
    }
);
\`\`\`

L'utilisation combinée d'un intercepteur synchronisé et d'un middleware de vérification préserve les sessions utilisateur lors des bascules d'environnements SaaS.
`
  },
  {
    slug: "subscription-billing-engine-payment-sync",
    title: "Concevoir un Moteur de Facturation : Synchronisation API et Outils d'Administration",
    excerpt: "Comment dissocier l'historique de facturation des statuts d'abonnements, et aligner les transactions des passerelles de paiement avec les tableaux de support client.",
    date: "2026-02-26",
    readTime: "4 min de lecture",
    category: "Backend",
    tags: ["Fintech", "Payment Gateways", "Laravel", "APIs"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Architecture d'un Moteur de Facturation SaaS

Dans les applications SaaS sur abonnement, la complexité de facturation s'accroît lorsque se croisent factures clients, plans d'abonnements dynamiques et interfaces de gestion interne du support.

Un problème classique est de ne pas dissocier l'état d'abonnement de la liste brute des factures : l'utilisateur voit son forfait actuel uniquement sous forme d'une suite de factures payées, tandis que l'équipe support fait face à des écarts de prix affichés sur son interface en raison de notifications asynchrones de passerelles de paiement (Webhooks) perdues. Voyons comment concevoir une synchronisation fiable.

---

## L'Architecture : Dissocier Abonnements et Factures

Une base de données de facturation robuste requiert une séparation logique des tables :
1.  **Table Subscriptions** : Administre l'état actuel de l'abonnement (\`active\`, \`canceled\`, \`past_due\`), le niveau de forfait et la date de renouvellement.
2.  **Table Invoices** : Enregistre l'historique des transactions financières, les reçus et les états de paiement.
3.  **Tableaux d'Administration** : Interrogent une API de synthèse plutôt que de sommer des écritures comptables brutes et partielles.

---

## 1. Modélisation de Base de Données

\`\`\`php
// Structure de la table d'abonnements
Schema::create('subscriptions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->string('stripe_subscription_id')->unique();
    $table->string('stripe_price_id');
    $table->string('status'); // active, past_due, trialing, canceled
    $table->timestamp('trial_ends_at')->nullable();
    $table->timestamp('ends_at')->nullable();
    $table->timestamps();
});

// Structure de la table des factures historisées
Schema::create('invoices', function (Blueprint $table) {
    $table->id();
    $table->foreignId('subscription_id')->constrained();
    $table->string('stripe_invoice_id')->unique();
    $table->integer('amount_paid'); // Stocké en centimes (ex: 2900 pour 29.00€)
    $table->string('currency');
    $table->string('status'); // paid, open, uncollectible
    $table->timestamps();
});
\`\`\`

---

## 2. Traitement Sécurisé des Webhooks Stripe/PayPal

Pour résoudre les écarts de prix dans l'interface de support, configurez un récepteur de Webhook mettant à jour l'état de la base de données dès qu'un paiement est validé par la passerelle externe.

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
                    'amount_paid' => $invoiceData['amount_paid'], // Stocké en centimes
                    'currency' => $invoiceData['currency'],
                    'status' => 'paid',
                ]
            );
        }
    }
}
\`\`\`

---

## 3. Résoudre les Écarts Financiers de l'Interface Support

Lors de la restitution des montants financiers aux administrateurs du support, stockez systématiquement les valeurs en centimes et utilisez des accesseurs de conversion pour éliminer les erreurs d'arrondis sur les nombres à virgule flottante.

\`\`\`php
// app/Models/Invoice.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    // Accesseur : Conversion des centimes en dollars/euros pour l'affichage
    public function getFormattedAmountAttribute()
    {
        return '$' . number_format($this->amount_paid / 100, 2);
    }
}
\`\`\`

En structurant vos abonnements séparément de l'historique des paiements et en s'appuyant sur des webhooks unitaires, vous assurez un moteur de facturation sans incohérences.
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
    image: "/projects/iberis.png",
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
    slug: "rbac-collaborator-permissions-saas-subscription-feature-gating",
    title: "Concevoir un Système RBAC Granulaire et Bloquer les Accès lors d'Abonnements Expirés",
    excerpt: "Comment implémenter des autorisations collaborateurs fines, verrouiller la création de documents à l'expiration du compte principal et monétiser le module en option payante.",
    date: "2026-03-06",
    readTime: "5 min de lecture",
    category: "Architecture",
    tags: ["Laravel", "RBAC", "Monétisation SaaS", "Sécurité"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Gestion des Droits (RBAC) & Verrouillage d'Abonnement Multi-Utilisateurs

Dans les applications SaaS B2B (comme les ERP ou plateformes de facturation), le propriétaire d'un compte invite régulièrement des sous-utilisateurs (appelés **Collaborateurs**) pour gérer les opérations quotidiennes. La délégation d'accès pose deux défis techniques majeurs :

1. **Découpage Granulaire des Autorisations** : Les collaborateurs ne doivent pas posséder des droits administrateur globaux. Un responsable de stock doit pouvoir créer des articles sans avoir l'autorisation de supprimer des factures ou modifier la fiscalité.
2. **Verrouillage en Cascade à l'Expiration de l'Abonnement** : Lorsque l'abonnement du compte principal expire, la création de documents (ventes, dépenses, factures) doit être bloquée instantanément pour **l'ensemble des collaborateurs liés**, empêchant toute contournement.

Voici comment nous avons conçu un pipeline de contrôle d'accès basé sur les rôles (RBAC) et transformé la gestion des collaborateurs en une option d'abonnement payante.

---

## 1. Conception d'Autorisations Granulaires par Module

Plutôt que d'assigner des rôles globaux rigides (\`admin\`, \`staff\`), créez un schéma d'autorisations explicites associant des actions clés (\`invoices.create\`, \`invoices.delete\`, \`expenses.view\`) à des rôles personnalisés par le propriétaire.

\`\`\`php
// app/Services/PermissionService.php
namespace App\\Services;

use App\\Models\\User;

class PermissionService
{
    public static function canUserPerform(User $user, string $permission): bool
    {
        // 1. Le propriétaire du compte dispose de tous les accès
        if ($user->is_workspace_owner) {
            return true;
        }

        // 2. Récupère les autorisations du rôle collaborateur
        $permissions = $user->role ? $user->role->permissions->pluck('name')->toArray() : [];

        return in_array($permission, $permissions);
    }
}
\`\`\`

Appliquez ensuite ces règles de manière transparente via un middleware Laravel :

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
                'error' => 'Vous ne disposez pas des autorisations requises pour exécuter cette action.'
            ], 403);
        }

        return $next($request);
    }
}
\`\`\`

---

## 2. Verrouillage en Cascade de l'Abonnement Expiré

Une faille de sécurité classique survient lorsque les vérifications d'expiration ne ciblent que l'utilisateur directement connecté. Si un collaborateur se connecte, son statut individuel peut apparaître actif, lui permettant de créer des ventes ou dépenses alors que l'abonnement du compte propriétaire est expiré.

Pour corriger cette faille, vérifiez systématiquement le statut d'abonnement du **compte propriétaire principal** lors de chaque tentative de création :

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
        
        // Résolution du compte propriétaire principal (tenant principal)
        $owner = $user->is_workspace_owner ? $user : $user->workspaceOwner;

        if (!$owner || !$owner->hasActiveSubscription()) {
            return response()->json([
                'error' => 'Abonnement expiré. Veuillez contacter l\'administrateur du compte pour renouveler l\'offre.',
                'code' => 'SUBSCRIPTION_EXPIRED'
            ], 402);
        }

        return $next($request);
    }
}
\`\`\`

---

## 3. Monétiser le Module Collaborateurs en Option Payante

Après la sécurisation du système RBAC et du verrouillage des abonnements, l'équipe a identifié que la collaboration multi-utilisateurs représentait une valeur à fort impact pour les entreprises en croissance.

Plutôt que d'inclure la gestion des collaborateurs dans les forfaits de base, la fonctionnalité a été configurée comme un **module d'extension payant (Add-On)** :

\`\`\`php
// app/Models/Workspace.php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Workspace extends Model
{
    public function canAddCollaborators(): bool
    {
        // Vérifie si le compte possède l'option Collaborateurs ou un forfait Entreprise
        return $this->hasAddon('collaborators_module') || $this->plan_tier === 'enterprise';
    }

    public function maxCollaboratorLimit(): int
    {
        if (!$this->canAddCollaborators()) {
            return 0; // Plan gratuit / standard sans option
        }

        return $this->addon_seats ?? 5;
    }
}
\`\`\`

En combinant contrôle d'accès granulaire, verrouillage global du tenant et monétisation par fonctionnalités, vous transformez la gestion des autorisations en un module sécurisé et générateur de valeur.
`
  },
  {
    slug: "monetizing-api-rate-limits-multi-company-saas-pricing",
    title: "Monétiser les Quotas d'API et le Multi-Entreprises : Structurer une Grille Tarifaire SaaS & la Gestion des Add-Ons",
    excerpt: "Comment limiter les débits d'API développeurs, restreindre les emplacements d'entreprises et concevoir un portail de gestion d'extensions clair et dynamique.",
    date: "2026-03-10",
    readTime: "5 min de lecture",
    category: "Architecture",
    tags: ["Tarification SaaS", "Limitation API", "Laravel", "Monétisation"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Monétiser les Quotas d'API et le Multi-Entreprises en SaaS

À mesure qu'une plateforme SaaS mûrit, la croissance du chiffre d'affaires s'oriente vers la **monétisation à l'usage** et les **modules d'extension payants**. Deux leviers majeurs de croissance pour les plateformes B2B sont :

1. **Quotas et Limitation d'API Développeurs** : Monétiser le débit des requêtes API et les intégrations tierces au-delà des quotas mensuels de base.
2. **Emplacements d'Entreprises Multi-Locataires** : Facturer la gestion de plusieurs entités juridiques ou filiales sous un tableau de bord d'administration unique.

Voici comment nous avons développé un middleware de régulation des requêtes API, un contrôle des quotas d'entreprises et un portail tarifaire interactif destiné tant aux visiteurs qu'aux abonnés.

---

## 1. Réguler les Requêtes API par Niveau d'Abonnement

Pour monétiser l'utilisation de l'API sans rompre les intégrations existantes, attribuez dynamiquement des limites de débit en fonction du forfait ou des options souscrites.

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

        // Détermine le nombre maximal de requêtes par minute selon le forfait
        $maxAttempts = match ($user->plan_tier) {
            'enterprise' => 500,
            'pro' => 120,
            default => 30, // Forfait Gratuit / Standard
        };

        // Ajoute un quota supplémentaire si l'option "API Illimitée" a été souscrite
        if ($user->hasAddon('api_boost')) {
            $maxAttempts += 1000;
        }

        if (RateLimiter::tooManyAttempts($rateLimitKey, $maxAttempts)) {
            return response()->json([
                'error' => 'Quota d\'API dépassé. Mettez à niveau votre abonnement ou ajoutez un pack de requêtes.',
                'retry_after' => RateLimiter::availableIn($rateLimitKey)
            ], 429);
        }

        RateLimiter::hit($rateLimitKey);

        return $next($request);
    }
}
\`\`\`

---

## 2. Restreindre les Emplacements d'Entreprises

La gestion de plusieurs entreprises exige de contrôler le nombre d'emplacements autorisés lors de la création d'une nouvelle entité.

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
        $allowedSlots = $user->purchased_company_slots ?? 1; // 1 entreprise par défaut

        if ($currentCompanyCount >= $allowedSlots) {
            return response()->json([
                'error' => 'Limite d\'entreprises atteinte. Mettez à niveau votre compte pour débloquer de nouveaux emplacements.',
                'code' => 'UPGRADE_REQUIRED'
            ], 403);
        }

        // Création de l'entreprise...
    }
}
\`\`\`

---

## 3. Portail Dynamique de Tarification et d'Add-Ons

Pour offrir une clarté maximale, concevez un composant tarifaire réactif s'adaptant à deux profils :
- **Visiteurs / Prospects** : Présentation comparative des forfaits, grille de fonctionnalités et options payantes (entreprises supplémentaires, volume d'API, collaborateurs).
- **Abonnés Actifs** : Visualisation de la consommation du forfait actuel, achat instantané d'extensions et calcul au prorata des mises à jour de facturation.

\`\`\`vue
<!-- components/PricingAddonManager.vue (Vue 3 / Composition API) -->
<template>
  <div class="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800">
    <h2 class="text-2xl font-bold mb-4">Gestion de l'Abonnement & des Options</h2>

    <!-- Option Emplacements d'Entreprises -->
    <div class="flex justify-between items-center py-4 border-b border-slate-800">
      <div>
        <h3 class="font-semibold text-sm">Entreprises Supplémentaires</h3>
        <p class="text-xs text-slate-400">Gérez plusieurs structures sous un compte unique</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="updateCompanySlots(-1)" class="w-8 h-8 rounded-lg bg-slate-800 font-bold">-</button>
        <span class="font-mono text-sm font-bold">{{ companySlots }} emplacements (15€/mois unité)</span>
        <button @click="updateCompanySlots(1)" class="w-8 h-8 rounded-lg bg-blue-600 font-bold">+</button>
      </div>
    </div>

    <!-- Option Boost API -->
    <div class="flex justify-between items-center py-4">
      <div>
        <h3 class="font-semibold text-sm">Boost Débit API (+1 000 req/min)</h3>
        <p class="text-xs text-slate-400">Pour webhooks intensifs et intégrations CRM</p>
      </div>
      <button 
        @click="toggleApiBoost" 
        :class="hasApiBoost ? 'bg-emerald-600' : 'bg-slate-800'"
        class="px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors"
      >
        {{ hasApiBoost ? 'Actif (29€/mois)' : 'Ajouter au forfait' }}
      </button>
    </div>
  </div>
</template>
\`\`\`

Monétiser le débit d'API et les emplacements d'entreprises transforme une grille tarifaire fixe en un modèle économique souple et basé sur l'usage.
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
    image: "/projects/iberis.png",
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
  },
  {
    slug: "realtime-websockets-laravel-echo-redis-stock-sync",
    title: "Architecture WebSockets en Temps Réel : Intégrer Laravel Echo et Redis pour la Synchronisation de Stocks",
    excerpt: "Comment éliminer les goulets d'étranglement des requêtes HTTP et diffuser en direct les mouvements de stocks et les statuts de commandes avec Laravel Echo, Redis et Soketi.",
    date: "2026-03-20",
    readTime: "6 min de lecture",
    category: "Architecture",
    tags: ["WebSockets", "Laravel Echo", "Redis", "Temps Réel"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Architecture WebSockets en Temps Réel avec Laravel & Redis

Dans les ERP et plateformes e-commerce à fort trafic, plusieurs gestionnaires de stock et commerciaux modifient les niveaux de stock en simultané. Se reposer sur des requêtes HTTP régulières pour actualiser l'affichage engendre une surcharge serveur et des décalages d'inventaire.

Voici comment nous avons développé une architecture pilotée par les événements avec **Laravel WebSockets/Soketi**, **Redis Pub/Sub** et **Laravel Echo + Vue 3** pour diffuser des mises à jour instantanées sur les tableaux de bord multi-locataires.

---

## 1. Diffusion d'Événements Métier dans Laravel

Lorsqu'une commande est validée ou qu'un ajustement de stock survient, déclenchez un événement implémentant \`ShouldBroadcastNow\` :

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

## 2. Sécuriser les Canaux Privés Multi-Entreprises

Pour garantir la sécurité multi-tenant, autorisez l'accès au canal privé en vérifiant l'entreprise active de l'utilisateur authentifié :

\`\`\`php
// routes/channels.php
use App\\Models\\User;

Broadcast::channel('company.{companyId}', function (User $user, int $companyId) {
    return (int) $user->active_company_id === (int) $companyId;
});
\`\`\`

---

## 3. Écoute des Flux WebSockets dans Vue 3

Côté client Vue 3, initialisez Laravel Echo avec les identifiants WebSockets et écoutez les flux d'événements entrants :

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
                console.log('Mise à jour de stock reçue:', eventData);
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

Le remplacement des requêtes HTTP périodiques par la diffusion d'événements WebSockets a réduit la charge API du serveur de 70% tout en assurant une synchronisation parfaite des stocks en moins d'une seconde.
`
  },
  {
    slug: "memory-efficient-streaming-exports-laravel-vue3",
    title: "Exportation de Données Massives : Éviter les Surcharges Mémoire avec Laravel & Vue 3",
    excerpt: "Comment exporter des journaux financiers et des mouvements de stocks de plus de 100 000 lignes grâce aux curseurs de base de données et au flux HTTP continu sans dépasser les limites mémoire de PHP.",
    date: "2026-03-25",
    readTime: "5 min de lecture",
    category: "Backend",
    tags: ["Laravel", "Performance", "Export de Données", "Vue 3"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Exportation de Données Massives : Éviter les Surcharges Mémoire

L'exportation de journaux financiers, de listes de factures ou d'historiques de stocks contenant des dizaines de milliers de lignes déclenche fréquemment des plantages mémoire en PHP (\`Fatal error: Allowed memory size exhausted\`).

Charger des collections d'objets Eloquent complètes en mémoire avant d'écrire un fichier CSV ou Excel est une mauvaise pratique. Voici comment nous avons conçu une réponse HTTP en flux continu (streamed response) s'appuyant sur des curseurs de base de données pour conserver une empreinte mémoire constante sous les 10 Mo.

---

## 1. Utiliser les Curseurs Eloquent à Faible Empreinte Mémoire

Au lieu de faire appel à \`->get()\`, utilisez \`->cursor()\`. Les curseurs Eloquent récupèrent les enregistrements ligne par ligne via les générateurs PDO sans hydrater l'ensemble des modèles simultanément.

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
        $fileName = 'export_financier_' . date('Y_m_d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->stream(function () use ($companyId) {
            $output = fopen('php://output', 'w');

            // Écriture du BOM CSV pour la prise en charge UTF-8 sous MS Excel
            fputs($output, $bom = (chr(0xEF) . chr(0xBB) . chr(0xBF)));

            // Écriture de l'en-tête CSV
            fputcsv($output, ['Référence', 'Date', 'Type', 'Montant', 'Statut']);

            // Lecture progressive via curseur
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

## 2. Gestion des Téléchargements en Flux Continu dans Vue 3

Pour télécharger des flux d'exportation sans interrompre l'expérience utilisateur de l'application monopage :

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
    link.setAttribute('download', \`export_financier_\${Date.now()}.csv\`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
\`\`\`

L'utilisation des flux continus HTTP et des curseurs a permis d'exporter plus de 100 000 lignes de transactions instantanément sans aucun pic de mémoire ni délai d'attente serveur.
`
  },
  {
    slug: "multi-tenant-database-query-indexing-optimization",
    title: "Éliminer les Requêtes N+1 et Optimiser l'Indexation Multi-Locataires sous Forte Charge SaaS",
    excerpt: "Comment nous avons diagnostiqué les requêtes lentes, implémenté des index composés sur les tables multi-tenant et éradiqué les goulots d'étranglement N+1 en production.",
    date: "2026-03-30",
    readTime: "6 min de lecture",
    category: "Backend",
    tags: ["MySQL", "Optimisation BDD", "Laravel", "Multi-Tenant"],
    image: "/projects/iberis.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    content: `
# Optimisation des Requêtes et Indexation Multi-Tenant

À mesure que les bases de données SaaS multi-tenant atteignent des millions d'enregistrements, les requêtes non indexées et les problèmes de requêtes répétitives (N+1) dégradent fortement les performances.

Lors de la récupération de données filtrées par \`company_id\` (factures, mouvements, articles), l'absence d'index composés provoque un balayage complet de la table (full table scan). Voici comment nous avons optimisé l'exécution des requêtes SQL.

---

## 1. Concevoir des Index Composés pour la Multi-Location

Dans un schéma multi-tenant, les requêtes associent quasi systématiquement le champ \`company_id\` à d'autres filtres comme \`status\` ou \`created_at\`. Les index à colonne unique s'avèrent inefficaces.

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
            // Index composé ordonné par (company_id, status, created_at)
            $table->index(['company_id', 'status', 'created_at'], 'idx_invoices_tenant_status_date');
            
            // Index composé pour les recherches par client
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

## 2. Détecter et Éliminer les Requêtes N+1

Le problème N+1 survient lorsqu'une boucle parcourt une liste de modèles sans charger au préalable leurs relations (eager loading).

### Code Problématique (N+1) :
\`\`\`php
// Exécute 1 requête pour les factures + N requêtes individuelles pour chaque client !
$invoices = Invoice::where('company_id', $companyId)->get();

foreach ($invoices as $invoice) {
    echo $invoice->customer->name; // Déclenche une requête SQL séparée par ligne !
}
\`\`\`

### Code Optimisé avec Chargement Préalable (Eager Loading) :
\`\`\`php
// Exécute exactement 2 requêtes SQL optimisées quel que soit le nombre de factures !
$invoices = Invoice::where('company_id', $companyId)
    ->with(['customer:id,name,email', 'items:id,invoice_id,quantity,unit_price'])
    ->select(['id', 'company_id', 'customer_id', 'total_amount', 'status', 'created_at'])
    ->paginate(25);
\`\`\`

---

## 3. Analyser les Plans d'Exécution avec EXPLAIN

En utilisant l'analyse \`EXPLAIN\` sous MySQL, vérifiez que vos index composés évitent le parcours complet de la table :

\`\`\`sql
EXPLAIN SELECT id, total_amount, status 
FROM invoices 
WHERE company_id = 42 AND status = 'PAID' 
ORDER BY created_at DESC;
\`\`\`

- **Index utilisé** : \`idx_invoices_tenant_status_date\`
- **Lignes balayées** : Réduites de 450 000+ lignes à seulement 12 lignes.
- **Temps d'exécution** : Chute spectaculaire de **1 450 ms** à **4 ms** !

L'intégration d'index composés et du chargement préalable des relations a éliminé les pics de latence de la base de données et garanti des temps de réponse sous les 50 ms.
`
  }
];
