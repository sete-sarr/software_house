import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateTestimonial } from "@/lib/admin/actions/testimonials";

export const metadata: Metadata = { title: "Modifier le témoignage" };

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  isPublished: boolean;
}

async function getTestimonial(id: string): Promise<Testimonial | null> {
  const response = await adminFetch(`/testimonials/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger ce témoignage.");
  const json = await response.json();
  return json.data;
}

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonial(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Modifier le témoignage de « {testimonial.authorName} »
      </h1>
      <TestimonialForm
        action={updateTestimonial.bind(null, testimonial.id)}
        defaultValues={testimonial}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
