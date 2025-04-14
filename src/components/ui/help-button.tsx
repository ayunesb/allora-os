
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHelp } from "@/context/HelpContext";
import { HelpContent } from "@/types/help";

interface HelpButtonProps {
  helpContent: HelpContent;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export function HelpButton({
  helpContent,
  className,
  variant = "ghost",
  size = "icon",
  children,
}: HelpButtonProps) {
  const { setCurrentHelp, openHelp } = useHelp();

  const handleClick = () => {
    setCurrentHelp(helpContent);
    openHelp();
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("", className)}
      aria-label={`Help for ${helpContent.title}`}
    >
      {children || <HelpCircle className="h-4 w-4" />}
    </Button>
  );
}
