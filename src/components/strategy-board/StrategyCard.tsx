
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";

interface StrategyCardProps {
  title: string;
  description: string;
  risk: string;
}

export default function StrategyCard({ title, description, risk }: StrategyCardProps) {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  // Map risk level to appropriate styling
  const getRiskBadgeVariant = () => {
    switch (risk) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };
  
  return (
    <div className={cn(
      "dashboard-card group transition-all duration-300 hover:shadow-lg hover:scale-[1.01]",
      "h-full flex flex-col justify-between"
    )}>
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{title}</h3>
          <Badge variant={getRiskBadgeVariant()} className="capitalize whitespace-nowrap text-xs shrink-0">
            {risk} Risk
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm sm:text-base line-clamp-3 mb-4">
          {description}
        </p>
      </div>
      
      <div className={cn(
        "flex flex-wrap gap-2 mt-4",
        isMobile ? "justify-center" : "sm:justify-between"
      )}>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 touch-target h-9"
        >
          <Eye size={16} /> View
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex items-center gap-1 touch-target h-9",
              !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity" 
            )}
          >
            <Edit size={16} /> Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex items-center gap-1 touch-target h-9 text-destructive hover:text-destructive",
              !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            <Trash2 size={16} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
