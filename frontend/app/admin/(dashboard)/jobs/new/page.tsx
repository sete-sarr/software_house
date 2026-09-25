import type { Metadata } from "next";
import { JobOfferForm } from "@/components/admin/job-offer-form";
import { createJobOffer } from "@/lib/admin/actions/jobs";

export const metadata: Metadata = { title: "Nouvelle offre" };

export default function NewJobOfferPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Nouvelle offre</h1>
      <JobOfferForm action={createJobOffer} submitLabel="Créer l'offre" />
    </div>
  );
}
