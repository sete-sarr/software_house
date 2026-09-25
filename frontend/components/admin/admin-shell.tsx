import Link from "next/link";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/admin/actions/auth";
import { AdminNavLinks } from "./admin-nav-links";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface p-4">
        <Link href="/admin" className="px-3 py-2 text-lg font-semibold tracking-tight">
          Agence<span className="text-primary">Tech</span>
        </Link>
        <div className="mt-6 flex-1">
          <AdminNavLinks />
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
