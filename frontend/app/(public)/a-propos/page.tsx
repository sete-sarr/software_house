import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Values } from "@/components/sections/values";
import { Expertise } from "@/components/sections/expertise";
import { Process } from "@/components/sections/process";
import { Team } from "@/components/sections/team";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description:
    "Découvrez la mission, la méthode et les valeurs de Paradigital, agence de développement web, mobile et logiciel.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              À propos
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Une agence construite autour d&apos;une conviction simple.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Un bon logiciel se construit avec méthode, pas dans l&apos;urgence. Paradigital
              accompagne des entreprises qui veulent transformer une idée ou un besoin métier en
              un produit numérique fiable, maintenable et pensé pour durer.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Notre histoire
              </h2>
              <p className="text-sm leading-relaxed text-foreground">
                Paradigital est née d&apos;un constat partagé par beaucoup d&apos;entreprises : trop
                de projets logiciels échouent non pas par manque de compétences techniques, mais
                par manque de méthode et d&apos;alignement entre les équipes techniques et le
                métier. Nous avons voulu construire une agence qui met la rigueur d&apos;ingénierie
                au service d&apos;objectifs business concrets.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Notre mission
              </h2>
              <p className="text-sm leading-relaxed text-foreground">
                Aider les entreprises à transformer leurs besoins métier en produits numériques
                fiables, en combinant expertise technique et compréhension réelle de leurs enjeux.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Notre vision
              </h2>
              <p className="text-sm leading-relaxed text-foreground">
                Devenir un partenaire technique de confiance pour des entreprises qui veulent
                construire des logiciels durables plutôt que des prototypes jetables.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Values />
      <Expertise />
      <Process />

      <section className="border-b border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Culture"
            title="Une petite équipe, en contact direct avec vous"
            description="Nous travaillons en petites équipes, sans couches intermédiaires ni intermédiaires commerciaux entre vous et les personnes qui développent votre produit. Chaque décision technique est expliquée et documentée, pour que vous restiez maître de votre projet."
          />
        </Container>
      </section>

      <Team />
      <CtaSection />
    </>
  );
}
