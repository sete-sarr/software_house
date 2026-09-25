import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  company: z.string().optional(),
  email: z.string().min(1, "L'email est requis.").email("Adresse email invalide."),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(1, "Merci de décrire brièvement votre projet."),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter que vos données soient utilisées pour vous recontacter.",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const PROJECT_TYPE_OPTIONS = [
  { value: "web", label: "Site web / Application web" },
  { value: "mobile", label: "Application mobile" },
  { value: "saas", label: "Plateforme SaaS" },
  { value: "ia-automatisation", label: "Intelligence artificielle / Automatisation" },
  { value: "autre", label: "Autre" },
];

export const BUDGET_OPTIONS = [
  { value: "moins-5000", label: "Moins de 5 000 €" },
  { value: "5000-15000", label: "5 000 – 15 000 €" },
  { value: "15000-50000", label: "15 000 – 50 000 €" },
  { value: "plus-50000", label: "Plus de 50 000 €" },
  { value: "indetermine", label: "Je ne sais pas encore" },
];

export const TIMELINE_OPTIONS = [
  { value: "moins-1-mois", label: "Moins d'1 mois" },
  { value: "1-3-mois", label: "1 à 3 mois" },
  { value: "3-6-mois", label: "3 à 6 mois" },
  { value: "plus-6-mois", label: "Plus de 6 mois" },
  { value: "flexible", label: "Flexible" },
];
