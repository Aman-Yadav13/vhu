import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/config/stripe";

export async function POST(req: NextRequest) {
  const headersList = headers();
  const doctorData = await req.json();
  //   console.log(doctorData);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: doctorData.name,
            },
            unit_amount: 500 * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${headersList.get("origin")}/payment-success`,
      cancel_url: `${headersList.get("origin")}/payment-error`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
