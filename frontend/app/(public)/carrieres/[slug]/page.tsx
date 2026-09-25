import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApplicationForm } from "@/components/forms/application-form";
import { JOB_TYPE_LABELS, getJobOfferBySlug } from "@/lib/api/jobs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOfferBySlug(slug);

  if (!job) {
    return {};
  }

  return buildMetadata({
    title: job.title,
    description: job.description.slice(0, 160),
    path: `/carrieres/${slug}`,
  });
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  CDI: "FULL_TIME",
  CDD: "TEMPORARY",
  FREELANCE: "CONTRACTOR",
  STAGE: "INTERN",
};

export default async function JobOfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobOfferBySlug(slug);

  if (!job) {
    notFound();
  }

  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt ?? undefined,
    employmentType: EMPLOYMENT_TYPE[job.type],
    hiringOrganization: {
      "@type": "Organization",
      name: "Software House",
      sameAs: SITE_URL,
    },
    ...(job.location
      ? {
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: job.location },
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <Link
            href="/carrieres"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les offres
          </Link>

          <div className="mt-8 flex max-w-2xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{JOB_TYPE_LABELS[job.type]}</Badge>
              {job.location && (
                <span className="inline-flex items-center gap-1 text-sm text-muted">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {job.title}
            </h1>
            {job.department && <p className="text-lg text-muted">{job.department}</p>}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                Description du poste
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground">
                {job.description}
              </p>
            </Card>
            {job.requirements && (
              <Card>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Profil recherché
                </h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground">
                  {job.requirements}
                </p>
              </Card>
            )}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Candidature"
            title="Postuler à cette offre"
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-12 max-w-2xl">
            <ApplicationForm jobOfferId={job.id} jobTitle={job.title} />
          </div>
        </Container>
      </section>
    </>
  );
}
