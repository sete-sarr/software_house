import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const STATS = [
  { label: "Projets livrés" },
  { label: "Technologies maîtrisées" },
  { label: "Secteurs accompagnés" },
  { label: "Taux de satisfaction" },
];

export function Stats() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map(({ label }) => (
            <RevealItem key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="text-4xl font-semibold tracking-tight text-foreground">—</span>
              <span className="text-sm text-muted">{label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-xs text-muted">
          Chiffres en cours de consolidation — seront publiés prochainement.
        </p>
      </Container>
    </section>
  );
}
