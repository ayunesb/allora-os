
import { useMemo } from 'react';
import { Campaign } from '@/models/campaign';

export function useFilteredCampaigns(campaigns: Campaign[], activeTab: string) {
  return useMemo(() => {
    if (activeTab === 'all') {
      return campaigns;
    }
    
    if (activeTab === 'active') {
      return campaigns.filter(c => c.deployment_status === 'deployed' && c.payment_status === 'paid');
    }
    
    if (activeTab === 'pending') {
      return campaigns.filter(c => 
        c.deployment_status === 'pending' || 
        c.deployment_status === 'ready' || 
        c.payment_status !== 'paid'
      );
    }
    
    if (activeTab === 'meta') {
      return campaigns.filter(c => c.ad_platform === 'meta');
    }
    
    if (activeTab === 'tiktok') {
      return campaigns.filter(c => c.ad_platform === 'tiktok');
    }
    
    return campaigns;
  }, [campaigns, activeTab]);
}
