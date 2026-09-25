import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  email: z.string().min(1, "L'email est requis.").email("Adresse email invalide."),
  phone: z.string().optional(),
  message: z.string().optional(),
  portfolioUrl: z.string().url("URL invalide.").optional().or(z.literal("")),
  linkedin: z.string().url("URL invalide.").optional().or(z.literal("")),
  github: z.string().url("URL invalide.").optional().or(z.literal("")),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_FILE_TYPE = "application/pdf";
