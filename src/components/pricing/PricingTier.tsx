
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";
import { createCheckoutSession } from '@/utils/stripeHelpers';
import { toast } from 'sonner';

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  priceId?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
  emoji?: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  priceId,
  buttonVariant = "default", 
  popular = false,
  emoji = "✅"
}) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const handleSubscribe = async () => {
    if (!priceId) {
      toast.info("Please contact sales for this plan");
      return;
    }
    
    try {
      const success = await createCheckoutSession(priceId);
      if (!success) {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  
  return (
    <Card className={`flex flex-col ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="py-1 px-4 bg-primary text-primary-foreground text-center text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader className={isMobileView ? "px-4 py-3" : undefined}>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground"> /month</span>}
        </div>
      </CardHeader>
      <CardContent className={`flex-1 ${isMobileView ? "px-4 py-3 pt-0" : ""}`}>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-primary">{emoji}</span>
              <span className={`${isMobileView ? "text-xs" : "text-sm"}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className={isMobileView ? "px-4 py-3" : undefined}>
        {priceId ? (
          <Button variant={buttonVariant} className="w-full" onClick={handleSubscribe}>
            {buttonText}
          </Button>
        ) : (
          <Button variant={buttonVariant} className="w-full">
            <Link to="/signup" className="w-full">
              {buttonText}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PricingTier;
