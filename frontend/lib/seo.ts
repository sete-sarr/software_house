import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Software House";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
