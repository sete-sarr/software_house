# Sécurité

État au terme de l'audit de sécurité (Phase 9). À revoir avant toute mise en production réelle,
en particulier les limites connues listées en fin de document.

## Authentification & autorisation

- JWT (access token 15 min, refresh token 7 jours par défaut, secrets distincts pour chacun) via
  `@nestjs/passport` + `passport-jwt`.
- Mots de passe hashés avec `bcrypt` (jamais stockés ni journalisés en clair).
- `POST /auth/login` répond le même message générique (« Identifiants invalides ») pour un email
  inconnu et pour un mot de passe incorrect — empêche l'énumération de comptes. Vérifié par test
  automatisé (`backend/src/modules/auth/auth.service.spec.ts`).
- Toutes les routes d'administration sont protégées par `JwtAuthGuard`. Une régression sur un
  guard est couverte par un test e2e dédié (`backend/test/security.e2e-spec.ts`) qui vérifie un
  401 systématique sans token valide sur chaque endpoint de liste admin.
- Cookies de session côté frontend (`admin_access_token`, `admin_refresh_token`) : `httpOnly`,
  `sameSite: lax`, `secure` en production. Jamais accessibles en JavaScript côté navigateur.

## Entrées utilisateur

- Validation globale (`ValidationPipe`) : `whitelist` + `forbidNonWhitelisted` — toute propriété
  non déclarée dans le DTO fait échouer la requête (protection contre le mass assignment).
- `@MaxLength` sur tous les champs texte libres des formulaires publics (candidature, contact).
- Tous les champs utilisateur sont échappés (`escapeHtml`) avant interpolation dans le HTML des
  emails de notification — aucune injection HTML/XSS possible par ce vecteur.
- Prisma paramètre systématiquement les requêtes ; la seule requête SQL brute du projet est
  `SELECT 1` (health check), sans interpolation d'entrée utilisateur.

## Upload de fichiers

- CV et lettres de motivation : validation MIME **et** extension (`application/pdf` + `.pdf`),
  taille maximale 5 Mo par défaut (`UPLOAD_MAX_FILE_SIZE`), nom de fichier généré côté serveur
  (`randomUUID()`) — le nom fourni par le client n'est jamais utilisé pour écrire sur disque.
- Fichiers jamais servis en statique public. Téléchargement uniquement via un endpoint protégé
  (`GET /applications/:id/cv`) et un proxy Next.js qui attache le token dérivé du cookie
  httpOnly — un lien direct ne peut pas porter de header `Authorization`.
- Pas de validation du contenu binaire (magic bytes) au-delà de l'extension/MIME déclarés par le
  client. Risque atténué par deux couches indépendantes : le fichier est toujours re-servi avec
  `Content-Type: application/pdf` forcé (jamais celui déclaré à l'upload), et Helmet ajoute
  `X-Content-Type-Options: nosniff` — un navigateur ne peut donc pas réinterpréter le fichier
  comme HTML/JS exécutable même si son contenu réel diffère.

## En-têtes & transport

- Helmet appliqué globalement (CSP par défaut, `X-Content-Type-Options`, `frame-ancestors 'self'`
  contre le clickjacking).
- CORS restreint à une origine explicite (`CORS_ORIGIN`), jamais de wildcard, `credentials: true`.
- SMTP : `requireTLS: true` — refuse une connexion qui ne peut pas négocier STARTTLS (protection
  contre un downgrade en clair sur le port 587).

## Rate limiting

Throttling global (`100 req / 60 s` par défaut, `THROTTLE_TTL`/`THROTTLE_LIMIT`), renforcé par
route sur les points d'entrée publics sensibles :

| Route | Limite |
|---|---|
| `POST /auth/login` | 5 / 15 min |
| `POST /contact` | 5 / 10 min |
| `POST /applications` | 3 / 10 min |

## Erreurs

Le filtre d'exception global (`HttpExceptionFilter`) ne renvoie jamais de stack trace ni de
détail interne au client : les erreurs non gérées (500) sont journalisées côté serveur et
remplacées par un message générique avant d'atteindre la réponse HTTP.

## Secrets

- `.env` exclu du contrôle de version dans chaque projet (`backend/.gitignore`,
  `frontend/.gitignore`) et via `docker/.env` (voir `.gitignore` racine).
- `JWT_SECRET`/`JWT_REFRESH_SECRET` requis au démarrage (`env.validation.ts` fait échouer le boot
  si absents) — mais leur **longueur/force n'est pas vérifiée programmatiquement**. Générer des
  valeurs aléatoires fortes avant toute mise en production (voir ENVIRONMENT.md).

## Limites connues (non corrigées, à arbitrer)

- **Pas de révocation serveur des refresh tokens.** La déconnexion (`/api/admin/auth/logout` côté
  frontend) supprime uniquement les cookies ; un refresh token déjà émis reste valide jusqu'à son
  expiration naturelle (7 jours par défaut) même après déconnexion. Pertinent si le produit
  dépasse le cadre actuel d'un compte admin unique.
- **Pas de contrôle d'accès par rôle.** Le champ `Role` (`ADMIN`/`EDITOR`) existe sur `User` mais
  n'est vérifié nulle part : tout utilisateur authentifié a un accès identique à toutes les routes
  protégées.
- **`js-yaml` (dépendance transitive de `@nestjs/swagger`).** `npm audit` (backend) signale une
  vulnérabilité de déni de service haute sévérité. Le correctif (`npm audit fix --force`)
  rétrograderait `@nestjs/swagger` (breaking change). L'application ne parse jamais de YAML fourni
  par un utilisateur : l'exploitabilité réelle est nulle dans ce contexte. À surveiller pour un
  correctif non cassant plutôt qu'à forcer.
- Swagger (`/api/docs`) est désactivé en production (`NODE_ENV=production`) mais reste accessible
  sans authentification en développement/staging — ne jamais exposer un environnement de staging
  avec `NODE_ENV` différent de `production` sur une URL publique sans restriction d'accès
  supplémentaire.
