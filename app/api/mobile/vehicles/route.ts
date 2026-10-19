import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";

export async function GET() {
  try {
    await connectDB();
    const data = await Vehicle.find({ status: "active" }).sort({ brand: 1, model: 1 }).lean();
    return NextResponse.json({ data, syncedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Could not sync vehicle data" }, { status: 503 });
  }
}
