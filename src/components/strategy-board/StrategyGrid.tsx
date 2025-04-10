
import React from "react";
import { Strategy } from "./useStrategies";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRoleTitle } from "@/utils/consultation";
import { ArrowRight, Lightbulb } from "lucide-react";

interface StrategyGridProps {
  strategies: Strategy[];
}

export default function StrategyGrid({ strategies }: StrategyGridProps) {
  const { getDetailedInsight } = useCompanyInsights();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {strategies.map((strategy) => {
        const isAiGenerated = !!strategy.aiGenerated;
        const detailedInsight = isAiGenerated && 
          getDetailedInsight(strategy.id.replace('ai-', ''));
        
        return (
          <Card 
            key={strategy.id} 
            className={`rounded-lg hover:shadow-md transition-all ${
              isAiGenerated ? 'border-amber-200/50' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge 
                  variant={
                    strategy.risk === "High" ? "destructive" : 
                    strategy.risk === "Low" ? "secondary" : "outline"
                  }
                >
                  {strategy.risk} Risk
                </Badge>
                
                {isAiGenerated && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                    <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
                    AI Generated
                  </Badge>
                )}
              </div>
              
              <h3 className="text-xl font-bold">{strategy.title}</h3>
              
              {isAiGenerated && strategy.primaryBot && (
                <div className="flex items-center mt-1 mb-1">
                  <Avatar className="h-5 w-5 mr-1.5">
                    <AvatarImage 
                      src={strategy.primaryBot.avatar} 
                      alt={strategy.primaryBot.name} 
                    />
                    <AvatarFallback>{strategy.primaryBot.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <span>{strategy.primaryBot.name}</span>
                    <span className="text-muted-foreground ml-1">
                      ({formatRoleTitle(strategy.primaryBot.role)})
                    </span>
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              {detailedInsight?.keyPoints ? (
                <div className="space-y-1.5 mb-4">
                  {detailedInsight.keyPoints.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-blue-500 shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm mb-4">
                  {strategy.description}
                </p>
              )}
              
              <div className="text-xs text-muted-foreground">
                Created: {new Date(strategy.created_at).toLocaleDateString()}
              </div>
            </CardContent>
            
            <CardFooter className="pt-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to={`/dashboard/strategies?id=${strategy.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
