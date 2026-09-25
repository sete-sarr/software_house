"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return undefined;
  return value;
}

function buildJobOfferPayload(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    department: emptyToUndefined(formData.get("department")),
    location: emptyToUndefined(formData.get("location")),
    type: String(formData.get("type") ?? "CDI"),
    description: String(formData.get("description") ?? ""),
    requirements: emptyToUndefined(formData.get("requirements")),
    status: String(formData.get("status") ?? "DRAFT"),
  };
}

export async function createJobOffer(formData: FormData) {
  const response = await adminApiRequest("/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildJobOfferPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de créer l'offre.");
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/carrieres");
  redirect("/admin/jobs");
}

export async function updateJobOffer(id: string, formData: FormData) {
  const response = await adminApiRequest(`/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildJobOfferPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de modifier l'offre.");
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/carrieres");
  redirect("/admin/jobs");
}

export async function deleteJobOffer(id: string) {
  const response = await adminApiRequest(`/jobs/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer l'offre.");
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/carrieres");
}
