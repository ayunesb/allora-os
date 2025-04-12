
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/hooks/campaigns';
import { useFilteredCampaigns } from '@/hooks/campaigns/useFilteredCampaigns';
import { useAdPlatformConnections } from '@/hooks/campaigns/useAdPlatformConnections';
import { refreshCampaignData } from '@/components/campaigns/dashboard/CampaignRefresh';
import { toast } from 'sonner';
import { refreshData } from '@/utils/shared/dataRefresh';

// Component imports
import { CampaignHeader } from '@/components/campaigns/dashboard/CampaignHeader';
import { CampaignStats } from '@/components/campaigns/dashboard/CampaignStats';
import { CampaignTabs } from '@/components/campaigns/dashboard/CampaignTabs';
import { CampaignList } from '@/components/campaigns/dashboard/CampaignList';
import { CampaignLoadingState } from '@/components/campaigns/LoadingState';

/**
 * CampaignDashboard Component
 * 
 * Provides a centralized view for managing all marketing campaigns
 * with filtering, refresh capabilities, and creation workflow.
 */
export default function CampaignDashboard() {
  const navigate = useNavigate();
  const { campaigns, isLoading, refetch } = useCampaigns();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { hasAdPlatformConnections } = useAdPlatformConnections();
  
  // Get filtered campaigns based on active tab
  const filteredCampaigns = useFilteredCampaigns(campaigns, activeTab);
  
  /**
   * Navigates to campaign creation or ad account connection page
   * based on whether the user has connected ad platforms
   */
  const handleCreateCampaign = (): void => {
    if (hasAdPlatformConnections) {
      navigate('/dashboard/campaigns/create');
    } else {
      navigate('/dashboard/ad-accounts');
    }
  };

  /**
   * Refreshes campaign data from ad platforms
   * Returns a Promise to match the expected type in CampaignHeader
   */
  const handleRefreshData = async (): Promise<void> => {
    try {
      // Use the shared refreshData utility for consistent refresh behavior
      return refreshData({
        fetchFn: async () => {
          // Call the specific campaign refresh function
          await refreshCampaignData({
            campaigns,
            onComplete: refetch,
            setIsRefreshing
          });
        },
        onComplete: async () => {
          await refetch();
        },
        setIsRefreshing,
        successMessage: 'Campaign data refreshed successfully',
        errorMessage: 'Failed to refresh campaign data'
      });
    } catch (error) {
      console.error('Error refreshing campaigns:', error);
      toast.error('Failed to refresh campaign data');
      setIsRefreshing(false);
      return Promise.resolve();
    }
  };

  if (isLoading) {
    return <CampaignLoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with title and actions */}
      <CampaignHeader 
        onRefresh={handleRefreshData}
        onCreateCampaign={handleCreateCampaign}
        isRefreshing={isRefreshing}
      />
      
      {/* Stats cards */}
      <CampaignStats campaigns={campaigns} />
      
      {/* Filter tabs */}
      <CampaignTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Campaign list or empty state */}
      <CampaignList 
        campaigns={campaigns}
        filteredCampaigns={filteredCampaigns}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
}
