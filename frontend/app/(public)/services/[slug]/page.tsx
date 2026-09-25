import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Process } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta-section";
import { getServiceBySlug } from "@/lib/api/services";
import { resolveIcon } from "@/lib/icon-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { title, shortDescription, icon, problem, solution, benefits, features, technologies } =
    service;
  const Icon = resolveIcon(icon);

  return (
    <>
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les services
          </Link>

          <div className="mt-8 flex max-w-2xl flex-col gap-4">
            <Icon className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-muted">{shortDescription}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Le problème
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground">{problem}</p>
            </Card>
            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Notre solution
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground">{solution}</p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Avantages
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Fonctionnalités possibles
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {technologies.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Technologies
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <Process />
      <CtaSection />
    </>
  );
}
