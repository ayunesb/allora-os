import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Lead } from '@/models/lead';
import { supabase } from '@/backend/supabase';
import { useDebounce } from '@/hooks/useDebounce';
import { triggerBusinessEvent } from '@/lib/zapier';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Lead>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleSort = (column: keyof Lead) => {
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
        // Ensure that the data is of type Lead[]
        const typedData: Lead[] = data ? data.map(item => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : undefined,
          updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : undefined,
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
      // Ensure required fields are present
      if (!leadData.name || !leadData.email || !leadData.companyId) {
        throw new Error("Name, email, and companyId are required to create a lead.");
      }

      // Omit potentially problematic fields and add companyId
      const { id, createdAt, updatedAt, score, ...safeLeadData } = leadData;
      const newLeadData = {
        ...safeLeadData,
        companyId: safeLeadData.companyId, // Ensure companyId is correctly passed
        status: safeLeadData.status || 'New', // Set default status if not provided
        source: safeLeadData.source || 'Manual Entry',
        score: safeLeadData.score || 0
      };

      const { data: newLead, error } = await supabase
        .from('leads')
        .insert([newLeadData])
        .select()
        .single();

      if (error) {
        setError(error);
        toast.error(`Failed to create lead: ${error.message}`);
        return null;
      }
      
      // After successful lead creation, trigger the Zapier business event
      if (newLead) {
        await triggerBusinessEvent('lead_created', {
          entityId: newLead.id,
          entityType: 'lead',
          companyId: newLead.companyId,
          name: newLead.name,
          email: newLead.email,
          company: newLead.company,
          title: newLead.title,
          status: newLead.status,
          source: newLead.source || 'Manual Entry',
          phone: newLead.phone,
          score: newLead.score,
          campaignId: newLead.campaignId,
          timestamp: new Date().toISOString()
        });
        
        console.log('Lead created and Zapier event triggered', newLead);
      }
      
      return newLead;
    } catch (error: any) {
      setError(error);
      toast.error(`Failed to create lead: ${error.message}`);
      return null;
    } finally {
      setIsAddingLead(false);
      refetchLeads(); // Refresh leads after adding
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
      
      // After successful status update, trigger the Zapier business event
      // Check if the new status is 'Client' which would mean a lead conversion
      const eventType = newStatus === 'Client' ? 'lead_converted' : 'lead_status_changed';
      
      await triggerBusinessEvent(eventType, {
        entityId: leadId,
        entityType: 'lead',
        status: newStatus,
        previousStatus: leads.find(l => l.id === leadId)?.status,
        timestamp: new Date().toISOString()
      });
      
      console.log(`Lead status changed to ${newStatus} and Zapier event triggered`, { leadId, status: newStatus });
      
      refetchLeads(); // Refresh leads after status update
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
      
      refetchLeads(); // Refresh leads after deletion
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
