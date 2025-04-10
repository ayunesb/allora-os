
// Update the component to use the proper field names based on our Campaign model
// Replace ad_platform with platform where needed
// Make sure to handle performance_metrics correctly
// Properly handle last_synced_at

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/models/campaign";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

interface CampaignMetricsProps {
  campaign: Campaign;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function CampaignMetrics({ campaign, onRefresh, isRefreshing }: CampaignMetricsProps) {
  const metrics = campaign.performance_metrics || {};
  const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatNumber = (value: number) => value.toLocaleString('en-US');
  
  // Helper to determine if a metric is positive (show green) or negative (show red)
  const getMetricIndicator = (value: number, isHigherBetter = true) => {
    // This would ideally compare against a benchmark or previous period
    // For now we'll use a simple threshold based on expected good values
    const isPositive = isHigherBetter ? value > 2 : value < 20;
    return isPositive ? (
      <div className="flex items-center text-green-500">
        <ArrowUpRight className="h-4 w-4 mr-1" />
        Good
      </div>
    ) : (
      <div className="flex items-center text-red-500">
        <ArrowDownRight className="h-4 w-4 mr-1" />
        Low
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Performance</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Impressions</CardDescription>
            <CardTitle className="text-2xl">{formatNumber(metrics.impressions || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              People who saw your ad
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Clicks</CardDescription>
            <CardTitle className="text-2xl">{formatNumber(metrics.clicks || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              People who clicked your ad
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Click-Through Rate (CTR)</CardDescription>
            <CardTitle className="text-2xl">{metrics.ctr || 0}%</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Percentage of impressions that resulted in clicks
            </div>
            {metrics.ctr && getMetricIndicator(parseFloat(metrics.ctr))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Spend</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(parseFloat(metrics.spend || '0'))}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Total spent from budget of {formatCurrency(campaign.budget || 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversions</CardDescription>
            <CardTitle className="text-2xl">{formatNumber(metrics.conversions || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Actions taken after clicking your ad
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cost Per Acquisition (CPA)</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(parseFloat(metrics.cpa || '0'))}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Average cost per conversion
            </div>
            {metrics.cpa && getMetricIndicator(parseFloat(metrics.cpa), false)}
          </CardContent>
        </Card>
      </div>
      
      {campaign.ad_platform === 'tiktok' && metrics.video_views && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Video Views</CardDescription>
            <CardTitle className="text-2xl">{formatNumber(metrics.video_views || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Number of times your video was viewed
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="text-xs text-muted-foreground">
        {campaign.last_synced_at ? (
          <span>Last updated: {new Date(campaign.last_synced_at).toLocaleString()}</span>
        ) : (
          <span>Data not yet synced</span>
        )}
      </div>
    </div>
  );
}
