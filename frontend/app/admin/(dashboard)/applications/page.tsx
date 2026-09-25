import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { adminFetch } from "@/lib/admin/api-client";

export const metadata: Metadata = { title: "Candidatures" };

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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

async function getApplications(): Promise<Application[]> {
  const response = await adminFetch("/applications");
  if (!response.ok) {
    throw new Error("Impossible de charger les candidatures.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Candidatures
        </h1>
        <p className="mt-2 text-sm text-muted">
          Candidatures reçues via /carrieres, spontanées ou liées à une offre.
        </p>
      </div>

      <DataTable
        items={applications}
        getRowKey={(application) => application.id}
        emptyMessage="Aucune candidature pour l'instant."
        columns={[
          {
            header: "Candidat",
            render: (application) => `${application.firstName} ${application.lastName}`,
          },
          {
            header: "Poste visé",
            render: (application) => application.jobOffer?.title ?? "Candidature spontanée",
          },
          { header: "Email", render: (application) => application.email },
          {
            header: "Statut",
            render: (application) => <Badge>{STATUS_LABELS[application.status]}</Badge>,
          },
          {
            header: "Date",
            render: (application) =>
              new Date(application.createdAt).toLocaleDateString("fr-FR"),
          },
          {
            header: "Actions",
            render: (application) => (
              <Link
                href={`/admin/applications/${application.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                aria-label={`Voir la candidature de ${application.firstName} ${application.lastName}`}
              >
                <Eye className="h-4 w-4" />
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
