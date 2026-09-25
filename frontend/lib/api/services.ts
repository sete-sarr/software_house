import { cache } from "react";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ServiceSummary {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
}

export interface ServiceDetail extends ServiceSummary {
  problem: string;
  solution: string;
  benefits: string[];
  features: string[];
  technologies: string[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export const getServices = cache(async (): Promise<ServiceSummary[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Impossible de charger les services.");
  }

  const json: ApiEnvelope<ServiceSummary[]> = await response.json();
  return json.data;
});

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDetail | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${slug}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Impossible de charger ce service.");
  }

  const json: ApiEnvelope<ServiceDetail> = await response.json();
  return json.data;
});
