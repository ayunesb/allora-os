
import React from "react";
import { Strategy } from "@/models/strategy";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Search } from "lucide-react";
import StrategyCard from "@/components/strategies/StrategyCard";
import EmptyState from "@/components/strategies/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StrategyContentProps {
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  filteredAndSortedStrategies: Strategy[];
  searchQuery: string;
  riskFilter: string;
  setSearchQuery: (query: string) => void;
  setRiskFilter: (risk: string) => void;
  handleNewStrategy: () => void;
  handleEditStrategy: (strategyId: string) => void;
  handleDeleteStrategy: (strategyId: string) => void;
  handleViewStrategy: (strategyId: string, title: string) => void;
}

const StrategyContent: React.FC<StrategyContentProps> = ({
  isLoading,
  error,
  refetch,
  filteredAndSortedStrategies,
  searchQuery,
  riskFilter,
  setSearchQuery,
  setRiskFilter,
  handleNewStrategy,
  handleEditStrategy,
  handleDeleteStrategy,
  handleViewStrategy,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="dashboard-card">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    const errorMessage = error instanceof Error 
      ? error.message
      : typeof error === 'string' 
        ? error 
        : 'An unknown error occurred';
    
    return (
      <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
        <p className="text-muted-foreground mb-6">
          We're having trouble loading your strategies. This could be due to a connection issue or database problem.
        </p>
        <Button 
          onClick={() => refetch()} 
          className="min-w-[120px] animate-pulse-once"
          variant="default"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }
  
  if (filteredAndSortedStrategies.length === 0) {
    if (searchQuery || riskFilter !== 'all') {
      return (
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Results Found</h3>
          <p className="text-muted-foreground mb-6">
            No strategies match your current filters. Try adjusting your search criteria.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setRiskFilter('all');
          }}>
            Clear Filters
          </Button>
        </div>
      );
    }
    
    return <EmptyState onCreateNew={handleNewStrategy} />;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
      {filteredAndSortedStrategies.map((strategy) => (
        <StrategyCard 
          key={strategy.id} 
          strategy={strategy} 
          onEdit={handleEditStrategy}
          onDelete={handleDeleteStrategy}
          onView={() => handleViewStrategy(strategy.id, strategy.title)}
        />
      ))}
    </div>
  );
};

export default StrategyContent;
