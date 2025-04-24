import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import Restaurant from "@/models/restaurantSchema";
import Card from "@/models/cardSchema";

function checkTimeBound(reservedTime: string, givenTime: string): boolean {
  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const reserved = toMinutes(reservedTime);
  const given = toMinutes(givenTime);

  const diff = Math.abs(reserved - given);

  return diff <= 120 || diff >= 1440 - 120;
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { userId, restaurant, date, time, people } = await request.json();

    const reqUser = await User.findById(userId);
    if (!reqUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const reqRestaurant = await Restaurant.findOne({ name: restaurant });
    if (!reqRestaurant) {
      return NextResponse.json(
        { message: "Restaurant not found", success: false },
        { status: 404 }
      );
    }
    const reqCard = await Card.findOne({ uid: reqUser._id });
    if (!reqCard) {
      return NextResponse.json(
        { message: "Card not found", success: false },
        { status: 404 }
      );
    }

    for (let i = 0; i < reqRestaurant.tables.length; i++) {
      if (reqRestaurant.tables[i].people == people) {
        reqRestaurant.tables[i].reservedDates.push({ date, time });
        await reqRestaurant.save();

        reqCard.reservations.push({
          restaurant,
          date,
          time,
          people,
          tableNumber: i + 1,
        });
        await reqCard.save();
        return NextResponse.json(
          {
            message: "Table reserved successfully",
            success: true,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "No table available for this number of people",
        success: false,
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while reserving the table." },
      { status: 500 }
    );
  }
}
