import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Restaurant from "@/models/restaurantSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { name } = await request.json();
    const existingRestaurant = await Restaurant.findOne({
      name,
    });
    if (!existingRestaurant) {
      return NextResponse.json(
        { message: "Restaurant not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Restaurant found",
        restaurant: existingRestaurant,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching restaurant.",
        success: false,
      },
      { status: 500 }
    );
  }
}
