
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Lead } from '@/models/lead';

export async function fetchCampaignLeads(campaignId: string): Promise<Lead[]> {
  try {
    const { data, error } = await (supabase
      .from('leads') as any)
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error('Error fetching leads:', error.message);
    return [];
  }
}

export async function fetchCompanyLeads(companyId: string): Promise<Lead[]> {
  try {
    const { data: campaigns, error: campaignsError } = await (supabase
      .from('campaigns') as any)
      .select('id')
      .eq('company_id', companyId);
    
    if (campaignsError) {
      throw campaignsError;
    }
    
    const campaignIds = campaigns.map((c: { id: string }) => c.id);
    
    if (campaignIds.length === 0) {
      return [];
    }
    
    const { data, error } = await (supabase
      .from('leads') as any)
      .select('*')
      .in('campaign_id', campaignIds)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error('Error fetching company leads:', error.message);
    return [];
  }
}

export async function createLead(
  campaignId: string,
  name: string,
  email: string,
  phone: string,
  status: 'new' | 'contacted' | 'qualified' | 'closed' = 'new'
): Promise<Lead | null> {
  try {
    const { data, error } = await (supabase
      .from('leads') as any)
      .insert([
        { 
          campaign_id: campaignId,
          name,
          email,
          phone,
          status
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Lead created successfully');
    return data;
  } catch (error: any) {
    toast.error(`Failed to create lead: ${error.message}`);
    return null;
  }
}

export async function updateLeadStatus(
  leadId: string,
  status: 'new' | 'contacted' | 'qualified' | 'closed'
): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('leads') as any)
      .update({ status })
      .eq('id', leadId);

    if (error) {
      throw error;
    }

    toast.success('Lead status updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update lead status: ${error.message}`);
    return false;
  }
}

export async function updateLead(
  leadId: string,
  updates: Partial<Omit<Lead, 'id' | 'created_at' | 'campaignId'>>
): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('leads') as any)
      .update(updates)
      .eq('id', leadId);

    if (error) {
      throw error;
    }

    toast.success('Lead updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update lead: ${error.message}`);
    return false;
  }
}

export async function deleteLead(leadId: string): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('leads') as any)
      .delete()
      .eq('id', leadId);

    if (error) {
      throw error;
    }

    toast.success('Lead deleted successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete lead: ${error.message}`);
    return false;
  }
}
