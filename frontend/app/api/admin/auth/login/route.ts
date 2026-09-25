import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_MAX_AGE,
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/lib/admin/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { success: false, message: "Email et mot de passe requis." },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    return NextResponse.json(
      { success: false, message: data?.message ?? "Identifiants invalides." },
      { status: backendResponse.status },
    );
  }

  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set(ADMIN_ACCESS_COOKIE, data.data.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  cookieStore.set(ADMIN_REFRESH_COOKIE, data.data.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return NextResponse.json({ success: true });
}
