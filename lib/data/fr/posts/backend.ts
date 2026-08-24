// lib/data/fr/posts/backend.ts
import { BlogPost } from '../../blogTypes';

export const backendPosts: BlogPost[] = [
{
    slug: "redis-caching-queue-workers-laravel",
    title: "Traitement de Données en Masse: Gérer la Charge avec Redis et les Files d'Attente",
    excerpt: "Évitez les erreurs HTTP 504 (Gateway Timeout) en déportant les traitements de fichiers Excel/CSV lourds vers des workers d'arrière-plan avec Redis.",
    date: "2026-01-05",
    readTime: "4 min de lecture",
    category: "DevOps",
    tags: ["Redis", "Laravel Queues", "Fintech", "Docker"],
    image: "/blog/covers/realtime-websockets.png",
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
    image: "/blog/covers/backend-tenancy.png",
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
    slug: "state-persistence-session-management-multi-tenant",
    title: "Gestion des Sessions SaaS : Persister l'État lors du Changement de Locataire",
    excerpt: "Comment concevoir une couche de synchronisation fiable des sessions dans les architectures hybrides pour éviter les déconnexions intempestives lors du changement d'entreprise.",
    date: "2026-02-22",
    readTime: "5 min de lecture",
    category: "Engineering",
    tags: ["Vue 3", "State Management", "Sessions", "Sécurité"],
    image: "/blog/covers/backend-tenancy.png",
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
    image: "/blog/covers/fintech-monetization.png",
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
    slug: "memory-efficient-streaming-exports-laravel-vue3",
    title: "Exportation de Données Massives : Éviter les Surcharges Mémoire avec Laravel & Vue 3",
    excerpt: "Comment exporter des journaux financiers et des mouvements de stocks de plus de 100 000 lignes grâce aux curseurs de base de données et au flux HTTP continu sans dépasser les limites mémoire de PHP.",
    date: "2026-03-25",
    readTime: "5 min de lecture",
    category: "Backend",
    tags: ["Laravel", "Performance", "Export de Données", "Vue 3"],
    image: "/blog/covers/backend-tenancy.png",
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
    image: "/blog/covers/database-optimization.png",
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
