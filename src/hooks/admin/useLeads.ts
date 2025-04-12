
import { useState, useEffect, useCallback, useTransition } from 'react';
import { toast } from 'sonner';
import { Lead, LeadStatus } from '@/models/lead';
import { supabase } from '@/backend/supabase';
import { useDebounce } from '@/hooks/useDebounce';
import { triggerBusinessEvent } from '@/lib/zapier';
import { onNewLeadAdded, onNewClientSignup } from '@/utils/zapierEventTriggers';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isPending, startTransition] = useTransition();

  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const toggleSort = (column: 'name' | 'created_at') => {
    startTransition(() => {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    });
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
        startTransition(() => {
          const typedData: Lead[] = data ? data.map(item => ({
            ...item,
          })) : [];
          setLeads(typedData);
        });
      }
    } catch (err: any) {
      setError(err);
      toast.error(`Unexpected error fetching leads: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, sortBy, sortOrder, startTransition]);

  useEffect(() => {
    refetchLeads();
  }, [refetchLeads]);

  const addLead = async (leadData: Partial<Lead>) => {
    setIsAddingLead(true);
    setError(null);

    try {
      if (!leadData.name || !leadData.email || !leadData.campaign_id) {
        throw new Error("Name, email, and campaign_id are required to create a lead.");
      }

      const { id, created_at, ...safeLeadData } = leadData;
      const newLeadData = {
        ...safeLeadData,
        campaign_id: safeLeadData.campaign_id,
        status: safeLeadData.status || 'new',
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
      
      if (newLead) {
        await triggerBusinessEvent('lead_created', {
          entityId: newLead.id,
          entityType: 'lead',
          companyId: newLead.companyId,
          name: newLead.name,
          email: newLead.email,
          company: newLead.campaigns?.name,
          status: newLead.status,
          source: newLead.source || 'Manual Entry',
          phone: newLead.phone,
          score: newLead.score,
          campaignId: newLead.campaign_id,
          timestamp: new Date().toISOString()
        });
        
        await onNewLeadAdded({
          company: newLead.companyId || 'unknown',
          leadName: newLead.name,
          source: newLead.source || 'Manual Entry',
          leadId: newLead.id
        });
        
        console.log('Lead created and Zapier events triggered', newLead);
      }
      
      return newLead;
    } catch (error: any) {
      setError(error);
      toast.error(`Failed to create lead: ${error.message}`);
      return null;
    } finally {
      setIsAddingLead(false);
      refetchLeads();
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
      
      const existingLead = leads.find(l => l.id === leadId);
      
      const eventType = newStatus === 'client' ? 'lead_converted' : 'lead_status_changed';
      
      await triggerBusinessEvent(eventType, {
        entityId: leadId,
        entityType: 'lead',
        status: newStatus,
        previousStatus: existingLead?.status,
        timestamp: new Date().toISOString()
      });
      
      if (newStatus === 'client' && existingLead) {
        await onNewClientSignup({
          companyName: existingLead.companyId || 'unknown',
          clientName: existingLead.name,
          clientId: existingLead.id
        });
      }
      
      console.log(`Lead status changed to ${newStatus} and Zapier events triggered`, { leadId, status: newStatus });
      
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
    refetchLeads,
    isPending
  };
}
