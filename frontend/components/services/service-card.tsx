import Link from "next/link";
import { Card } from "@/components/ui/card";
import { resolveIcon } from "@/lib/icon-map";

interface ServiceCardProps {
  service: {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { slug, title, shortDescription, icon } = service;
  const Icon = resolveIcon(icon);

  return (
    <Link href={`/services/${slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{shortDescription}</p>
      </Card>
    </Link>
  );
}
