import { useState, useCallback, useMemo, useEffect } from "react";
import { TrendingUp, Plus, Loader2, SlidersHorizontal, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStrategyTracking } from "@/hooks/useStrategyTracking";
import LearningInsights from "@/components/dashboard/LearningInsights";

type RiskLevel = 'Low' | 'Medium' | 'High';

type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'risk';

export default function Strategies() {
  const [editingStrategyId, setEditingStrategyId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showInsights, setShowInsights] = useState(true);
  
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

  const {
    trackStrategyView,
    trackStrategyCreate,
    trackStrategyUpdate,
    trackStrategyDelete,
    trackStrategyFilter,
    isLoggedIn
  } = useStrategyTracking();

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

  const handleCreateOrUpdateStrategy = useCallback((data: StrategyFormValues) => {
    if (editingStrategyId) {
      updateStrategy({ 
        id: editingStrategyId, 
        title: data.title, 
        description: data.description, 
        riskLevel: data.riskLevel 
      });
      
      if (isLoggedIn) {
        trackStrategyUpdate(editingStrategyId, data.title, data.riskLevel);
      }
    } else {
      createStrategy({
        title: data.title,
        description: data.description,
        riskLevel: data.riskLevel
      });
    }
    
    setIsDialogOpen(false);
    setEditingStrategyId(null);
  }, [editingStrategyId, createStrategy, updateStrategy, isLoggedIn, trackStrategyUpdate]);
  
  const handleViewStrategy = useCallback((strategyId: string, title: string) => {
    if (isLoggedIn) {
      trackStrategyView(strategyId, title);
    }
  }, [isLoggedIn, trackStrategyView]);
  
  const handleEditStrategy = useCallback((strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      setEditingStrategyId(strategyId);
      setIsDialogOpen(true);
      
      if (isLoggedIn) {
        trackStrategyView(strategyId, strategy.title);
      }
    }
  }, [strategies, isLoggedIn, trackStrategyView]);
  
  const handleNewStrategy = useCallback(() => {
    setEditingStrategyId(null);
    setIsDialogOpen(true);
  }, []);

  const handleDeleteStrategy = useCallback((strategyId: string) => {
    if (isLoggedIn) {
      trackStrategyDelete(strategyId);
    }
    deleteStrategy(strategyId);
  }, [deleteStrategy, isLoggedIn, trackStrategyDelete]);

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
        strategy.risk_level === riskFilter
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
          return riskOrder[a.risk_level as RiskLevel] - riskOrder[b.risk_level as RiskLevel];
        default:
          return 0;
      }
    });
  }, [strategies, searchQuery, riskFilter, sortBy]);

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
      riskLevel: "Medium" as const,
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
  }, [isLoading, error, refetch, filteredAndSortedStrategies, searchQuery, riskFilter, handleNewStrategy, handleEditStrategy, handleDeleteStrategy, handleViewStrategy]);

  const isAnyActionPending = isCreating || isUpdating || isDeleting;

  const toggleInsights = useCallback(() => {
    setShowInsights(prev => !prev);
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI-Generated Business Strategies</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={toggleInsights}
            className="hidden md:flex"
          >
            {showInsights ? "Hide Insights" : "Show Insights"}
          </Button>
          
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
      </div>
      
      <p className="text-xl text-gray-300 mb-6">
        Allora AI automatically builds full business plans customized to your needs
      </p>
      
      {showInsights && (
        <div className="mb-6">
          <LearningInsights />
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search strategies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="Low">Low Risk</SelectItem>
              <SelectItem value="Medium">Medium Risk</SelectItem>
              <SelectItem value="High">High Risk</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setSortBy('newest')} 
                className={sortBy === 'newest' ? "bg-accent" : ""}
              >
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('oldest')} 
                className={sortBy === 'oldest' ? "bg-accent" : ""}
              >
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('alphabetical')} 
                className={sortBy === 'alphabetical' ? "bg-accent" : ""}
              >
                Alphabetical
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortBy('risk')} 
                className={sortBy === 'risk' ? "bg-accent" : ""}
              >
                By Risk Level
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
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
