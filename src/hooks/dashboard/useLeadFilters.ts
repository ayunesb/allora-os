
import { useState, useMemo } from 'react';
import { Lead } from '@/models/lead';

export const useLeadFilters = (leads: Lead[]) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Apply filters to leads
  const filteredLeads = useMemo(() => {
    // First apply status filter
    const statusFiltered = activeFilter === 'all' 
      ? leads 
      : leads.filter(lead => lead.status === activeFilter);
    
    // Then apply search filter if there's a query
    if (searchQuery.trim() === '') {
      return statusFiltered;
    }
    
    const query = searchQuery.toLowerCase();
    return statusFiltered.filter(lead => 
      lead.name.toLowerCase().includes(query) || 
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.phone && lead.phone.toLowerCase().includes(query))
    );
  }, [leads, searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredLeads
  };
};
