import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Software House — Agence de développement web, mobile & logiciel",
    template: "%s | Software House",
  },
  description:
    "Software House conçoit et développe des applications web, mobiles, plateformes SaaS et solutions d'intelligence artificielle pour les entreprises qui veulent accélérer leur transformation numérique.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Software House",
    url: siteUrl,
    title: "Software House — Agence de développement web, mobile & logiciel",
    description:
      "Conception et développement de plateformes web, mobiles et logicielles sur mesure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software House — Agence de développement web, mobile & logiciel",
    description:
      "Conception et développement de plateformes web, mobiles et logicielles sur mesure.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Software House",
  url: siteUrl,
  description:
    "Software House conçoit et développe des applications web, mobiles, plateformes SaaS et solutions d'intelligence artificielle pour les entreprises qui veulent accélérer leur transformation numérique.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
