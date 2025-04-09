
import React from "react";

interface StrategyHeaderProps {
  title: string;
  subtitle?: string;
}

export default function StrategyHeader({ title, subtitle }: StrategyHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
