import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComingSoon } from "@/components/ui/coming-soon";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { JOB_TYPE_LABELS, getJobOffers } from "@/lib/api/jobs";

export async function JobOffers() {
  const jobOffers = await getJobOffers();

  if (jobOffers.length === 0) {
    return (
      <ComingSoon
        eyebrow="Offres d'emploi"
        title="Nos postes ouverts, bientôt en ligne"
        description="Nous préparons la publication de nos premières offres. En attendant, n'hésitez pas à nous envoyer une candidature spontanée."
        message="Aucune offre publiée pour le moment."
        icon="Briefcase"
      />
    );
  }

  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading eyebrow="Offres d'emploi" title="Postes ouverts" />

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {jobOffers.map((job) => (
            <RevealItem key={job.id}>
              <Link href={`/carrieres/${job.slug}`}>
                <Card className="flex h-full flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{JOB_TYPE_LABELS[job.type] ?? job.type}</Badge>
                    {job.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                  {job.department && <p className="text-sm text-muted">{job.department}</p>}
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
