import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user: KindeUser | null = await getUser();

    const userInDB = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
    });

    if (!userInDB) {
      return NextResponse.json(
        { error: "User not found in the database" },
        { status: 404 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 399,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    await prisma.user.update({
      where: {
        id: userInDB.id,
      },
      data: {
        currentSecretForPayment: paymentIntent.client_secret,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal server error: ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
