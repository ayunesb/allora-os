
import { useState } from 'react';
import { Lead } from '@/models/lead';
import { toast } from 'sonner';

export const useLeadSelection = (handleStatusUpdate: (id: string, status: Lead['status']) => Promise<void>) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  const handleLeadSelect = (leadId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };
  
  const handleSelectAll = (allLeads: Lead[], isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(allLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
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

  return {
    selectedLeads,
    handleLeadSelect,
    handleSelectAll,
    handleBulkStatusUpdate,
    clearSelection: () => setSelectedLeads([])
  };
};
