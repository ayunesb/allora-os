
import { useState, useCallback } from 'react';
import { useApiClient } from '@/utils/api/enhancedApiClient';
import { toast } from 'sonner';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    cost?: number;
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CampaignCreateParams {
  name: string;
  description?: string;
  status?: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
}

export interface CampaignUpdateParams extends Partial<CampaignCreateParams> {
  id: string;
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { execute } = useApiClient();

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await execute<Campaign[]>('/api/campaigns', 'GET');
      setCampaigns(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch campaigns');
      toast.error(err.message || 'Failed to fetch campaigns');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [execute]);

  const fetchCampaignById = useCallback(async (campaignId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await execute<Campaign>(`/api/campaigns/${campaignId}`, 'GET');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch campaign');
      toast.error(err.message || 'Failed to fetch campaign');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [execute]);

  const createCampaign = useCallback(async (params: CampaignCreateParams) => {
    setIsCreating(true);
    setError(null);
    
    try {
      const result = await execute<Campaign>('/api/campaigns', 'POST', params);
      setCampaigns(prev => [...prev, result]);
      toast.success('Campaign created successfully');
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign');
      toast.error(err.message || 'Failed to create campaign');
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, [execute]);

  const updateCampaign = useCallback(async (params: CampaignUpdateParams) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const { id, ...updateData } = params;
      const result = await execute<Campaign>(`/api/campaigns/${id}`, 'PUT', updateData);
      
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id ? result : campaign
        )
      );
      
      toast.success('Campaign updated successfully');
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to update campaign');
      toast.error(err.message || 'Failed to update campaign');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, [execute]);

  const deleteCampaign = useCallback(async (campaignId: string) => {
    setIsDeleting(true);
    setError(null);
    
    try {
      await execute<void>(`/api/campaigns/${campaignId}`, 'DELETE');
      setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
      toast.success('Campaign deleted successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to delete campaign');
      toast.error(err.message || 'Failed to delete campaign');
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [execute]);

  // Add refetch as an alias for fetchCampaigns for compatibility
  const refetch = fetchCampaigns;

  return {
    campaigns,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchCampaigns,
    fetchCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch
  };
}
