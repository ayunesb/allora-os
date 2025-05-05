import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BarChart2, FileDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function StrategyCard({ strategy, onDebate, onExport, onClick }) {
    // Determine the risk level from any of the possible properties
    const riskLevel = strategy.risk || strategy.risk_level || "Medium";
    // Create a mapping of risk levels to badge variants and color classes
    const getRiskStyles = (risk) => {
        switch (risk) {
            case "Low":
                return {
                    variant: "outline",
                    className: "bg-risk-low border-risk-low text-risk-low-DEFAULT dark:text-risk-low-dark"
                };
            case "High":
                return {
                    variant: "outline",
                    className: "bg-risk-high border-risk-high text-risk-high-DEFAULT dark:text-risk-high-dark"
                };
            case "Medium":
            default:
                return {
                    variant: "outline",
                    className: "bg-risk-medium border-risk-medium text-risk-medium-DEFAULT dark:text-risk-medium-dark"
                };
        }
    };
    const riskStyles = getRiskStyles(riskLevel);
    // Format the date for display
    const formattedDate = new Date(strategy.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    // Get avatar for the executive bot
    const executiveInitials = strategy.executiveBot
        ? strategy.executiveBot.substring(0, 2).toUpperCase()
        : "AI";
    // Generate a consistent avatar background color based on the executive name
    const getAvatarColor = (name) => {
        const colors = [
            "bg-blue-500", "bg-green-500", "bg-purple-500",
            "bg-amber-500", "bg-rose-500", "bg-cyan-500"
        ];
        // Simple hash function to get consistent color
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };
    const avatarColor = getAvatarColor(strategy.executiveBot || "AI");
    return (<Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={`capitalize ${riskStyles.className}`}>
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
        
        {strategy.executiveBot && (<div className="flex items-center mt-4 text-xs text-muted-foreground">
            <Avatar className="h-5 w-5 mr-2">
              <AvatarFallback className={`text-[10px] ${avatarColor} text-white`}>
                {executiveInitials}
              </AvatarFallback>
            </Avatar>
            Proposed by: {strategy.executiveBot}
          </div>)}
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => onDebate(strategy)}>
          <MessageSquare className="h-4 w-4 mr-1"/>
          <span className="hidden sm:inline">Debate</span>
        </Button>
        
        <Button variant="ghost" size="sm" onClick={() => onClick(strategy)}>
          <BarChart2 className="h-4 w-4 mr-1"/>
          <span className="hidden sm:inline">View</span>
        </Button>
        
        <Button variant="ghost" size="sm" onClick={() => onExport(strategy)}>
          <FileDown className="h-4 w-4 mr-1"/>
          <span className="hidden sm:inline">Export</span>
        </Button>
      </CardFooter>
    </Card>);
}
