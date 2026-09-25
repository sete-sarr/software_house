import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Connexion administration",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="flex flex-col items-center gap-8">
        <span className="text-lg font-semibold tracking-tight">
          Agence<span className="text-primary">Tech</span> — Administration
        </span>
        <LoginForm />
      </div>
    </div>
  );
}
