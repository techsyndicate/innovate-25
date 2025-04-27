import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import Merch from "@/models/merchSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { name, price, description } = await request.json();

    const newMerch = new Merch({
      name,
      price,
      description,
    });
    await newMerch.save();
    return NextResponse.json(
      { message: "Merch created", merch: newMerch, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while saving merch.", success: false },
      { status: 500 }
    );
  }
}
