
import { useState, useMemo } from "react";
import { Strategy } from "@/models/strategy";

export function useStrategyFilter(strategies: Strategy[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical' | 'risk'>('newest');

  const filteredStrategies = useMemo(() => {
    return (strategies || []).filter(strategy => {
      if (searchQuery && !strategy.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      if (riskFilter !== 'all') {
        const strategyRisk = strategy.risk || strategy.risk_level;
        if (strategyRisk !== riskFilter) {
          return false;
        }
      }
      
      return true;
    });
  }, [strategies, searchQuery, riskFilter]);

  const sortedStrategies = useMemo(() => {
    return [...filteredStrategies].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'risk': {
          const riskOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
          const riskA = a.risk || a.risk_level || 'Medium';
          const riskB = b.risk || b.risk_level || 'Medium';
          return riskOrder[riskA as 'High' | 'Medium' | 'Low'] - riskOrder[riskB as 'High' | 'Medium' | 'Low'];
        }
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });
  }, [filteredStrategies, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    sortedStrategies
  };
}
