"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return undefined;
  return value;
}

function buildTestimonialPayload(formData: FormData) {
  return {
    authorName: String(formData.get("authorName") ?? ""),
    authorRole: emptyToUndefined(formData.get("authorRole")),
    company: emptyToUndefined(formData.get("company")),
    content: String(formData.get("content") ?? ""),
    avatar: emptyToUndefined(formData.get("avatar")),
    isPublished: formData.get("isPublished") === "on",
  };
}

export async function createTestimonial(formData: FormData) {
  const response = await adminApiRequest("/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildTestimonialPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de créer le témoignage.");
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const response = await adminApiRequest(`/testimonials/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildTestimonialPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de modifier le témoignage.");
  }

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const response = await adminApiRequest(`/testimonials/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer le témoignage.");
  }

  revalidatePath("/admin/testimonials");
}
