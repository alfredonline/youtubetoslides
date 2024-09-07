import { RunAuthCheck } from "@/lib/helpers";
import React from "react";
import { redirect } from "next/navigation";

const Page = async () => {
  const checkUser = await RunAuthCheck();

  console.log("we are checking the user")

  if (checkUser.success) {
    console.log("user is all good")
    redirect("/dashboard");
  }

  if (!checkUser.success) {
    return <div>something went wrong. Please contact support.</div>
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">Authenticating...</h1>
        <p className="text-gray-500">Please wait while we authenticate you.</p>
      </div>
    </div>
  );
};

export default Page;
