import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobOfferForm } from "@/components/admin/job-offer-form";
import { adminFetch } from "@/lib/admin/api-client";
import { updateJobOffer } from "@/lib/admin/actions/jobs";

export const metadata: Metadata = { title: "Modifier l'offre" };

interface JobOffer {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  type: string;
  description: string;
  requirements: string | null;
  status: string;
}

async function getJobOffer(id: string): Promise<JobOffer | null> {
  const response = await adminFetch(`/jobs/id/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Impossible de charger cette offre.");
  const json = await response.json();
  return json.data;
}

export default async function EditJobOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobOffer(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Modifier « {job.title} »
      </h1>
      <JobOfferForm
        action={updateJobOffer.bind(null, job.id)}
        defaultValues={job}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
