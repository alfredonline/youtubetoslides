import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import React from "react";
import { redirect } from "next/navigation";
import CheckoutPage from "@/components/CheckoutPage";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-900 text-center border m-10 rounded-md bg-gradient-to-tr bg-white">
      <CheckoutPage price={399} />
    </div>
  );
};

export default Page;
