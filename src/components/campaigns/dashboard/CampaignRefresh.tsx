
import React from 'react';
import { Campaign } from '@/models/campaign';
import { syncCampaignData } from '@/services/campaignService';
import { toast } from 'sonner';

interface CampaignRefreshProps {
  campaigns: Campaign[];
  onComplete: () => Promise<void>;
  setIsRefreshing: (isRefreshing: boolean) => void;
  isRefreshing: boolean;
}

export async function refreshCampaignData({
  campaigns,
  onComplete,
  setIsRefreshing
}: Omit<CampaignRefreshProps, 'isRefreshing'>) {
  setIsRefreshing(true);
  
  try {
    // Only refresh deployed campaigns
    const deployedCampaigns = campaigns.filter(c => 
      c.deployment_status === 'deployed' && c.payment_status === 'paid'
    );
    
    if (deployedCampaigns.length === 0) {
      await onComplete();
      toast.success('Campaign list refreshed');
      return;
    }
    
    // Sync data for each deployed campaign
    for (const campaign of deployedCampaigns) {
      await syncCampaignData(campaign.id);
    }
    
    // Refetch campaigns
    await onComplete();
    toast.success('Campaign data refreshed');
  } catch (error: any) {
    console.error('Error refreshing campaign data:', error);
    toast.error('Failed to refresh campaign data');
  } finally {
    setIsRefreshing(false);
  }
}
