
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Lead } from '@/models/lead';

export function useLeadOperations(companyId?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('leads')
        .select('*, campaigns(name)')
        .order('created_at', { ascending: false });
      
      // Add company filter if provided
      if (companyId) {
        query = query.eq('campaigns.company_id', companyId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data || [];
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError(err.message || 'Failed to fetch leads');
      toast.error(`Failed to fetch leads: ${err.message || 'Unknown error'}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    setError(null);
    
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);
      
      if (error) throw error;
      
      toast.success('Lead status updated successfully');
      return true;
    } catch (err: any) {
      console.error('Error updating lead status:', err);
      setError(err.message || 'Failed to update lead status');
      toast.error(`Failed to update lead status: ${err.message || 'Unknown error'}`);
      return false;
    }
  };

  const deleteLead = async (leadId: string) => {
    setError(null);
    
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
      
      if (error) throw error;
      
      toast.success('Lead deleted successfully');
      return true;
    } catch (err: any) {
      console.error('Error deleting lead:', err);
      setError(err.message || 'Failed to delete lead');
      toast.error(`Failed to delete lead: ${err.message || 'Unknown error'}`);
      return false;
    }
  };

  const createLead = async (data: Partial<Lead>) => {
    setError(null);
    
    try {
      if (!data.name || !data.email || !data.campaign_id) {
        throw new Error("Name, email, and campaign_id are required to create a lead.");
      }
      
      const { data: lead, error } = await supabase
        .from('leads')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status || 'new',
          campaign_id: data.campaign_id
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success('Lead created successfully');
      return lead;
    } catch (err: any) {
      console.error('Error creating lead:', err);
      setError(err.message || 'Failed to create lead');
      toast.error(`Failed to create lead: ${err.message || 'Unknown error'}`);
      return null;
    }
  };
  
  return {
    isLoading,
    error,
    fetchLeads,
    updateLeadStatus,
    deleteLead,
    createLead
  };
}
