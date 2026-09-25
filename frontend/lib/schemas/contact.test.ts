import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

const validPayload = {
  firstName: "Alex",
  lastName: "Martin",
  email: "alex.martin@example.com",
  message: "Nous avons besoin d'une plateforme SaaS.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a missing first name", () => {
    const result = contactSchema.safeParse({ ...validPayload, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing message", () => {
    const result = contactSchema.safeParse({ ...validPayload, message: "" });
    expect(result.success).toBe(false);
  });

  it("rejects consent set to false", () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("accepts optional fields such as company and budget when provided", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      company: "Acme",
      budget: "15000-50000",
    });
    expect(result.success).toBe(true);
  });
});
