import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { resolveIcon } from "@/lib/icon-map";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
  message: string;
  icon: string;
  align?: "left" | "center";
}

export function ComingSoon({ eyebrow, title, description, message, icon, align = "left" }: ComingSoonProps) {
  const Icon = resolveIcon(icon);

  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align={align} />

        <Reveal
          className={cn(
            "mt-12 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center",
            align === "center" && "mx-auto max-w-lg",
          )}
        >
          <Icon className="h-8 w-8 text-muted" />
          <p className="text-sm font-medium text-muted">{message}</p>
        </Reveal>
      </Container>
    </section>
  );
}
