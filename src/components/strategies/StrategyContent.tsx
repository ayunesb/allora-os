
import React from "react";
import { Strategy } from "@/models/strategy";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import StrategyCard from "@/components/strategies/StrategyCard";
import EmptyState from "@/components/strategies/EmptyState";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
    return (
      <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-6 mb-10">
        <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
        <p className="mb-4">We couldn't load your strategies. Please try again.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }
  
  if (filteredAndSortedStrategies.length === 0) {
    if (searchQuery || riskFilter !== 'all') {
      return (
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center mb-10">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Results Found</h3>
          <p className="text-gray-300 mb-6">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
