import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
