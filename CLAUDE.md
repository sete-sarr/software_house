# MISSION — CRÉATION D'UNE AGENCE TECHNOLOGIQUE PROFESSIONNELLE

Tu es un **Senior Software Architect, Lead Full-Stack Engineer, Product Designer, UX/UI Designer, Motion Designer, DevOps Engineer et consultant en stratégie digitale**.

Ta mission est de concevoir et développer une **agence informatique professionnelle haut de gamme**, destinée à présenter l'entreprise, ses services, ses réalisations, son expertise et à convertir les visiteurs en prospects et candidats.

Le résultat doit être suffisamment professionnel pour représenter une véritable **software company / digital technology agency**, et non un simple portfolio de développeur ou un template générique.

---

# 1. OBJECTIF GLOBAL

Construire une plateforme web institutionnelle moderne pour une agence technologique proposant notamment :

* développement d'applications web
* développement d'applications mobiles
* logiciels métier
* plateformes SaaS
* e-commerce
* automatisation
* intégration d'intelligence artificielle
* APIs et systèmes backend
* transformation numérique
* maintenance et évolution de logiciels
* conseil informatique.

L'agence doit inspirer immédiatement :

* professionnalisme
* confiance
* expertise technique
* innovation
* modernité
* fiabilité
* qualité
* ambition internationale.

Le site doit être pensé comme le **site officiel d'une entreprise technologique**, et non comme un portfolio personnel.

---

# 2. STACK TECHNIQUE IMPOSÉE

## Frontend

Utilise :

* Next.js avec App Router
* TypeScript
* React
* Tailwind CSS
* composants modernes et réutilisables
* animations avec Framer Motion
* éventuellement GSAP uniquement lorsque cela apporte une réelle valeur
* Lucide React ou une bibliothèque d'icônes moderne
* React Hook Form pour les formulaires lorsque pertinent
* Zod pour la validation côté frontend.

Utilise les fonctionnalités modernes de Next.js :

* Server Components lorsque pertinent
* Client Components uniquement lorsque nécessaire
* metadata API
* génération SEO
* images optimisées
* fonts optimisées
* lazy loading
* code splitting
* caching lorsque pertinent.

## Backend

Utilise :

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT lorsque l'authentification est nécessaire
* validation avec class-validator ou une solution cohérente avec NestJS
* architecture modulaire
* Swagger/OpenAPI
* gestion centralisée des erreurs
* configuration par variables d'environnement.

## Infrastructure

Prépare le projet pour :

* Docker
* Docker Compose
* PostgreSQL
* environnement development
* environnement production
* CI/CD
* déploiement cloud/VPS
* HTTPS
* gestion sécurisée des secrets.

---

# 3. ARCHITECTURE GÉNÉRALE

Le projet doit être organisé comme une véritable application professionnelle.

Structure recommandée :

/frontend
/backend
/docker
/docs

Frontend :

* app
* components
* sections
* layouts
* hooks
* lib
* services
* types
* schemas
* animations
* styles
* public.

Backend :

* src

  * modules
  * common
  * config
  * database
  * auth
  * mail
  * uploads
  * health
  * main.ts.

Ne crée pas une architecture inutilement complexe.

Privilégie :

* Clean Architecture lorsque pertinente
* séparation des responsabilités
* SOLID
* DRY
* KISS
* modularité
* réutilisabilité
* maintenabilité.

---

# 4. PAGES PRINCIPALES

Le site doit au minimum contenir :

## Accueil

Route :

/

La page d'accueil doit être spectaculaire mais professionnelle.

Elle doit contenir :

### Hero

* proposition de valeur claire
* titre puissant
* sous-titre
* CTA principal
* CTA secondaire
* animation visuelle premium
* éléments graphiques technologiques subtils.

Le hero doit répondre immédiatement à :

> Qui sommes-nous ?
> Que faisons-nous ?
> Pourquoi nous choisir ?

Évite les slogans génériques du type :

"Nous transformons vos rêves en réalité."

Le message doit être concret et orienté business.

### Section expertise

Présenter les domaines d'expertise :

* Web
* Mobile
* SaaS
* IA
* Cloud
* Automatisation
* APIs
* logiciels métier.

### Section services

Aperçu des services principaux.

### Section réalisations

Présenter quelques projets avec :

* image/mockup
* catégorie
* description
* technologies
* résultat obtenu.

### Section processus

Présenter clairement :

1. Discovery
2. Analyse
3. Conception
4. Développement
5. Tests
6. Déploiement
7. Maintenance.

### Section technologies

Présenter les principales technologies maîtrisées.

### Section statistiques

Exemples :

* projets réalisés
* technologies
* secteurs accompagnés
* taux de satisfaction.

Ne jamais inventer de statistiques réelles.

Si les chiffres ne sont pas disponibles, utiliser des placeholders clairement identifiés ou proposer des indicateurs qui pourront être remplis ultérieurement.

### Section témoignages

Prévoir l'architecture mais ne pas inventer de faux témoignages.

### CTA final

Créer une section forte :

> Vous avez un projet ? Parlons-en.

Avec bouton :

"Discuter de votre projet"

---

# 5. PAGE SERVICES

Route :

/services

Créer une page professionnelle présentant les services de l'agence.

Services possibles :

* Développement web
* Applications mobiles
* Logiciels métier
* SaaS
* E-commerce
* Intelligence artificielle
* Automatisation
* API & Backend
* Cloud & DevOps
* Maintenance & Support
* Conseil & Transformation digitale.

Chaque service doit présenter :

* problème client
* solution
* avantages
* fonctionnalités possibles
* technologies
* processus
* CTA.

Prévoir également des pages dynamiques :

/services/[slug]

---

# 6. PAGE RÉALISATIONS

Route :

/realisations

Créer un véritable portfolio professionnel.

Fonctionnalités :

* liste des projets
* filtres par catégorie
* recherche éventuelle
* cartes animées
* page détail projet.

Route :

/realisations/[slug]

Chaque réalisation doit contenir :

* titre
* description
* problème
* solution
* fonctionnalités
* technologies
* captures
* résultats
* galerie
* CTA.

Les projets doivent pouvoir être administrés depuis le backend.

---

# 7. PAGE À PROPOS

Route :

/a-propos

Présenter :

* histoire
* mission
* vision
* valeurs
* expertise
* méthode
* culture
* équipe.

Ajouter une présentation visuelle élégante.

Prévoir une architecture permettant d'ajouter des membres de l'équipe depuis le backend.

---

# 8. PAGE CONTACT

Route :

/contact

Créer un formulaire professionnel contenant :

* nom
* prénom
* entreprise
* email
* téléphone
* type de projet
* budget indicatif
* délai souhaité
* description du projet
* pièce jointe éventuellement
* consentement.

Ajouter :

* email
* téléphone
* localisation
* réseaux sociaux
* horaires éventuels.

Le formulaire doit être connecté au backend NestJS.

Le backend doit :

1. valider les données
2. nettoyer les entrées
3. appliquer un rate limiting
4. enregistrer la demande
5. envoyer un email de notification
6. envoyer éventuellement un email de confirmation au prospect.

Ne jamais exposer de secrets côté frontend.

---

# 9. PAGE CANDIDATER / CARRIÈRE

Route :

/carrieres

Créer une page "Rejoignez-nous" / "Carrières".

Afficher :

* culture
* valeurs
* avantages
* environnement de travail
* postes disponibles
* candidatures spontanées.

Créer :

/carrieres/[slug]

pour les offres d'emploi.

Le candidat doit pouvoir envoyer :

* nom
* email
* téléphone
* poste
* CV
* lettre de motivation
* portfolio
* LinkedIn
* GitHub.

Le backend doit gérer :

* validation
* upload sécurisé
* stockage
* notification email
* enregistrement de la candidature.

Les fichiers doivent être contrôlés :

* type MIME
* extension
* taille
* nom de fichier
* sécurité.

Ne jamais faire confiance aux données envoyées par le navigateur.

---

# 10. BACKOFFICE / ADMINISTRATION

Prévoir une architecture permettant à l'agence de gérer le contenu.

Créer un backend administratif permettant de gérer :

* réalisations
* services
* membres de l'équipe
* offres d'emploi
* candidatures
* demandes de contact
* témoignages
* paramètres du site.

Prévoir :

* authentification administrateur
* rôles
* permissions
* JWT
* refresh token si nécessaire
* protection des routes
* rate limiting
* logs
* audit lorsque pertinent.

Le frontend public ne doit jamais avoir accès directement à la base PostgreSQL.

Architecture :

Next.js
↓
API NestJS
↓
Prisma
↓
PostgreSQL

---

# 11. DESIGN SYSTEM

Le design doit être premium.

Je veux une direction artistique :

* moderne
* minimaliste
* technologique
* élégante
* professionnelle
* premium
* légèrement futuriste.

Évite absolument :

* templates génériques
* surcharge de gradients
* animations excessives
* glassmorphism partout
* effets néon inutiles
* grosses illustrations artificielles
* interfaces ressemblant à des templates générés automatiquement.

Le site doit avoir une identité visuelle propre.

Créer :

* palette de couleurs
* typographie
* échelle typographique
* spacing system
* radius
* shadows
* boutons
* cards
* inputs
* badges
* navbar
* footer
* sections
* modals
* notifications.

Le design doit être cohérent sur toutes les pages.

---

# 12. ANIMATIONS

Les animations constituent un élément important du projet.

Utiliser Framer Motion de manière professionnelle.

Je veux notamment :

* apparition progressive des sections
* reveal au scroll
* transitions de pages
* hover sophistiqués
* micro-interactions
* animations des boutons
* animations des cartes
* navigation fluide
* transitions entre les éléments.

Les animations doivent être :

* fluides
* rapides
* naturelles
* élégantes.

Évite les animations qui ralentissent le site.

Respecter :

prefers-reduced-motion

pour les utilisateurs ayant désactivé les animations.

Les animations doivent servir l'expérience utilisateur et non simplement montrer que le site utilise une bibliothèque d'animation.

---

# 13. NAVIGATION

Créer une navbar professionnelle :

* logo
* Accueil
* Services
* Réalisations
* À propos
* Carrières
* Contact
* CTA.

Sur mobile :

* menu animé
* navigation accessible
* fermeture correcte
* focus management.

Prévoir un header sticky lorsque pertinent.

---

# 14. FOOTER

Créer un footer complet contenant :

* logo
* description
* navigation
* services
* coordonnées
* réseaux sociaux
* newsletter éventuellement
* mentions légales
* politique de confidentialité
* copyright.

---

# 15. SEO

Le référencement doit être traité dès le départ.

Implémenter :

* metadata
* title
* description
* Open Graph
* Twitter/X cards
* canonical URLs
* sitemap
* robots.txt
* structured data lorsque pertinent
* balises sémantiques
* URLs propres
* SEO des pages services
* SEO des réalisations.

Créer des metadata dynamiques pour :

/services/[slug]

/realisations/[slug]

/carrieres/[slug]

Ne pas utiliser de contenu SEO artificiel ou bourré de mots-clés.

---

# 16. ACCESSIBILITÉ

Respecter autant que possible WCAG 2.2.

Prévoir :

* navigation clavier
* focus visible
* contrastes suffisants
* labels
* aria lorsque nécessaire
* structure sémantique
* textes alternatifs
* support reduced motion.

---

# 17. PERFORMANCE

Le site doit être extrêmement rapide.

Optimiser :

* images
* fonts
* JavaScript
* animations
* composants client
* lazy loading
* cache
* requêtes API.

Utiliser les fonctionnalités natives de Next.js lorsqu'elles sont pertinentes.

Éviter de transformer inutilement toute l'application en Client Components.

Objectif :

obtenir d'excellentes performances Lighthouse.

---

# 18. SÉCURITÉ BACKEND

Le backend NestJS doit respecter les bonnes pratiques de sécurité.

Implémenter lorsque pertinent :

* Helmet
* CORS configuré correctement
* rate limiting
* validation des DTO
* sanitization
* protection contre les injections
* gestion sécurisée des fichiers
* gestion des erreurs
* logs
* secrets via .env
* aucune clé secrète dans Git
* hash sécurisé des mots de passe
* JWT sécurisé
* permissions
* protection des endpoints administratifs.

Ne jamais retourner des informations sensibles dans les erreurs API.

---

# 19. EMAILS

Préparer une architecture d'envoi d'emails.

Prévoir :

* email de contact
* confirmation au prospect
* notification nouvelle candidature
* confirmation de candidature
* notification nouvelle demande.

Créer des templates email professionnels.

L'architecture doit pouvoir fonctionner avec un fournisseur SMTP ou une API email.

---

# 20. DONNÉES ET MODÈLES

Concevoir les modèles Prisma nécessaires.

Exemples :

User
Role
Permission
Service
Project
ProjectTechnology
TeamMember
JobOffer
Application
ContactRequest
Testimonial
Technology
SiteSetting.

Ne crée pas des tables inutiles.

Les relations doivent être correctement conçues.

Prévoir :

* createdAt
* updatedAt
* slug lorsque nécessaire
* status
* soft delete uniquement lorsque pertinent.

---

# 21. API

Créer une API REST professionnelle.

Prévoir :

/api/v1/services
/api/v1/projects
/api/v1/team
/api/v1/jobs
/api/v1/applications
/api/v1/contact
/api/v1/auth
/api/v1/admin

Utiliser Swagger/OpenAPI.

Documenter les endpoints importants.

Utiliser des DTOs.

Les réponses API doivent avoir une structure cohérente.

---

# 22. FORMULAIRES

Tous les formulaires doivent avoir :

* validation frontend
* validation backend
* messages d'erreur compréhensibles
* état loading
* état success
* état error
* protection anti-spam
* accessibilité.

Ne jamais afficher simplement :

"Something went wrong."

Présenter des messages compréhensibles pour l'utilisateur.

---

# 23. CONTENU

Le contenu doit être rédigé comme celui d'une véritable agence technologique.

Le ton doit être :

* professionnel
* confiant
* clair
* humain
* orienté résultats.

Évite les textes artificiels générés automatiquement du type :

"Nous sommes passionnés par l'innovation et nous transformons vos idées en solutions digitales exceptionnelles."

Les textes doivent expliquer concrètement :

* ce que fait l'agence
* pour qui
* pourquoi
* comment
* avec quels résultats.

Ne crée jamais de faux clients, faux chiffres, faux témoignages ou fausses certifications.

Utilise des données fictives uniquement comme placeholders clairement identifiés.

---

# 24. RESPONSIVE DESIGN

Le site doit être conçu mobile-first.

Tester au minimum :

* mobile
* tablette
* laptop
* desktop
* grands écrans.

Aucune section ne doit casser sur les petits écrans.

Les animations doivent également être adaptées au mobile.

---

# 25. INTERNATIONALISATION

Préparer l'architecture afin de pouvoir ajouter plus tard :

* français
* anglais.

Le français peut être la langue initiale.

Ne construis pas une architecture qui rendra l'internationalisation difficile.

---

# 26. DOCUMENTATION

Créer une documentation professionnelle :

README.md
ARCHITECTURE.md
API.md
DEPLOYMENT.md
SECURITY.md
ENVIRONMENT.md

Documenter :

* installation
* variables d'environnement
* lancement frontend
* lancement backend
* PostgreSQL
* Prisma
* migrations
* Docker
* tests
* build
* déploiement.

---

# 27. VARIABLES D'ENVIRONNEMENT

Créer :

.env.example

Ne jamais mettre de secrets réels dans le repository.

Prévoir notamment :

DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
NEXT_PUBLIC_API_URL
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
EMAIL_FROM
UPLOAD configuration.

Adapte les variables à l'architecture réellement utilisée.

---

# 28. TESTS

Prévoir une stratégie de tests.

Backend :

* unit tests
* integration tests
* e2e tests pour les fonctionnalités critiques.

Frontend :

* tests des composants critiques
* tests des formulaires
* tests des comportements importants.

Ne crée pas des tests artificiels simplement pour augmenter le nombre de tests.

Teste en priorité les fonctionnalités business critiques.

---

# 29. OBSERVABILITÉ

Préparer l'application pour :

* logs structurés
* monitoring
* health check
* erreurs serveur
* métriques lorsque pertinent.

Créer un endpoint :

/health

---

# 30. WORKFLOW DE DÉVELOPPEMENT

IMPORTANT :

Ne commence PAS par générer immédiatement plusieurs centaines de fichiers.

Travaille progressivement.

PHASE 1 — ANALYSE

Analyse le projet existant.

Identifie :

* fichiers
* dépendances
* architecture
* configuration
* contraintes.

PHASE 2 — ARCHITECTURE

Propose :

* architecture frontend
* architecture backend
* modèle de données
* API
* système d'authentification
* design system.

PHASE 3 — FOUNDATION

Implémente :

* configuration
* structure
* database
* Prisma
* API de base
* design system
* layout
* navigation.

PHASE 4 — PAGES

Implémente progressivement :

1. Accueil
2. Services
3. Réalisations
4. À propos
5. Carrières
6. Contact.

PHASE 5 — BACKEND

Implémente les modules NestJS correspondants.

PHASE 6 — ADMIN

Implémente la gestion des contenus.

PHASE 7 — ANIMATIONS

Ajoute les animations et micro-interactions.

PHASE 8 — SEO

Optimise le référencement.

PHASE 9 — SÉCURITÉ

Effectue un audit de sécurité.

PHASE 10 — PERFORMANCE

Effectue un audit performance.

PHASE 11 — TESTS

Lance les tests et corrige les problèmes.

PHASE 12 — PRODUCTION

Prépare :

* Docker
* production build
* variables d'environnement
* déploiement
* documentation.

---

# 31. RÈGLE ABSOLUE — QUALITÉ DU CODE

Ne génère jamais du code uniquement pour faire fonctionner rapidement une fonctionnalité.

Chaque implémentation doit être évaluée selon :

* lisibilité
* maintenabilité
* sécurité
* performance
* réutilisabilité
* évolutivité.

Évite :

* duplication
* composants gigantesques
* logique métier dans les composants UI
* appels API dispersés
* secrets hardcodés
* types any injustifiés
* console.log oubliés
* fichiers inutilisés
* dépendances inutiles
* architecture excessivement complexe.

---

# 32. RÈGLE ABSOLUE — AVANT CHAQUE GRANDE DÉCISION

Avant une modification architecturale importante, explique :

### Décision

Quelle décision doit être prise ?

### Options

Quelles sont les options possibles ?

### Recommandation

Quelle option recommandes-tu ?

### Justification

Pourquoi ?

### Impact

Quel impact sur :

* performance
* sécurité
* maintenance
* coût
* évolutivité.

Puis implémente la solution recommandée.

---

# 33. RÈGLE ABSOLUE — NE PAS INVENTER

Tu ne dois jamais inventer :

* statistiques
* clients
* témoignages
* certifications
* partenaires
* récompenses
* résultats commerciaux.

Lorsque l'information n'existe pas :

utilise un placeholder clairement identifiable.

---

# 34. OBJECTIF FINAL

Le résultat final doit donner l'impression que le site a été conçu par :

* une équipe UX/UI senior
* une équipe frontend expérimentée
* une équipe backend expérimentée
* un architecte logiciel
* une équipe DevOps
* une équipe marketing B2B.

Il doit être suffisamment professionnel pour être présenté à :

* PME
* grandes entreprises
* startups
* institutions
* investisseurs
* partenaires technologiques.

Je veux une expérience utilisateur mémorable, mais sans sacrifier la sobriété professionnelle.

---

# 35. COMMENCE MAINTENANT

Commence par :

1. analyser le projet existant ;
2. vérifier les versions de Node.js, Next.js, NestJS, Prisma et TypeScript ;
3. analyser l'arborescence ;
4. identifier ce qui existe déjà ;
5. proposer l'architecture cible ;
6. proposer le modèle de données ;
7. proposer l'API ;
8. proposer le design system ;
9. proposer l'arborescence finale ;
10. proposer un plan d'implémentation par étapes.

**Ne commence pas encore à écrire toutes les fonctionnalités.**

Présente d'abord ton analyse et ton architecture.

Après validation de l'architecture, commence l'implémentation étape par étape.

À chaque étape, vérifie que le code compile et que les fonctionnalités déjà développées continuent de fonctionner.

L'objectif n'est pas simplement de terminer le projet.

L'objectif est de construire une **véritable plateforme web professionnelle, évolutive, sécurisée et commercialement crédible pour une agence technologique.**
