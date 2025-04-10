
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
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StrategyBoard() {
  const { strategies, isLoading, error, refetch } = useStrategies();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical' | 'risk'>('alphabetical');
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
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
    toast.info("Retrying...");
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
    
    // Apply risk filter - Handle different risk property names
    if (riskFilter !== 'all') {
      const strategyRisk = strategy.risk || strategy.riskLevel || strategy.risk_level;
      if (strategyRisk !== riskFilter) {
        return false;
      }
    }
    
    return true;
  });

  // Sort strategies
  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'risk': {
        const riskOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        const riskA = a.risk || a.riskLevel || a.risk_level || 'Medium';
        const riskB = b.risk || b.riskLevel || b.risk_level || 'Medium';
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
  
  return (
    <div className="space-y-3 sm:space-y-6 animate-fadeIn px-3 sm:px-4 md:px-6">
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
        <div className="bg-secondary/40 border border-destructive/30 rounded-lg p-6 text-center my-8 animate-fadeIn">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {error instanceof Error ? error.message : "Failed to load strategies"}
          </p>
          <Button 
            variant="default"
            onClick={handleRetry}
            className="min-w-[120px] animate-pulse-once"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : isLoading ? (
        <div className="py-4 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: isMobile ? 2 : 4 }).map((_, index) => (
              <div key={index} className="bg-secondary/60 border border-border/50 rounded-lg p-4 sm:p-6 h-40 sm:h-52">
                <Skeleton className="h-5 sm:h-6 w-2/3 mb-2" />
                <Skeleton className="h-3 sm:h-4 w-1/4 mb-4" />
                <Skeleton className="h-16 sm:h-24 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-7 sm:h-8 w-14 sm:w-16" />
                  <Skeleton className="h-7 sm:h-8 w-14 sm:w-16" />
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
