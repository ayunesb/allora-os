
import React from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";
import { createCheckoutSession } from '@/utils/stripeHelpers';
import { toast } from 'sonner';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  priceId,
  buttonVariant = "default", 
  popular = false,
  emoji = "✅"
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  priceId?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
  emoji?: string;
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

export default function Pricing() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTablet = breakpoint === 'tablet';
  
  const tiers = [
    {
      title: "Starter",
      price: "$199",
      description: "Ideal for solopreneurs and small teams",
      features: [
        "Basic AI Strategy",
        "Campaign Proposals",
        "500 leads/month",
        "WhatsApp Notifications",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      emoji: "✨",
      priceId: "price_starter" // Replace with actual Stripe price ID
    },
    {
      title: "Growth",
      price: "$499",
      description: "Perfect for scaling startups and agencies",
      features: [
        "Full AI Executive Board",
        "Unlimited Strategies",
        "2,000 leads/month",
        "AI Bot Debates",
        "WhatsApp + Email Campaigns",
        "Priority support"
      ],
      buttonText: "Join Growth Plan",
      buttonVariant: "default" as const,
      popular: true,
      emoji: "🚀",
      priceId: "price_growth" // Replace with actual Stripe price ID
    },
    {
      title: "Enterprise",
      price: "$999",
      description: "For large teams and established companies",
      features: [
        "Everything from Growth plan",
        "Shopify AI Integrations",
        "Custom Zapier Automations",
        "AI Video Creation",
        "10,000 leads/month",
        "Dedicated API Access",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false,
      emoji: "🏢",
      priceId: undefined // Enterprise typically requires contacting sales
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className={`${isMobileView ? "text-2xl" : "text-4xl"} font-bold mb-4`}>
            Choose Your Executive Plan
          </h1>
          <p className={`${isMobileView ? "text-base" : "text-xl"} text-muted-foreground max-w-2xl mx-auto`}>
            Scale your business with AI-powered strategies and tools. All plans include a 14-day money-back guarantee.
          </p>
        </div>
        
        <div className={`grid gap-4 sm:gap-8 max-w-6xl mx-auto ${
          isMobileView 
            ? "grid-cols-1" 
            : isTablet 
              ? "grid-cols-2" 
              : "md:grid-cols-3"
        }`}>
          {tiers.map((tier, i) => (
            <PricingTier key={i} {...tier} />
          ))}
        </div>
        
        <div className="mt-12 md:mt-20 text-center max-w-3xl mx-auto">
          <h2 className={`${isMobileView ? "text-xl" : "text-2xl"} font-bold mb-4`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-medium mb-2">Can I change plans later?</h3>
              <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
                We accept all major credit cards, PayPal, and for Enterprise plans, we can also arrange invoicing.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Is there a limit on API usage?</h3>
              <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
                Each plan includes specified limits for leads, messages, and other resources. If you need more, you can upgrade to a higher plan or contact us for custom pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
