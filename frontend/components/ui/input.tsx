import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const inputStyles =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputStyles, className)} {...props} />
  ),
);
Input.displayName = "Input";
