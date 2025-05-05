import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Skeleton } from '@/components/ui/skeleton';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';
export default function CeoMessage({ riskAppetite }) {
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const navigate = useNavigate();
    // Loading state
    if (!auth.profile) {
        return (<Card className="border-primary/20">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between pb-2 space-y-2 sm:space-y-0">
          <div className="space-y-1 text-center sm:text-left">
            <Skeleton className="h-5 w-48 mx-auto sm:mx-0"/>
            <Skeleton className="h-4 w-64 mx-auto sm:mx-0"/>
          </div>
          <Skeleton className="h-8 w-8 rounded-full"/>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full"/>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-36 ml-auto"/>
        </CardFooter>
      </Card>);
    }
    // Get company name from profile or use default
    const companyName = auth.profile?.company || "your company";
    const industry = auth.profile?.industry || "your industry";
    // Define dynamic content based on risk appetite
    const getMessageContent = () => {
        switch (riskAppetite) {
            case 'low':
                return {
                    title: "Conservative Strategy Overview",
                    message: `We've developed a conservative approach for ${companyName} focusing on stable, sustainable growth in ${industry}. Our analysis shows potential for measured expansion while minimizing exposure to market volatility.`,
                    icon: <TrendingDown className="h-5 w-5 text-risk-low"/>,
                    cardClass: "border-risk-low bg-risk-low",
                    titleClass: "text-risk-low",
                    textClass: "text-risk-low-DEFAULT dark:text-risk-low-dark",
                    buttonClass: "text-white bg-risk-low-DEFAULT hover:bg-risk-low-dark"
                };
            case 'high':
                return {
                    title: "Aggressive Growth Strategy",
                    message: `Our analysis indicates several high-potential opportunities for ${companyName} in ${industry}. While these approaches carry higher risk, they also offer significantly greater returns and market disruption potential.`,
                    icon: <TrendingUp className="h-5 w-5 text-risk-high"/>,
                    cardClass: "border-risk-high bg-risk-high",
                    titleClass: "text-risk-high",
                    textClass: "text-risk-high-DEFAULT dark:text-risk-high-dark",
                    buttonClass: "text-white bg-risk-high-DEFAULT hover:bg-risk-high-dark"
                };
            case 'medium':
            default:
                return {
                    title: "Balanced Strategy Overview",
                    message: `We've analyzed ${companyName}'s position in ${industry} and developed a balanced approach combining stable growth with strategic opportunities. This provides a mix of reliable returns and potential for breakthrough results.`,
                    icon: <Lightbulb className="h-5 w-5 text-risk-medium"/>,
                    cardClass: "border-risk-medium bg-risk-medium",
                    titleClass: "text-risk-medium",
                    textClass: "text-risk-medium-DEFAULT dark:text-risk-medium-dark",
                    buttonClass: "text-white bg-risk-medium-DEFAULT hover:bg-risk-medium-dark"
                };
        }
    };
    const content = getMessageContent();
    return (<Card className={content.cardClass}>
      <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between pb-2 space-y-2 sm:space-y-0">
        <div className="space-y-1 text-center sm:text-left">
          <CardTitle className={`text-lg ${content.titleClass}`}>{content.title}</CardTitle>
          <CardDescription className={`${content.textClass}`}>
            AI-generated strategy based on your business profile
          </CardDescription>
        </div>
        <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
          {content.icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${content.textClass}`}>{content.message}</p>
      </CardContent>
      <CardFooter className="flex justify-center sm:justify-end">
        <Button variant="ghost" size="sm" className={`flex items-center gap-1 ${content.buttonClass}`} onClick={() => navigate("/dashboard/strategy")}>
          View Full Strategy
          <ArrowRight className="h-4 w-4"/>
        </Button>
      </CardFooter>
    </Card>);
}
