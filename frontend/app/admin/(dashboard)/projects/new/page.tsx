import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/lib/admin/actions/projects";

export const metadata: Metadata = { title: "Nouveau projet" };

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Nouveau projet</h1>
      <ProjectForm action={createProject} submitLabel="Créer le projet" />
    </div>
  );
}
