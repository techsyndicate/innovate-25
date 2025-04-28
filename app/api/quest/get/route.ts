import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Quest from "@/models/questSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const allQuests = await Quest.find();
    return NextResponse.json({
      success: true,
      quests: allQuests,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again.", success: false },
      { status: 500 }
    );
  }
}
