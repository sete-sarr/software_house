import 'dotenv/config';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface ServiceSeed {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  problem: string;
  solution: string;
  benefits: string[];
  features: string[];
  technologies: string[];
}

const services: ServiceSeed[] = [
  {
    slug: 'developpement-web',
    title: 'Développement web',
    shortDescription:
      "Applications web sur mesure, rapides et évolutives, construites avec des architectures modernes.",
    icon: 'Code2',
    problem:
      "Vos outils actuels ralentissent votre équipe ou ne reflètent plus l'image de votre entreprise, et une solution générique ne suffit plus à vos besoins.",
    solution:
      'Nous concevons une application web sur mesure, alignée sur vos processus réels, avec une architecture pensée pour évoluer.',
    benefits: [
      'Performance et temps de chargement optimisés',
      'Interface pensée pour vos utilisateurs, pas pour un modèle générique',
      'Code maintenable sur le long terme',
      'Évolutif à mesure que votre activité grandit',
    ],
    features: [
      'Interface web responsive',
      'Authentification et gestion des rôles',
      'Tableaux de bord et reporting',
      'Intégrations avec vos outils existants',
      'Optimisation SEO et performance',
      "Back-office d'administration",
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'NestJS', 'PostgreSQL'],
  },
  {
    slug: 'applications-mobiles',
    title: 'Applications mobiles',
    shortDescription:
      "Applications iOS et Android natives ou cross-platform, pensées pour l'usage réel de vos utilisateurs.",
    icon: 'Smartphone',
    problem:
      "Vos utilisateurs sont mobiles, mais votre offre actuelle ne l'est pas — ou l'application existante n'est plus fiable ni évolutive.",
    solution:
      "Nous développons une application mobile connectée à votre backend, pensée pour l'usage quotidien réel de vos utilisateurs.",
    benefits: [
      'Expérience fluide sur iOS et Android',
      'Publication et mises à jour maîtrisées sur les stores',
      'Architecture partagée avec votre backend web',
      'Fonctionnalités natives (notifications, caméra, géolocalisation…)',
    ],
    features: [
      'Application iOS et Android',
      'Authentification sécurisée',
      'Notifications push',
      'Mode hors-ligne selon les besoins',
      'Intégration avec vos APIs existantes',
      'Suivi analytique des usages',
    ],
    technologies: ['React', 'TypeScript', 'NestJS', 'REST', 'Cloud'],
  },
  {
    slug: 'saas',
    title: 'Plateformes SaaS',
    shortDescription:
      "Conception et développement de produits SaaS multi-tenants, de la V1 à la mise à l'échelle.",
    icon: 'Cloud',
    problem:
      'Vous avez une idée de produit SaaS, mais construire une plateforme multi-clients, sécurisée et facturable est un chantier technique à part entière.',
    solution:
      "Nous concevons votre plateforme SaaS de la V1 à la mise à l'échelle : architecture multi-tenant, abonnements et infrastructure prête pour la croissance.",
    benefits: [
      'Architecture multi-tenant sécurisée dès le départ',
      'Mise sur le marché plus rapide grâce à une base solide réutilisable',
      'Infrastructure prête à monter en charge',
      'Facturation et gestion des abonnements intégrées',
    ],
    features: [
      'Gestion multi-comptes et permissions',
      'Facturation et abonnements',
      'Tableau de bord client',
      'API publique documentée',
      'Monitoring et alerting',
      'Onboarding utilisateur',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker', 'Cloud'],
  },
  {
    slug: 'intelligence-artificielle',
    title: 'Intelligence artificielle',
    shortDescription:
      "Intégration de modèles d'IA et d'automatisations intelligentes dans vos produits existants.",
    icon: 'BrainCircuit',
    problem:
      "Des tâches répétitives ou riches en données ralentissent vos équipes, et vous ne savez pas par où commencer pour intégrer l'IA utilement.",
    solution:
      "Nous intégrons des modèles d'IA existants ou sur mesure directement dans vos outils, sur des cas d'usage concrets et mesurables.",
    benefits: [
      "Cas d'usage ciblés à impact mesurable, pas de l'IA gadget",
      'Intégration dans vos outils existants, sans tout reconstruire',
      'Choix de modèles adaptés à votre budget et vos contraintes',
      'Supervision humaine conservée sur les décisions sensibles',
    ],
    features: [
      'Assistants et automatisations conversationnelles',
      'Extraction et classification de documents',
      'Recherche sémantique sur vos données',
      'Génération de contenu assistée',
      'Intégration à vos APIs et bases existantes',
      'Monitoring de la qualité des résultats',
    ],
    technologies: ['NestJS', 'TypeScript', 'REST', 'Cloud'],
  },
  {
    slug: 'automatisation',
    title: 'Automatisation',
    shortDescription:
      'Automatisation de vos processus métier pour réduire les tâches manuelles et les erreurs.',
    icon: 'Workflow',
    problem:
      'Des tâches manuelles répétitives consomment le temps de vos équipes et sont sources d\'erreurs.',
    solution:
      'Nous automatisons vos processus métier : synchronisation de données, workflows internes et tâches récurrentes, connectés à vos outils existants.',
    benefits: [
      'Moins d\'erreurs de saisie et de traitement manuel',
      'Temps libéré pour des tâches à plus forte valeur',
      'Processus documentés et traçables',
      'Connecté à vos outils sans tout remplacer',
    ],
    features: [
      'Synchronisation entre vos outils métier',
      'Workflows déclenchés par événements',
      'Génération automatique de documents',
      'Notifications et rapports automatisés',
      'Intégrations API sur mesure',
      'Tableaux de bord de suivi',
    ],
    technologies: ['NestJS', 'Node.js', 'REST', 'Cloud'],
  },
  {
    slug: 'api-backend',
    title: 'API & Backend',
    shortDescription:
      "Conception d'APIs robustes et de systèmes backend sécurisés, documentés et testés.",
    icon: 'Plug',
    problem:
      'Votre backend actuel est difficile à faire évoluer, mal documenté, ou ne tient plus la charge.',
    solution:
      'Nous concevons des APIs robustes et des systèmes backend sécurisés, documentés et testés, pensés pour être consommés par plusieurs clients (web, mobile, partenaires).',
    benefits: [
      'API documentée et versionnée dès le départ',
      'Sécurité et validation des données à chaque étape',
      'Architecture modulaire facile à faire évoluer',
      'Tests automatisés sur les parcours critiques',
    ],
    features: [
      'API REST documentée (OpenAPI/Swagger)',
      'Authentification et autorisation (JWT, rôles)',
      'Validation et gestion centralisée des erreurs',
      'Rate limiting et sécurité',
      'Intégrations avec services tiers',
      'Monitoring et logs structurés',
    ],
    technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'REST'],
  },
  {
    slug: 'logiciels-metier',
    title: 'Logiciels métier',
    shortDescription: 'Outils internes sur mesure adaptés à vos processus métier spécifiques.',
    icon: 'Boxes',
    problem:
      'Vos processus internes reposent sur des tableurs, des outils bricolés ou des logiciels génériques mal adaptés à votre activité.',
    solution:
      'Nous développons un outil interne sur mesure, calqué sur vos processus réels, pour fiabiliser et accélérer le travail de vos équipes.',
    benefits: [
      "Outil calqué sur vos processus réels, pas l'inverse",
      'Moins d\'erreurs liées aux outils bricolés (tableurs, emails)',
      'Formation facilitée grâce à une interface pensée pour vos équipes',
      'Évolutif au fil de vos besoins',
    ],
    features: [
      'Gestion de données métier structurées',
      'Rôles et permissions par équipe',
      'Rapports et exports personnalisés',
      'Historique et traçabilité des actions',
      'Intégration avec vos outils existants',
      'Interface adaptée à vos utilisateurs internes',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
  },
  {
    slug: 'e-commerce',
    title: 'E-commerce',
    shortDescription:
      'Boutiques en ligne performantes, intégrées à vos outils de paiement et de gestion.',
    icon: 'ShoppingCart',
    problem:
      'Votre boutique en ligne actuelle limite votre croissance : performance, personnalisation ou intégration avec vos outils de gestion.',
    solution:
      'Nous développons une boutique en ligne performante, intégrée à vos outils de paiement, de stock et de gestion, pensée pour convertir.',
    benefits: [
      "Tunnel d'achat optimisé pour la conversion",
      'Performance et référencement soignés',
      'Intégration avec vos outils de gestion et de paiement',
      'Autonomie pour gérer votre catalogue au quotidien',
    ],
    features: [
      'Catalogue produits et gestion des stocks',
      'Paiement en ligne sécurisé',
      'Gestion des commandes et livraisons',
      'Back-office de gestion autonome',
      'Optimisation SEO et performance',
      'Intégration avec vos outils comptables/logistiques',
    ],
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Cloud'],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortDescription:
      'Infrastructure cloud, CI/CD et observabilité pour déployer et faire évoluer sereinement.',
    icon: 'CloudCog',
    problem:
      "Vos déploiements sont manuels, risqués, ou votre infrastructure n'est pas prête à absorber la croissance.",
    solution:
      'Nous mettons en place une infrastructure cloud et des pipelines CI/CD fiables, avec une observabilité qui vous permet de déployer sereinement.',
    benefits: [
      'Déploiements automatisés et reproductibles',
      'Visibilité en temps réel sur la santé de vos systèmes',
      'Infrastructure dimensionnée pour votre charge réelle',
      'Réduction des interventions manuelles à risque',
    ],
    features: [
      'Pipelines CI/CD automatisés',
      'Conteneurisation (Docker)',
      'Monitoring et alerting',
      'Gestion des environnements (dev/staging/prod)',
      'Sauvegardes et plans de reprise',
      "Sécurisation de l'infrastructure",
    ],
    technologies: ['Docker', 'CI/CD', 'Cloud', 'PostgreSQL'],
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    shortDescription:
      'Suivi, correctifs et évolutions continues de vos applications après mise en production.',
    icon: 'LifeBuoy',
    problem:
      'Votre application fonctionne, mais personne ne la fait évoluer ni ne surveille son bon fonctionnement au quotidien.',
    solution:
      "Nous assurons le suivi, les correctifs et les évolutions de votre application après sa mise en production, avec des délais d'intervention clairs.",
    benefits: [
      "Réactivité en cas d'incident",
      'Évolutions priorisées selon vos besoins réels',
      'Veille sécurité et mises à jour techniques',
      'Un interlocuteur unique qui connaît votre système',
    ],
    features: [
      'Suivi des incidents et correctifs',
      'Mises à jour de sécurité et de dépendances',
      'Évolutions fonctionnelles régulières',
      'Monitoring proactif',
      "Rapports d'activité périodiques",
      'Support réactif par email/ticket',
    ],
    technologies: ['NestJS', 'PostgreSQL', 'Docker', 'Cloud'],
  },
  {
    slug: 'conseil-transformation',
    title: 'Conseil & Transformation digitale',
    shortDescription:
      'Accompagnement stratégique pour cadrer, prioriser et réussir vos projets numériques.',
    icon: 'Compass',
    problem:
      'Vous avez plusieurs projets numériques en tête mais peinez à les prioriser, les cadrer ou convaincre en interne.',
    solution:
      'Nous vous accompagnons pour cadrer, prioriser et structurer vos projets numériques, avec une feuille de route réaliste et actionnable.',
    benefits: [
      'Vision claire et priorisée de vos chantiers numériques',
      'Feuille de route réaliste, alignée sur vos ressources',
      "Aide à la décision technique (build vs buy, choix d'architecture)",
      'Regard extérieur et indépendant',
    ],
    features: [
      "Audit de l'existant technique et fonctionnel",
      'Cadrage et priorisation des projets',
      'Feuille de route et estimation budgétaire',
      "Recommandations d'architecture",
      'Accompagnement au choix de prestataires',
      'Support à la conduite du changement',
    ],
    technologies: [],
  },
];

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log(`Compte admin déjà existant (${email}) — mot de passe inchangé.`);
    return;
  }

  const password = randomBytes(12).toString('base64url');
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: 'Admin',
      lastName: 'Software House',
      role: 'ADMIN',
    },
  });

  console.log('\n=== Compte admin créé ===');
  console.log(`Email    : ${email}`);
  console.log(`Password : ${password}`);
  console.log('Notez ce mot de passe maintenant — il ne sera plus jamais affiché.\n');
}

async function main() {
  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { ...service, order: index, status: 'PUBLISHED' },
      create: { ...service, order: index, status: 'PUBLISHED' },
    });
  }

  console.log(`Seed terminé : ${services.length} services créés/mis à jour.`);

  await seedAdminUser();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
