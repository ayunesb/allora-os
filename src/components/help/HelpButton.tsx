
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface HelpButtonProps {
  contextId?: string;
  variant?: "text" | "icon" | "outline" | "default" | "premium";
}

export function HelpButton({ contextId = "general", variant = "outline" }: HelpButtonProps) {
  return (
    <Button 
      variant={variant === "premium" ? "premium" : variant === "text" ? "link" : variant === "icon" ? "ghost" : variant}
      size="sm"
      className="gap-1"
      aria-label="Get help"
    >
      <HelpCircle className="size-4" />
      {variant !== "icon" && "Help"}
    </Button>
  );
}
