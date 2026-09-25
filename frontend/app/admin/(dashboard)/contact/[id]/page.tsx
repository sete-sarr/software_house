import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateContactStatus, deleteContactRequest } from "@/lib/admin/actions/contact";

export const metadata: Metadata = { title: "Détail de la demande" };

interface ContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  phone: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  consent: boolean;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
}

const STATUS_LABELS: Record<ContactRequest["status"], string> = {
  NEW: "Nouvelle",
  CONTACTED: "Contactée",
  CLOSED: "Clôturée",
};

async function getContactRequest(id: string): Promise<ContactRequest | null> {
  const response = await adminFetch(`/contact/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger cette demande.");
  const json = await response.json();
  return json.data;
}

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await getContactRequest(id);

  if (!request) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {request.firstName} {request.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {request.company ?? "Particulier / indépendant"} ·{" "}
            {new Date(request.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
        <Badge>{STATUS_LABELS[request.status]}</Badge>
      </div>

      <Card className="flex flex-col gap-4">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted">Email</dt>
            <dd className="text-foreground">
              <a href={`mailto:${request.email}`} className="hover:text-primary">
                {request.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Téléphone</dt>
            <dd className="text-foreground">{request.phone ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Type de projet</dt>
            <dd className="text-foreground">{request.projectType ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Budget indicatif</dt>
            <dd className="text-foreground">{request.budget ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Délai souhaité</dt>
            <dd className="text-foreground">{request.timeline ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">Consentement RGPD</dt>
            <dd className="text-foreground">{request.consent ? "Accordé" : "Non accordé"}</dd>
          </div>
        </dl>

        <div>
          <dt className="text-sm font-medium text-muted">Message</dt>
          <dd className="mt-1 whitespace-pre-wrap text-foreground">{request.message}</dd>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-foreground">Statut</h2>
        <form
          action={updateContactStatus.bind(null, request.id)}
          className="flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Nouveau statut
            </label>
            <Select id="status" name="status" defaultValue={request.status}>
              <option value="NEW">Nouvelle</option>
              <option value="CONTACTED">Contactée</option>
              <option value="CLOSED">Clôturée</option>
            </Select>
          </div>
          <Button type="submit" size="sm">
            Mettre à jour
          </Button>
        </form>
      </Card>

      <div className="flex justify-between">
        <Link href="/admin/contact" className="text-sm text-muted hover:text-foreground">
          ← Retour à la liste
        </Link>
        <DeleteForm
          action={deleteContactRequest.bind(null, request.id)}
          confirmMessage={`Supprimer la demande de "${request.firstName} ${request.lastName}" ?`}
        >
          <Button type="submit" variant="secondary" size="sm" className="text-danger">
            Supprimer la demande
          </Button>
        </DeleteForm>
      </div>
    </div>
  );
}
