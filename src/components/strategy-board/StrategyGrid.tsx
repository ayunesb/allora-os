
import React from "react";
import StrategyCard from "./StrategyCard";
import { Strategy } from "./useStrategies";
import { useBreakpoint, getResponsiveGridCols } from "@/hooks/use-mobile";

interface StrategyGridProps {
  strategies: Strategy[];
}

export default function StrategyGrid({ strategies }: StrategyGridProps) {
  const breakpoint = useBreakpoint();
  
  // Get responsive grid columns based on breakpoint
  const gridCols = getResponsiveGridCols(breakpoint);
  
  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-6`}>
      {strategies.map((strategy, index) => (
        <StrategyCard 
          key={index}
          title={strategy.title}
          description={strategy.description}
          risk={strategy.risk}
        />
      ))}
    </div>
  );
}
