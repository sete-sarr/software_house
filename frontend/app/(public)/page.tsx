import type { Metadata } from "next";
import { buildMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Expertise } from "@/components/sections/expertise";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  ...buildMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
  // The home title already contains the brand: bypass the "%s | Paradigital" template.
  title: { absolute: SITE_TITLE },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <ServicesOverview />
      <ProjectsPreview />
      <Process />
      <TechStack />
      <Stats />
      <Testimonials />
      <CtaSection />
    </>
  );
}
