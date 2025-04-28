import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import Restaurant from "@/models/restaurantSchema";
import Order from "@/models/orderSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { uid, menu } = await request.json();
    const reqUser = await User.findById(uid);
    if (!reqUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const restaurant = "Morgott’s Omen King Tandoor";

    let price = 0;
    for (let i = 0; i < menu.length; i++) {
      const item = menu[i];
      if (item.quantity > 0) {
        price += item.price * item.quantity;
      }
    }

    price += price * 0.18;
    price += price * 0.05;
    price = Math.round(price * 100) / 100;

    let order = [];

    for (let i = 0; i < menu.items.length; i++) {
      const item = menu.items[i];
      console.log(item);
      order.push(item);
    }

    const newOrder = new Order({
      uid: reqUser._id,
      restaurant: restaurant,
      menu: order,
      price: price,
    });
    await newOrder.save();
    return NextResponse.json(
      { message: "Order placed successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while placing the order.", success: false },
      { status: 500 }
    );
  }
}
