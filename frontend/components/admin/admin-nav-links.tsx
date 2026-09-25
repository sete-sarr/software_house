"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Réalisations", icon: FolderKanban },
  { href: "/admin/team", label: "Équipe", icon: Users },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { href: "/admin/jobs", label: "Offres d'emploi", icon: Briefcase },
  { href: "/admin/applications", label: "Candidatures", icon: Inbox },
  { href: "/admin/contact", label: "Demandes de contact", icon: Mail },
];

export function AdminNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_LINKS.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground",
              isActive && "bg-surface text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
