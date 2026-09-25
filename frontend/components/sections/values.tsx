import { Handshake, MessageCircle, Puzzle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const VALUES = [
  {
    title: "Transparence",
    description:
      "Nous communiquons clairement sur l'avancement, les risques et les choix techniques, sans jargon inutile.",
    icon: MessageCircle,
  },
  {
    title: "Qualité",
    description:
      "Nous privilégions un code maintenable et testé à une livraison précipitée qui coûte cher plus tard.",
    icon: ShieldCheck,
  },
  {
    title: "Sur mesure",
    description:
      "Chaque solution est pensée pour vos besoins réels, pas adaptée d'un template générique.",
    icon: Puzzle,
  },
  {
    title: "Responsabilité",
    description:
      "Nous assumons nos choix techniques et restons impliqués après la mise en production.",
    icon: Handshake,
  },
];

export function Values() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading
          eyebrow="Valeurs"
          title="Ce qui guide la façon dont nous travaillons"
          description="Des principes concrets, appliqués à chaque projet plutôt qu'affichés en façade."
        />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ title, description, icon: Icon }) => (
            <RevealItem
              key={title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6"
            >
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
