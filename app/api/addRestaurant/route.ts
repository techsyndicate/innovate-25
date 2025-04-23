import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Restaurant from "@/models/restaurantSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { name, location, demigod } = await request.json();

    const newRestaurant = new Restaurant({
      name,
      location,
      demigod,
    });
    await newRestaurant.save();
    return NextResponse.json(
      { message: "Restaurant created", restaurant: newRestaurant },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while saving restaurant." },
      { status: 500 }
    );
  }
}
