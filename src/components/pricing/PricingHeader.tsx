import React from "react";
import { useBreakpoint } from "@/hooks/use-mobile";
const PricingHeader = ({ title, description }) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (
    <div className="text-center mb-8 md:mb-16">
      <h1
        className={`${isMobileView ? "text-2xl" : "text-4xl"} font-bold mb-4`}
      >
        {title}
      </h1>
      <p
        className={`${isMobileView ? "text-base" : "text-xl"} text-muted-foreground max-w-2xl mx-auto`}
      >
        {description}
      </p>
    </div>
  );
};
export default PricingHeader;
