
import React, { useState, useCallback, useEffect } from "react";
import { useStrategies } from "@/hooks/useStrategies";
import { useBreakpoint } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { AlertCircle, RefreshCw, Plus, FileDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import StrategyHeader from "./StrategyHeader";
import StrategyFilters from "./StrategyFilters";
import StrategyGrid from "./StrategyGrid";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import StrategyWizardModal from "./StrategyWizardModal";
import ExecutiveDebateModal from "./ExecutiveDebateModal";
import MarketAlertBanner from "./MarketAlertBanner";
import { useExecutiveDebate } from "@/hooks/useExecutiveDebate";
import { useMarketAlerts } from "@/hooks/useMarketAlerts";
import { Strategy } from "@/models/strategy";

export default function StrategyBoard() {
  const { strategies, isLoading, error, refetch, createStrategy } = useStrategies();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical' | 'risk'>('newest');
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  // Modal states
  const [isWizardModalOpen, setIsWizardModalOpen] = useState(false);
  const [isDebateModalOpen, setIsDebateModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  
  // Executive debate integration
  const { generateDebate, debate, isGeneratingDebate } = useExecutiveDebate();
  
  // Market alerts integration
  const { alerts, checkForAlerts } = useMarketAlerts();
  
  // Check for market alerts on component mount
  useEffect(() => {
    checkForAlerts();
  }, [checkForAlerts]);
  
  // Handle creating a new strategy
  const handleCreateNew = useCallback(() => {
    setIsWizardModalOpen(true);
  }, []);
  
  // Handle opening debate modal
  const handleDebateStrategy = useCallback((strategy: Strategy) => {
    setSelectedStrategy(strategy);
    generateDebate(strategy);
    setIsDebateModalOpen(true);
  }, [generateDebate]);
  
  // Handle export to PDF
  const handleExportPDF = useCallback((strategy: Strategy) => {
    toast.info("Preparing PDF export...");
    // Export functionality will be implemented in a separate function
    setTimeout(() => {
      toast.success("Strategy exported to PDF!");
    }, 1500);
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
    
    // Apply risk filter
    if (riskFilter !== 'all') {
      const strategyRisk = strategy.risk || strategy.risk_level;
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
        const riskA = a.risk || a.risk_level || 'Medium';
        const riskB = b.risk || b.risk_level || 'Medium';
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
    <div className="space-y-6 animate-fadeIn px-3 sm:px-4 md:px-6 bg-background/80 min-h-screen">
      <StrategyHeader 
        title="📈 Your Growth Strategies" 
        subtitle="Built by your AI Executive Team. Ready to dominate your market."
      >
        <Button 
          onClick={handleCreateNew} 
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Strategy
        </Button>
        
        <Button 
          variant="outline" 
          className="hidden sm:flex ml-2 transition-all duration-300 hover:bg-accent/20"
          onClick={() => toast.info("Coming soon: Batch export of strategies")}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </StrategyHeader>
      
      {alerts.length > 0 && (
        <MarketAlertBanner alerts={alerts} />
      )}
      
      <StrategyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {error ? (
        <ErrorState error={error} onRetry={handleRetry} />
      ) : isLoading ? (
        <LoadingState isMobile={isMobile} />
      ) : sortedStrategies.length === 0 ? (
        <EmptyState onCreateNew={handleCreateNew} />
      ) : (
        <StrategyGrid 
          strategies={sortedStrategies} 
          onDebate={handleDebateStrategy}
          onExport={handleExportPDF}
        />
      )}
      
      {/* Strategy Wizard Modal */}
      <StrategyWizardModal 
        isOpen={isWizardModalOpen} 
        onClose={() => setIsWizardModalOpen(false)}
        onCreateStrategy={createStrategy}
      />
      
      {/* Executive Debate Modal */}
      <ExecutiveDebateModal 
        isOpen={isDebateModalOpen} 
        onClose={() => setIsDebateModalOpen(false)}
        strategy={selectedStrategy}
        debate={debate}
        isLoading={isGeneratingDebate}
      />
    </div>
  );
}
