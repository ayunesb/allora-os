
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Lead } from '@/models/lead';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { useLeadScoring } from '@/hooks/dashboard/useLeadScoring';

export function useLeadsPage() {
  const { user, profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'created_at' | 'status'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formattedCampaigns, setFormattedCampaigns] = useState<{value: string, label: string}[]>([]);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  const { calculateLeadScore, getLeadScore, getNextBestAction } = useLeadScoring();
  
  // Fetch leads
  const fetchLeads = useCallback(async () => {
    if (!profile?.company_id) return;
    
    setIsLoading(true);
    setLeadsError(null);
    
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*, campaigns(name)')
        .eq('campaigns.company_id', profile.company_id)
        .order(sortBy, { ascending: sortOrder === 'asc' });
        
      if (error) throw error;
      
      setLeads(data || []);
      
      // Fetch campaigns for the filters
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id, name')
        .eq('company_id', profile.company_id);
        
      if (campaigns) {
        setFormattedCampaigns(
          campaigns.map(c => ({ value: c.id, label: c.name }))
        );
      }
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      setLeadsError(error);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }, [profile?.company_id, sortBy, sortOrder]);
  
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
  
  const toggleSort = useCallback((column: typeof sortBy) => {
    setSortBy(column);
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);
  
  // Apply filters and search
  const filteredLeads = useCallback(() => {
    if (!leads) return [];
    
    return leads.filter(lead => {
      // Apply search filter
      const matchesSearch = !debouncedSearchQuery || 
        lead.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (lead.phone && lead.phone.includes(debouncedSearchQuery));
      
      // Apply campaign filter
      const matchesFilter = !activeFilter || lead.campaign_id === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [leads, debouncedSearchQuery, activeFilter]);
  
  // Lead selection
  const handleLeadSelect = useCallback((leadId: string, isSelected: boolean) => {
    setSelectedLeads(prev => {
      if (isSelected) {
        return [...prev, leadId];
      } else {
        return prev.filter(id => id !== leadId);
      }
    });
  }, []);
  
  const handleSelectAll = useCallback((isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads(filteredLeads().map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  }, [filteredLeads]);
  
  // Bulk actions
  const handleBulkStatusUpdate = useCallback(async (newStatus: Lead['status']) => {
    if (selectedLeads.length === 0) return;
    
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .in('id', selectedLeads);
        
      if (error) throw error;
      
      toast.success(`Updated ${selectedLeads.length} leads to ${newStatus}`);
      fetchLeads();
      setSelectedLeads([]);
    } catch (error: any) {
      console.error('Error updating leads:', error);
      toast.error('Failed to update leads');
    }
  }, [selectedLeads, fetchLeads]);
  
  // Lead detail view
  const handleViewLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  }, []);
  
  // Lead actions
  const handleLeadStatusUpdate = useCallback(async (leadId: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);
        
      if (error) throw error;
      
      toast.success(`Lead status updated to ${newStatus}`);
      fetchLeads();
      
      // Update the selected lead if it's open
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error: any) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update lead status');
    }
  }, [fetchLeads, selectedLead]);
  
  const handleLeadDelete = useCallback(async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
        
      if (error) throw error;
      
      toast.success('Lead deleted successfully');
      fetchLeads();
      
      // Close the drawer if the deleted lead was selected
      if (selectedLead && selectedLead.id === leadId) {
        setIsDrawerOpen(false);
        setSelectedLead(null);
      }
    } catch (error: any) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
    }
  }, [fetchLeads, selectedLead]);

  return {
    leads,
    isLoading,
    leadsError,
    searchQuery,
    sortBy,
    sortOrder,
    activeFilter,
    filteredLeads: filteredLeads(),
    selectedLeads,
    selectedLead,
    isDrawerOpen,
    formattedCampaigns,
    
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
    refetchLeads: fetchLeads,
    getLeadScore,
    getNextBestAction
  };
}
