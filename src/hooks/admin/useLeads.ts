
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Lead } from '@/models/lead';
import { handleApiError } from '@/utils/api/errorHandling';
import { updateLeadStatus, deleteLead } from '@/utils/leadHelpers';

export const useLeads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { 
    data: leads = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['leads', sortBy, sortOrder],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order(sortBy, { ascending: sortOrder === 'asc' });
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        throw error;
      }
    }
  });
  
  useEffect(() => {
    if (error) {
      handleApiError(error, {
        customMessage: 'Failed to load leads data'
      });
    }
  }, [error]);
  
  const handleStatusUpdate = async (leadId: string, status: Lead['status']) => {
    try {
      const success = await updateLeadStatus(leadId, status);
      if (success) {
        toast.success(`Lead status updated to ${status}`);
        refetch();
      }
    } catch (error) {
      handleApiError(error, {
        customMessage: 'Failed to update lead status'
      });
    }
  };
  
  const handleDelete = async (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const success = await deleteLead(leadId);
        if (success) {
          toast.success('Lead deleted successfully');
          refetch();
        }
      } catch (error) {
        handleApiError(error, {
          customMessage: 'Failed to delete lead'
        });
      }
    }
  };
  
  const toggleSort = (column: 'name' | 'created_at') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  const filteredLeads = searchQuery.trim() === '' 
    ? leads 
    : leads.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return {
    leads: filteredLeads,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    toggleSort,
    handleStatusUpdate,
    handleDelete,
    refetchLeads: refetch
  };
};
