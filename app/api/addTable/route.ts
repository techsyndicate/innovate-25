import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Restaurant from "@/models/restaurantSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { name, number, people } = await request.json();

    const modifiedRestaurant = await Restaurant.findOneAndUpdate(
      { name },
      {
        $push: {
          tables: {
            number,
            people,
            reservedDates: [],
          },
        },
      }
    );
    console.log(modifiedRestaurant);

    return NextResponse.json(
      {
        message: "Table added to restaurant",
        restaurant: modifiedRestaurant,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while saving restaurant.", success: false },
      { status: 500 }
    );
  }
}
