
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useHelp } from "@/context/HelpContext";
import { getHelpContent } from "@/utils/help/helpContent";
import { toast } from "sonner";

interface HelpButtonProps {
  contextId: string;
  variant?: "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function HelpButton({ 
  contextId, 
  variant = "icon", 
  size = "md", 
  className = ""
}: HelpButtonProps) {
  const { openHelp, setCurrentHelp } = useHelp();
  
  const handleOpenHelp = () => {
    const helpContent = getHelpContent(contextId);
    if (helpContent) {
      setCurrentHelp(helpContent);
      openHelp();
    } else {
      toast.error("Help content not available for this section");
    }
  };
  
  // Size mappings
  const sizeClasses = {
    sm: variant === "icon" ? "h-7 w-7" : "h-7 px-2 text-xs",
    md: variant === "icon" ? "h-9 w-9" : "h-9 px-3",
    lg: variant === "icon" ? "h-10 w-10" : "h-10 px-4"
  };
  
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenHelp}
        className={`${sizeClasses[size]} rounded-full ${className}`}
        aria-label="Get help"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <Button
      variant="outline"
      onClick={handleOpenHelp}
      className={`${sizeClasses[size]} ${className}`}
    >
      <HelpCircle className="h-4 w-4 mr-2" />
      Help
    </Button>
  );
}
