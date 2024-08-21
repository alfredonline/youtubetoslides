import React from "react";
const SingleFeatureCard = ({ feature }: { feature: any }) => {
  const { icon: Icon, title, description } = feature;

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/4">
      <div className="mb-12 group">
        <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-blue-500 text-white">
          <span className="absolute left-0 top-0 z-[-1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-2xl bg-blue-600 bg-opacity-20 duration-300 group-hover:rotate-45"></span>
          {<Icon className="h-12 w-12 inline-block" />}
        </div>
        <h3 className="mb-3 text-xl font-bold text-dark">{title}</h3>
        <p className="mb-8 text-body-color lg:mb-11">{description}</p>
      </div>
    </div>
  );
};

export default SingleFeatureCard;
