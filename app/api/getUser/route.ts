import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { email } = await request.json();

    const reqUser = await User.findOne({ email: email });
    if (!reqUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User found", user: reqUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occured while fetching user." },
      { status: 500 }
    );
  }
}
