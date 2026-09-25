import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { inputStyles } from "./input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(inputStyles, className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
