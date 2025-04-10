
import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StrategyForm from "@/components/strategies/StrategyForm";
import { useStrategies } from "@/hooks/useStrategies";
import { useStrategyTracking } from "@/hooks/useStrategyTracking";
import { useStrategyFilters } from "@/hooks/useStrategyFilters";
import { useStrategyDialog } from "@/hooks/useStrategyDialog";
import StrategyHeader from "@/components/strategies/StrategyHeader";
import StrategyFilters from "@/components/strategies/StrategyFilters";
import StrategyContent from "@/components/strategies/StrategyContent";

export default function Strategies() {
  const { 
    strategies, 
    isLoading, 
    error,
    createStrategy, 
    isCreating,
    updateStrategy: rawUpdateStrategy,
    isUpdating,
    deleteStrategy,
    isDeleting,
    refetch
  } = useStrategies();

  const updateStrategy = useCallback((data: { 
    id: string; 
    title?: string; 
    description?: string; 
    riskLevel?: 'Low' | 'Medium' | 'High'; 
  }) => {
    return rawUpdateStrategy(data.id, {
      title: data.title,
      description: data.description,
      risk_level: data.riskLevel
    });
  }, [rawUpdateStrategy]);

  const {
    trackStrategyView,
    trackStrategyDelete,
    isLoggedIn
  } = useStrategyTracking();

  const {
    searchQuery,
    setSearchQuery,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    filteredAndSortedStrategies
  } = useStrategyFilters(strategies);

  const {
    editingStrategyId,
    isDialogOpen,
    setIsDialogOpen,
    handleCreateOrUpdateStrategy,
    handleNewStrategy,
    handleEditStrategy,
    getDefaultValues
  } = useStrategyDialog({
    strategies,
    createStrategy,
    updateStrategy
  });
  
  const handleViewStrategy = useCallback((strategyId: string, title: string) => {
    if (isLoggedIn) {
      trackStrategyView(strategyId, title);
    }
  }, [isLoggedIn, trackStrategyView]);
  
  const handleDeleteStrategy = useCallback((strategyId: string) => {
    if (isLoggedIn) {
      trackStrategyDelete(strategyId);
    }
    deleteStrategy(strategyId);
  }, [deleteStrategy, isLoggedIn, trackStrategyDelete]);

  const isAnyActionPending = isCreating || isUpdating || isDeleting;

  return (
    <div className="animate-fadeIn">
      <StrategyHeader 
        onNewStrategy={handleNewStrategy}
        isAnyActionPending={isAnyActionPending}
      />
      
      <StrategyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <StrategyContent
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        filteredAndSortedStrategies={filteredAndSortedStrategies}
        searchQuery={searchQuery}
        riskFilter={riskFilter}
        setSearchQuery={setSearchQuery}
        setRiskFilter={setRiskFilter}
        handleNewStrategy={handleNewStrategy}
        handleEditStrategy={handleEditStrategy}
        handleDeleteStrategy={handleDeleteStrategy}
        handleViewStrategy={handleViewStrategy}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingStrategyId ? "Edit Strategy" : "Create New Strategy"}</DialogTitle>
            <DialogDescription>
              {editingStrategyId ? "Update your business strategy details below." : "Fill in the details for your new business strategy."}
            </DialogDescription>
          </DialogHeader>
          
          <StrategyForm 
            defaultValues={getDefaultValues()}
            onSubmit={handleCreateOrUpdateStrategy}
            isSubmitting={isCreating || isUpdating}
            isEditing={!!editingStrategyId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
