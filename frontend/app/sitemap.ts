import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getServices } from "@/lib/api/services";
import { getJobOffers } from "@/lib/api/jobs";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/realisations", changeFrequency: "weekly", priority: 0.7 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.6 },
  { path: "/carrieres", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [services, jobOffers] = await Promise.all([
    getServices().catch(() => []),
    getJobOffers().catch(() => []),
  ]);

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const jobEntries: MetadataRoute.Sitemap = jobOffers.map((job) => ({
    url: `${SITE_URL}/carrieres/${job.slug}`,
    lastModified: job.publishedAt ? new Date(job.publishedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...jobEntries];
}
