
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getCampaign, syncCampaignData, deployCampaign } from '@/services/campaignService';
import { Campaign } from '@/models/campaign';
import CampaignMetrics from '@/components/campaigns/CampaignMetrics';

// Import refactored components
import { CampaignDetailHeader } from '@/components/campaigns/detail/CampaignDetailHeader';
import { CampaignMetricCards } from '@/components/campaigns/detail/CampaignMetricCards';
import { CampaignDetails } from '@/components/campaigns/detail/CampaignDetails';
import { CampaignDetailLoadingState } from '@/components/campaigns/detail/CampaignLoadingState';
import { CampaignNotFound } from '@/components/campaigns/detail/CampaignNotFound';

export default function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        const campaignData = await getCampaign(id);
        setCampaign(campaignData);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast.error('Failed to load campaign details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleRefreshData = async () => {
    if (!campaign) return;
    
    setIsRefreshing(true);
    
    try {
      const result = await syncCampaignData(campaign.id);
      
      if (result.success) {
        // Refresh campaign data
        const updatedCampaign = await getCampaign(campaign.id);
        setCampaign(updatedCampaign);
        toast.success('Campaign data refreshed');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('Error refreshing campaign data:', error);
      toast.error(`Failed to refresh data: ${error.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeployCampaign = async () => {
    if (!campaign) return;
    
    setIsDeploying(true);
    
    try {
      const result = await deployCampaign(campaign.id);
      
      if (result.success) {
        // Refresh campaign data
        const updatedCampaign = await getCampaign(campaign.id);
        setCampaign(updatedCampaign);
        toast.success('Campaign deployed successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('Error deploying campaign:', error);
      toast.error(`Failed to deploy campaign: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (isLoading) {
    return <CampaignDetailLoadingState />;
  }

  if (!campaign) {
    return <CampaignNotFound onBack={() => navigate('/dashboard/campaigns')} />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header with back button and status */}
      <CampaignDetailHeader 
        campaign={campaign}
        onBack={() => navigate('/dashboard/campaigns')}
        onDeploy={handleDeployCampaign}
        isDeploying={isDeploying}
      />
      
      {/* Metric cards */}
      <CampaignMetricCards campaign={campaign} />
      
      {/* Campaign metrics section when deployed */}
      {campaign.payment_status === 'paid' && campaign.deployment_status === 'deployed' && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <CampaignMetrics 
              campaign={campaign}
              onRefresh={handleRefreshData}
              isRefreshing={isRefreshing}
            />
          </CardContent>
        </Card>
      )}
      
      {/* Campaign details section */}
      <CampaignDetails campaign={campaign} />
    </div>
  );
}
