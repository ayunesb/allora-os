
import React from "react";
import StrategyHeader from "./StrategyHeader";
import StrategyGrid from "./StrategyGrid";
import { useStrategies } from "./useStrategies";

export default function StrategyBoard() {
  const { strategies } = useStrategies();
  
  return (
    <div>
      <StrategyHeader 
        title="📈 Your Strategic Plans" 
        subtitle="View and manage your business strategies"
      />
      <StrategyGrid strategies={strategies} />
    </div>
  );
}
