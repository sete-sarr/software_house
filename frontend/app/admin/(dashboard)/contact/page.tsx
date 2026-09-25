import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { adminFetch } from "@/lib/admin/api-client";

export const metadata: Metadata = { title: "Demandes de contact" };

interface ContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  projectType: string | null;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
}

const STATUS_LABELS: Record<ContactRequest["status"], string> = {
  NEW: "Nouvelle",
  CONTACTED: "Contactée",
  CLOSED: "Clôturée",
};

async function getContactRequests(): Promise<ContactRequest[]> {
  const response = await adminFetch("/contact");
  if (!response.ok) {
    throw new Error("Impossible de charger les demandes de contact.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminContactPage() {
  const requests = await getContactRequests();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Demandes de contact
        </h1>
        <p className="mt-2 text-sm text-muted">
          Demandes reçues via le formulaire /contact.
        </p>
      </div>

      <DataTable
        items={requests}
        getRowKey={(request) => request.id}
        emptyMessage="Aucune demande pour l'instant."
        columns={[
          {
            header: "Contact",
            render: (request) => `${request.firstName} ${request.lastName}`,
          },
          { header: "Entreprise", render: (request) => request.company ?? "—" },
          { header: "Email", render: (request) => request.email },
          { header: "Type de projet", render: (request) => request.projectType ?? "—" },
          {
            header: "Statut",
            render: (request) => <Badge>{STATUS_LABELS[request.status]}</Badge>,
          },
          {
            header: "Date",
            render: (request) => new Date(request.createdAt).toLocaleDateString("fr-FR"),
          },
          {
            header: "Actions",
            render: (request) => (
              <Link
                href={`/admin/contact/${request.id}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                aria-label={`Voir la demande de ${request.firstName} ${request.lastName}`}
              >
                <Eye className="h-4 w-4" />
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
