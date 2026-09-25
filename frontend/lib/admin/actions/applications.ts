"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

export async function updateApplicationStatus(id: string, formData: FormData) {
  const status = String(formData.get("status") ?? "");

  const response = await adminApiRequest(`/applications/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de mettre à jour le statut.");
  }

  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}

export async function deleteApplication(id: string) {
  const response = await adminApiRequest(`/applications/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer la candidature.");
  }

  revalidatePath("/admin/applications");
  redirect("/admin/applications");
}
