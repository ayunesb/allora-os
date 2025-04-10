
import { useState } from 'react';
import { Lead } from '@/models/lead';

export const useLeadDrawer = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };
  
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Optional: clear selected lead after animation completes
    setTimeout(() => {
      setSelectedLead(null);
    }, 300);
  };

  return {
    selectedLead,
    isDrawerOpen,
    handleViewLead,
    handleCloseDrawer,
    setIsDrawerOpen
  };
};
