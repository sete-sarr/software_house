"use client";

import { useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message ?? "Identifiants invalides.");
      }

      window.location.href = "/admin";
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Mot de passe
          </label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && (
          <div
            className="flex items-center gap-2 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            <CircleAlert className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </Card>
  );
}
