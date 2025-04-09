
import React, { useState, useCallback } from "react";
import StrategyHeader from "./StrategyHeader";
import StrategyGrid from "./StrategyGrid";
import { useStrategies } from "./useStrategies";
import StrategyFilters from "../strategies/StrategyFilters";
import { useBreakpoint } from "@/hooks/use-mobile";
import EmptyState from "../strategies/EmptyState";
import { handleApiError } from "@/utils/api/errorHandling";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function StrategyBoard() {
  const { strategies, isLoading, error, refetch } = useStrategies();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical' | 'risk'>('alphabetical');
  const breakpoint = useBreakpoint();
  
  // Handle creating a new strategy
  const handleCreateNew = useCallback(async () => {
    try {
      // You would typically open a dialog or navigate to create strategy page
      toast.info("Opening strategy creation form");
      // Example: navigate('/create-strategy');
    } catch (error) {
      handleApiError(error, { 
        customMessage: "Failed to open strategy creation form" 
      });
    }
  }, []);
  
  // Handle retry on error
  const handleRetry = useCallback(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);
  
  // Filter and sort strategies
  const filteredStrategies = (strategies || []).filter(strategy => {
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
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
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
      
      {error ? (
        <EmptyState 
          onCreateNew={handleCreateNew} 
          error={error.message || "Failed to load strategies"}
          onRetry={handleRetry}
        />
      ) : isLoading ? (
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-secondary/60 border border-border/50 rounded-lg p-4 sm:p-6 h-52">
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : sortedStrategies.length === 0 ? (
        <EmptyState onCreateNew={handleCreateNew} />
      ) : (
        <StrategyGrid strategies={sortedStrategies} />
      )}
    </div>
  );
}
