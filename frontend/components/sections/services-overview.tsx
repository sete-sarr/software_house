import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { featuredServiceLinks } from "@/lib/data/service-links";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function ServicesOverview() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Ce que nous construisons pour vous"
            description="Un accompagnement de bout en bout, du cadrage à la mise en production et au-delà."
          />
          <ButtonLink href="/services" variant="secondary" className="shrink-0">
            Tous nos services
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServiceLinks.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
