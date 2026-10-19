import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

const COOKIE = "autoassist_admin";
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminToken() {
  const value = `${Date.now() + 7 * 24 * 60 * 60 * 1000}`;
  return `${value}.${signature(value)}`;
}

export function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !secret()) return false;
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || Number(expires) < Date.now()) return false;
  const expected = signature(expires);
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const adminCookieName = COOKIE;
