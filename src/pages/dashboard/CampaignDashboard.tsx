import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  RefreshCcw, 
  Facebook, 
  CheckCircle,
  Clock,
  PauseCircle
} from 'lucide-react';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { useCampaigns } from '@/hooks/campaigns';
import { Campaign } from '@/models/campaign';
import { syncCampaignData } from '@/services/campaignService';
import { toast } from 'sonner';
import { getAdPlatformConnections } from '@/services/adPlatformService';

export default function CampaignDashboard() {
  const navigate = useNavigate();
  const { campaigns, isLoading, refetch } = useCampaigns();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hasAdPlatformConnections, setHasAdPlatformConnections] = useState(false);
  
  useEffect(() => {
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

  const getFilteredCampaigns = () => {
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
  };

  const getStatusDisplay = (campaign: Campaign) => {
    if (campaign.payment_status !== 'paid') {
      return {
        icon: <CreditCard className="h-5 w-5 text-amber-500" />,
        label: 'Payment Required',
        color: 'text-amber-500'
      };
    }
    
    if (campaign.deployment_status === 'pending' || campaign.deployment_status === 'ready') {
      return {
        icon: <Clock className="h-5 w-5 text-blue-500" />,
        label: 'Ready to Deploy',
        color: 'text-blue-500'
      };
    }
    
    if (campaign.deployment_status === 'deployed') {
      if (campaign.platform_status === 'ACTIVE' || campaign.platform_status === 'CAMPAIGN_STATUS_ENABLE') {
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: 'Live',
          color: 'text-green-500'
        };
      } else {
        return {
          icon: <PauseCircle className="h-5 w-5 text-purple-500" />,
          label: campaign.platform_status || 'Unknown',
          color: 'text-purple-500'
        };
      }
    }
    
    return {
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      label: campaign.deployment_status || 'Unknown',
      color: 'text-gray-500'
    };
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'meta') {
      return <Facebook className="h-5 w-5 text-blue-600" />;
    }
    
    if (platform === 'tiktok') {
      return <TikTokIcon className="h-5 w-5" />;
    }
    
    return null;
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalBudget = campaigns.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
  const totalActiveSpend = campaigns
    .filter(c => c.deployment_status === 'deployed' && c.payment_status === 'paid')
    .reduce((sum, campaign) => {
      const spend = campaign.performance_metrics?.spend ? parseFloat(campaign.performance_metrics.spend) : 0;
      return sum + spend;
    }, 0);
  
  const totalImpressions = campaigns
    .filter(c => c.deployment_status === 'deployed' && c.payment_status === 'paid')
    .reduce((sum, campaign) => sum + (campaign.performance_metrics?.impressions || 0), 0);
  
  const totalClicks = campaigns
    .filter(c => c.deployment_status === 'deployed' && c.payment_status === 'paid')
    .reduce((sum, campaign) => sum + (campaign.performance_metrics?.clicks || 0), 0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="h-8 bg-muted rounded w-32"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
          <div className="h-10 bg-muted rounded w-full"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-48 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Campaign Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your advertising campaigns across different platforms
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          
          <Button onClick={handleCreateCampaign}>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Campaigns</CardDescription>
            <CardTitle className="text-3xl">{campaigns.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              {campaigns.filter(c => c.deployment_status === 'deployed').length} active
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Budget</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalBudget)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              {formatCurrency(totalActiveSpend)} spent
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Impressions</CardDescription>
            <CardTitle className="text-3xl">{totalImpressions.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              {totalClicks.toLocaleString()} clicks
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Platforms</CardDescription>
            <CardTitle className="text-3xl flex gap-2">
              {campaigns.some(c => c.ad_platform === 'meta') && (
                <Facebook className="h-8 w-8 text-blue-600" />
              )}
              {campaigns.some(c => c.ad_platform === 'tiktok') && (
                <TikTokIcon className="h-8 w-8" />
              )}
              {!campaigns.some(c => c.ad_platform === 'meta') && !campaigns.some(c => c.ad_platform === 'tiktok') && (
                "None"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              {campaigns.filter(c => c.ad_platform === 'meta').length} Meta,&nbsp;
              {campaigns.filter(c => c.ad_platform === 'tiktok').length} TikTok
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="meta">Meta</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {campaigns.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Campaigns Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Start by creating your first advertising campaign to reach your target audience.
              </p>
              <Button onClick={handleCreateCampaign}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredCampaigns().map((campaign) => {
            const status = getStatusDisplay(campaign);
            return (
              <Card key={campaign.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        {getPlatformIcon(campaign.ad_platform || '')}
                        <span className="ml-1">
                          {campaign.ad_platform === 'meta' ? 'Meta Ads' : 'TikTok Ads'}
                        </span>
                      </CardDescription>
                    </div>
                    <div className={`flex items-center ${status.color}`}>
                      {status.icon}
                      <span className="ml-1 text-xs">{status.label}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span>${campaign.budget}</span>
                        
                        <span className="text-muted-foreground">Fee:</span>
                        <span>${campaign.management_fee}</span>
                        
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(campaign.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {campaign.deployment_status === 'deployed' && campaign.performance_metrics && (
                      <div className="bg-muted rounded-md p-3">
                        <h4 className="text-sm font-medium mb-2">Performance</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Impressions:</span>
                          <span>{campaign.performance_metrics.impressions?.toLocaleString() || 0}</span>
                          
                          <span className="text-muted-foreground">Clicks:</span>
                          <span>{campaign.performance_metrics.clicks?.toLocaleString() || 0}</span>
                          
                          <span className="text-muted-foreground">CTR:</span>
                          <span>{campaign.performance_metrics.ctr || 0}%</span>
                          
                          <span className="text-muted-foreground">Spend:</span>
                          <span>${campaign.performance_metrics.spend || 0}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
