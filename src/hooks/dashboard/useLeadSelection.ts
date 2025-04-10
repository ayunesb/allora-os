
import { useState, useCallback } from 'react';
import { Lead } from '@/models/lead';

export function useLeadSelection() {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const toggleSelectLead = useCallback((leadId: string) => {
    setSelectedLeads(prev => {
      if (prev.includes(leadId)) {
        return prev.filter(id => id !== leadId);
      } else {
        return [...prev, leadId];
      }
    });
  }, []);

  const selectAllLeads = useCallback((leads: Lead[]) => {
    const allLeadIds = leads.map(lead => lead.id);
    setSelectedLeads(allLeadIds);
    setIsSelectAll(true);
  }, []);

  const deselectAllLeads = useCallback(() => {
    setSelectedLeads([]);
    setIsSelectAll(false);
  }, []);

  const toggleSelectAll = useCallback((leads: Lead[]) => {
    if (selectedLeads.length === leads.length) {
      deselectAllLeads();
    } else {
      selectAllLeads(leads);
    }
  }, [selectedLeads, selectAllLeads, deselectAllLeads]);

  const isLeadSelected = useCallback((leadId: string) => {
    return selectedLeads.includes(leadId);
  }, [selectedLeads]);

  const getSelectedLeads = useCallback((allLeads: Lead[]) => {
    return allLeads.filter(lead => selectedLeads.includes(lead.id));
  }, [selectedLeads]);

  // Add the missing handleLeadSelect function (adapter for toggleSelectLead)
  const handleLeadSelect = useCallback((leadId: string, isSelected: boolean) => {
    if (isSelected && !selectedLeads.includes(leadId)) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else if (!isSelected && selectedLeads.includes(leadId)) {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  }, [selectedLeads]);

  // Add the missing handleSelectAll function (adapter for toggleSelectAll)
  const handleSelectAll = useCallback((leads: Lead[], isSelected: boolean) => {
    if (isSelected) {
      selectAllLeads(leads);
    } else {
      deselectAllLeads();
    }
  }, [selectAllLeads, deselectAllLeads]);

  // Add the missing handleBulkStatusUpdate function
  const handleBulkStatusUpdate = useCallback(async (status: Lead['status']) => {
    // This is a placeholder - in a real implementation, you would
    // update all selected leads to the new status via an API call
    console.log(`Updating ${selectedLeads.length} leads to status: ${status}`);
    // Return true to indicate success (simplified for this example)
    return true;
  }, [selectedLeads]);

  const selectedCount = selectedLeads.length;

  return {
    selectedLeads,
    selectedCount,
    isSelectAll,
    toggleSelectLead,
    selectAllLeads,
    deselectAllLeads,
    toggleSelectAll,
    isLeadSelected,
    getSelectedLeads,
    // Add the new functions to the return object
    handleLeadSelect,
    handleSelectAll,
    handleBulkStatusUpdate
  };
}
