import Image from "next/image";
import Link from "next/link";
import markImage from "@/public/brand/paradigital-mark.png";
import { SITE_NAME } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  /** Above-the-fold usage (navbar): load the mark eagerly instead of lazily. */
  eager?: boolean;
}

/**
 * Brand lockup: the "P" mark as an image + the wordmark as live text, so the name stays
 * sharp, accessible and readable on both light and dark backgrounds.
 */
export function BrandLogo({ className, eager = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} — accueil`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <Image
        src={markImage}
        alt=""
        loading={eager ? "eager" : "lazy"}
        className="h-8 w-auto"
        sizes="40px"
      />
      <span className="text-lg font-bold uppercase tracking-tight text-foreground">
        Para<span className="text-primary">digital</span>
      </span>
    </Link>
  );
}
