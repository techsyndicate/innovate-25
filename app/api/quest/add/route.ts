import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Quest from "@/models/questSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { questNumber, title, description } = await request.json();
    const newQuest = new Quest({ description, title, questNumber });
    await newQuest.save();
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 }
    );
  }
}
