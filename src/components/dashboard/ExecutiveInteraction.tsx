
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';

interface ExecutiveInteractionProps {
  riskAppetite: 'low' | 'medium' | 'high';
}

export function ExecutiveInteraction({ riskAppetite }: ExecutiveInteractionProps) {
  const navigate = useNavigate();
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  
  // Loading state
  if (!auth.profile) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            <Skeleton className="h-4 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-40 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const companyName = auth.profile?.company || "your company";

  // Get appropriate executive and message based on risk appetite
  const getExecutiveInfo = () => {
    switch (riskAppetite) {
      case 'low':
        return {
          name: "Financial Advisor",
          message: `Let's develop a conservative growth strategy for ${companyName} that minimizes risk while ensuring steady progress.`,
          image: "/executives/financial-advisor.png"
        };
      case 'high':
        return {
          name: "Growth Strategist",
          message: `I've analyzed your market and have some bold ideas that could significantly accelerate ${companyName}'s growth trajectory.`,
          image: "/executives/growth-strategist.png"
        };
      case 'medium':
      default:
        return {
          name: "Business Strategist",
          message: `I've been reviewing ${companyName}'s position and have some balanced strategies that could help optimize your results.`,
          image: "/executives/business-strategist.png"
        };
    }
  };

  const executiveInfo = getExecutiveInfo();

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Executive Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={executiveInfo.image} alt={executiveInfo.name} />
            <AvatarFallback>{executiveInfo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center sm:text-left w-full">
            <h3 className="font-semibold">{executiveInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{executiveInfo.message}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full sm:w-auto"
              onClick={() => navigate("/dashboard/debate")}
            >
              Start Strategy Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
