
import React, { ReactNode } from "react";

interface StrategyHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function StrategyHeader({ title, subtitle, children }: StrategyHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 pb-4 gap-4">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm sm:text-base">{subtitle}</p>}
      </div>
      
      <div className="flex flex-wrap gap-2 self-start">
        {children}
      </div>
    </div>
  );
}
