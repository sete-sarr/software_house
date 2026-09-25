# Software House — Plateforme institutionnelle

Monorepo (deux projets indépendants, chacun avec son propre dépôt git) pour le site et l'API d'une
agence technologique : développement web, mobile, SaaS, IA, automatisation.

## Structure

```
/frontend   Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion
/backend    NestJS 11 + TypeScript + Prisma 7 + PostgreSQL
/docker     docker-compose.yml + Dockerfiles (backend, frontend)
```

Documentation complète : [ARCHITECTURE.md](./ARCHITECTURE.md) ·
[API.md](./API.md) · [SECURITY.md](./SECURITY.md) ·
[ENVIRONMENT.md](./ENVIRONMENT.md) · [DEPLOYMENT.md](./DEPLOYMENT.md)

## Prérequis

- Node.js 22+
- PostgreSQL 16 accessible (local ou conteneur)
- Docker + Docker Compose (optionnel, pour un déploiement conteneurisé)

## Démarrage — Backend

```bash
cd backend
cp .env.example .env   # renseigner DATABASE_URL, JWT_SECRET, etc. — voir ENVIRONMENT.md
npm install
npx prisma migrate dev
npm run start:dev
```

- API : `http://localhost:3001/api/v1`
- Swagger (dev uniquement) : `http://localhost:3001/api/docs`
- Health check : `http://localhost:3001/api/v1/health`

## Démarrage — Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

- Site : `http://localhost:3000`

## Tests

```bash
cd backend && npm test && npm run test:e2e   # unitaires + e2e (nécessite Postgres)
cd frontend && npm test                       # schémas de validation, logique SEO
```

## Déploiement conteneurisé

```bash
cd docker
cp .env.example .env   # renseigner JWT_SECRET, JWT_REFRESH_SECRET, etc.
docker compose up --build
```

Le `docker-compose.yml` démarre PostgreSQL, le backend (migrations appliquées automatiquement au
démarrage) et le frontend. Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour le détail complet, y compris
les limites connues de cette configuration.

## État du projet

Frontend et backend complets pour les 12 phases du cahier des charges (`CLAUDE.md`) : pages
publiques, API REST documentée, back-office admin, SEO, sécurité auditée, tests automatisés,
animations, conteneurisation. Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour le détail des choix.
