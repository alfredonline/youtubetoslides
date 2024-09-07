"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutComponent from "./CheckoutComponent";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Stripe public key not found");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutPage = ({ price }: { price: number }) => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold  mb-2 mt-8">Purchase 20 gems</h1>
        <h2 className="text-2xl">$3.99</h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{ mode: "payment", amount: 399, currency: "usd" }}
      >
        <CheckoutComponent price={price} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
