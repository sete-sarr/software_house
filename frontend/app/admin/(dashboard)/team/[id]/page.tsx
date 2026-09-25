import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateTeamMember } from "@/lib/admin/actions/team";

export const metadata: Metadata = { title: "Modifier le membre" };

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  github: string | null;
  isActive: boolean;
}

async function getTeamMember(id: string): Promise<TeamMember | null> {
  const response = await adminFetch(`/team/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger ce membre.");
  const json = await response.json();
  return json.data;
}

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMember(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Modifier « {member.firstName} {member.lastName} »
      </h1>
      <TeamMemberForm
        action={updateTeamMember.bind(null, member.id)}
        defaultValues={member}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
