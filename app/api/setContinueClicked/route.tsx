import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { userId } = await request.json();

    const reqUser = await User.findById(userId);
    if (!reqUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    reqUser.seenQuests = true;
    await reqUser.save();

    return NextResponse.json({ message: "Success", success: true });
  } catch (error) {
    console.error("Error in setContinueClicked:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
