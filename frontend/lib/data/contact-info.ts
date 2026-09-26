import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

export const CONTACT_EMAIL = "contact@paradigital.tech";

export const CONTACT_PHONES = [
  { label: "+221 77 911 80 24", href: "tel:+221779118024" },
  { label: "+221 76 868 27 94", href: "tel:+221768682794" },
] as const;

export const CONTACT_ADDRESS = "Adresse à compléter";
export const RESPONSE_TIME = "Nous répondons sous 24 à 48h ouvrées.";

export const SOCIAL_LINKS = [
  { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  { href: "#", label: "GitHub", icon: GithubIcon },
];
