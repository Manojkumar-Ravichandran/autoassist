import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { apiError } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const [
      totalVehicles,
      brands,
      models,
      todayUpdates,
      recentAdded,
      recentUpdated,
    ] = await Promise.all([
      Vehicle.countDocuments(),

      Vehicle.distinct("brand"),

      Vehicle.distinct("model"),

      Vehicle.countDocuments({
        updatedAt: {
          $gte: today,
        },
      }),

      Vehicle.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),

      Vehicle.find()
        .sort({
          updatedAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        totalVehicles,

        totalBrands:
          brands.length,

        totalModels:
          models.length,

        todayUpdates,

        recentAdded,

        recentUpdated,
      },
    });
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to load dashboard"
    );
  }
}