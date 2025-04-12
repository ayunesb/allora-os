
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/hooks/campaigns';
import { useFilteredCampaigns } from '@/hooks/campaigns/useFilteredCampaigns';
import { useAdPlatformConnections } from '@/hooks/campaigns/useAdPlatformConnections';
import { refreshCampaignData } from '@/components/campaigns/dashboard/CampaignRefresh';

// Component imports
import { CampaignHeader } from '@/components/campaigns/dashboard/CampaignHeader';
import { CampaignStats } from '@/components/campaigns/dashboard/CampaignStats';
import { CampaignTabs } from '@/components/campaigns/dashboard/CampaignTabs';
import { CampaignList } from '@/components/campaigns/dashboard/CampaignList';
import { CampaignLoadingState } from '@/components/campaigns/LoadingState';

export default function CampaignDashboard() {
  const navigate = useNavigate();
  const { campaigns, isLoading, refetch } = useCampaigns();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { hasAdPlatformConnections } = useAdPlatformConnections();
  
  // Get filtered campaigns based on active tab
  const filteredCampaigns = useFilteredCampaigns(campaigns, activeTab);
  
  const handleCreateCampaign = () => {
    if (hasAdPlatformConnections) {
      navigate('/dashboard/campaigns/create');
    } else {
      navigate('/dashboard/ad-accounts');
    }
  };

  const handleRefreshData = async () => {
    await refreshCampaignData({
      campaigns,
      onComplete: refetch,
      setIsRefreshing
    });
  };

  if (isLoading) {
    return <CampaignLoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
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
