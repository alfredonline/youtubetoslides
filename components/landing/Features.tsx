import React from "react";
import SectionTitle from "../common/SectionTitle";
import { features } from "@/data";
import SingleFeatureCard from "../cards/SingleFeatureCard";

const Features = () => {
  return (
    <section className="pb-8 pt-20 lg:pb-[-70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="Benefits of using YouTubeToSlides"
          title="Why choose us?"
          paragraph="Our platform is designed to make your life easier. We automate the process of converting YouTube videos into PowerPoint presentations, saving you time and effort."
        />
        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
        {features.map((feature, i) => (
          <SingleFeatureCard key={i} feature={feature} />
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default Features;
