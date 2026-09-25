import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/lib/admin/actions/testimonials";

export const metadata: Metadata = { title: "Nouveau témoignage" };

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Nouveau témoignage</h1>
      <TestimonialForm action={createTestimonial} submitLabel="Créer le témoignage" />
    </div>
  );
}
