import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Paradigital";
export const SITE_TAGLINE = "Des idées au digital";
export const SITE_TITLE = `${SITE_NAME} — Agence de développement web, mobile & logiciel`;
export const SITE_DESCRIPTION = `${SITE_NAME} conçoit et développe des applications web, mobiles, plateformes SaaS et solutions d'intelligence artificielle pour les entreprises qui veulent accélérer leur transformation numérique.`;

/**
 * Social share image. Set explicitly on every page: a page-level `openGraph` object replaces
 * the parent's, so an image inherited from the root layout would otherwise be dropped.
 */
export const SHARE_IMAGE = {
  url: "/brand/paradigital-og.jpg",
  width: 1200,
  height: 630,
  alt: `Logo ${SITE_NAME} — ${SITE_TAGLINE}`,
};

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
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
