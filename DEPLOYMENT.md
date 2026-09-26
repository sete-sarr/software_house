# Déploiement

## Option A — Docker Compose

```bash
cd docker
cp .env.example .env
# éditer .env : JWT_SECRET, JWT_REFRESH_SECRET (openssl rand -base64 48),
# POSTGRES_PASSWORD, CORS_ORIGIN, NEXT_PUBLIC_API_URL selon l'environnement cible
docker compose up --build
```

Ce que `docker-compose.yml` démarre :

- **postgres** (`postgres:16-alpine`) — volume nommé `postgres_data`, healthcheck `pg_isready`.
- **backend** — build multi-stage (`docker/Dockerfile.backend`) : installe les dépendances,
  génère le client Prisma, compile, puis au démarrage du conteneur exécute
  `npx prisma migrate deploy` (applique les migrations en attente) **avant** de lancer
  `node dist/main.js` (voir `docker/backend-entrypoint.sh`). Fichiers uploadés persistés dans le
  volume nommé `uploads_data` (`/app/uploads`).
- **frontend** — build multi-stage (`docker/Dockerfile.frontend`), utilise la sortie
  `output: "standalone"` de Next.js.

Le contexte de build (`context: ..`) est la racine du dépôt ; `.dockerignore` exclut
`node_modules`, `.next`, `.env`, `uploads` et `.git` de chaque image.

### ⚠️ Limite de vérification connue

Cette configuration a été **validée statiquement** (`docker compose config` — résolution des
variables, volumes et dépendances correcte) et revue ligne à ligne, mais **n'a pas pu être testée
avec un `docker compose up --build` réel** : le daemon Docker n'était pas joignable dans
l'environnement où cette configuration a été écrite (Docker Desktop lancé mais moteur
injoignable, y compris en tentant un accès direct via la distribution WSL2 `docker-desktop`).
**Avant tout déploiement réel, exécuter `docker compose up --build` une première fois dans un
environnement où le daemon fonctionne, et vérifier :**

1. les trois services démarrent (`docker compose ps`) ;
2. les logs du backend affichent `Applying database migrations...` suivi d'un succès Prisma, puis
   le démarrage NestJS habituel ;
3. `curl http://localhost:3001/api/v1/health` répond `200` ;
4. `curl http://localhost:3000` répond `200` ;
5. un redémarrage du conteneur backend (`docker compose restart backend`) ne fait pas disparaître
   un fichier précédemment uploadé (test du volume `uploads_data`).

### Premier compte administrateur

Aucun compte n'est créé automatiquement par les migrations. Après le premier démarrage, exécuter
le seed depuis l'intérieur du conteneur (ou en pointant `DATABASE_URL` vers l'instance distante
depuis une machine avec les dépendances installées) :

```bash
docker compose exec backend npx prisma db seed
```

Le mot de passe généré est affiché **une seule fois** dans la sortie de la commande — le noter
immédiatement.

## Option B — Déploiement manuel (sans Docker)

Utile pour une plateforme PaaS (Render, Railway, VPS classique) qui gère elle-même le
conteneurisation, ou pour vérifier le build de production avant de l'encapsuler.

### Backend

```bash
cd backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
node dist/main.js
```

Variables d'environnement requises : voir [ENVIRONMENT.md](./ENVIRONMENT.md). `NODE_ENV=production`
doit être positionné pour désactiver Swagger.

### Frontend

```bash
cd frontend
npm ci
npm run build
npm run start   # ou servir .next/standalone si Docker/plateforme le préfère
```

`NEXT_PUBLIC_API_URL` et `NEXT_PUBLIC_SITE_URL` doivent pointer vers les URLs publiques réelles
avant le build (elles sont injectées au build, pas seulement au runtime, car exposées au
navigateur).

## Option C — Render (Blueprint)

Le fichier [`render.yaml`](render.yaml) décrit les deux services (runtime Node natif, plan free, région Frankfurt) :

| Service | Dossier | Build | Démarrage |
|---|---|---|---|
| `software-house-api` | `backend/` | `npm ci --include=dev && npx prisma generate && npm run build` | `npx prisma migrate deploy && node dist/main` |
| `software-house-web` | `frontend/` | `npm ci --include=dev && npm run build` + copie des assets standalone | `node .next/standalone/server.js` |

1. Pousser le dépôt sur GitHub, puis dans Render : **New → Blueprint** → choisir le dépôt.
2. Renseigner les variables `sync: false` demandées (voir [ENVIRONMENT.md](ENVIRONMENT.md)). Les secrets JWT sont générés par Render.
3. `NEXT_PUBLIC_API_URL` est **figée au build** : après toute modification, relancer un déploiement du frontend.
4. Le build du frontend pré-rend des pages en appelant l'API : l'API doit être en ligne. Si le premier build du frontend échoue parce que l'API n'était pas encore prête, relancer *Manual Deploy* une fois l'API en ligne.

Limites du plan free :

- les services s'endorment après 15 min d'inactivité (premier chargement ≈ 1 min) ;
- pas de commande pre-deploy : les migrations tournent au démarrage (`migrate deploy` est idempotent) ;
- **disque éphémère** : les fichiers uploadés (CV, lettres de motivation) sont perdus à chaque redéploiement ou redémarrage. Avant d'ouvrir les candidatures en production : disque persistant Render (plan payant, `UPLOAD_DIR` pointant vers le disque) ou stockage objet (ex. Supabase Storage).

## Base de données — migrations en production

Toujours `prisma migrate deploy` (jamais `migrate dev`, qui peut générer une nouvelle migration à
la volée et n'est pas conçu pour un environnement partagé). C'est ce que fait automatiquement
`docker/backend-entrypoint.sh` ; en déploiement manuel, l'exécuter explicitement avant de démarrer
l'application.

## Checklist avant mise en production

- [ ] `JWT_SECRET` / `JWT_REFRESH_SECRET` régénérés (jamais les valeurs de développement).
- [ ] `NODE_ENV=production` sur le backend.
- [ ] `CORS_ORIGIN` pointe exactement vers le domaine du frontend (pas de wildcard).
- [ ] `DATABASE_URL` pointe vers une instance PostgreSQL avec sauvegardes automatiques.
- [ ] SMTP configuré (sinon les emails de notification sont silencieusement journalisés, jamais
      envoyés — acceptable en test, pas en production).
- [ ] Volume de persistance pour `uploads/` (Docker : `uploads_data` ; hors Docker : un disque
      persistant, pas le système de fichiers éphémère d'un conteneur PaaS sans volume monté).
- [ ] HTTPS en amont (reverse proxy / load balancer de la plateforme) — l'application elle-même
      ne termine pas TLS.
- [ ] `docker compose up --build` vérifié de bout en bout au moins une fois (voir limite ci-dessus).
- [ ] Compte administrateur créé via `prisma db seed`, mot de passe généré noté en lieu sûr.
