
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Campaign } from "@/models/campaign";
import { BarChart, LineChart, TrendingDown, TrendingUp, Users } from "lucide-react";
import { formatCurrency, formatPercent } from "@/utils/formatters";

interface CampaignAnalyticsProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export default function CampaignAnalytics({ campaigns, isLoading }: CampaignAnalyticsProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  // Calculate metrics
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalBudget = campaigns.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
  
  // Mock metrics based on campaigns data
  const getMetrics = () => {
    // Generate somewhat realistic metrics based on campaigns
    const totalClicks = Math.floor(totalBudget * 0.5 * (Math.random() + 0.5));
    const totalImpressions = totalClicks * (Math.floor(Math.random() * 20) + 10);
    const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
    const totalLeads = Math.floor(totalClicks * (Math.random() * 0.1 + 0.01));
    const conversionRate = totalClicks > 0 ? totalLeads / totalClicks : 0;
    const cpl = totalLeads > 0 ? totalBudget / totalLeads : 0;
    
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalBudget,
      totalClicks,
      totalImpressions,
      ctr,
      totalLeads,
      conversionRate,
      cpl,
      // Trend indicators (random for demo)
      clicksTrend: Math.random() > 0.5,
      leadsTrend: Math.random() > 0.5,
      ctrTrend: Math.random() > 0.5,
      cplTrend: Math.random() > 0.5,
    };
  };

  const metrics = getMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-5 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Campaign Performance</h2>
        <Tabs defaultValue="30d" onValueChange={(v) => setPeriod(v as any)} className="w-auto">
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{metrics.totalLeads}</div>
              <div className={`flex items-center ${metrics.leadsTrend ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.leadsTrend ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="text-xs">{Math.floor(Math.random() * 20) + 1}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {activeCampaigns} active campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg. CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{formatPercent(metrics.ctr)}</div>
              <div className={`flex items-center ${metrics.ctrTrend ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.ctrTrend ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="text-xs">{(Math.random() * 0.5 + 0.1).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.totalClicks} clicks / {metrics.totalImpressions} impressions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{formatPercent(metrics.conversionRate)}</div>
              <div className={`flex items-center ${metrics.leadsTrend ? 'text-green-500' : 'text-red-500'}`}>
                {metrics.leadsTrend ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="text-xs">{(Math.random() * 2 + 0.1).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.totalLeads} leads / {metrics.totalClicks} clicks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Cost Per Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{formatCurrency(metrics.cpl)}</div>
              <div className={`flex items-center ${!metrics.cplTrend ? 'text-green-500' : 'text-red-500'}`}>
                {!metrics.cplTrend ? <TrendingDown className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
                <span className="text-xs">{Math.floor(Math.random() * 15) + 1}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(totalBudget)} / {metrics.totalLeads} leads
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
