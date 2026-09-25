"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

export async function updateContactStatus(id: string, formData: FormData) {
  const status = String(formData.get("status") ?? "");

  const response = await adminApiRequest(`/contact/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de mettre à jour le statut.");
  }

  revalidatePath("/admin/contact");
  revalidatePath(`/admin/contact/${id}`);
}

export async function deleteContactRequest(id: string) {
  const response = await adminApiRequest(`/contact/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer la demande.");
  }

  revalidatePath("/admin/contact");
  redirect("/admin/contact");
}
