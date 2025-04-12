
import React from 'react';
import { Campaign } from '@/models/campaign';
import { syncCampaignData } from '@/services/campaignService';
import { toast } from 'sonner';

/**
 * Props for campaign refresh operations
 */
interface CampaignRefreshProps {
  /** Array of campaigns to potentially refresh */
  campaigns: Campaign[];
  
  /** Callback function to execute after refresh completes */
  onComplete: () => Promise<void>;
  
  /** State setter for refresh status */
  setIsRefreshing: (isRefreshing: boolean) => void;
  
  /** Current refresh status */
  isRefreshing: boolean;
}

/**
 * Refreshes campaign data from external ad platforms
 * 
 * This function syncs data for all deployed and paid campaigns,
 * showing appropriate toast messages for success/failure.
 * 
 * @returns Promise that resolves when refresh operation is complete
 */
export async function refreshCampaignData({
  campaigns,
  onComplete,
  setIsRefreshing
}: Omit<CampaignRefreshProps, 'isRefreshing'>): Promise<void> {
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
  } catch (error: unknown) {
    console.error('Error refreshing campaign data:', error);
    toast.error('Failed to refresh campaign data');
    
    // Provide more detailed error information when available
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    setIsRefreshing(false);
  }
}
