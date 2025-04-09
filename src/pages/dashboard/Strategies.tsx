
import { useState, useCallback } from "react";
import { TrendingUp, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStrategies } from "@/hooks/useStrategies";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StrategyCard from "@/components/strategies/StrategyCard";
import StrategyForm, { StrategyFormValues } from "@/components/strategies/StrategyForm";
import EmptyState from "@/components/strategies/EmptyState";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Strategies() {
  const [editingStrategyId, setEditingStrategyId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { 
    strategies, 
    isLoading, 
    error,
    createStrategy, 
    isCreating,
    updateStrategy,
    isUpdating,
    deleteStrategy,
    isDeleting,
    refetch
  } = useStrategies();

  const handleCreateOrUpdateStrategy = useCallback((data: StrategyFormValues) => {
    if (editingStrategyId) {
      updateStrategy({ 
        id: editingStrategyId, 
        title: data.title, 
        description: data.description, 
        riskLevel: data.riskLevel as 'Low' | 'Medium' | 'High' 
      });
    } else {
      createStrategy({
        title: data.title,
        description: data.description,
        riskLevel: data.riskLevel as 'Low' | 'Medium' | 'High'
      });
    }
    
    setIsDialogOpen(false);
    setEditingStrategyId(null);
  }, [editingStrategyId, createStrategy, updateStrategy]);
  
  const handleEditStrategy = useCallback((strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      setEditingStrategyId(strategyId);
      setIsDialogOpen(true);
    }
  }, [strategies]);
  
  const handleNewStrategy = useCallback(() => {
    setEditingStrategyId(null);
    setIsDialogOpen(true);
  }, []);

  const handleDeleteStrategy = useCallback((strategyId: string) => {
    deleteStrategy(strategyId);
  }, [deleteStrategy]);

  // Handle form default values
  const getDefaultValues = useCallback(() => {
    if (editingStrategyId) {
      const strategy = strategies.find(s => s.id === editingStrategyId);
      if (strategy) {
        return {
          title: strategy.title,
          description: strategy.description || "",
          riskLevel: (strategy.risk_level as 'Low' | 'Medium' | 'High') || "Medium",
        };
      }
    }
    
    return {
      title: "",
      description: "",
      riskLevel: "Medium",
    };
  }, [editingStrategyId, strategies]);

  const renderContent = useCallback(() => {
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
    
    if (strategies.length === 0) {
      return <EmptyState onCreateNew={handleNewStrategy} />;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {strategies.map((strategy) => (
          <StrategyCard 
            key={strategy.id} 
            strategy={strategy} 
            onEdit={handleEditStrategy}
            onDelete={handleDeleteStrategy}
          />
        ))}
      </div>
    );
  }, [isLoading, error, strategies, refetch, handleNewStrategy, handleEditStrategy, handleDeleteStrategy]);

  const isAnyActionPending = isCreating || isUpdating || isDeleting;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI-Generated Business Strategies</h1>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={handleNewStrategy} 
                className="allora-button"
                disabled={isAnyActionPending}
              >
                {isAnyActionPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                New Strategy
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new business strategy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <p className="text-xl text-gray-300 mb-10">
        Allora AI automatically builds full business plans customized to your needs
      </p>
      
      {renderContent()}
      
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
