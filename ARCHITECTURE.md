# Architecture

## Vue d'ensemble

```
Navigateur
   │
   ▼
Next.js 16 (App Router)  ── Server Components (fetch direct API) ──┐
   │                                                                 │
   │── Route Handlers /api/admin/* (proxy cookie → Bearer token)    │
   │── Server Actions (mutations admin)                             │
   ▼                                                                 ▼
                    NestJS 11 API (/api/v1)
                              │
                        Prisma 7 (driver adapter @prisma/adapter-pg)
                              │
                        PostgreSQL 16
```

Le frontend ne parle **jamais directement** à PostgreSQL. Toute donnée transite par l'API NestJS,
qui est la seule à détenir la connexion base de données et les secrets JWT.

## Frontend (`/frontend`)

Next.js 16, App Router, Server Components par défaut.

```
app/
  (public)/          Pages publiques — layout avec Navbar/Footer, template.tsx (transition de page)
    page.tsx          Accueil
    services/          Liste + /[slug] (détail, generateMetadata dynamique)
    realisations/       Portfolio (état "à venir" tant qu'aucun projet n'est publié)
    a-propos/
    carrieres/          Liste + /[slug] (détail + formulaire de candidature)
    contact/            Formulaire de contact
  admin/
    login/              Page de connexion (hors garde du proxy)
    (dashboard)/         Back-office — protégé par proxy.ts, layout séparé sans Navbar/Footer
  api/admin/            Route Handlers : auth (login/logout), téléchargement CV/lettre proxifié
  sitemap.ts / robots.ts

components/
  ui/                 Primitives (Button, Card, Input, Badge, Select, ComingSoon…)
  layout/             Navbar, Footer
  sections/           Blocs de la page d'accueil et pages publiques (Hero, Expertise, Process…)
  forms/               Formulaires publics (contact, candidature) — React Hook Form + Zod
  admin/               Composants du back-office (DataTable, DeleteForm, formulaires d'édition)
  icons/               Icônes de marque non couvertes par lucide-react

lib/
  api/                 Fetchers publics (services, jobs) — Server Components, cache: "no-store"
  admin/               session.ts, api-client.ts (adminFetch / adminApiRequest), actions/*, constants.ts
  schemas/              Schémas Zod partagés frontend/validation formulaire
  seo.ts               buildMetadata() — helper central OG/canonical/Twitter
  motion.ts             Variants Framer Motion partagés (+ variantes reduced-motion)
  icon-map.ts           Résolution nom d'icône (string) → composant Lucide, pour respecter la
                        frontière Server/Client Component (voir ci-dessous)
```

### Décisions clés

- **Rendu dynamique plutôt que SSG** pour tout ce qui dépend de la base de données
  (`/services`, `/services/[slug]`, `/carrieres`, `/carrieres/[slug]`, tout `/admin/*`) :
  `fetch(..., { cache: "no-store" })`, pas de `generateStaticParams`. Évite une dépendance au
  backend au moment du build.
- **Résilience** : le Footer et les teasers de la page d'accueil utilisent des données statiques
  plutôt qu'un appel API — une panne du backend ne casse que les pages qui en dépendent
  réellement, jamais la coquille du site.
- **Frontière Server/Client** : un composant Server ne peut pas passer un composant ou une
  fonction en prop à un Client Component. Les icônes sont donc toujours passées comme `string`
  (nom) et résolues côté client via `resolveIcon()` (`lib/icon-map.ts`).
- **Auth admin (BFF)** : les Route Handlers (`/api/admin/auth/login|logout`) échangent les
  identifiants contre des tokens NestJS puis posent des cookies `httpOnly`. Les Server Components
  lisent le cookie en lecture seule (`adminFetch`) ; les Server Actions peuvent le muter et
  retentent automatiquement une fois après un 401 (`adminApiRequest`, refresh silencieux).
  `proxy.ts` protège `/admin/:path*` (sauf `/admin/login`) en vérifiant la simple présence du
  cookie — la validité réelle du token est toujours revérifiée côté NestJS (`JwtAuthGuard`), qui
  reste la seule autorité de sécurité.
- **Téléchargement de fichiers admin** : les CV/lettres de motivation ne sont jamais servis en
  statique public. `GET /api/admin/applications/:id/cv` proxifie vers le backend protégé en
  attachant le token dérivé du cookie (un lien direct ne peut pas porter un header
  `Authorization`).

## Backend (`/backend`)

NestJS 11, architecture modulaire.

```
src/
  main.ts              Bootstrap : Helmet, CORS, ValidationPipe global, filtre d'exception,
                        intercepteur de réponse, Swagger (dev uniquement)
  app.module.ts         Assemble tous les modules + ThrottlerGuard global
  config/               configuration.ts (lecture env) + env.validation.ts (validation au boot)
  database/              PrismaService (PrismaClient + adaptateur pg)
  common/
    filters/             HttpExceptionFilter — ne fuite jamais de stack trace
    interceptors/         TransformInterceptor — enveloppe {success,data,timestamp}, sauf StreamableFile
    utils/                escapeHtml (échappement avant interpolation dans les emails)
  health/                GET /health (Terminus, vérifie la connexion DB)
  mail/                  MailService (nodemailer, no-op silencieux si SMTP non configuré)
  modules/
    auth/                 login, refresh, JwtStrategy/JwtRefreshStrategy, guards
    services/              CRUD services (public: liste + détail par slug, filtré PUBLISHED)
    projects/               idem, pattern "admin/all" pour la vue non filtrée
    team/                   idem
    testimonials/            idem
    jobs/                   idem + logique publishedAt (posé une seule fois, à la première publication)
    applications/             POST public (upload CV) + CRUD admin + téléchargement fichier
    contact/                  POST public + CRUD admin
```

### Décisions clés

- **Prisma 7** : plus de `datasource.url` dans `schema.prisma` — la connexion est configurée dans
  `prisma.config.ts` (`defineConfig`) et `PrismaService` construit le client avec l'adaptateur
  `@prisma/adapter-pg`, pas de résolution d'URL implicite.
- **Réponse API cohérente** : `TransformInterceptor` enveloppe toute réponse dans
  `{ success, data, timestamp }`, sauf les `StreamableFile` (téléchargements binaires) qui
  passent inchangés.
- **Séparation public / admin** : chaque module exposant du contenu (services, projets, équipe,
  témoignages, offres) a un endpoint public filtré par statut et un endpoint `admin/all` (ou
  équivalent) protégé par `JwtAuthGuard`, sans filtre.
- **Upload de fichiers** : validation MIME + extension + taille, nom de fichier généré côté
  serveur (`randomUUID()`), jamais le nom fourni par le client. Le champ base de données ne
  contient jamais d'entrée utilisateur brute → aucun risque de traversée de chemin à la lecture.

## Modèle de données

Voir `backend/prisma/schema.prisma`. Entités principales : `User` (rôle ADMIN/EDITOR — non encore
utilisé pour du contrôle d'accès différencié), `Service`, `Technology`, `Project`, `TeamMember`,
`JobOffer`, `Application`, `ContactRequest`, `Testimonial`, `SiteSetting`.
