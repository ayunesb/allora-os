
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook } from 'lucide-react';
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { Campaign } from '@/models/campaign';

interface CampaignStatsProps {
  campaigns: Campaign[];
}

export function CampaignStats({ campaigns }: CampaignStatsProps) {
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

  return (
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
  );
}
