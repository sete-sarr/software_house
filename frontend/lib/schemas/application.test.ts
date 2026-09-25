import { describe, expect, it } from "vitest";
import { applicationSchema } from "./application";

const validPayload = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
};

describe("applicationSchema", () => {
  it("accepts a minimal valid payload", () => {
    const result = applicationSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = applicationSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed portfolio URL", () => {
    const result = applicationSchema.safeParse({ ...validPayload, portfolioUrl: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("accepts an empty string for optional URL fields", () => {
    const result = applicationSchema.safeParse({
      ...validPayload,
      portfolioUrl: "",
      linkedin: "",
      github: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid URLs for portfolio, linkedin and github", () => {
    const result = applicationSchema.safeParse({
      ...validPayload,
      portfolioUrl: "https://portfolio.example.com",
      linkedin: "https://linkedin.com/in/jean-dupont",
      github: "https://github.com/jean-dupont",
    });
    expect(result.success).toBe(true);
  });
});
