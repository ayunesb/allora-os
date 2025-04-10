
import React from 'react';
import Navbar from "@/components/Navbar";
import { useBreakpoint } from "@/hooks/use-mobile";
import PricingTier from "@/components/pricing/PricingTier";
import PricingHeader from "@/components/pricing/PricingHeader";
import FAQSection from "@/components/pricing/FAQSection";
import { pricingTiers, faqItems } from "@/components/pricing/pricingData";

export default function Pricing() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTablet = breakpoint === 'tablet';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <PricingHeader 
          title="Choose Your Executive Plan" 
          description="Scale your business with AI-powered strategies and tools. All plans include a 14-day money-back guarantee."
        />
        
        <div className={`grid gap-4 sm:gap-8 max-w-6xl mx-auto ${
          isMobileView 
            ? "grid-cols-1" 
            : isTablet 
              ? "grid-cols-2" 
              : "md:grid-cols-3"
        }`}>
          {pricingTiers.map((tier, i) => (
            <PricingTier key={i} {...tier} />
          ))}
        </div>
        
        <FAQSection 
          title="Frequently Asked Questions" 
          items={faqItems} 
        />
      </div>
    </div>
  );
}
