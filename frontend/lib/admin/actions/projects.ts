"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return undefined;
  return value;
}

function buildProjectPayload(formData: FormData) {
  const galleryRaw = formData.get("gallery");
  const gallery =
    typeof galleryRaw === "string" && galleryRaw.trim().length > 0
      ? galleryRaw
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : undefined;

  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    problem: emptyToUndefined(formData.get("problem")),
    solution: emptyToUndefined(formData.get("solution")),
    result: emptyToUndefined(formData.get("result")),
    coverImage: emptyToUndefined(formData.get("coverImage")),
    gallery,
    status: String(formData.get("status") ?? "DRAFT"),
    seoTitle: emptyToUndefined(formData.get("seoTitle")),
    seoDescription: emptyToUndefined(formData.get("seoDescription")),
  };
}

export async function createProject(formData: FormData) {
  const response = await adminApiRequest("/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildProjectPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de créer le projet.");
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const response = await adminApiRequest(`/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildProjectPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de modifier le projet.");
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const response = await adminApiRequest(`/projects/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer le projet.");
  }

  revalidatePath("/admin/projects");
}
