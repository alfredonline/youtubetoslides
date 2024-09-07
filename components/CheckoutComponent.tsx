"use client";
import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, buttonVariants } from "@/components/ui/button";
import { Result } from "postcss";

const CheckoutComponent = ({ price }: { price: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message!);
      setLoading(false);
      return;
    }

    const { error } = await stripe
      .confirmPayment({
        elements,
        clientSecret,
        redirect: "always",
        confirmParams: {
          return_url: `http://localhost:3000/payment-success?amount=${price}`,
        },
      })
      .then((result) => {
        throw new Error("Failed to confirm payment");
      });

    if (error) {
      throw new Error("An error occurrred. Please try again later.");
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && (
        <div className="text-red-500 text-sm font-bold p-2 bg-red-100 rounded-md mt-10">
          {errorMessage}
        </div>
      )}

      <Button
        disabled={!stripe || loading}
        className={buttonVariants({
          variant: "default",
          className: "mt-4 w-full",
        })}
      >
        {loading ? "Confirming Payment..." : `Pay $${3.99}`}
      </Button>
    </form>
  );
};

export default CheckoutComponent;
