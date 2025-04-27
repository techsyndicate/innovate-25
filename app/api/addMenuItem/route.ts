import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Restaurant from "@/models/restaurantSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const {
      name,
      item,
      price,
      rating,
      bestseller,
      description,
      veg,
      mealType,
    } = await request.json();

    const existingRestaurant = await Restaurant.findOne({ name });
    if (!existingRestaurant) {
      return NextResponse.json(
        { message: "Restaurant not found", success: false },
        { status: 404 }
      );
    }
    const modifiedRestaurant = await Restaurant.findOneAndUpdate(
      { name },
      {
        $push: {
          menu: {
            name: item,
            price: price,
            rating: rating,
            bestseller: bestseller,
            veg: veg,
            description: description,
            mealType: mealType,
          },
        },
      },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Item added to restaurant",
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
