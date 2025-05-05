import React from 'react';
import { useBreakpoint } from "@/hooks/use-mobile";
const FAQSection = ({ title, items }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'mobile'].includes(breakpoint);
    return (<div className="mt-12 md:mt-20 text-center max-w-3xl mx-auto">
      <h2 className={`${isMobileView ? "text-xl" : "text-2xl"} font-bold mb-4`}>
        {title}
      </h2>
      <div className="space-y-6 text-left">
        {items.map((item, index) => (<div key={index}>
            <h3 className="font-medium mb-2">{item.question}</h3>
            <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
              {item.answer}
            </p>
          </div>))}
      </div>
    </div>);
};
export default FAQSection;
