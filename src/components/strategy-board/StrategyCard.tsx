
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Strategy } from "@/models/strategy";
import { MessageSquare, BarChart2, FileDown, User } from "lucide-react";

interface StrategyCardProps {
  strategy: Strategy;
  onDebate: (strategy: Strategy) => void;
  onExport: (strategy: Strategy) => void;
  onClick: (strategy: Strategy) => void;
}

export default function StrategyCard({ strategy, onDebate, onExport, onClick }: StrategyCardProps) {
  // Determine the risk level from any of the possible properties
  const riskLevel = strategy.risk || strategy.risk_level || "Medium";
  
  // Create a mapping of risk levels to badge variants
  const riskBadgeVariant = {
    "Low": "success",
    "Medium": "warning",
    "High": "destructive"
  }[riskLevel] as "success" | "warning" | "destructive" | "default";
  
  // Format the date for display
  const formattedDate = new Date(strategy.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={riskBadgeVariant} className="capitalize">
            {riskLevel} Risk
          </Badge>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <CardTitle className="cursor-pointer hover:text-primary transition-colors" onClick={() => onClick(strategy)}>
          {strategy.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3em]">
          {strategy.description}
        </p>
        
        {strategy.executiveBot && (
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1" />
            Proposed by: {strategy.executiveBot}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => onDebate(strategy)}>
          <MessageSquare className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Debate</span>
        </Button>
        
        <Button variant="ghost" size="sm" onClick={() => onClick(strategy)}>
          <BarChart2 className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">View</span>
        </Button>
        
        <Button variant="ghost" size="sm" onClick={() => onExport(strategy)}>
          <FileDown className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
