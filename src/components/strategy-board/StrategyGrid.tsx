
import React from "react";
import { Strategy } from "@/models/strategy";
import StrategyCard from "./StrategyCard";

interface StrategyGridProps {
  strategies: Strategy[];
  onDebate: (strategy: Strategy) => void;
  onExport: (strategy: Strategy) => void;
}

export default function StrategyGrid({ strategies, onDebate, onExport }: StrategyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
