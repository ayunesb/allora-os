
import React, { useState } from "react";
import { useStrategies } from "./useStrategies";
import { Strategy } from "@/models/strategy";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search, RefreshCw, ArrowDownWideNarrow } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StrategyGrid from "./StrategyGrid";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function StrategyBoard() {
  const navigate = useNavigate();
  const { strategies, isLoading, error, refetch } = useStrategies();
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showStrategyDialog, setShowStrategyDialog] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  
  // Filter and sort strategies
  const filteredAndSortedStrategies = React.useMemo(() => {
    let filtered = strategies;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (strategy) =>
          strategy.title.toLowerCase().includes(query) ||
          (strategy.description && strategy.description.toLowerCase().includes(query))
      );
    }
    
    // Apply risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter(
        (strategy) => 
          (strategy.risk?.toLowerCase() === riskFilter.toLowerCase()) ||
          (strategy.riskLevel?.toLowerCase() === riskFilter.toLowerCase()) ||
          (strategy.risk_level?.toLowerCase() === riskFilter.toLowerCase())
      );
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortOrder === "riskHigh") {
        const riskA = a.risk || a.riskLevel || a.risk_level || "Medium";
        const riskB = b.risk || b.riskLevel || b.risk_level || "Medium";
        const riskOrder = { High: 3, Medium: 2, Low: 1 };
        return riskOrder[riskB as keyof typeof riskOrder] - riskOrder[riskA as keyof typeof riskOrder];
      } else if (sortOrder === "riskLow") {
        const riskA = a.risk || a.riskLevel || a.risk_level || "Medium";
        const riskB = b.risk || b.riskLevel || b.risk_level || "Medium";
        const riskOrder = { High: 3, Medium: 2, Low: 1 };
        return riskOrder[riskA as keyof typeof riskOrder] - riskOrder[riskB as keyof typeof riskOrder];
      }
      return 0;
    });
  }, [strategies, searchQuery, riskFilter, sortOrder]);
  
  const handleNewStrategy = () => {
    navigate("/dashboard/strategies/new");
  };
  
  const handleViewStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setShowStrategyDialog(true);
  };
  
  const handleDebate = (strategy: Strategy) => {
    navigate(`/dashboard/debate?strategyId=${strategy.id}&title=${encodeURIComponent(strategy.title)}`);
  };
  
  const handleExport = (strategy: Strategy) => {
    toast.success("Strategy exported to PDF", {
      description: `"${strategy.title}" has been exported.`
    });
  };
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-destructive mb-4">
          <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Error Loading Strategies</h3>
        <p className="text-muted-foreground mb-4">We encountered a problem loading your strategies.</p>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search strategies..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-36">
                <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="riskHigh">Highest Risk</SelectItem>
                <SelectItem value="riskLow">Lowest Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleNewStrategy} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> 
          New Strategy
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : filteredAndSortedStrategies.length === 0 ? (
        <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-2">No strategies found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || riskFilter !== "all"
              ? "No strategies match your search criteria. Try adjusting your filters."
              : "Get started by creating your first business strategy."}
          </p>
          {searchQuery || riskFilter !== "all" ? (
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setRiskFilter("all");
            }}>
              Clear Filters
            </Button>
          ) : (
            <Button onClick={handleNewStrategy}>
              <Plus className="mr-2 h-4 w-4" />
              Create Strategy
            </Button>
          )}
        </div>
      ) : (
        <StrategyGrid 
          strategies={filteredAndSortedStrategies} 
          onDebate={handleDebate}
          onExport={handleExport}
          onViewStrategy={handleViewStrategy}
        />
      )}
      
      {selectedStrategy && (
        <Dialog open={showStrategyDialog} onOpenChange={setShowStrategyDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedStrategy.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Description</h4>
                <p className="text-muted-foreground mt-1">{selectedStrategy.description}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <h4 className="font-medium text-sm">Risk Level</h4>
                  <p className="text-muted-foreground mt-1">
                    {selectedStrategy.risk || selectedStrategy.riskLevel || selectedStrategy.risk_level || "Medium"}
                  </p>
                </div>
                {selectedStrategy.timeframe && (
                  <div>
                    <h4 className="font-medium text-sm">Timeframe</h4>
                    <p className="text-muted-foreground mt-1">{selectedStrategy.timeframe}</p>
                  </div>
                )}
                {selectedStrategy.impact && (
                  <div>
                    <h4 className="font-medium text-sm">Expected Impact</h4>
                    <p className="text-muted-foreground mt-1">{selectedStrategy.impact}</p>
                  </div>
                )}
                {selectedStrategy.executiveBot && (
                  <div>
                    <h4 className="font-medium text-sm">Proposed By</h4>
                    <p className="text-muted-foreground mt-1">{selectedStrategy.executiveBot}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setShowStrategyDialog(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleDebate(selectedStrategy)}>
                    Discuss in AI Boardroom
                  </Button>
                  <Button onClick={() => handleExport(selectedStrategy)}>
                    Export Strategy
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
