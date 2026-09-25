import type { Metadata } from "next";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import { createTeamMember } from "@/lib/admin/actions/team";

export const metadata: Metadata = { title: "Nouveau membre" };

export default function NewTeamMemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Nouveau membre</h1>
      <TeamMemberForm action={createTeamMember} submitLabel="Créer le membre" />
    </div>
  );
}
