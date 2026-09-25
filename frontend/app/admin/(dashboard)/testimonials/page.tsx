import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { DeleteForm } from "@/components/admin/delete-form";
import { adminFetch } from "@/lib/admin/api-client";
import { deleteTestimonial } from "@/lib/admin/actions/testimonials";

interface Testimonial {
  id: string;
  authorName: string;
  company: string | null;
  isPublished: boolean;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const response = await adminFetch("/testimonials/admin/all");
  if (!response.ok) {
    throw new Error("Impossible de charger les témoignages.");
  }
  const json = await response.json();
  return json.data;
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Témoignages</h1>
        <ButtonLink href="/admin/testimonials/new">
          <Plus className="h-4 w-4" />
          Nouveau témoignage
        </ButtonLink>
      </div>

      <DataTable
        items={testimonials}
        getRowKey={(testimonial) => testimonial.id}
        emptyMessage="Aucun témoignage pour l'instant."
        columns={[
          { header: "Auteur", render: (testimonial) => testimonial.authorName },
          { header: "Entreprise", render: (testimonial) => testimonial.company ?? "—" },
          {
            header: "Statut",
            render: (testimonial) => (
              <Badge>{testimonial.isPublished ? "Publié" : "Brouillon"}</Badge>
            ),
          },
          {
            header: "Actions",
            render: (testimonial) => (
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
                  aria-label={`Modifier ${testimonial.authorName}`}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteForm
                  action={deleteTestimonial.bind(null, testimonial.id)}
                  confirmMessage={`Supprimer le témoignage de ${testimonial.authorName} ?`}
                >
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 text-danger"
                    aria-label={`Supprimer ${testimonial.authorName}`}
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
