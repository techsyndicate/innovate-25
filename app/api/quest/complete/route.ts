import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { level, email } = await request.json();
    const reqUser = await User.findOne({ email });
    if (!level || !email) {
      return NextResponse.json({message: "Incomplete Request.", success: false})
    }
    if (!reqUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const currentQuests = reqUser.completedQuests;
    if (currentQuests.includes(level)) {
      return NextResponse.json({ message: "Quest has already been completed!", success: false });
    } else {
      currentQuests.push(level)
      await User.findOneAndUpdate({email}, {
        $set: {
          completedQuests: currentQuests
        }
      })
      return NextResponse.json({success: true})
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 }
    );
  }
}
