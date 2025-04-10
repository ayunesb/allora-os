
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { useBreakpoint } from "@/hooks/use-mobile";
import PricingTier from "@/components/pricing/PricingTier";
import PricingHeader from "@/components/pricing/PricingHeader";
import FAQSection from "@/components/pricing/FAQSection";
import PlanComparisonTable from "@/components/pricing/PlanComparisonTable";
import { pricingTiers, faqItems, featureComparison } from "@/components/pricing/pricingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Pricing() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTablet = breakpoint === 'tablet';
  const [showComparison, setShowComparison] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <PricingHeader 
          title="Choose Your Executive Plan" 
          description="Scale your business with AI-powered strategies and tools. All plans include a 14-day money-back guarantee."
        />
        
        <Tabs defaultValue="plans" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="compare">Compare Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="mt-0">
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
            
            {!isMobileView && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setShowComparison(!showComparison)}
                  className="group"
                >
                  {showComparison ? "Hide Detailed Comparison" : "Show Detailed Comparison"}
                  {showComparison ? (
                    <ChevronUp className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </Button>
                
                {showComparison && (
                  <div className="mt-6 animate-fade-in">
                    <PlanComparisonTable featureData={featureComparison} />
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="compare" className="mt-0">
            <PlanComparisonTable featureData={featureComparison} />
          </TabsContent>
        </Tabs>
        
        <FAQSection 
          title="Frequently Asked Questions" 
          items={faqItems} 
        />
      </div>
    </div>
  );
}
