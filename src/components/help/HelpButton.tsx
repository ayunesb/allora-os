
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
  try {
    const { openHelp, setCurrentHelp } = useHelp();
    
    const handleOpenHelp = () => {
      try {
        const helpContent = getHelpContent(contextId);
        if (helpContent) {
          setCurrentHelp(helpContent);
          openHelp();
        } else {
          toast.error("Help content not available for this section");
        }
      } catch (error) {
        console.error("Error opening help content:", error);
        toast.error("Could not load help content");
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
  } catch (error) {
    // Fallback when HelpProvider is not available
    console.warn("HelpButton: useHelp must be used within a HelpProvider");
    
    // Render a disabled button as fallback
    if (variant === "icon") {
      return (
        <Button
          variant="ghost"
          size="icon"
          disabled
          className={`h-9 w-9 rounded-full opacity-50 ${className}`}
          aria-label="Help unavailable"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      );
    }
    
    return (
      <Button
        variant="outline"
        disabled
        className={`h-9 px-3 opacity-50 ${className}`}
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Help
      </Button>
    );
  }
}
