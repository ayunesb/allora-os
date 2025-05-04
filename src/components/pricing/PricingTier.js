import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
const PricingTier = ({ title, price, description, features, buttonText, priceId, buttonVariant = "default", popular = false, emoji = "✅", isRecommended = false, isEnterprise = false, currentPlan = false }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'mobile'].includes(breakpoint);
    const { subscribeToPlan, isSubscribing, subscription } = useSubscription();
    const handleSubscribe = async () => {
        if (isEnterprise) {
            toast.info("Please contact our sales team for enterprise plans");
            return;
        }
        if (!priceId) {
            toast.info("Please contact sales for this plan");
            return;
        }
        // If user is already subscribed to this plan
        if (currentPlan) {
            toast.info("You are already subscribed to this plan");
            return;
        }
        try {
            await subscribeToPlan(priceId);
        }
        catch (error) {
            console.error("Error creating checkout:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };
    // Custom badge component
    const Badge = ({ children, variant }) => {
        const bgColor = variant === 'popular' ? 'bg-primary' :
            variant === 'recommended' ? 'bg-green-600' : 'bg-blue-600';
        const textColor = 'text-white';
        return (<div className={`py-1 px-4 ${bgColor} ${textColor} text-center text-sm font-medium`}>
        {children}
      </div>);
    };
    return (<Card className={`flex flex-col ${popular ? 'border-primary shadow-lg' : isRecommended ? 'border-green-500 shadow-lg' : currentPlan ? 'border-blue-500 shadow-lg' : ''}`}>
      {popular && <Badge variant="popular">Most Popular</Badge>}
      {isRecommended && <Badge variant="recommended">Recommended</Badge>}
      {currentPlan && <Badge variant="current">Current Plan</Badge>}
      
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
          {features.map((feature, i) => (<li key={i} className="flex items-start">
              <span className="mr-2 text-primary">{emoji}</span>
              <span className={`${isMobileView ? "text-xs" : "text-sm"}`}>{feature}</span>
            </li>))}
        </ul>
      </CardContent>
      <CardFooter className={isMobileView ? "px-4 py-3" : undefined}>
        {isEnterprise ? (<TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={buttonVariant} className="w-full" onClick={handleSubscribe}>
                  Contact Sales
                  <Info className="h-4 w-4 ml-2 opacity-70"/> 
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enterprise plans include custom pricing and features</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>) : currentPlan ? (<Button variant="outline" className="w-full cursor-default" disabled>
            Current Plan
          </Button>) : priceId ? (<Button variant={buttonVariant} className="w-full" onClick={handleSubscribe} disabled={isSubscribing}>
            {isSubscribing ? "Processing..." : buttonText}
          </Button>) : (<Button variant={buttonVariant} className="w-full">
            <Link to="/signup" className="w-full">
              {buttonText}
            </Link>
          </Button>)}
      </CardFooter>
    </Card>);
};
export default PricingTier;
