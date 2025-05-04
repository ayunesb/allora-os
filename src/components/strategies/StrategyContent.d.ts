import React from "react";
import { Strategy } from "@/models/strategy";
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
declare const StrategyContent: React.FC<StrategyContentProps>;
export default StrategyContent;
