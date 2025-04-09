
import { supabase } from '@/backend/supabase';
import { toast } from "sonner";
import { Lead } from '@/models/lead';

export async function fetchCompanyLeads(companyId: string): Promise<Lead[]> {
  try {
    // Get campaigns for the company
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id')
      .eq('company_id', companyId);
      
    if (campaignsError) throw campaignsError;
    
    if (!campaigns || campaigns.length === 0) {
      return [];
    }
    
    const campaignIds = campaigns.map(campaign => campaign.id);
    
    // Get leads for the campaigns
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*, campaigns(name)')
      .in('campaign_id', campaignIds)
      .order('created_at', { ascending: false });
      
    if (leadsError) throw leadsError;
    
    return leads as Lead[] || [];
  } catch (error: any) {
    console.error('Error fetching leads:', error.message);
    return [];
  }
}

export async function updateLeadStatus(
  leadId: string,
  status: 'new' | 'contacted' | 'qualified' | 'closed'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', leadId);
      
    if (error) throw error;
    
    toast.success(`Lead status updated to ${status}`);
    return true;
  } catch (error: any) {
    console.error('Error updating lead status:', error.message);
    toast.error('Failed to update lead status');
    return false;
  }
}

export async function deleteLead(leadId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);
      
    if (error) throw error;
    
    toast.success('Lead deleted successfully');
    return true;
  } catch (error: any) {
    console.error('Error deleting lead:', error.message);
    toast.error('Failed to delete lead');
    return false;
  }
}
