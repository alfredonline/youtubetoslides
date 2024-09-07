import { verifyPaymentWasMade } from "@/lib/actions";
import React from "react";
import Image from "next/image";

const Page = async ({
  searchParams: { payment_intent_client_secret, redirect_status },
}: {
  searchParams: {
    payment_intent_client_secret: string;
    redirect_status: string;
  };
}) => {
  if (!payment_intent_client_secret) {
    <div className="text-red-500">
      Something isn't right. Please email us if you think this is an error.
    </div>;
  }

  if (redirect_status !== "succeeded") {
    return (
      <div className="text-red-500">
        Payment failed. If ou think this is an error on our end, please email
        us.
      </div>
    );
  }

  try {
    const confirmPayment = await verifyPaymentWasMade(
      payment_intent_client_secret
    );

    return (
      <div className="text-center p-8 flex flex-col gap-8 items-center justify-center w-full text-gray-900 text-2xl font-bold">
        {confirmPayment.success && (
          <Image
            src="/images/success.svg"
            alt="Success"
            width={400}
            height={400}
            className="mx-auto mt-20"
          />
        )}
        <p className="text-2xl font-bold">
          {confirmPayment.success && "Payment successful!"}
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        <Image
          src="/images/error.svg"
          alt="Error"
          width={400}
          height={400}
          className="mx-auto mt-20"
        />
        <p className="text-2xl font-bold">Payment failed</p>
      </div>
    );
  }
};

export default Page;
