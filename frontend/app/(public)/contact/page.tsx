import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  RESPONSE_TIME,
  SOCIAL_LINKS,
} from "@/lib/data/contact-info";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Parlons de votre projet. Contactez Software House pour un premier échange sans engagement.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contact
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Vous avez un projet ? Parlons-en.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Décrivez-nous votre besoin, nous revenons vers vous rapidement pour un premier échange
            sans engagement.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Coordonnées
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{CONTACT_EMAIL}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{CONTACT_PHONE}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{CONTACT_ADDRESS}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Délai de réponse
              </h2>
              <p className="mt-4 text-sm text-foreground">{RESPONSE_TIME}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Suivez-nous
              </h2>
              <div className="mt-4 flex gap-3">
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
          </aside>
        </div>
      </Container>
    </section>
  );
}
