
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '@/hooks/campaigns';
import { syncCampaignData } from '@/services/campaignService';
import { toast } from 'sonner';
import { getAdPlatformConnections } from '@/services/adPlatformService';
import { useFilteredCampaigns } from '@/hooks/campaigns/useFilteredCampaigns';

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
  const [hasAdPlatformConnections, setHasAdPlatformConnections] = useState(false);
  
  // Get filtered campaigns based on active tab
  const filteredCampaigns = useFilteredCampaigns(campaigns, activeTab);
  
  // Check for ad platform connections
  React.useEffect(() => {
    const checkConnections = async () => {
      try {
        const connections = await getAdPlatformConnections();
        setHasAdPlatformConnections(connections.length > 0);
      } catch (error) {
        console.error('Error checking ad platform connections:', error);
      }
    };

    checkConnections();
  }, []);

  const handleCreateCampaign = () => {
    if (hasAdPlatformConnections) {
      navigate('/dashboard/campaigns/create');
    } else {
      navigate('/dashboard/ad-accounts');
    }
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    
    try {
      // Only refresh deployed campaigns
      const deployedCampaigns = campaigns.filter(c => 
        c.deployment_status === 'deployed' && c.payment_status === 'paid'
      );
      
      if (deployedCampaigns.length === 0) {
        await refetch();
        toast.success('Campaign list refreshed');
        return;
      }
      
      // Sync data for each deployed campaign
      for (const campaign of deployedCampaigns) {
        await syncCampaignData(campaign.id);
      }
      
      // Refetch campaigns
      await refetch();
      toast.success('Campaign data refreshed');
    } catch (error: any) {
      console.error('Error refreshing campaign data:', error);
      toast.error('Failed to refresh campaign data');
    } finally {
      setIsRefreshing(false);
    }
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
