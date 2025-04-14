
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  content: React.ReactNode;
  className?: string;
  iconClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
}

export function HelpTooltip({
  content,
  className,
  iconClassName,
  side = "top",
  align = "center",
  children,
}: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex items-center", className)}>
            {children || (
              <HelpCircle 
                className={cn("h-4 w-4 text-muted-foreground cursor-help", iconClassName)} 
                aria-hidden="true"
              />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="max-w-[280px] text-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
