import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/admin/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(ADMIN_ACCESS_COOKIE);

  if (!hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
