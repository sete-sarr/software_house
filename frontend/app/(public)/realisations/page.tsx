import type { Metadata } from "next";
import { Hammer } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations",
  description:
    "Le portfolio de projets de Software House est en cours de constitution. Retrouvez ici prochainement nos études de cas, technologies et résultats.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Notre portfolio est en cours de constitution"
            description="Nous documentons nos projets au fur et à mesure de leur livraison : contexte, solution technique et résultats obtenus. Cette page sera mise à jour avec de vraies études de cas très prochainement."
          />

          <div className="mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
            <Hammer className="h-8 w-8 text-muted" />
            <p className="text-sm font-medium text-muted">
              Aucune réalisation publiée pour l&apos;instant.
            </p>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
