
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Lead } from '@/models/lead';
import { Button } from '@/components/ui/button';
import { LeadFilterBar } from './LeadFilterBar';
import { LeadsTable } from './LeadsTable';
import { MobileLeadCards } from './MobileLeadCards';
import { LeadBulkActions } from './LeadBulkActions';
import { AddLeadDialog } from '@/components/admin/leads/AddLeadDialog';
import ErrorBoundary from '@/components/ErrorBoundary';

interface LeadsContentProps {
  leads: Lead[];
  isMobileView: boolean;
  filteredLeads: Lead[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedLeads: string[];
  handleLeadSelect: (leadId: string, isSelected: boolean) => void;
  handleSelectAll: (leads: Lead[], isSelected: boolean) => void;
  handleBulkStatusUpdate: (status: Lead['status']) => Promise<boolean | void>;
  handleViewLead: (lead: Lead) => void;
  handleLeadStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  handleLeadDelete: (leadId: string) => Promise<void>;
  refetchLeads: () => void;
  sortBy: 'name' | 'created_at';
  sortOrder: 'asc' | 'desc';
  toggleSort: (column: 'name' | 'created_at') => void;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
  campaigns: Array<{ id: string; name: string }>;
}

export const LeadsContent: React.FC<LeadsContentProps> = ({
  leads,
  isMobileView,
  filteredLeads,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  selectedLeads,
  handleLeadSelect,
  handleSelectAll,
  handleBulkStatusUpdate,
  handleViewLead,
  handleLeadStatusUpdate,
  handleLeadDelete,
  refetchLeads,
  sortBy,
  sortOrder,
  toggleSort,
  getLeadScore,
  getNextBestAction,
  campaigns
}) => {
  return (
    <ErrorBoundary>
      <div className={`flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${isMobileView ? "px-4" : ""}`}>
        <LeadFilterBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <div className="flex gap-2">
          {selectedLeads.length > 0 && (
            <LeadBulkActions 
              selectedCount={selectedLeads.length} 
              onStatusUpdate={handleBulkStatusUpdate}
            />
          )}
          
          <Button variant="outline" className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
          
          <AddLeadDialog 
            onLeadAdded={refetchLeads}
            isMobileView={isMobileView}
            campaigns={campaigns}
          />
        </div>
      </div>
      
      {/* Desktop view */}
      {!isMobileView && (
        <ErrorBoundary>
          <LeadsTable 
            leads={filteredLeads}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={toggleSort}
            onViewLead={handleViewLead}
            onStatusUpdate={handleLeadStatusUpdate}
            onDelete={handleLeadDelete}
            selectedLeads={selectedLeads}
            onLeadSelect={handleLeadSelect}
            onSelectAll={(isSelected) => handleSelectAll(filteredLeads, isSelected)}
            getLeadScore={getLeadScore}
            getNextBestAction={getNextBestAction}
          />
        </ErrorBoundary>
      )}
      
      {/* Mobile view */}
      {isMobileView && (
        <ErrorBoundary>
          <MobileLeadCards 
            leads={filteredLeads}
            onViewLead={handleViewLead}
            onStatusUpdate={handleLeadStatusUpdate}
            onDelete={handleLeadDelete}
            getLeadScore={getLeadScore}
            getNextBestAction={getNextBestAction}
          />
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
};
