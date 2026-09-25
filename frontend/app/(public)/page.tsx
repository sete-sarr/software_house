import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Expertise } from "@/components/sections/expertise";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Software House — Agence de développement web, mobile & logiciel",
  description:
    "Software House conçoit et développe des applications web, mobiles, plateformes SaaS et solutions d'intelligence artificielle pour les entreprises qui veulent accélérer leur transformation numérique.",
  path: "/",
});

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
