import type { ApplicationFormValues } from "@/lib/schemas/application";

interface SubmitApplicationParams {
  values: ApplicationFormValues;
  cv: File;
  coverLetter?: File;
  jobOfferId?: string;
}

export async function submitApplication({
  values,
  cv,
  coverLetter,
  jobOfferId,
}: SubmitApplicationParams) {
  const formData = new FormData();
  if (jobOfferId) formData.append("jobOfferId", jobOfferId);
  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("email", values.email);
  if (values.phone) formData.append("phone", values.phone);
  if (values.message) formData.append("message", values.message);
  if (values.portfolioUrl) formData.append("portfolioUrl", values.portfolioUrl);
  if (values.linkedin) formData.append("linkedin", values.linkedin);
  if (values.github) formData.append("github", values.github);
  formData.append("cv", cv);
  if (coverLetter) formData.append("coverLetter", coverLetter);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message: unknown = data?.message;
    const errorMessage = Array.isArray(message) ? message.join(" ") : message;
    throw new Error(
      typeof errorMessage === "string"
        ? errorMessage
        : "Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.",
    );
  }

  return response.json();
}
