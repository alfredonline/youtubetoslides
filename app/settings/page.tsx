import SectionTitle from "@/components/common/SectionTitle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { redirect } from "next/navigation";

const Page = async () => {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <SectionTitle
        title="Settings"
        paragraph="Configure your account settings."
      />
      <p className="mt-10 text-lg">
        To delete your account, please contact support.
      </p>
    </div>
  );
};

export default Page;
