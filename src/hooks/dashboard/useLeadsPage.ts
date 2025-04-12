
import { useState, useEffect, useCallback, useTransition } from 'react';
import { toast } from 'sonner';
import { Lead } from '@/models/lead';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { useAdvancedLeadScoring } from '@/hooks/useAdvancedLeadScoring';

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
  const [isPending, startTransition] = useTransition();
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  const { 
    calculateAdvancedScore, 
    getLeadScoreCategory, 
    getNextBestAction, 
    getLeadPriority 
  } = useAdvancedLeadScoring();
  
  // Fetch leads
  const fetchLeads = useCallback(async () => {
    if (!profile?.company_id) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setLeadsError(null);
    
    try {
      // First, check the Supabase connection
      const response = await supabase.functions.invoke('check-connection', {
        body: { silent: true }
      }).catch(() => ({ data: { connected: false, error: new Error('Connection check failed') }}));
      
      // Check if we have a valid response and connection
      const connectionInfo = response.data || { connected: false, error: new Error('Invalid connection response') };
      
      if (!connectionInfo.connected) {
        throw connectionInfo.error || new Error('Unable to connect to database');
      }
      
      const { data, error } = await supabase
        .from('leads')
        .select('*, campaigns(name)')
        .eq('campaigns.company_id', profile.company_id)
        .order(sortBy, { ascending: sortOrder === 'asc' });
        
      if (error) throw error;
      
      startTransition(() => {
        setLeads(data || []);
      });
      
      // Fetch campaigns for the filters
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('id, name')
        .eq('company_id', profile.company_id);
        
      if (campaignsError) {
        console.error('Error fetching campaigns:', campaignsError);
      } else if (campaigns) {
        startTransition(() => {
          setFormattedCampaigns(
            campaigns.map(c => ({ value: c.id, label: c.name }))
          );
        });
      }
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      setLeadsError(error);
      toast.error('Failed to load leads', { 
        description: error.message || 'Database connection error' 
      });
    } finally {
      setIsLoading(false);
    }
  }, [profile?.company_id, sortBy, sortOrder, startTransition]);
  
  useEffect(() => {
    // Wrap the effect body in startTransition to prevent suspension during updates
    startTransition(() => {
      fetchLeads();
    });
  }, [fetchLeads]);
  
  const toggleSort = useCallback((column: typeof sortBy) => {
    startTransition(() => {
      setSortBy(column);
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    });
  }, [startTransition]);
  
  // Apply filters and search - moved inside a memoized function
  const getFilteredLeads = useCallback(() => {
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
  
  // Compute filtered leads using the memoized function
  const filteredLeads = getFilteredLeads();
  
  // Lead selection
  const handleLeadSelect = useCallback((leadId: string, isSelected: boolean) => {
    startTransition(() => {
      setSelectedLeads(prev => {
        if (isSelected) {
          return [...prev, leadId];
        } else {
          return prev.filter(id => id !== leadId);
        }
      });
    });
  }, [startTransition]);
  
  const handleSelectAll = useCallback((isSelected: boolean) => {
    startTransition(() => {
      if (isSelected) {
        setSelectedLeads(filteredLeads.map(lead => lead.id));
      } else {
        setSelectedLeads([]);
      }
    });
  }, [filteredLeads, startTransition]);
  
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
      
      startTransition(() => {
        fetchLeads();
        setSelectedLeads([]);
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating leads:', error);
      toast.error('Failed to update leads');
      return false;
    }
  }, [selectedLeads, fetchLeads, startTransition]);
  
  // Lead detail view
  const handleViewLead = useCallback((lead: Lead) => {
    startTransition(() => {
      setSelectedLead(lead);
      setIsDrawerOpen(true);
    });
  }, [startTransition]);
  
  // Lead actions
  const handleLeadStatusUpdate = useCallback(async (leadId: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);
        
      if (error) throw error;
      
      toast.success(`Lead status updated to ${newStatus}`);
      
      startTransition(() => {
        fetchLeads();
        
        // Update the selected lead if it's open
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update lead status');
      return false;
    }
  }, [fetchLeads, selectedLead, startTransition]);
  
  const handleLeadDelete = useCallback(async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
        
      if (error) throw error;
      
      toast.success('Lead deleted successfully');
      
      startTransition(() => {
        fetchLeads();
        
        // Close the drawer if the deleted lead was selected
        if (selectedLead && selectedLead.id === leadId) {
          setIsDrawerOpen(false);
          setSelectedLead(null);
        }
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
      return false;
    }
  }, [fetchLeads, selectedLead, startTransition]);

  return {
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
    refetchLeads: fetchLeads,
    getLeadScore: getLeadScoreCategory,
    getNextBestAction,
    getLeadPriority
  };
}
