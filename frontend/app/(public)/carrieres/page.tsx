import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { JobOffers } from "@/components/sections/job-offers";
import { ApplicationForm } from "@/components/forms/application-form";

export const metadata: Metadata = buildMetadata({
  title: "Carrières",
  description:
    "Rejoignez Software House : autonomie, exigence technique et projets variés. Découvrez nos offres et envoyez-nous une candidature spontanée.",
  path: "/carrieres",
});

const REASONS = [
  {
    title: "Autonomie réelle",
    description:
      "Vous travaillez directement avec les clients et prenez de vraies décisions techniques, pas seulement de l'exécution.",
  },
  {
    title: "Exigence technique",
    description:
      "Du temps dédié à la qualité du code, à la revue et à l'apprentissage continu, pas seulement à la livraison.",
  },
  {
    title: "Contact direct",
    description:
      "Une petite structure, sans couches hiérarchiques inutiles entre vous et les décisions.",
  },
  {
    title: "Projets variés",
    description:
      "Web, mobile, IA, infrastructure : des projets techniques différents plutôt qu'une spécialisation figée.",
  },
];

export default function CarrieresPage() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              Carrières
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Rejoignez une équipe qui construit avec méthode.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Nous cherchons des personnes qui aiment le travail bien fait autant que nous.
              Découvrez pourquoi travailler chez Software House.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <SectionHeading eyebrow="Pourquoi nous rejoindre" title="Ce que vous trouverez ici" />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {REASONS.map(({ title, description }) => (
              <Card key={title} className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <JobOffers />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Candidature spontanée"
            title="Envoyez-nous votre candidature"
            description="Aucune offre ne correspond ? Parlez-nous de vous, nous étudions chaque candidature spontanée."
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-12 max-w-2xl">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
