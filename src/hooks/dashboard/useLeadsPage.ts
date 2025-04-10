
import { useEffect, useCallback } from 'react';
import { Lead } from '@/models/lead';
import { useLeads } from '@/hooks/admin/useLeads';
import { useCampaigns } from '@/hooks/campaigns';
import { useLeadScoring } from '@/hooks/dashboard/useLeadScoring';
import { useLeadFilters } from '@/hooks/dashboard/useLeadFilters';
import { useLeadSelection } from '@/hooks/dashboard/useLeadSelection';
import { useLeadDrawer } from '@/hooks/dashboard/useLeadDrawer';

export function useLeadsPage() {
  // Get campaign data
  const { campaigns: campaignData, isLoading: isCampaignsLoading } = useCampaigns();
  
  // Use the lead data hook
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
  
  // Extract AI scoring logic
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
  
  // Format campaigns data
  const formattedCampaigns = campaignData.map(campaign => ({
    id: campaign.id,
    name: campaign.name
  }));

  // Adapter functions for void returns
  const handleLeadStatusUpdate = useCallback(async (leadId: string, status: Lead['status']) => {
    await handleStatusUpdate(leadId, status);
    return; // Explicitly return void
  }, [handleStatusUpdate]);

  const handleLeadDelete = useCallback(async (leadId: string) => {
    await handleDelete(leadId);
    return; // Explicitly return void
  }, [handleDelete]);

  return {
    // State
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
    
    // Actions
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
  };
}
