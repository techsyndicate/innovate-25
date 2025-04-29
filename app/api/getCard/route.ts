import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Card from "@/models/cardSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { uid } = await request.json();
    if (!uid) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 }
      );
    }

    const card = await Card.findOne({ uid });
    if (!card) {
      return NextResponse.json(
        { message: "Card not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ card, success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching card.",
        success: false,
      },
      { status: 500 }
    );
  }
}
