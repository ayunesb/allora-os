
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { BotInsight } from "./BotInsightCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatRoleTitle } from "@/utils/consultation";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface InsightDetailsDialogProps {
  insight: BotInsight | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InsightDetailsDialog({ 
  insight, 
  open, 
  onOpenChange 
}: InsightDetailsDialogProps) {
  if (!insight) return null;
  
  // Get route based on insight type
  const getRoute = () => {
    switch (insight.type) {
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
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="mb-2">
            <Badge>{insight.type.replace('_', ' ').toUpperCase()}</Badge>
          </div>
          <DialogTitle className="text-xl">{insight.title}</DialogTitle>
          <DialogDescription className="pt-2">
            Generated {new Date(insight.createdAt).toLocaleDateString()} by our AI executive team
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-base text-foreground">{insight.description}</p>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Primary Author</h3>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <Avatar>
                <AvatarImage 
                  src={insight.primaryBot.avatar} 
                  alt={insight.primaryBot.name} 
                />
                <AvatarFallback>{insight.primaryBot.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{insight.primaryBot.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatRoleTitle(insight.primaryBot.role)}
                </div>
              </div>
            </div>
          </div>
          
          {insight.collaborators.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Collaborators</h3>
              <div className="space-y-2">
                {insight.collaborators.map((collaborator, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 border-b border-muted last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{collaborator.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatRoleTitle(collaborator.role)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs italic text-muted-foreground">
                      {collaborator.contribution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t pt-4 flex justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            
            <Button asChild>
              <Link to={getRoute()}>
                <ExternalLink className="mr-1.5 h-4 w-4" />
                View in {insight.type === "strategy" 
                  ? "Strategies" 
                  : insight.type === "campaign" 
                    ? "Campaigns" 
                    : "Calls"}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
