import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/data/process";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Process() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading
          eyebrow="Méthode"
          title="Un processus clair, du premier échange à la maintenance"
          description="Chaque projet suit les mêmes étapes, pour garder de la visibilité sur l'avancement et les décisions."
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(({ number, title, description }) => (
            <RevealItem key={number} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-primary">{number}</span>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
