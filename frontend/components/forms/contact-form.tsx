"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BUDGET_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact";
import { submitContactRequest } from "@/lib/services/contact";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false },
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("loading");
    setSubmitError(null);

    try {
      await submitContactRequest(values);
      setStatus("success");
      reset({ consent: false });
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
      );
    }
  };

  if (status === "success") {
    return (
      <Card className="flex flex-col items-center gap-3 py-16 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Message envoyé</h3>
        <p className="max-w-md text-sm text-muted">
          Merci pour votre message. Nous revenons vers vous rapidement.
        </p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
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
            <label htmlFor="company" className="text-sm font-medium text-foreground">
              Entreprise
            </label>
            <Input id="company" {...register("company")} />
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
            <label htmlFor="projectType" className="text-sm font-medium text-foreground">
              Type de projet
            </label>
            <Select id="projectType" {...register("projectType")}>
              <option value="">Sélectionner…</option>
              {PROJECT_TYPE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="budget" className="text-sm font-medium text-foreground">
              Budget indicatif
            </label>
            <Select id="budget" {...register("budget")}>
              <option value="">Sélectionner…</option>
              {BUDGET_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="timeline" className="text-sm font-medium text-foreground">
              Délai souhaité
            </label>
            <Select id="timeline" {...register("timeline")}>
              <option value="">Sélectionner…</option>
              {TIMELINE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Décrivez votre projet *
            </label>
            <Textarea id="message" rows={5} {...register("message")} />
            {errors.message && (
              <p className="text-sm text-danger" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2 text-sm text-muted">
            <Checkbox className="mt-0.5" {...register("consent")} />
            <span>
              J&apos;accepte que mes données soient utilisées pour être recontacté(e) au sujet de
              ma demande. *
            </span>
          </label>
          {errors.consent && (
            <p className="text-sm text-danger" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

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
          {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </form>
    </Card>
  );
}
