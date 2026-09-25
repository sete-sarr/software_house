import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-lg border border-border bg-surface px-6 py-16 text-center">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vous avez un projet ? Parlons-en.
          </h2>
          <p className="max-w-lg text-base text-muted">
            Décrivez-nous votre besoin, nous revenons vers vous rapidement pour un premier échange
            sans engagement.
          </p>
          <ButtonLink href="/contact" size="lg">
            Discuter de votre projet
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
