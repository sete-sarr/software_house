"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ACCEPTED_FILE_TYPE,
  MAX_FILE_SIZE_BYTES,
  applicationSchema,
  type ApplicationFormValues,
} from "@/lib/schemas/application";
import { submitApplication } from "@/lib/services/applications";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function validateFile(file: File | undefined, required: boolean): string | undefined {
  if (!file) {
    return required ? "Le CV est obligatoire." : undefined;
  }
  if (file.type !== ACCEPTED_FILE_TYPE) {
    return "Seuls les fichiers PDF sont acceptés.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "Le fichier dépasse la taille maximale autorisée (5 Mo).";
  }
  return undefined;
}

interface ApplicationFormProps {
  jobOfferId?: string;
  jobTitle?: string;
}

export function ApplicationForm({ jobOfferId, jobTitle }: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const [cvFile, setCvFile] = useState<File | undefined>();
  const [coverLetterFile, setCoverLetterFile] = useState<File | undefined>();
  const [fileErrors, setFileErrors] = useState<{ cv?: string; coverLetter?: string }>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: ApplicationFormValues) => {
    const cvError = validateFile(cvFile, true);
    const coverLetterError = validateFile(coverLetterFile, false);

    if (cvError || coverLetterError) {
      setFileErrors({ cv: cvError, coverLetter: coverLetterError });
      return;
    }

    if (!cvFile) {
      return;
    }

    setStatus("loading");
    setSubmitError(null);

    try {
      await submitApplication({ values, cv: cvFile, coverLetter: coverLetterFile, jobOfferId });
      setStatus("success");
      reset();
      setCvFile(undefined);
      setCoverLetterFile(undefined);
      setFileErrors({});
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
      );
    }
  };

  if (status === "success") {
    return (
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Candidature envoyée</h3>
        <p className="max-w-md text-sm text-muted">
          Merci pour votre candidature. Nous l&apos;avons bien reçue et reviendrons vers vous
          rapidement.
        </p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
          Envoyer une autre candidature
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
        {jobTitle && (
          <p className="rounded-md bg-surface px-4 py-3 text-sm text-foreground">
            Vous postulez pour : <strong>{jobTitle}</strong>
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-foreground">
              Prénom *
            </label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-danger" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-foreground">
              Nom *
            </label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-danger" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email *
            </label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-danger" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Téléphone
            </label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="linkedin" className="text-sm font-medium text-foreground">
              LinkedIn
            </label>
            <Input id="linkedin" {...register("linkedin")} />
            {errors.linkedin && (
              <p className="text-sm text-danger" role="alert">
                {errors.linkedin.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="github" className="text-sm font-medium text-foreground">
              GitHub
            </label>
            <Input id="github" {...register("github")} />
            {errors.github && (
              <p className="text-sm text-danger" role="alert">
                {errors.github.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="portfolioUrl" className="text-sm font-medium text-foreground">
              Portfolio
            </label>
            <Input id="portfolioUrl" {...register("portfolioUrl")} />
            {errors.portfolioUrl && (
              <p className="text-sm text-danger" role="alert">
                {errors.portfolioUrl.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <Textarea id="message" rows={4} {...register("message")} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cv" className="text-sm font-medium text-foreground">
              CV (PDF, 5 Mo max) *
            </label>
            <input
              id="cv"
              type="file"
              accept="application/pdf"
              className="text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setCvFile(file);
                setFileErrors((prev) => ({ ...prev, cv: validateFile(file, true) }));
              }}
            />
            {fileErrors.cv && (
              <p className="text-sm text-danger" role="alert">
                {fileErrors.cv}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="coverLetter" className="text-sm font-medium text-foreground">
              Lettre de motivation (PDF, optionnel)
            </label>
            <input
              id="coverLetter"
              type="file"
              accept="application/pdf"
              className="text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setCoverLetterFile(file);
                setFileErrors((prev) => ({ ...prev, coverLetter: validateFile(file, false) }));
              }}
            />
            {fileErrors.coverLetter && (
              <p className="text-sm text-danger" role="alert">
                {fileErrors.coverLetter}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted">
          Les informations transmises via ce formulaire sont utilisées uniquement pour traiter
          votre candidature.
        </p>

        {status === "error" && submitError && (
          <div
            className="flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            <CircleAlert className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "loading" ? "Envoi en cours…" : "Envoyer ma candidature"}
        </Button>
      </form>
    </Card>
  );
}
