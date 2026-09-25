# API

Base URL : `http://localhost:3001/api/v1` (préfixe configurable via `API_PREFIX`).

Documentation interactive (Swagger/OpenAPI, **disponible uniquement hors production**) :
`http://localhost:3001/api/docs`. Ce document donne la vue d'ensemble ; Swagger reste la source de
vérité pour le détail exact des DTO (contraintes de validation, champs optionnels).

## Format de réponse

Toutes les réponses JSON suivent la même enveloppe :

```json
{ "success": true, "data": { }, "timestamp": "2026-01-01T00:00:00.000Z" }
```

Les erreurs :

```json
{ "success": false, "statusCode": 400, "message": "…", "path": "/api/v1/…", "timestamp": "…" }
```

Exception : les téléchargements de fichiers (`GET /applications/:id/cv` et `.../cover-letter`)
renvoient directement le flux binaire (`Content-Type: application/pdf`), non enveloppé.

## Authentification

`Authorization: Bearer <accessToken>` sur les routes marquées 🔒. Le token s'obtient via
`POST /auth/login` et expire après `JWT_EXPIRES_IN` (15 min par défaut) ; `POST /auth/refresh`
en émet un nouveau à partir du refresh token (7 jours par défaut). Il n'existe pour l'instant
qu'un seul niveau d'accès : tout utilisateur authentifié a les mêmes droits sur toutes les routes
protégées (voir SECURITY.md).

| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/login` | `{ email, password }` → `{ accessToken, refreshToken }`. Limité à 5 tentatives / 15 min par IP. |
| POST | `/auth/refresh` | `{ refreshToken }` → nouveaux tokens. |

## Contenu public

### Services (lecture seule — pas d'administration via API pour l'instant)

| Méthode | Route | Description |
|---|---|---|
| GET | `/services` | Liste des services publiés. |
| GET | `/services/:slug` | Détail d'un service. 404 si absent ou non publié. |

### Projets / réalisations

| Méthode | Route | Description |
|---|---|---|
| GET | `/projects` | Liste des projets publiés. |
| GET | `/projects/:slug` | Détail d'un projet publié. |
| GET 🔒 | `/projects/admin/all` | Tous les projets, tout statut. |
| GET 🔒 | `/projects/id/:id` | Détail par id (édition admin). |
| POST 🔒 | `/projects` | Création. |
| PATCH 🔒 | `/projects/:id` | Mise à jour. |
| DELETE 🔒 | `/projects/:id` | Suppression. |

### Équipe

| Méthode | Route | Description |
|---|---|---|
| GET | `/team` | Membres actifs. |
| GET 🔒 | `/team/admin/all` | Tous les membres. |
| GET 🔒 | `/team/:id` | Détail. |
| POST 🔒 | `/team` | Création. |
| PATCH 🔒 | `/team/:id` | Mise à jour. |
| DELETE 🔒 | `/team/:id` | Suppression. |

### Témoignages

| Méthode | Route | Description |
|---|---|---|
| GET | `/testimonials` | Témoignages publiés. |
| GET 🔒 | `/testimonials/admin/all` | Tous les témoignages. |
| GET 🔒 | `/testimonials/:id` | Détail. |
| POST 🔒 | `/testimonials` | Création. |
| PATCH 🔒 | `/testimonials/:id` | Mise à jour. |
| DELETE 🔒 | `/testimonials/:id` | Suppression. |

### Offres d'emploi

| Méthode | Route | Description |
|---|---|---|
| GET | `/jobs` | Offres publiées. |
| GET | `/jobs/:slug` | Détail d'une offre publiée. |
| GET 🔒 | `/jobs/admin/all` | Toutes les offres. |
| GET 🔒 | `/jobs/id/:id` | Détail par id (édition admin). |
| POST 🔒 | `/jobs` | Création. `publishedAt` posé automatiquement à la première publication, jamais réécrit ensuite. |
| PATCH 🔒 | `/jobs/:id` | Mise à jour. |
| DELETE 🔒 | `/jobs/:id` | Suppression. |

## Candidatures

| Méthode | Route | Description |
|---|---|---|
| POST | `/applications` | `multipart/form-data` : `cv` (PDF, 5 Mo max, obligatoire), `coverLetter` (PDF, optionnel), + champs texte. Limité à 3 / 10 min par IP. |
| GET 🔒 | `/applications` | Liste, triée par date, avec le titre de l'offre liée. |
| GET 🔒 | `/applications/:id` | Détail. |
| PATCH 🔒 | `/applications/:id/status` | `{ status: NEW \| REVIEWED \| REJECTED \| ACCEPTED }`. |
| DELETE 🔒 | `/applications/:id` | Suppression. |
| GET 🔒 | `/applications/:id/cv` | Flux binaire du CV. |
| GET 🔒 | `/applications/:id/cover-letter` | Flux binaire de la lettre de motivation. |

## Demandes de contact

| Méthode | Route | Description |
|---|---|---|
| POST | `/contact` | Formulaire de contact. Limité à 5 / 10 min par IP. |
| GET 🔒 | `/contact` | Liste, triée par date. |
| GET 🔒 | `/contact/:id` | Détail. |
| PATCH 🔒 | `/contact/:id/status` | `{ status: NEW \| CONTACTED \| CLOSED }`. |
| DELETE 🔒 | `/contact/:id` | Suppression. |

## Divers

| Méthode | Route | Description |
|---|---|---|
| GET | `/health` | État du service + connexion base de données (Terminus). |

## Erreurs courantes

- `400` — validation échouée (`class-validator`) ou champ non attendu dans le corps de la requête
  (`whitelist`/`forbidNonWhitelisted` actifs globalement : toute propriété absente du DTO fait
  échouer la requête entière).
- `401` — token absent, invalide ou expiré sur une route protégée.
- `404` — ressource introuvable, ou publique mais non publiée.
- `429` — limite de requêtes dépassée (voir SECURITY.md pour le détail par route).
