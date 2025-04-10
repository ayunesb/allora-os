
import React from "react";
import { Strategy } from "@/models/strategy";
import StrategyCard from "./StrategyCard";
import { useBreakpoint } from "@/hooks/use-mobile";

interface StrategyGridProps {
  strategies: Strategy[];
  onDebate: (strategy: Strategy) => void;
  onExport: (strategy: Strategy) => void;
}

export default function StrategyGrid({ strategies, onDebate, onExport }: StrategyGridProps) {
  const breakpoint = useBreakpoint();
  const colsClass = 
    breakpoint === 'xs' || breakpoint === 'mobile' ? 'grid-cols-1' :
    breakpoint === 'tablet' ? 'grid-cols-2' : 
    breakpoint === 'desktop' ? 'grid-cols-3' : 'grid-cols-4';
  
  return (
    <div className={`grid ${colsClass} gap-4 sm:gap-6 pb-10`}>
      {strategies.map((strategy) => (
        <StrategyCard 
          key={strategy.id} 
          strategy={strategy} 
          onDebate={() => onDebate(strategy)}
          onExport={() => onExport(strategy)}
        />
      ))}
    </div>
  );
}
