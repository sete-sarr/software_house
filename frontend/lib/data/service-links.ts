export interface ServiceLink {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  featured: boolean;
}

export const serviceLinks: ServiceLink[] = [
  {
    slug: "developpement-web",
    title: "Développement web",
    shortDescription:
      "Applications web sur mesure, rapides et évolutives, construites avec des architectures modernes.",
    icon: "Code2",
    featured: true,
  },
  {
    slug: "applications-mobiles",
    title: "Applications mobiles",
    shortDescription:
      "Applications iOS et Android natives ou cross-platform, pensées pour l'usage réel de vos utilisateurs.",
    icon: "Smartphone",
    featured: true,
  },
  {
    slug: "saas",
    title: "Plateformes SaaS",
    shortDescription:
      "Conception et développement de produits SaaS multi-tenants, de la V1 à la mise à l'échelle.",
    icon: "Cloud",
    featured: true,
  },
  {
    slug: "intelligence-artificielle",
    title: "Intelligence artificielle",
    shortDescription:
      "Intégration de modèles d'IA et d'automatisations intelligentes dans vos produits existants.",
    icon: "BrainCircuit",
    featured: true,
  },
  {
    slug: "automatisation",
    title: "Automatisation",
    shortDescription:
      "Automatisation de vos processus métier pour réduire les tâches manuelles et les erreurs.",
    icon: "Workflow",
    featured: true,
  },
  {
    slug: "api-backend",
    title: "API & Backend",
    shortDescription:
      "Conception d'APIs robustes et de systèmes backend sécurisés, documentés et testés.",
    icon: "Plug",
    featured: true,
  },
  {
    slug: "logiciels-metier",
    title: "Logiciels métier",
    shortDescription: "Outils internes sur mesure adaptés à vos processus métier spécifiques.",
    icon: "Boxes",
    featured: false,
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    shortDescription:
      "Boutiques en ligne performantes, intégrées à vos outils de paiement et de gestion.",
    icon: "ShoppingCart",
    featured: false,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription:
      "Infrastructure cloud, CI/CD et observabilité pour déployer et faire évoluer sereinement.",
    icon: "CloudCog",
    featured: false,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortDescription:
      "Suivi, correctifs et évolutions continues de vos applications après mise en production.",
    icon: "LifeBuoy",
    featured: false,
  },
  {
    slug: "conseil-transformation",
    title: "Conseil & Transformation digitale",
    shortDescription:
      "Accompagnement stratégique pour cadrer, prioriser et réussir vos projets numériques.",
    icon: "Compass",
    featured: false,
  },
];

export const featuredServiceLinks = serviceLinks.filter((service) => service.featured);
