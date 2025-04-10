
import { useState, useCallback, useMemo } from 'react';
import { Lead, LeadStatus } from '@/models/lead';

type FilterCriteria = {
  status?: LeadStatus | 'all';
  search?: string;
  campaignId?: string;
  startDate?: Date;
  endDate?: Date;
};

export function useLeadFilters(initialLeads: Lead[] = []) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filters, setFilters] = useState<FilterCriteria>({
    status: 'all',
    search: '',
    campaignId: undefined,
    startDate: undefined,
    endDate: undefined
  });
  // Add activeFilter state to track the active filter tab
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const updateFilters = useCallback((newFilters: Partial<FilterCriteria>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // Update activeFilter if status is changing
    if (newFilters.status) {
      setActiveFilter(newFilters.status);
    }
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: 'all',
      search: '',
      campaignId: undefined,
      startDate: undefined,
      endDate: undefined
    });
    setActiveFilter('all');
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Filter by status
      if (filters.status && filters.status !== 'all' && lead.status !== filters.status) {
        return false;
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const nameMatch = lead.name.toLowerCase().includes(searchTerm);
        const emailMatch = lead.email?.toLowerCase().includes(searchTerm) || false;
        const phoneMatch = lead.phone?.toLowerCase().includes(searchTerm) || false;
        
        if (!nameMatch && !emailMatch && !phoneMatch) {
          return false;
        }
      }

      // Filter by campaign
      if (filters.campaignId && lead.campaign_id !== filters.campaignId) {
        return false;
      }

      // Filter by date range
      if (filters.startDate || filters.endDate) {
        const leadDate = new Date(lead.created_at);
        
        if (filters.startDate && leadDate < filters.startDate) {
          return false;
        }
        
        if (filters.endDate) {
          const endDatePlus1 = new Date(filters.endDate);
          endDatePlus1.setDate(endDatePlus1.getDate() + 1);
          
          if (leadDate >= endDatePlus1) {
            return false;
          }
        }
      }

      // If it passes all filters, include it
      return true;
    });
  }, [leads, filters]);

  const filterStats = useMemo(() => {
    const total = leads.length;
    const filtered = filteredLeads.length;
    const statusCounts: Record<string, number> = {};
    
    // Count leads by status
    leads.forEach(lead => {
      statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
    });
    
    return {
      total,
      filtered,
      percentageShown: total > 0 ? Math.round((filtered / total) * 100) : 0,
      statusCounts
    };
  }, [leads, filteredLeads]);

  return {
    leads,
    setLeads,
    filters,
    updateFilters,
    resetFilters,
    filteredLeads,
    filterStats,
    // Add the new properties to the return object
    activeFilter,
    setActiveFilter
  };
}
