import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { deleteJobOffer } from "@/lib/admin/actions/jobs";

interface JobOffer {
  id: string;
  title: string;
  type: string;
  status: "DRAFT" | "PUBLISHED";
}

async function getJobOffers(): Promise<JobOffer[]> {
  const response = await adminFetch("/jobs/admin/all");
  if (!response.ok) {
    throw new Error("Impossible de charger les offres.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminJobsPage() {
  const jobs = await getJobOffers();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Offres d&apos;emploi
        </h1>
        <ButtonLink href="/admin/jobs/new">
          <Plus className="h-4 w-4" />
          Nouvelle offre
        </ButtonLink>
      </div>

      <DataTable
        items={jobs}
        getRowKey={(job) => job.id}
        emptyMessage="Aucune offre pour l'instant."
        columns={[
          { header: "Titre", render: (job) => job.title },
          { header: "Type", render: (job) => job.type },
          {
            header: "Statut",
            render: (job) => <Badge>{job.status === "PUBLISHED" ? "Publiée" : "Brouillon"}</Badge>,
          },
          {
            header: "Actions",
            render: (job) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/jobs/${job.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                  aria-label={`Modifier ${job.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteForm
                  action={deleteJobOffer.bind(null, job.id)}
                  confirmMessage={`Supprimer l'offre "${job.title}" ?`}
                >
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 text-danger"
                    aria-label={`Supprimer ${job.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteForm>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
