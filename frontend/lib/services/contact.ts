import type { ContactFormValues } from "@/lib/schemas/contact";

export async function submitContactRequest(values: ContactFormValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message: unknown = data?.message;
    const errorMessage = Array.isArray(message) ? message.join(" ") : message;
    throw new Error(
      typeof errorMessage === "string"
        ? errorMessage
        : "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
    );
  }

  return response.json();
}
