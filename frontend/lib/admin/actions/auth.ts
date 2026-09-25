"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_ACCESS_COOKIE, ADMIN_REFRESH_COOKIE } from "@/lib/admin/constants";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ACCESS_COOKIE);
  cookieStore.delete(ADMIN_REFRESH_COOKIE);
  redirect("/admin/login");
}
