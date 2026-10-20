import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";

function withAppCors(response: NextResponse, origin: string | null) {
  if (origin === "https://localhost" || origin === "capacitor://localhost" || origin === "http://localhost") {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }
  return response;
}

export async function OPTIONS(request: Request) {
  const response = new NextResponse(null, { status: 204 });
  withAppCors(response, request.headers.get("origin"));
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const data = await Vehicle.find({ status: "active" }).sort({ brand: 1, model: 1 }).lean();
    return withAppCors(NextResponse.json({ data, syncedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } }), request.headers.get("origin"));
  } catch {
    return withAppCors(NextResponse.json({ message: "Could not sync vehicle data" }, { status: 503 }), request.headers.get("origin"));
  }
}
