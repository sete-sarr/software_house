import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { deleteProject } from "@/lib/admin/actions/projects";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
}

async function getProjects(): Promise<Project[]> {
  const response = await adminFetch("/projects/admin/all");
  if (!response.ok) {
    throw new Error("Impossible de charger les réalisations.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Réalisations</h1>
        <ButtonLink href="/admin/projects/new">
          <Plus className="h-4 w-4" />
          Nouveau projet
        </ButtonLink>
      </div>

      <DataTable
        items={projects}
        getRowKey={(project) => project.id}
        emptyMessage="Aucun projet pour l'instant."
        columns={[
          { header: "Titre", render: (project) => project.title },
          { header: "Catégorie", render: (project) => project.category },
          {
            header: "Statut",
            render: (project) => (
              <Badge>{project.status === "PUBLISHED" ? "Publié" : "Brouillon"}</Badge>
            ),
          },
          {
            header: "Actions",
            render: (project) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                  aria-label={`Modifier ${project.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteForm
                  action={deleteProject.bind(null, project.id)}
                  confirmMessage={`Supprimer le projet "${project.title}" ?`}
                >
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 text-danger"
                    aria-label={`Supprimer ${project.title}`}
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
