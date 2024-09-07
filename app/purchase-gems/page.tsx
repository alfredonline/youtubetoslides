import GemPurchaseCard from "@/components/cards/GemPurchaseCard";
import SectionTitle from "@/components/common/SectionTitle";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex flex-col justify-center gap-16 mt-10 p-4">
      <SectionTitle
        title="Pricing"
        paragraph="No subscription. No hidden fees. Just pay for what you use."
        center={true}
      />
      <GemPurchaseCard
        cost={3.99}
        gemCount={20}
        subtitle="Generate and download 20 presentations"
        title="20 gems"
        features={[
          "Generate and download 20 presentations.",
          "About 0.19 cents per presentation.",
          "Generate high quality presentations for your classes.",
        ]}
        disabled={!user}
        center={true}
      />
    </div>
  );
};

export default Page;
