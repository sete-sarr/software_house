import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { technologyCategories } from "@/lib/data/technologies";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function TechStack() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading
          eyebrow="Technologies"
          title="Un socle technique moderne et éprouvé"
          description="Nous choisissons nos outils pour leur fiabilité à long terme, pas pour suivre les tendances."
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {technologyCategories.map(({ category, items }) => (
            <RevealItem key={category} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((techName) => (
                  <Badge key={techName}>{techName}</Badge>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
