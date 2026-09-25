import Link from "next/link";
import {
  Briefcase,
  FolderKanban,
  Inbox,
  Mail,
  MessageSquareQuote,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const SECTIONS = [
  {
    href: "/admin/projects",
    label: "Réalisations",
    description: "Gérer les projets présentés sur /realisations.",
    icon: FolderKanban,
  },
  {
    href: "/admin/team",
    label: "Équipe",
    description: "Gérer les membres présentés sur /a-propos.",
    icon: Users,
  },
  {
    href: "/admin/testimonials",
    label: "Témoignages",
    description: "Gérer les avis clients affichés sur le site.",
    icon: MessageSquareQuote,
  },
  {
    href: "/admin/jobs",
    label: "Offres d'emploi",
    description: "Gérer les offres affichées sur /carrieres.",
    icon: Briefcase,
  },
  {
    href: "/admin/applications",
    label: "Candidatures",
    description: "Consulter les candidatures reçues via /carrieres.",
    icon: Inbox,
  },
  {
    href: "/admin/contact",
    label: "Demandes de contact",
    description: "Consulter les demandes reçues via /contact.",
    icon: Mail,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm text-muted">
          Gérez le contenu du site depuis cet espace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ href, label, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="flex h-full flex-col gap-3">
              <Icon className="h-8 w-8 text-primary" />
              <h2 className="text-base font-semibold text-foreground">{label}</h2>
              <p className="text-sm text-muted">{description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
