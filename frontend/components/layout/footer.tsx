import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { featuredServiceLinks } from "@/lib/data/service-links";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/data/contact-info";

const NAVIGATION_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/carrieres", label: "Carrières" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_SERVICES = featuredServiceLinks.slice(0, 4).map((service) => ({
  href: `/services/${service.slug}`,
  label: service.title,
}));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Software<span className="text-primary">House</span>
            </Link>
            <p className="max-w-xs text-sm text-muted">
              Agence technologique spécialisée dans la conception et le développement de
              plateformes web, mobiles et logicielles pour entreprises et startups.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Coordonnées</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{CONTACT_PHONE}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{CONTACT_ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted">© {year} Software House. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="text-xs text-muted hover:text-foreground">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-xs text-muted hover:text-foreground">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
