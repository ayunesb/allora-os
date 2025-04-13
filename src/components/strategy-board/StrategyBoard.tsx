
import React, { useState, useCallback, useEffect } from "react";
import { useStrategies } from "@/hooks/useStrategies";
import { useBreakpoint } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Strategy } from "@/models/strategy";
import StrategyHeader from "./StrategyHeader";
import StrategyFilters from "./StrategyFilters";
import StrategyGrid from "./StrategyGrid";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import StrategyWizardModal from "./StrategyWizardModal";
import ExecutiveDebateModal from "./ExecutiveDebateModal";
import StrategyDetailModal from "./StrategyDetailModal";
import MarketAlertBanner from "./MarketAlertBanner";
import { useExecutiveDebate } from "@/hooks/useExecutiveDebate";
import { useMarketAlerts } from "@/hooks/useMarketAlerts";
import { useStrategyFilter } from "@/hooks/useStrategyFilter";
import { useStrategyActions } from "@/hooks/useStrategyActions";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function StrategyBoard() {
  const { strategies, isLoading, error, refetch, createStrategy } = useStrategies();
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  // Strategy filters and sorting
  const {
    searchQuery, setSearchQuery,
    riskFilter, setRiskFilter,
    sortBy, setSortBy,
    sortedStrategies
  } = useStrategyFilter(strategies);
  
  // Strategy actions
  const { handleExportPDF, handleExportAllPDF } = useStrategyActions();
  
  // Modals state
  const [isWizardModalOpen, setIsWizardModalOpen] = useState(false);
  const [isDebateModalOpen, setIsDebateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  
  // Integrations
  const { generateDebate, debate, isGeneratingDebate } = useExecutiveDebate();
  const { alerts, dismissAlert, checkForAlerts } = useMarketAlerts();
  
  useEffect(() => {
    checkForAlerts();
  }, [checkForAlerts]);
  
  const handleCreateNew = useCallback(() => {
    setIsWizardModalOpen(true);
  }, []);
  
  const handleDebateStrategy = useCallback((strategy: Strategy) => {
    setSelectedStrategy(strategy);
    generateDebate(strategy);
    setIsDebateModalOpen(true);
  }, [generateDebate]);

  const handleViewStrategyDetail = useCallback((strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setIsDetailModalOpen(true);
  }, []);
  
  const handleRetry = useCallback(() => {
    toast.info("Retrying...");
    if (refetch) {
      refetch();
    }
  }, [refetch]);
  
  return (
    <div className="min-h-screen bg-[#0c0f1f] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <StrategyHeader onCreateNew={handleCreateNew} />
        
        {alerts.length > 0 && (
          <MarketAlertBanner alerts={alerts} onDismiss={dismissAlert} />
        )}
        
        <StrategyFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          riskFilter={riskFilter}
          setRiskFilter={setRiskFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onExportAll={() => handleExportAllPDF(strategies || [])}
          isMobile={isMobile}
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
            onViewStrategy={handleViewStrategyDetail}
          />
        )}
      </div>
      
      <StrategyWizardModal 
        isOpen={isWizardModalOpen} 
        onClose={() => setIsWizardModalOpen(false)}
        onCreateStrategy={createStrategy}
      />
      
      <ExecutiveDebateModal 
        isOpen={isDebateModalOpen} 
        onClose={() => setIsDebateModalOpen(false)}
        strategy={selectedStrategy}
        debate={debate}
        isLoading={isGeneratingDebate}
      />
      
      <StrategyDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        strategy={selectedStrategy}
      />
    </div>
  );
}
