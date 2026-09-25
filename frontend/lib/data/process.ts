export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Écoute de vos objectifs, de vos contraintes et de votre contexte métier pour cadrer le projet.",
  },
  {
    number: "02",
    title: "Analyse",
    description:
      "Étude technique et fonctionnelle : faisabilité, risques, priorités et périmètre de la solution.",
  },
  {
    number: "03",
    title: "Conception",
    description:
      "Architecture technique et design d'interface, validés avec vous avant le développement.",
  },
  {
    number: "04",
    title: "Développement",
    description:
      "Implémentation itérative avec des points d'avancement réguliers et un code revu en continu.",
  },
  {
    number: "05",
    title: "Tests",
    description:
      "Tests fonctionnels, techniques et de sécurité pour garantir la fiabilité de la solution.",
  },
  {
    number: "06",
    title: "Déploiement",
    description:
      "Mise en production maîtrisée, avec surveillance et plan de retour arrière si nécessaire.",
  },
  {
    number: "07",
    title: "Maintenance",
    description:
      "Suivi post-lancement, correctifs et évolutions pour accompagner la croissance du produit.",
  },
];
