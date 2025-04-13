
import { useState } from 'react';
import { toast } from 'sonner';
import { Campaign, CampaignCreate, CampaignUpdate } from '@/models/campaign';
import { 
  createCampaign,
  getCampaign
} from '@/services/campaignService';
import { supabase } from '@/integrations/supabase/client';

export interface CampaignFormData {
  name: string;
  platform: string;
  budget: number;
  company_id: string;
}

export function useCampaignOperations(companyId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setCampaigns(data || []);
      return data;
    } catch (err: any) {
      console.error('Error fetching campaigns:', err);
      setError(err.message || 'Failed to fetch campaigns');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCampaign = async (id: string) => {
    try {
      const campaign = await getCampaign(id);
      return campaign;
    } catch (err: any) {
      console.error('Error fetching campaign:', err);
      setError(err.message || 'Failed to fetch campaign');
      return null;
    }
  };

  const createNewCampaign = async (data: CampaignCreate) => {
    setIsCreating(true);
    setError(null);
    
    try {
      const response = await createCampaign({
        name: data.name,
        platform: data.platform || 'meta',
        budget: data.budget || 0,
        targeting: data.targeting || {},
        creatives: data.creatives || [],
        company_id: companyId
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to create campaign');
      }
      
      await fetchCampaigns();
      
      return { success: true, campaignId: response.campaignId };
    } catch (err: any) {
      console.error('Error creating campaign:', err);
      setError(err.message || 'Failed to create campaign');
      toast.error(`Failed to create campaign: ${err.message || 'Unknown error'}`);
      return { success: false, error: err.message || 'Failed to create campaign' };
    } finally {
      setIsCreating(false);
    }
  };

  const updateCampaign = async (id: string, data: CampaignUpdate) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('campaigns')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchCampaigns();
      
      toast.success('Campaign updated successfully');
      return { success: true };
    } catch (err: any) {
      console.error('Error updating campaign:', err);
      setError(err.message || 'Failed to update campaign');
      toast.error(`Failed to update campaign: ${err.message || 'Unknown error'}`);
      return { success: false, error: err.message || 'Failed to update campaign' };
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchCampaigns();
      
      toast.success('Campaign deleted successfully');
      return { success: true };
    } catch (err: any) {
      console.error('Error deleting campaign:', err);
      setError(err.message || 'Failed to delete campaign');
      toast.error(`Failed to delete campaign: ${err.message || 'Unknown error'}`);
      return { success: false, error: err.message || 'Failed to delete campaign' };
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    campaigns,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchCampaigns,
    fetchCampaign,
    createCampaign: createNewCampaign,
    updateCampaign,
    deleteCampaign
  };
}
