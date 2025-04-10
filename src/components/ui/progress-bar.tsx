
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn("w-full bg-muted rounded-full overflow-hidden", className)}>
      <div 
        className="bg-primary h-full transition-all duration-500 ease-in-out"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}
