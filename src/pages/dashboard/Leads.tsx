
import React, { Suspense } from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { LeadsHeader } from '@/components/dashboard/leads/LeadsHeader';
import { LeadsEmptyState } from '@/components/dashboard/leads/LeadsEmptyState';
import { LeadsLoading } from '@/components/dashboard/leads/LeadsLoading';
import { LeadsErrorState } from '@/components/dashboard/leads/LeadsErrorState';
import { LeadsContent as LeadsContentComponent } from '@/components/dashboard/leads/LeadsContent';
import { LeadProfileDrawer } from '@/components/dashboard/leads/LeadProfileDrawer';
import { useLeadsPage } from '@/hooks/dashboard/useLeadsPage';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function DashboardLeads() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LeadsLoading />}>
        <LeadsPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Renamed to LeadsPageContent to avoid naming conflict with imported component
function LeadsPageContent() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const {
    leads,
    isLoading,
    leadsError,
    searchQuery,
    sortBy,
    sortOrder,
    activeFilter,
    filteredLeads,
    selectedLeads,
    selectedLead,
    isDrawerOpen,
    formattedCampaigns,
    isPending,
    
    setSearchQuery,
    toggleSort,
    setActiveFilter,
    handleLeadSelect,
    handleSelectAll,
    handleBulkStatusUpdate,
    handleViewLead,
    setIsDrawerOpen,
    handleLeadStatusUpdate,
    handleLeadDelete,
    refetchLeads,
    getLeadScore,
    getNextBestAction
  } = useLeadsPage();

  return (
    <div className={`animate-fadeIn space-y-6 ${isMobileView ? "px-0" : ""}`}>
      <LeadsHeader isMobileView={isMobileView} />
      
      {isLoading || isPending ? (
        <LeadsLoading />
      ) : leadsError ? (
        <LeadsErrorState onRetry={refetchLeads} />
      ) : leads.length === 0 ? (
        <LeadsEmptyState />
      ) : (
        <>
          <LeadsContentComponent 
            leads={leads}
            isMobileView={isMobileView}
            filteredLeads={filteredLeads}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedLeads={selectedLeads}
            handleLeadSelect={handleLeadSelect}
            handleSelectAll={handleSelectAll}
            handleBulkStatusUpdate={handleBulkStatusUpdate}
            handleViewLead={handleViewLead}
            handleLeadStatusUpdate={handleLeadStatusUpdate}
            handleLeadDelete={handleLeadDelete}
            refetchLeads={refetchLeads}
            sortBy={sortBy as "name" | "created_at"}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
            getLeadScore={getLeadScore}
            getNextBestAction={getNextBestAction}
            campaigns={formattedCampaigns.map(c => ({ id: c.value, name: c.label }))}
          />
          
          {selectedLead && (
            <LeadProfileDrawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              lead={selectedLead}
              onStatusUpdate={handleLeadStatusUpdate}
              onDelete={handleLeadDelete}
              getLeadScore={getLeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
        </>
      )}
    </div>
  );
}
