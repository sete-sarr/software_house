import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { CtaSection } from "@/components/sections/cta-section";
import { getServices } from "@/lib/api/services";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Développement web, mobile, SaaS, intelligence artificielle, automatisation et plus : découvrez les services de l'agence Software House.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Des services pensés pour construire des produits fiables"
            description="Du premier cadrage à la maintenance long terme, nous couvrons l'ensemble du cycle de vie de vos projets numériques."
          />
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
