import { NextResponse } from "next/server";

export function apiError(
  message: string,
  status = 500
) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}