import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
export function HelpTooltip({
  content,
  className,
  side = "top",
  align = "center",
  children,
  icon = true,
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex items-center", className)}>
            {children}
            {icon && (
              <HelpCircle className="ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="max-w-xs text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export function DocumentationLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-primary hover:underline text-sm"
    >
      <span>{label}</span>
      <ExternalLink className="ml-1 h-3 w-3" />
    </a>
  );
}
