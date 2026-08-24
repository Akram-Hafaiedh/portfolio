// lib/data/fr/posts/security.ts
import { BlogPost } from '../../blogTypes';

export const securityPosts: BlogPost[] = [
{
    slug: "securing-saas-auth-oauth-password-recovery",
    title: "Sécurisation SaaS: Gérer l'OAuth (Google & Facebook) et Fiabiliser les Flux de Récupération",
    excerpt: "Guide pratique pour implémenter un pipeline d'authentification robuste avec l'intégration sécurisée de Socialite et l'envoi asynchrone des e-mails.",
    date: "2026-02-18",
    readTime: "4 min de lecture",
    category: "Security",
    tags: ["OAuth 2.0", "Laravel Socialite", "SMTP", "Sécurité"],
    image: "/blog/covers/security-rbac.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    series: {
      id: "saas-monetization",
      title: "Monétisation SaaS & Sécurité des Abonnements",
      part: 2,
      totalParts: 3
    },
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
    slug: "rbac-collaborator-permissions-saas-subscription-feature-gating",
    title: "Concevoir un Système RBAC Granulaire et Bloquer les Accès lors d'Abonnements Expirés",
    excerpt: "Comment implémenter des autorisations collaborateurs fines, verrouiller la création de documents à l'expiration du compte principal et monétiser le module en option payante.",
    date: "2026-03-06",
    readTime: "5 min de lecture",
    category: "Architecture",
    tags: ["Laravel", "RBAC", "Monétisation SaaS", "Sécurité"],
    image: "/blog/covers/security-rbac.png",
    author: {
      name: "Akram Hafaiedh",
      avatar: "/avatar.jpg",
      role: "Développeur Full Stack"
    },
    featured: false,
    series: {
      id: "saas-monetization",
      title: "Monétisation SaaS & Sécurité des Abonnements",
      part: 1,
      totalParts: 3
    },
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
  }
];
