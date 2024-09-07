import React from "react";

const SectionTitle = ({
  subtitle,
  title,
  paragraph,
  width = "635px",
  center,
}: {
  subtitle?: string;
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
}) => {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div
        className={`w-full px-4 ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width }}
      >
        {subtitle && (
          <span className="mb-2 block text-lg font-semibold text-primary">
            {subtitle}
          </span>
        )}
        <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px] md:leading-[1.2]">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-body-color sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
