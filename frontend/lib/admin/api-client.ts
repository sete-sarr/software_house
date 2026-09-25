import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_MAX_AGE,
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
} from "./constants";
import { getAdminAccessToken } from "./session";

/**
 * Read-only fetch for Server Components. No refresh-on-401: cookies can't be
 * mutated during Server Component rendering, so an expired token here simply
 * surfaces as an API error for the page to handle.
 */
export async function adminFetch(path: string, init?: RequestInit) {
  const token = await getAdminAccessToken();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
}

async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const newAccessToken: string = data.data.accessToken;

  cookieStore.set(ADMIN_ACCESS_COOKIE, newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  return newAccessToken;
}

/**
 * Authenticated fetch for use inside Server Actions. Cookies can be mutated
 * here, so a 401 triggers one silent refresh-and-retry before giving up.
 */
export async function adminApiRequest(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  let token = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  const doFetch = (accessToken?: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });

  let response = await doFetch(token);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      token = refreshed;
      response = await doFetch(token);
    }
  }

  return response;
}
