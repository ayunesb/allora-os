
import React, { useEffect } from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { useLeads } from '@/hooks/admin/useLeads';
import { useCampaigns } from '@/hooks/campaigns';
import { Lead } from '@/models/lead';
import {
  LeadsHeader,
  LeadsEmptyState,
  LeadsLoading,
  LeadsDescription,
  LeadsTable,
  MobileLeadCards,
  LeadProfileDrawer,
  LeadFilterBar,
  LeadBulkActions,
  AddLeadDialog
} from '@/components/dashboard/leads';
import { useLeadScoring } from '@/hooks/dashboard/useLeadScoring';
import { useLeadFilters } from '@/hooks/dashboard/useLeadFilters';
import { useLeadSelection } from '@/hooks/dashboard/useLeadSelection';
import { useLeadDrawer } from '@/hooks/dashboard/useLeadDrawer';
import { Button } from '@/components/ui/button';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardLeads() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  // Get campaign data
  const { campaigns: campaignData, isLoading: isCampaignsLoading } = useCampaigns();
  
  // Use the refactored lead data hook
  const {
    leads,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    toggleSort,
    handleStatusUpdate,
    handleDelete,
    addLead,
    isAddingLead,
    refetchLeads,
    error: leadsError
  } = useLeads();
  
  // Extract AI scoring logic to a custom hook
  const { getLeadScore, getNextBestAction } = useLeadScoring();
  
  // Use lead filtering hook
  const {
    activeFilter,
    setActiveFilter,
    filteredLeads
  } = useLeadFilters(leads);
  
  // Use lead selection hook
  const {
    selectedLeads,
    handleLeadSelect,
    handleSelectAll,
    handleBulkStatusUpdate
  } = useLeadSelection();
  
  // Use lead drawer hook
  const {
    selectedLead,
    isDrawerOpen,
    handleViewLead,
    setIsDrawerOpen
  } = useLeadDrawer();
  
  // Refresh data on mount
  useEffect(() => {
    refetchLeads();
  }, [refetchLeads]);
  
  // Format campaigns data for the AddLeadDialog component
  const formattedCampaigns = campaignData.map(campaign => ({
    id: campaign.id,
    name: campaign.name
  }));

  // Handle case when there's an error
  if (leadsError) {
    return (
      <div className="animate-fadeIn space-y-6">
        <LeadsHeader isMobileView={isMobileView} />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading leads</AlertTitle>
          <AlertDescription>
            There was a problem loading your leads data. Please try refreshing the page or contact support.
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetchLeads()}>Retry</Button>
      </div>
    );
  }

  // Handle bulk status update
  const handleBulkStatusChange = async (status: Lead['status']) => {
    const result = await handleBulkStatusUpdate(status);
    // We ignore the result here since we're adapting Promise<boolean> to Promise<void>
    return;
  };

  return (
    <div className={`animate-fadeIn space-y-6 ${isMobileView ? "px-0" : ""}`}>
      <LeadsHeader isMobileView={isMobileView} />
      
      {isLoading ? (
        <LeadsLoading />
      ) : leads.length === 0 ? (
        <LeadsEmptyState />
      ) : (
        <>
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
                  onStatusUpdate={handleBulkStatusChange}
                />
              )}
              
              <Button variant="outline" className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>
              
              <AddLeadDialog 
                onLeadAdded={refetchLeads}
                isMobileView={isMobileView}
                campaigns={formattedCampaigns}
              />
            </div>
          </div>
          
          {/* Desktop view */}
          {!isMobileView && (
            <LeadsTable 
              leads={filteredLeads}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={toggleSort}
              onViewLead={handleViewLead}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              selectedLeads={selectedLeads}
              onLeadSelect={handleLeadSelect}
              onSelectAll={(isSelected) => handleSelectAll(filteredLeads, isSelected)}
              getLeadScore={getLeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
          
          {/* Mobile view */}
          {isMobileView && (
            <MobileLeadCards 
              leads={filteredLeads}
              onViewLead={handleViewLead}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              getLeadScore={getLeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
          
          {selectedLead && (
            <LeadProfileDrawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              lead={selectedLead}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              getLeadScore={getLeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
        </>
      )}
    </div>
  );
}
