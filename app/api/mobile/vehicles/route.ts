import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";

function withAppCors(response: NextResponse) {
  // This endpoint only returns active vehicle master data and is read-only.
  // A wildcard lets Android WebView origins reach the deployed API regardless
  // of whether Capacitor reports https://localhost or capacitor://localhost.
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return withAppCors(response);
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const data = await Vehicle.find({ status: "active" }).sort({ brand: 1, model: 1 }).lean();
    return withAppCors(NextResponse.json({ data, syncedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } }));
  } catch {
    return withAppCors(NextResponse.json({ message: "Could not sync vehicle data" }, { status: 503 }));
  }
}
