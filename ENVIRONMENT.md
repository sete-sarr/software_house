# Variables d'environnement

Chaque projet a son propre `.env.example` à copier (`backend/.env.example` → `backend/.env`,
`frontend/.env.example` → `frontend/.env.local`). Le déploiement Docker a le sien
(`docker/.env.example` → `docker/.env`). **Ne jamais commiter un fichier `.env` réel.**

## Backend (`backend/.env`)

| Variable | Obligatoire | Défaut | Description |
|---|---|---|---|
| `NODE_ENV` | oui | — | `development` \| `production` \| `test`. Désactive Swagger si `production`. |
| `PORT` | non | `3001` | Port d'écoute HTTP. |
| `API_PREFIX` | non | `api/v1` | Préfixe de toutes les routes. |
| `TRUST_PROXY` | non | `0` | Nombre de reverse proxies devant l'API (`1` sur Render). Nécessaire pour que le rate limiting voie l'IP réelle du visiteur. Ne pas activer sans proxy : l'en-tête `X-Forwarded-For` serait falsifiable. |
| `DATABASE_URL` | oui | — | Chaîne de connexion PostgreSQL (`postgresql://user:pass@host:port/db?schema=public`). |
| `DIRECT_URL` | non | `DATABASE_URL` | Connexion utilisée uniquement par Prisma CLI (`migrate`, `studio`). Requise avec un pooler en mode transaction comme Supabase :6543 — pointer vers le mode session (:5432). |
| `JWT_SECRET` | oui | — | Secret de signature des access tokens. Aléatoire et fort (ex. `openssl rand -base64 48`). |
| `JWT_EXPIRES_IN` | non | `15m` | Durée de vie de l'access token. |
| `JWT_REFRESH_SECRET` | oui | — | Secret de signature des refresh tokens. **Différent** de `JWT_SECRET`. |
| `JWT_REFRESH_EXPIRES_IN` | non | `7d` | Durée de vie du refresh token. |
| `CORS_ORIGIN` | non | `http://localhost:3000` | Origine autorisée à appeler l'API. |
| `THROTTLE_TTL` | non | `60000` | Fenêtre de rate limiting global (ms). |
| `THROTTLE_LIMIT` | non | `100` | Requêtes max par fenêtre et par IP. |
| `SMTP_HOST` | non | — | Si absent, les emails sont journalisés au lieu d'être envoyés (aucune erreur). |
| `SMTP_PORT` | non | `587` | |
| `SMTP_USER` / `SMTP_PASSWORD` | non | — | Identifiants SMTP. |
| `EMAIL_FROM` | non | `no-reply@example.com` | Expéditeur des emails sortants. |
| `ADMIN_EMAIL` | non | `admin@example.com` | Destinataire des notifications (nouvelle candidature/contact). |
| `UPLOAD_DIR` | non | `./uploads` | Répertoire de stockage des fichiers uploadés (CV, lettres). |
| `UPLOAD_MAX_FILE_SIZE` | non | `5242880` | Taille max d'un fichier uploadé, en octets (5 Mo). |

`NODE_ENV`, `DATABASE_URL`, `JWT_SECRET` et `JWT_REFRESH_SECRET` sont vérifiés au démarrage
(`env.validation.ts`) — l'application refuse de démarrer s'ils sont absents ou invalides.

### Base de données Supabase

- **`DATABASE_URL`** → pooler en mode transaction (port `6543`), adapté aux requêtes courtes de l'API.
- **`DIRECT_URL`** → pooler en mode session (port `5432`), requis par `prisma migrate`.
- Le mot de passe doit être encodé dans l'URL (`encodeURIComponent`) s'il contient `@ : / # ? %`.
- `uselibpqcompat=true&sslmode=require` chiffre la connexion sans vérifier le certificat (Supabase utilise sa propre autorité racine). En production, télécharger le certificat CA depuis *Project Settings → Database → SSL Configuration* et utiliser `sslmode=verify-full&sslrootcert=/chemin/prod-ca-2021.crt`.

## Frontend (`frontend/.env.local`)

| Variable | Obligatoire | Défaut | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | oui | — | URL de base de l'API NestJS, ex. `http://localhost:3001/api/v1`. Exposée au navigateur. |
| `NEXT_PUBLIC_SITE_URL` | oui | `http://localhost:3000` | URL publique du site — sert de base aux URLs canoniques, Open Graph et au sitemap. |

Aucun secret côté frontend : toute variable préfixée `NEXT_PUBLIC_` est publique par construction
(incluse dans le bundle JavaScript envoyé au navigateur). Les cookies de session admin
(`admin_access_token`, `admin_refresh_token`) sont gérés côté serveur uniquement (Route Handlers /
Server Actions), jamais exposés en variable d'environnement `NEXT_PUBLIC_*`.

## Docker (`docker/.env`)

Variables consommées par `docker-compose.yml` — voir `docker/.env.example`. Reprend
`POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DB` (créent le conteneur PostgreSQL),
`JWT_SECRET`/`JWT_REFRESH_SECRET` (transmis au conteneur backend), `CORS_ORIGIN` et
`NEXT_PUBLIC_API_URL`. Détail dans [DEPLOYMENT.md](./DEPLOYMENT.md).
