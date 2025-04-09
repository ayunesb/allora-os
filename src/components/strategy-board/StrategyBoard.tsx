
import React, { useState } from "react";
import StrategyHeader from "./StrategyHeader";
import StrategyGrid from "./StrategyGrid";
import { useStrategies } from "./useStrategies";
import StrategyFilters from "../strategies/StrategyFilters";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function StrategyBoard() {
  const { strategies } = useStrategies();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical' | 'risk'>('alphabetical');
  const breakpoint = useBreakpoint();
  
  // Filter and sort strategies
  const filteredStrategies = strategies.filter(strategy => {
    // Apply search filter
    if (searchQuery && !strategy.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply risk filter
    if (riskFilter !== 'all' && strategy.risk !== riskFilter) {
      return false;
    }
    
    return true;
  });

  // Sort strategies
  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'risk':
        const riskOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        return riskOrder[a.risk as 'High' | 'Medium' | 'Low'] - riskOrder[b.risk as 'High' | 'Medium' | 'Low'];
      default:
        return 0;
    }
  });
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <StrategyHeader 
        title="📈 Your Strategic Plans" 
        subtitle="View and manage your business strategies"
      />
      
      <StrategyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <StrategyGrid strategies={sortedStrategies} />
    </div>
  );
}
