import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import Card from "@/models/cardSchema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  await connectDb();

  const { sessionId } = await req.json();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const userId = session.metadata?.userId;

  if (!userId) {
    return NextResponse.json({ error: "User ID not found" }, { status: 400 });
  }
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (session.payment_status === "paid") {
    const card = await Card.findById(user.card);

    for (let i = 0; i < card.transactions.length; i++) {
      if (card.transactions[i].sessionId === sessionId) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    }
    card.transactions.push({
      sessionId: sessionId,
      amount: session.amount_total! / 100,
      date: new Date(),
    });

    card.balance += session.amount_total! / 100;
    await card.save();
    console.log("Transaction added to card:", card.transactions);

    console.log(card.balance);
  } else {
    return NextResponse.json(
      { error: "Payment not successful" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
