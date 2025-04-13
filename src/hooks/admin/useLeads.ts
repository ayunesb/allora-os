
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Lead, LeadStatus } from '@/models/lead';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const toggleSort = (column: 'name' | 'created_at') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const refetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .ilike('name', `%${debouncedSearchQuery}%`)
        .order(sortBy, { ascending: sortOrder === 'asc' });

      if (error) {
        setError(error);
        toast.error(`Error fetching leads: ${error.message}`);
      } else {
        const typedData: Lead[] = data ? data.map(item => ({
          ...item,
        })) : [];
        setLeads(typedData);
      }
    } catch (err: any) {
      setError(err);
      toast.error(`Unexpected error fetching leads: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, sortBy, sortOrder]);

  useEffect(() => {
    refetchLeads();
  }, [refetchLeads]);

  const addLead = async (leadData: Partial<Lead>) => {
    setIsAddingLead(true);
    setError(null);

    try {
      if (!leadData.name || !leadData.email || !leadData.campaign_id) {
        throw new Error("Name, email, and campaign are required to create a lead.");
      }

      const { data: newLead, error } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          status: leadData.status || 'new',
          campaign_id: leadData.campaign_id,
        }])
        .select()
        .single();

      if (error) {
        setError(error);
        toast.error(`Failed to create lead: ${error.message}`);
        return null;
      }
      
      toast.success('Lead created successfully');
      refetchLeads();
      return newLead;
    } catch (error: any) {
      setError(error);
      toast.error(`Failed to create lead: ${error.message}`);
      return null;
    } finally {
      setIsAddingLead(false);
    }
  };

  const handleStatusUpdate = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);
      
      if (error) {
        toast.error(`Failed to update status: ${error.message}`);
        return false;
      }
      
      refetchLeads();
      toast.success('Lead status updated successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to update lead status: ${error.message}`);
      return false;
    }
  };

  const handleDelete = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
      
      if (error) {
        toast.error(`Failed to delete lead: ${error.message}`);
        return false;
      }
      
      refetchLeads();
      toast.success('Lead deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to delete lead: ${error.message}`);
      return false;
    }
  };

  return {
    leads,
    isLoading,
    isAddingLead,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    toggleSort,
    handleStatusUpdate,
    handleDelete,
    addLead,
    refetchLeads
  };
}
