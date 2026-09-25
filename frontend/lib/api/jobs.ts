import { cache } from "react";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface JobOffer {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  type: "CDI" | "CDD" | "FREELANCE" | "STAGE";
  description: string;
  requirements: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
}

export const JOB_TYPE_LABELS: Record<JobOffer["type"], string> = {
  CDI: "CDI",
  CDD: "CDD",
  FREELANCE: "Freelance",
  STAGE: "Stage",
};

export const getJobOffers = cache(async (): Promise<JobOffer[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Impossible de charger les offres d'emploi.");
  }

  const json: ApiEnvelope<JobOffer[]> = await response.json();
  return json.data;
});

export const getJobOfferBySlug = cache(async (slug: string): Promise<JobOffer | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${slug}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Impossible de charger cette offre.");
  }

  const json: ApiEnvelope<JobOffer> = await response.json();
  return json.data;
});
