import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateApplicationStatus, deleteApplication } from "@/lib/admin/actions/applications";
import { cn } from "@/lib/utils";

const externalLinkStyles = cn(
  "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-surface",
);

export const metadata: Metadata = { title: "Détail de la candidature" };

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  cvUrl: string;
  coverLetterUrl: string | null;
  portfolioUrl: string | null;
  linkedin: string | null;
  github: string | null;
  message: string | null;
  status: "NEW" | "REVIEWED" | "REJECTED" | "ACCEPTED";
  createdAt: string;
  jobOffer: { title: string } | null;
}

const STATUS_LABELS: Record<Application["status"], string> = {
  NEW: "Nouvelle",
  REVIEWED: "Étudiée",
  REJECTED: "Refusée",
  ACCEPTED: "Acceptée",
};

async function getApplication(id: string): Promise<Application | null> {
  const response = await adminFetch(`/applications/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger cette candidature.");
  const json = await response.json();
  return json.data;
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {application.firstName} {application.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {application.jobOffer?.title ?? "Candidature spontanée"} ·{" "}
            {new Date(application.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
        <Badge>{STATUS_LABELS[application.status]}</Badge>
      </div>

      <Card className="flex flex-col gap-4">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted">Email</dt>
            <dd className="text-foreground">
              <a href={`mailto:${application.email}`} className="hover:text-primary">
                {application.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Téléphone</dt>
            <dd className="text-foreground">{application.phone ?? "—"}</dd>
          </div>
        </dl>

        {application.message ? (
          <div>
            <dt className="text-sm font-medium text-muted">Message</dt>
            <dd className="mt-1 whitespace-pre-wrap text-foreground">{application.message}</dd>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 border-t border-border pt-4">
          <a
            href={`/api/admin/applications/${application.id}/cv`}
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkStyles}
          >
            <FileText className="h-4 w-4" />
            CV
          </a>
          {application.coverLetterUrl ? (
            <a
              href={`/api/admin/applications/${application.id}/cover-letter`}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkStyles}
            >
              <FileText className="h-4 w-4" />
              Lettre de motivation
            </a>
          ) : null}
          {application.portfolioUrl ? (
            <a
              href={application.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkStyles}
            >
              <Globe className="h-4 w-4" />
              Portfolio
            </a>
          ) : null}
          {application.linkedin ? (
            <a
              href={application.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkStyles}
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          ) : null}
          {application.github ? (
            <a
              href={application.github}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkStyles}
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          ) : null}
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-foreground">Statut</h2>
        <form
          action={updateApplicationStatus.bind(null, application.id)}
          className="flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Nouveau statut
            </label>
            <Select id="status" name="status" defaultValue={application.status}>
              <option value="NEW">Nouvelle</option>
              <option value="REVIEWED">Étudiée</option>
              <option value="ACCEPTED">Acceptée</option>
              <option value="REJECTED">Refusée</option>
            </Select>
          </div>
          <Button type="submit" size="sm">
            Mettre à jour
          </Button>
        </form>
      </Card>

      <div className="flex justify-between">
        <Link href="/admin/applications" className="text-sm text-muted hover:text-foreground">
          ← Retour à la liste
        </Link>
        <DeleteForm
          action={deleteApplication.bind(null, application.id)}
          confirmMessage={`Supprimer la candidature de "${application.firstName} ${application.lastName}" ?`}
        >
          <Button type="submit" variant="secondary" size="sm" className="text-danger">
            Supprimer la candidature
          </Button>
        </DeleteForm>
      </div>
    </div>
  );
}
