import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId, amount } = await req.json();
  console.log(userId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Add Balance to Card",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
