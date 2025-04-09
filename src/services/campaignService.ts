
import { Campaign, CampaignCreate, CampaignUpdate } from '@/models/campaign';
import { apiRequest } from '@/utils/api/apiClient';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

export type CampaignCreateInput = CampaignCreate;
export type CampaignUpdateInput = CampaignUpdate;

/**
 * Fetch all campaigns for a specific company
 * @param companyId The ID of the company
 * @returns Promise with campaign data or error
 */
export async function fetchCompanyCampaigns(companyId: string) {
  logger.info('Fetching campaigns for company', { companyId });
  
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
    errorMessage: 'Failed to load campaigns',
    showErrorToast: true
  });
}

/**
 * Create a new campaign
 * @param campaign Campaign data to create
 * @returns Promise with created campaign or error
 */
export async function createCampaign(campaign: CampaignCreateInput) {
  logger.info('Creating new campaign', { campaign });
  
  return apiRequest<Campaign>(async () => {
    // Validate campaign data
    if (!campaign.name || !campaign.company_id) {
      throw new Error('Campaign name and company ID are required');
    }
    
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
 * @param id Campaign ID to update
 * @param updates Fields to update
 * @returns Promise with updated campaign or error
 */
export async function updateCampaign(id: string, updates: CampaignUpdateInput) {
  logger.info('Updating campaign', { id, updates });
  
  return apiRequest<Campaign>(async () => {
    if (Object.keys(updates).length === 0) {
      throw new Error('No update fields provided');
    }
    
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
 * @param id Campaign ID to delete
 * @returns Promise with success status or error
 */
export async function deleteCampaign(id: string) {
  logger.info('Deleting campaign', { id });
  
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
