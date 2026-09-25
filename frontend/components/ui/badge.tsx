import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
