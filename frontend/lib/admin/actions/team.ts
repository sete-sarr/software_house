"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminApiRequest } from "@/lib/admin/api-client";

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length === 0) return undefined;
  return value;
}

function buildTeamMemberPayload(formData: FormData) {
  return {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    role: String(formData.get("role") ?? ""),
    bio: emptyToUndefined(formData.get("bio")),
    photo: emptyToUndefined(formData.get("photo")),
    linkedin: emptyToUndefined(formData.get("linkedin")),
    github: emptyToUndefined(formData.get("github")),
    isActive: formData.get("isActive") === "on",
  };
}

export async function createTeamMember(formData: FormData) {
  const response = await adminApiRequest("/team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildTeamMemberPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de créer le membre d'équipe.");
  }

  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const response = await adminApiRequest(`/team/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildTeamMemberPayload(formData)),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Impossible de modifier le membre d'équipe.");
  }

  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  const response = await adminApiRequest(`/team/${id}`, { method: "DELETE" });

  if (!response.ok && response.status !== 204) {
    throw new Error("Impossible de supprimer le membre d'équipe.");
  }

  revalidatePath("/admin/team");
}
