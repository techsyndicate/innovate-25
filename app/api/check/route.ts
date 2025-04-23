import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import Restaurant from "@/models/restaurantSchema";

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

    const { email, restaurant, date, time, people } = await request.json();

    // const reqUser = await User.findOne({ email: email });
    // if (!reqUser) {
    //   return NextResponse.json(
    //     { message: "User not found", success: false },
    //     { status: 404 }
    //   );
    // }

    const reqRestaurant = await Restaurant.findOne({ name: restaurant });
    if (!reqRestaurant) {
      return NextResponse.json(
        { message: "Restaurant not found", success: false },
        { status: 404 }
      );
    }

    let foundTable;

    for (let i = 0; i < reqRestaurant.tables.length; i++) {
      console.log(i);
      if (reqRestaurant.tables[i].people == people) {
        foundTable = reqRestaurant.tables[i];
        for (let j = 0; j < reqRestaurant.tables[i].reservedDates.length; j++) {
          if (
            reqRestaurant.tables[i].reservedDates[j].date === date &&
            checkTimeBound(reqRestaurant.tables[i].reservedDates[j].time, time)
          ) {
            return NextResponse.json(
              {
                message: "Table already reserved for this date and time",
                success: false,
              },
              { status: 400 }
            );
          }
        }
      }
    }
    if (!foundTable) {
      return NextResponse.json(
        {
          message: "No table available for this number of people",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Table available", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while checking reservation.",
        success: false,
      },
      { status: 500 }
    );
  }
}
