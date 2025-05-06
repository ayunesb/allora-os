import React from "react";
import { Badge } from "@/components/ui/badge";
import { Flame, ThermometerSnowflake, ThermometerSun } from "lucide-react";
import { cn } from "@/lib/utils";
export const LeadScoreBadge = ({
  score,
  className = "",
  showIcon = true,
  pulsing = false,
}) => {
  const badges = {
    hot: {
      icon: <Flame className="h-3 w-3 mr-1" />,
      class:
        "bg-gradient-to-r from-risk-high-DEFAULT to-risk-high-dark/80 border-risk-high-DEFAULT/30",
    },
    warm: {
      icon: <ThermometerSun className="h-3 w-3 mr-1" />,
      class:
        "bg-gradient-to-r from-risk-medium-DEFAULT to-risk-medium-dark/80 border-risk-medium-DEFAULT/30",
    },
    cold: {
      icon: <ThermometerSnowflake className="h-3 w-3 mr-1" />,
      class:
        "bg-gradient-to-r from-risk-low-DEFAULT to-risk-low-dark/80 border-risk-low-DEFAULT/30",
    },
  };
  return (
    <Badge
      className={cn(
        badges[score].class,
        "text-white font-medium transition-all border shadow-sm",
        pulsing && (score === "hot" ? "animate-pulse-slow" : ""),
        className,
      )}
    >
      {showIcon && badges[score].icon}
      {score.charAt(0).toUpperCase() + score.slice(1)}
    </Badge>
  );
};
