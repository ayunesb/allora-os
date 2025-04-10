
import React from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "default", 
  popular = false
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  popular?: boolean;
}) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
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
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span className={`${isMobileView ? "text-xs" : "text-sm"}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className={isMobileView ? "px-4 py-3" : undefined}>
        <Button variant={buttonVariant} className="w-full">
          <Link to="/signup" className="w-full">
            {buttonText}
          </Link>
        </Button>
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
      description: "Perfect for small businesses and startups",
      features: [
        "Basic AI advisor consultation",
        "Monthly strategic insights",
        "Business health analytics",
        "Email support",
        "Up to 3 team members"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      title: "Professional",
      price: "$699",
      description: "Ideal for growing businesses",
      features: [
        "All Starter features",
        "Unlimited AI consultations",
        "Weekly strategic insights",
        "Custom growth strategies",
        "Priority support",
        "Up to 10 team members"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For established businesses with complex needs",
      features: [
        "All Professional features",
        "Dedicated account manager",
        "Custom AI model training",
        "API access",
        "Advanced analytics dashboard",
        "Unlimited team members",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className={`${isMobileView ? "text-2xl" : "text-4xl"} font-bold mb-4`}>
            Simple, Transparent Pricing
          </h1>
          <p className={`${isMobileView ? "text-base" : "text-xl"} text-muted-foreground max-w-2xl mx-auto`}>
            Choose the plan that's right for your business. All plans include a 14-day free trial.
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
              <h3 className="font-medium mb-2">Is there a long-term contract?</h3>
              <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
                No, all our plans are month-to-month with no long-term commitment required.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className={`text-muted-foreground ${isMobileView ? "text-sm" : ""}`}>
                We accept all major credit cards, PayPal, and for Enterprise plans, we can also arrange invoicing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
