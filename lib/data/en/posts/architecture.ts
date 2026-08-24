// lib/data/en/posts/architecture.ts
import { BlogPost } from '../../blogTypes';

export const architecturePosts: BlogPost[] = [
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
    series: {
      id: "laravel-multi-tenancy",
      title: "Laravel Multi-Tenancy Masterclass",
      part: 1,
      totalParts: 3
    },
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
  }
];
