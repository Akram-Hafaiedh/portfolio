// lib/data/fr/posts/architecture.ts
import { BlogPost } from '../../blogTypes';

export const architecturePosts: BlogPost[] = [
{
    slug: "multi-tenant-data-isolation-laravel",
    title: "Isolation Stricte des Données Multi-Locataires dans Laravel avec les Scopes Globaux",
    excerpt: "Comment concevoir une application SaaS multi-locataires sécurisée qui isole automatiquement les enregistrements en base de données pour éviter les fuites de données.",
    date: "2026-02-01",
    readTime: "4 min de lecture",
    category: "Backend",
    tags: ["Laravel", "SaaS", "Sécurité", "MySQL"],
    image: "/blog/covers/backend-tenancy.png",
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
    slug: "monetizing-api-rate-limits-multi-company-saas-pricing",
    title: "Monétiser les Quotas d'API et le Multi-Entreprises : Structurer une Grille Tarifaire SaaS & la Gestion des Add-Ons",
    excerpt: "Comment limiter les débits d'API développeurs, restreindre les emplacements d'entreprises et concevoir un portail de gestion d'extensions clair et dynamique.",
    date: "2026-03-10",
    readTime: "5 min de lecture",
    category: "Architecture",
    tags: ["Tarification SaaS", "Limitation API", "Laravel", "Monétisation"],
    image: "/blog/covers/fintech-monetization.png",
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
    slug: "realtime-websockets-laravel-echo-redis-stock-sync",
    title: "Architecture WebSockets en Temps Réel : Intégrer Laravel Echo et Redis pour la Synchronisation de Stocks",
    excerpt: "Comment éliminer les goulets d'étranglement des requêtes HTTP et diffuser en direct les mouvements de stocks et les statuts de commandes avec Laravel Echo, Redis et Soketi.",
    date: "2026-03-20",
    readTime: "6 min de lecture",
    category: "Architecture",
    tags: ["WebSockets", "Laravel Echo", "Redis", "Temps Réel"],
    image: "/blog/covers/realtime-websockets.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    series: {
      id: "realtime-performance",
      title: "Systèmes Temps Réel & Streaming à Haute Échelle",
      part: 1,
      totalParts: 3
    },
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
  }
];
