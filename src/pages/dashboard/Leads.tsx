
import React, { useState } from 'react';
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
import { Sheet } from '@/components/ui/sheet';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { UploadCloud, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardLeads() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  // Get campaign data
  const { campaigns: campaignData } = useCampaigns();
  
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
    refetchLeads
  } = useLeads();
  
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleLeadSelect = (leadId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };
  
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(leads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };
  
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };
  
  const handleBulkStatusUpdate = async (status: Lead['status']) => {
    if (selectedLeads.length === 0) return;
    
    try {
      // Update status for each selected lead
      await Promise.all(selectedLeads.map(id => handleStatusUpdate(id, status)));
      
      toast.success(`Updated ${selectedLeads.length} leads to ${status}`);
      setSelectedLeads([]);
    } catch (error) {
      toast.error('Failed to update leads');
      console.error(error);
    }
  };
  
  const filteredLeads = activeFilter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === activeFilter);
  
  const getAILeadScore = (lead: Lead): 'hot' | 'warm' | 'cold' => {
    // This would be replaced with actual AI-based scoring in a real implementation
    // For now, simple demo logic based on status
    if (lead.status === 'qualified') return 'hot';
    if (lead.status === 'contacted') return 'warm';
    return 'cold';
  };
  
  const getNextBestAction = (lead: Lead): string => {
    // Simplified logic for demo purposes
    // In real implementation, this would use AI to analyze lead behavior
    const score = getAILeadScore(lead);
    
    if (score === 'hot') return 'Schedule Zoom call';
    if (score === 'warm') return 'Send WhatsApp offer';
    return 'Make introduction call';
  };

  // Format campaigns data for the AddLeadDialog component
  const formattedCampaigns = campaignData.map(campaign => ({
    id: campaign.id,
    name: campaign.name
  }));

  return (
    <div className="animate-fadeIn space-y-6">
      <LeadsHeader isMobileView={isMobileView} />
      
      {isLoading ? (
        <LeadsLoading />
      ) : leads.length === 0 ? (
        <LeadsEmptyState />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
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
              onSelectAll={handleSelectAll}
              getLeadScore={getAILeadScore}
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
              getLeadScore={getAILeadScore}
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
              getLeadScore={getAILeadScore}
              getNextBestAction={getNextBestAction}
            />
          )}
        </>
      )}
    </div>
  );
}
