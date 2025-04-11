
import React, { useState, useCallback, useEffect } from "react";
import { useStrategies } from "@/hooks/useStrategies";
import { useBreakpoint } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { Plus, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Strategy } from "@/models/strategy";
import { exportStrategyToPdf, exportAllStrategiesToPdf } from "@/utils/strategy/pdfExport";

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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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

  // Handle opening strategy detail modal
  const handleViewStrategyDetail = useCallback((strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setIsDetailModalOpen(true);
  }, []);
  
  // Handle export to PDF
  const handleExportPDF = useCallback((strategy: Strategy) => {
    toast.info("Preparing PDF export...");
    
    setTimeout(() => {
      try {
        exportStrategyToPdf(strategy);
        toast.success("Strategy exported to PDF!");
      } catch (error) {
        console.error("Error exporting strategy:", error);
        toast.error("Failed to export strategy. Please try again.");
      }
    }, 1000);
  }, []);
  
  // Handle export all to PDF
  const handleExportAllPDF = useCallback(() => {
    if (!strategies || strategies.length === 0) {
      toast.error("No strategies to export");
      return;
    }
    
    toast.info("Exporting all strategies...");
    
    setTimeout(() => {
      try {
        exportAllStrategiesToPdf(strategies);
        toast.success("All strategies exported to PDF!");
      } catch (error) {
        console.error("Error exporting all strategies:", error);
        toast.error("Failed to export strategies. Please try again.");
      }
    }, 1500);
  }, [strategies]);
  
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
    <div className="min-h-screen bg-[#0c0f1f] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold">📈 Your Growth Strategies</h1>
            <p className="text-gray-400 mt-2">
              Built by your AI Executive Team. Ready to dominate your market.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleCreateNew} 
              className="bg-purple-600 hover:bg-purple-700 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Strategy
            </Button>
            
            <Button 
              variant="outline" 
              className="hidden md:flex border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
              onClick={handleExportAllPDF}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>
        
        {alerts.length > 0 && (
          <MarketAlertBanner alerts={alerts} />
        )}
        
        {/* Filters Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search strategies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pl-10 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <svg className="absolute left-3 top-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex gap-3">
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="py-2 px-4 bg-gray-800/70 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Risks</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
              
              <button
                className="py-2 px-4 bg-gray-800/70 border border-gray-700 rounded-lg text-white flex items-center gap-2 hover:bg-gray-700/70 transition-colors"
                onClick={() => {
                  // Implement sorting functionality
                  const nextSort = sortBy === 'newest' ? 'oldest' : 'newest';
                  setSortBy(nextSort);
                }}
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
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
      
      {/* Strategy Detail Modal */}
      <StrategyDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        strategy={selectedStrategy}
      />
    </div>
  );
}
