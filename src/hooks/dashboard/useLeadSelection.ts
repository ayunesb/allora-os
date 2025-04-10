
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
    getSelectedLeads
  };
}
