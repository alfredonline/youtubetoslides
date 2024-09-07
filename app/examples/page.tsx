import PresentationCard from "@/components/cards/PresentationCard";
import SectionTitle from "@/components/common/SectionTitle";
import { examples } from "@/data";
import { GeneratedPowerpoint } from "@/types";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-8">
        <SectionTitle
          title="Examples"
          paragraph="Here are some examples of the presentations that you can create using our platform."
        />
        <div className="gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid mt-4">
        {examples.map((example: any) => {
            return <PresentationCard key={example.id} presentation={example} />;
          })}

        </div>
      </div>
    </div>
  );
};

export default Page;
