import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, createAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword || username !== expectedUser || password !== expectedPassword) {
    return NextResponse.json({ message: "Invalid administrator credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(adminCookieName, createAdminToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
