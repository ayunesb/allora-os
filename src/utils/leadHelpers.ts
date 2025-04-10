import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Lead, LeadStatus } from '@/models/lead';
import { handleApiError } from '@/utils/api/errorHandling';

/**
 * Fetch leads for a specific campaign
 */
export async function fetchCompanyLeads(companyId: string): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*, campaigns(name)')
      .eq('campaigns.company_id', companyId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    handleApiError(error, {
      customMessage: 'Failed to fetch company leads',
      rethrow: false
    });
    return [];
  }
}

/**
 * Update the status of a lead
 */
export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', leadId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    handleApiError(error, {
      customMessage: 'Failed to update lead status',
      rethrow: false
    });
    return false;
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(leadId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    handleApiError(error, {
      customMessage: 'Failed to delete lead',
      rethrow: false
    });
    return false;
  }
}

/**
 * Create a new lead
 */
export async function createLead(leadData: Omit<Lead, 'id' | 'created_at'>): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    handleApiError(error, {
      customMessage: 'Failed to create new lead',
      rethrow: false
    });
    return null;
  }
}

// Example function using LeadStatus
export function getStatusColor(status: LeadStatus): string {
  switch (status) {
    case 'new':
      return 'blue';
    case 'contacted':
      return 'orange';
    case 'qualified':
      return 'green';
    case 'proposal':
      return 'purple';
    case 'negotiation':
      return 'yellow';
    case 'closed':
      return 'emerald';
    case 'lost':
      return 'red';
    default:
      return 'gray';
  }
}

// Other lead helper functions
export function formatLeadData(lead: Lead) {
  return {
    ...lead,
    status: lead.status || 'new',
    campaignName: lead.campaigns?.name || 'Unknown Campaign'
  };
}
