
import React from "react";
import StrategyCard from "./StrategyCard";
import { Strategy } from "./useStrategies";
import { useBreakpoint } from "@/hooks/use-mobile";

interface StrategyGridProps {
  strategies: Strategy[];
}

export default function StrategyGrid({ strategies }: StrategyGridProps) {
  const breakpoint = useBreakpoint();
  
  const getGridCols = () => {
    switch(breakpoint) {
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-2';
      case 'laptop':
        return 'grid-cols-2';
      case 'desktop':
        return 'grid-cols-3';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };
  
  return (
    <div className={`grid ${getGridCols()} gap-4 sm:gap-6`}>
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
