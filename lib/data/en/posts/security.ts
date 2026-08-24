// lib/data/en/posts/security.ts
import { BlogPost } from '../../blogTypes';

export const securityPosts: BlogPost[] = [
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
  }
];
