
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Strategy } from "@/models/strategy";

interface StrategyFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  sortBy: 'newest' | 'oldest' | 'alphabetical' | 'risk';
  setSortBy: (sort: 'newest' | 'oldest' | 'alphabetical' | 'risk') => void;
  onExportAll: () => void;
  isMobile: boolean;
}

export default function StrategyFilters({
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
  onExportAll,
  isMobile
}: StrategyFiltersProps) {
  return (
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
              const nextSort = sortBy === 'newest' ? 'oldest' : 'newest';
              setSortBy(nextSort);
            }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort
          </button>
          
          {!isMobile && (
            <Button 
              variant="outline" 
              className="hidden md:flex border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
              onClick={onExportAll}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
