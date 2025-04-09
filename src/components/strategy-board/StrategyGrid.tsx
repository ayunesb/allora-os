
import React from "react";
import StrategyCard from "./StrategyCard";
import { Strategy } from "./useStrategies";

interface StrategyGridProps {
  strategies: Strategy[];
}

export default function StrategyGrid({ strategies }: StrategyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
