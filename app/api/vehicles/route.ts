import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { apiError } from "@/lib/api";

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const search =
      searchParams
        .get("search")
        ?.trim() || "";

    const brand =
      searchParams.get("brand") || "";

    const fuelType =
      searchParams.get("fuelType") || "";

    const transmission =
      searchParams.get(
        "transmission"
      ) || "";

    const year =
      searchParams.get("year") || "";

    const status =
      searchParams.get("status") || "";

    const page = Math.max(
      Number(
        searchParams.get("page") || 1
      ),
      1
    );

    const limit = Math.min(
      Math.max(
        Number(
          searchParams.get("limit") ||
            10
        ),
        1
      ),
      100
    );

    const filter: Record<
      string,
      unknown
    > = {};

    if (search) {
      filter.$or = [
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },

        {
          model: {
            $regex: search,
            $options: "i",
          },
        },

        {
          variant: {
            $regex: search,
            $options: "i",
          },
        },

        {
          engineCode: {
            $regex: search,
            $options: "i",
          },
        },

        {
          fuelType: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (brand) {
      filter.brand = {
        $regex: `^${brand}$`,
        $options: "i",
      };
    }

    if (fuelType) {
      filter.fuelType = fuelType;
    }

    if (transmission) {
      filter.transmission =
        transmission;
    }

    if (year) {
      filter.productionYear =
        Number(year);
    }

    if (status) {
      filter.status = status;
    }

    const skip =
      (page - 1) * limit;

    const [
      vehicles,
      total,
    ] = await Promise.all([
      Vehicle.find(filter)
        .sort({
          updatedAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Vehicle.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      data: vehicles,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    });
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to fetch vehicles"
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body =
      await request.json();

    if (
      !body.brand?.trim() ||
      !body.model?.trim()
    ) {
      return apiError(
        "Brand and model are required",
        400
      );
    }

    const vehicle =
      await Vehicle.create(body);

    return NextResponse.json(
      {
        success: true,

        message:
          "Vehicle created successfully",

        data: vehicle,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return apiError(
      "Failed to create vehicle"
    );
  }
}