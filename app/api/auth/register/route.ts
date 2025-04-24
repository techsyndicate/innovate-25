import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import Card from "@/models/cardSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { email, clerkId, name } = await request.json();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ email, clerkId, name });
    const newCard = new Card({ uid: newUser._id });
    await newCard.save();
    newUser.card = newCard._id;
    await newUser.save();
    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occured while saving user." },
      { status: 500 }
    );
  }
}
