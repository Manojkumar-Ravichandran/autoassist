import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const mobile = pathname === "/mobile" || pathname.startsWith("/api/mobile/") || pathname === "/manifest.webmanifest" || pathname === "/sw.js";
  const authRoute = pathname.startsWith("/api/auth/") || pathname === "/login" || pathname === "/download" || pathname.startsWith("/downloads/");
  if (!mobile && !authRoute && !isAdminRequest(request)) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ message: "Administrator sign in required" }, { status: 401 });
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/).*)"] };
