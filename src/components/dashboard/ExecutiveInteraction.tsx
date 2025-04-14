
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ExecutiveInteractionProps {
  riskAppetite: 'low' | 'medium' | 'high';
}

export function ExecutiveInteraction({ riskAppetite }: ExecutiveInteractionProps) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const companyName = profile?.company || "your company";

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
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={executiveInfo.image} alt={executiveInfo.name} />
            <AvatarFallback>{executiveInfo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="font-semibold">{executiveInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{executiveInfo.message}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
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
