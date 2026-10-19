import {
  NextRequest,
  NextResponse,
} from "next/server";

import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { apiError } from "@/lib/api";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: Context
) {
  try {
    const { id } =
      await context.params;

    if (
      !mongoose.isValidObjectId(id)
    ) {
      return apiError(
        "Invalid vehicle id",
        400
      );
    }

    await connectDB();

    const vehicle =
      await Vehicle.findById(id).lean();

    if (!vehicle) {
      return apiError(
        "Vehicle not found",
        404
      );
    }

    return NextResponse.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to fetch vehicle"
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } =
      await context.params;

    if (
      !mongoose.isValidObjectId(id)
    ) {
      return apiError(
        "Invalid vehicle id",
        400
      );
    }

    await connectDB();

    const body =
      await request.json();

    const vehicle =
      await Vehicle.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!vehicle) {
      return apiError(
        "Vehicle not found",
        404
      );
    }

    return NextResponse.json({
      success: true,

      message:
        "Vehicle updated successfully",

      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to update vehicle"
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: Context
) {
  try {
    const { id } =
      await context.params;

    if (
      !mongoose.isValidObjectId(id)
    ) {
      return apiError(
        "Invalid vehicle id",
        400
      );
    }

    await connectDB();

    const vehicle =
      await Vehicle.findByIdAndDelete(
        id
      );

    if (!vehicle) {
      return apiError(
        "Vehicle not found",
        404
      );
    }

    return NextResponse.json({
      success: true,

      message:
        "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to delete vehicle"
    );
  }
}