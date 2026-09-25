import { describe, expect, it } from "vitest";
import { buildMetadata } from "./seo";

describe("buildMetadata", () => {
  it("sets the canonical URL from the given path", () => {
    const metadata = buildMetadata({
      title: "Services",
      description: "Nos services.",
      path: "/services",
    });

    expect(metadata.alternates?.canonical).toBe("/services");
  });

  it("always includes siteName, locale and type in openGraph", () => {
    const metadata = buildMetadata({
      title: "À propos",
      description: "Notre mission.",
      path: "/a-propos",
    });

    expect(metadata.openGraph).toMatchObject({
      siteName: "Software House",
      locale: "fr_FR",
      type: "website",
      title: "À propos",
      description: "Notre mission.",
    });
  });

  it("includes a twitter summary_large_image card", () => {
    const metadata = buildMetadata({
      title: "Contact",
      description: "Parlons de votre projet.",
      path: "/contact",
    });

    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Contact",
      description: "Parlons de votre projet.",
    });
  });
});
