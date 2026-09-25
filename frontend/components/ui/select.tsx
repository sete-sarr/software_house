import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { inputStyles } from "./input";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(inputStyles, className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = "Select";
