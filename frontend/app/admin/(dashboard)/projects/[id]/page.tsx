import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateProject } from "@/lib/admin/actions/projects";

export const metadata: Metadata = { title: "Modifier le projet" };

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  problem: string | null;
  solution: string | null;
  result: string | null;
  coverImage: string | null;
  gallery: string[] | null;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

async function getProject(id: string): Promise<Project | null> {
  const response = await adminFetch(`/projects/id/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger le projet.");
  const json = await response.json();
  return json.data;
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Modifier « {project.title} »
      </h1>
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        defaultValues={project}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
