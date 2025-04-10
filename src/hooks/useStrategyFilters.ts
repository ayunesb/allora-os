
import { useMemo, useState, useEffect } from "react";
import { Strategy } from "@/models/strategy";
import { useStrategyTracking } from "@/hooks/useStrategyTracking";

type RiskLevel = 'Low' | 'Medium' | 'High';
type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'risk';

export function useStrategyFilters(strategies: Strategy[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  const { trackStrategyFilter, isLoggedIn } = useStrategyTracking();
  
  useEffect(() => {
    if (isLoggedIn && riskFilter !== 'all') {
      trackStrategyFilter('risk_level', riskFilter);
    }
  }, [riskFilter, isLoggedIn, trackStrategyFilter]);

  useEffect(() => {
    if (isLoggedIn) {
      trackStrategyFilter('sort', sortBy);
    }
  }, [sortBy, isLoggedIn, trackStrategyFilter]);

  const filteredAndSortedStrategies = useMemo(() => {
    let filtered = [...strategies];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(strategy => 
        strategy.title.toLowerCase().includes(query) ||
        (strategy.description && strategy.description.toLowerCase().includes(query))
      );
    }
    
    if (riskFilter !== 'all') {
      filtered = filtered.filter(strategy => 
        (strategy.riskLevel === riskFilter || strategy.risk_level === riskFilter)
      );
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'risk':
          const riskOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
          const riskA = a.riskLevel || a.risk_level || 'Medium';
          const riskB = b.riskLevel || b.risk_level || 'Medium';
          return riskOrder[riskA as RiskLevel] - riskOrder[riskB as RiskLevel];
        default:
          return 0;
      }
    });
  }, [strategies, searchQuery, riskFilter, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    filteredAndSortedStrategies
  };
}
