import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
export function HelpTooltip({
  content,
  className,
  iconClassName,
  side = "top",
  align = "center",
  children,
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex items-center", className)}>
            {children || (
              <HelpCircle
                className={cn(
                  "h-4 w-4 text-muted-foreground cursor-help",
                  iconClassName,
                )}
                aria-hidden="true"
              />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="max-w-[280px] text-xs"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
