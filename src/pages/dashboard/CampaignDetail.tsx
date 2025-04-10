import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Facebook, 
  RefreshCcw,
  Share2, 
  Users 
} from 'lucide-react';
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { toast } from 'sonner';
import { getCampaign, syncCampaignData, deployCampaign } from '@/services/campaignService';
import { Campaign } from '@/models/campaign';
import CampaignMetrics from '@/components/campaigns/CampaignMetrics';

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

  const getStatusBadge = () => {
    if (!campaign) return null;
    
    if (campaign.payment_status !== 'paid') {
      return <Badge variant="destructive">Payment Required</Badge>;
    }
    
    if (campaign.deployment_status === 'pending') {
      return <Badge variant="outline">Pending Deployment</Badge>;
    }
    
    if (campaign.deployment_status === 'ready') {
      return <Badge variant="warning">Ready to Deploy</Badge>;
    }
    
    if (campaign.deployment_status === 'deployed') {
      if (campaign.platform_status === 'ACTIVE' || campaign.platform_status === 'CAMPAIGN_STATUS_ENABLE') {
        return <Badge variant="success">Live</Badge>;
      } else {
        return <Badge variant="secondary">{campaign.platform_status}</Badge>;
      }
    }
    
    return <Badge>{campaign.deployment_status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-36 bg-muted rounded"></div>
            <div className="h-36 bg-muted rounded"></div>
            <div className="h-36 bg-muted rounded"></div>
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Campaign Not Found</h1>
          <p className="text-muted-foreground mb-4">The campaign you're looking for doesn't exist or you don't have access to it.</p>
          <Button onClick={() => navigate('/dashboard/campaigns')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/campaigns')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            {getStatusBadge()}
          </div>
          <div className="flex items-center text-muted-foreground mt-1">
            {campaign.ad_platform === 'meta' ? (
              <Facebook className="h-4 w-4 mr-1 text-blue-600" />
            ) : (
              <TikTokIcon className="h-4 w-4 mr-1" />
            )}
            <span>{campaign.ad_platform === 'meta' ? 'Meta Ads' : 'TikTok Ads'}</span>
          </div>
        </div>
        
        <div className="ml-auto flex gap-2">
          {campaign.payment_status === 'paid' && campaign.deployment_status === 'ready' && (
            <Button 
              onClick={handleDeployCampaign}
              disabled={isDeploying}
            >
              {isDeploying ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Deploy Campaign
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Budget</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-green-500" />
              ${campaign.budget?.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Management Fee:</span>
                <span>${campaign.management_fee?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">Total Amount:</span>
                <span>${campaign.total_amount?.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Target Audience</CardDescription>
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-1 text-blue-500" />
              {campaign.targeting?.audience || 'Not specified'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{campaign.targeting?.location || 'Not specified'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Campaign Status</CardDescription>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-1 text-purple-500" />
              {campaign.deployment_status === 'deployed' ? 'Deployed' : campaign.payment_status === 'paid' ? 'Ready to Deploy' : 'Payment Required'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className={campaign.payment_status === 'paid' ? 'text-green-500' : 'text-amber-500'}>
                  {campaign.payment_status === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date Created:</span>
                <span>{new Date(campaign.created_at || '').toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Ad Creative</h3>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium">{campaign.creatives?.[0]?.title || 'No title'}</h4>
              <p className="text-muted-foreground mt-1">
                {campaign.creatives?.[0]?.description || 'No description'}
              </p>
            </div>
          </div>
          
          {campaign.platform_specific_id && (
            <div>
              <h3 className="font-medium mb-2">Platform Details</h3>
              <div className="bg-muted p-4 rounded-md">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Platform ID:</span>
                  <span>{campaign.platform_specific_id}</span>
                  
                  <span className="text-muted-foreground">Status:</span>
                  <span>{campaign.platform_status}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
