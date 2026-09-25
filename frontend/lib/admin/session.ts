import { cookies } from "next/headers";
import { ADMIN_ACCESS_COOKIE } from "./constants";

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_ACCESS_COOKIE)?.value ?? null;
}

export async function hasAdminSession() {
  return (await getAdminAccessToken()) !== null;
}
