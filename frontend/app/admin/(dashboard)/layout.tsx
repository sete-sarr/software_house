import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { hasAdminSession } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: {
    default: "Administration",
    template: "%s | Administration",
  },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
