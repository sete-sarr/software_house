import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="border-b border-border py-24 sm:py-32">
      <Container>
        <RevealGroup mode="mount" className="mx-auto flex max-w-3xl flex-col items-start gap-6">
          <RevealItem
            as="span"
            className="text-sm font-semibold uppercase tracking-wide text-primary"
          >
            Agence de développement web, mobile &amp; logiciel
          </RevealItem>

          <RevealItem
            as="h1"
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Des logiciels sur mesure, conçus pour durer et pour croître avec
            votre activité.
          </RevealItem>

          <RevealItem as="p" className="max-w-2xl text-lg leading-relaxed text-muted">
            Paradigital conçoit, développe et fait évoluer des applications
            web, mobiles et plateformes SaaS pour des entreprises qui veulent
            transformer une idée en produit fiable — de la première ligne de
            code à la mise à l&apos;échelle.
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-4 pt-2">
            <ButtonLink href="/contact" size="lg">
              Discuter de votre projet
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/realisations" variant="secondary" size="lg">
              Voir nos réalisations
            </ButtonLink>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
