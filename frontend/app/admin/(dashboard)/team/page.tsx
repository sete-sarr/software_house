import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { deleteTeamMember } from "@/lib/admin/actions/team";

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await adminFetch("/team/admin/all");
  if (!response.ok) {
    throw new Error("Impossible de charger l'équipe.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Équipe</h1>
        <ButtonLink href="/admin/team/new">
          <Plus className="h-4 w-4" />
          Nouveau membre
        </ButtonLink>
      </div>

      <DataTable
        items={members}
        getRowKey={(member) => member.id}
        emptyMessage="Aucun membre pour l'instant."
        columns={[
          {
            header: "Nom",
            render: (member) => `${member.firstName} ${member.lastName}`,
          },
          { header: "Rôle", render: (member) => member.role },
          {
            header: "Statut",
            render: (member) => <Badge>{member.isActive ? "Actif" : "Inactif"}</Badge>,
          },
          {
            header: "Actions",
            render: (member) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/team/${member.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                  aria-label={`Modifier ${member.firstName} ${member.lastName}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteForm
                  action={deleteTeamMember.bind(null, member.id)}
                  confirmMessage={`Supprimer ${member.firstName} ${member.lastName} ?`}
                >
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 text-danger"
                    aria-label={`Supprimer ${member.firstName} ${member.lastName}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteForm>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
