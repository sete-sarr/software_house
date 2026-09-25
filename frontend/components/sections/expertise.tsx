import {
  BrainCircuit,
  Cloud,
  Code2,
  Layers,
  Plug,
  Smartphone,
  Workflow,
  Boxes,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const EXPERTISE_AREAS = [
  { label: "Web", icon: Code2 },
  { label: "Mobile", icon: Smartphone },
  { label: "SaaS", icon: Layers },
  { label: "Intelligence artificielle", icon: BrainCircuit },
  { label: "Cloud", icon: Cloud },
  { label: "Automatisation", icon: Workflow },
  { label: "APIs", icon: Plug },
  { label: "Logiciels métier", icon: Boxes },
];

export function Expertise() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading
          eyebrow="Expertise"
          title="Des compétences couvrant tout le cycle de vie de votre produit"
          description="De la conception d'interface à l'infrastructure cloud, nous couvrons les compétences nécessaires pour livrer un produit complet."
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {EXPERTISE_AREAS.map(({ label, icon: Icon }) => (
            <RevealItem
              key={label}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center"
            >
              <Icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
