
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export type InsightType = "strategy" | "campaign" | "call_script";

export interface BotInsight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  primaryBot: {
    name: string;
    role: string;
    avatar: string;
  };
  collaborators: Array<{
    name: string;
    role: string;
    contribution: string;
  }>;
  createdAt: Date;
}

interface BotInsightCardProps {
  insight: BotInsight;
  onViewDetails: (insight: BotInsight) => void;
}

export default function BotInsightCard({ insight, onViewDetails }: BotInsightCardProps) {
  // Get destination based on insight type
  const getDestination = (type: InsightType) => {
    switch (type) {
      case "strategy":
        return "/dashboard/strategies";
      case "campaign":
        return "/dashboard/campaigns";
      case "call_script":
        return "/dashboard/calls";
      default:
        return "/dashboard";
    }
  };

  // Get badge color based on insight type
  const getBadgeVariant = (type: InsightType) => {
    switch (type) {
      case "strategy":
        return "default";
      case "campaign":
        return "secondary";
      case "call_script":
        return "outline";
      default:
        return "default";
    }
  };

  // Get display label based on insight type
  const getTypeLabel = (type: InsightType) => {
    switch (type) {
      case "strategy":
        return "Strategy";
      case "campaign":
        return "Campaign";
      case "call_script":
        return "Call Script";
      default:
        return "Insight";
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant={getBadgeVariant(insight.type)} className="mb-2">
            {getTypeLabel(insight.type)}
          </Badge>
          <div className="text-xs text-muted-foreground">
            {new Date(insight.createdAt).toLocaleDateString()}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{insight.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center mt-1">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage 
                src={insight.primaryBot.avatar || `/avatars/${insight.primaryBot.name.toLowerCase().replace(/\s+/g, '-')}.png`} 
                alt={insight.primaryBot.name}
              />
              <AvatarFallback>{insight.primaryBot.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{insight.primaryBot.name}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{insight.description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={() => onViewDetails(insight)}
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          View details
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs" 
          asChild
        >
          <Link to={getDestination(insight.type)}>
            <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
            Go to {getTypeLabel(insight.type)}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
