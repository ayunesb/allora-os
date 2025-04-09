
import { Campaign } from '@/models/campaign';
import { apiRequest } from '@/utils/api/apiClient';
import { supabase } from '@/integrations/supabase/client';

export type CampaignCreateInput = {
  name: string;
  platform: string;
  budget: number;
  company_id: string;
};

export type CampaignUpdateInput = Partial<Omit<Campaign, 'id' | 'created_at' | 'companies'>>;

/**
 * Fetch all campaigns for a specific company
 */
export async function fetchCompanyCampaigns(companyId: string) {
  return apiRequest<Campaign[]>(async () => {
    const response = await supabase
      .from('campaigns')
      .select(`
        *,
        companies(name)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });
    
    return response;
  }, {
    errorMessage: 'Failed to load campaigns'
  });
}

/**
 * Create a new campaign
 */
export async function createCampaign(campaign: CampaignCreateInput) {
  return apiRequest<Campaign>(async () => {
    const response = await supabase
      .from('campaigns')
      .insert([campaign])
      .select(`
        *,
        companies(name)
      `)
      .single();
    
    return response;
  }, {
    showSuccessToast: true,
    successMessage: 'Campaign created successfully',
    errorMessage: 'Failed to create campaign'
  });
}

/**
 * Update an existing campaign
 */
export async function updateCampaign(id: string, updates: CampaignUpdateInput) {
  return apiRequest<Campaign>(async () => {
    const response = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        companies(name)
      `)
      .single();
    
    return response;
  }, {
    showSuccessToast: true,
    successMessage: 'Campaign updated successfully',
    errorMessage: 'Failed to update campaign'
  });
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(id: string) {
  return apiRequest<null>(async () => {
    const response = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    
    return response;
  }, {
    showSuccessToast: true,
    successMessage: 'Campaign deleted successfully',
    errorMessage: 'Failed to delete campaign'
  });
}
