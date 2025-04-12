
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger" | "primary" | "gradient";
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ProgressBar({ 
  value, 
  max, 
  className, 
  variant = "default", 
  showValue = false, 
  size = "md",
  animated = false
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  const variantClasses = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    primary: "bg-blue-500",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600"
  };
  
  return (
    <div className="w-full">
      <div className={cn("w-full bg-muted/30 rounded-full overflow-hidden", sizeClasses[size], className)}>
        <div 
          className={cn(
            variantClasses[variant],
            "h-full transition-all duration-500 ease-in-out", 
            animated && "animate-pulse-slow"
          )}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-muted-foreground">
          {value}/{max} ({percent.toFixed(0)}%)
        </div>
      )}
    </div>
  );
}
