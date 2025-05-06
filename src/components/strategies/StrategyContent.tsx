import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Search, Plus } from "lucide-react";
import StrategyCard from "@/components/strategies/StrategyCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
const StrategyContent = ({
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 animate-pulse">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="strategy-card">
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
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "An unknown error occurred";
    return (
      <div className="bg-secondary/40 backdrop-blur-md rounded-xl border border-border/50 p-4 sm:p-6 text-center mb-10 animate-fadeIn">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4 animate-pulse-slow" />
        <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
        <p className="text-muted-foreground mb-6">
          We're having trouble loading your strategies. This could be due to a
          connection issue or database problem.
        </p>
        <Button
          onClick={() => refetch()}
          className="min-w-[120px] animate-pulse-once button-glow"
          variant="default"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }
  if (filteredAndSortedStrategies.length === 0) {
    if (searchQuery || riskFilter !== "all") {
      return (
        <div className="glassmorphism p-6 sm:p-8 text-center mb-10 animate-fadeIn">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Results Found</h3>
          <p className="text-muted-foreground mb-6">
            No strategies match your current filters. Try adjusting your search
            criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setRiskFilter("all");
            }}
            className="hover-glow"
          >
            Clear Filters
          </Button>
        </div>
      );
    }
    return (
      <div className="glassmorphism p-8 sm:p-10 text-center mb-10 animate-fadeIn">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <div className="bg-primary/10 rounded-full p-6 mb-6">
            <Plus className="h-12 w-12 text-primary/70" />
          </div>
          <h3 className="text-2xl font-bold mb-3 gradient-text">
            Create Your First Strategy
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg">
            Develop strategic plans for your business with the help of our AI
            executive advisors. Get started by creating your first strategy.
          </p>
          <Button
            onClick={handleNewStrategy}
            variant="gradient"
            size="lg"
            className="shadow-lg hover:shadow-primary/20"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Strategy
          </Button>
        </div>
      </div>
    );
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
