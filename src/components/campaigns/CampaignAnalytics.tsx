
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Campaign } from "@/models/campaign";
import { BarChart, LineChart, TrendingDown, TrendingUp, Users, DollarSign, Target, Share2 } from "lucide-react";
import { formatCurrency, formatPercent, formatMetric, formatPercentChange } from "@/utils/formatters";
import { ResponsiveContainer, LineChart as ReLineChart, Line, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface CampaignAnalyticsProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4CAF50'];

export default function CampaignAnalytics({ campaigns, isLoading }: CampaignAnalyticsProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [metricView, setMetricView] = useState<"overview" | "performance" | "roi">("overview");

  // Calculate metrics
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalBudget = campaigns.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
  
  // Performance metrics based on campaigns data
  const metrics = useMemo(() => {
    // Current period metrics
    const totalClicks = campaigns.reduce((sum, campaign) => {
      return sum + (campaign.performance_metrics?.clicks || 0);
    }, 0);
    
    const totalImpressions = campaigns.reduce((sum, campaign) => {
      return sum + (campaign.performance_metrics?.impressions || 0);
    }, 0);
    
    const totalConversions = campaigns.reduce((sum, campaign) => {
      return sum + (campaign.performance_metrics?.conversions || 0);
    }, 0);
    
    const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
    const conversionRate = totalClicks > 0 ? totalConversions / totalClicks : 0;
    
    const totalSpend = campaigns.reduce((sum, campaign) => {
      const spend = campaign.performance_metrics?.spend 
        ? parseFloat(campaign.performance_metrics.spend) 
        : 0;
      return sum + spend;
    }, 0);
    
    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const cpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
    
    // Platform breakdown
    const platformData = campaigns.reduce((acc, campaign) => {
      const platform = campaign.platform || 'Other';
      if (!acc[platform]) {
        acc[platform] = { 
          name: platform, 
          value: 1,
          budget: campaign.budget || 0,
          impressions: campaign.performance_metrics?.impressions || 0,
          clicks: campaign.performance_metrics?.clicks || 0
        };
      } else {
        acc[platform].value += 1;
        acc[platform].budget += campaign.budget || 0;
        acc[platform].impressions += campaign.performance_metrics?.impressions || 0;
        acc[platform].clicks += campaign.performance_metrics?.clicks || 0;
      }
      return acc;
    }, {} as Record<string, any>);
    
    // Generate trend data based on period
    const getRandomTrend = (base: number, variance = 0.2) => {
      const values = [];
      let current = base;
      
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const step = days <= 7 ? 1 : days <= 30 ? 3 : 10;
      
      for (let i = 0; i < days / step; i++) {
        // Add some random variation
        const change = base * variance * (Math.random() - 0.5);
        current = Math.max(0, current + change);
        values.push(current);
      }
      
      return values;
    };
    
    const getDates = () => {
      const dates = [];
      const today = new Date();
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const step = days <= 7 ? 1 : days <= 30 ? 3 : 10;
      
      for (let i = days - 1; i >= 0; i -= step) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
      
      return dates;
    };
    
    // Trend data for charts
    const dates = getDates();
    const clickTrend = getRandomTrend(totalClicks / dates.length);
    const impressionTrend = getRandomTrend(totalImpressions / dates.length);
    const conversionTrend = getRandomTrend(totalConversions / dates.length);
    
    const trendsData = dates.map((date, i) => ({
      date,
      clicks: Math.round(clickTrend[i] || 0),
      impressions: Math.round(impressionTrend[i] || 0),
      conversions: Math.round(conversionTrend[i] || 0),
      ctr: clickTrend[i] && impressionTrend[i] ? (clickTrend[i] / impressionTrend[i]) : 0,
      cr: clickTrend[i] && conversionTrend[i] ? (conversionTrend[i] / clickTrend[i]) : 0
    }));
    
    // Previous period metrics (mocked as % less)
    const prevClicks = totalClicks * 0.8;
    const prevImpressions = totalImpressions * 0.7;
    const prevConversions = totalConversions * 0.75;
    const prevSpend = totalSpend * 0.85;
    
    return {
      campaigns: campaigns.length,
      activeCampaigns,
      totalBudget,
      totalClicks,
      totalImpressions,
      totalConversions,
      ctr,
      conversionRate,
      totalSpend,
      cpc,
      cpa,
      platformData: Object.values(platformData),
      trendsData,
      // Trend percentages (comparing to previous period)
      clicksTrend: (totalClicks - prevClicks) / prevClicks,
      impressionsTrend: (totalImpressions - prevImpressions) / prevImpressions,
      conversionsTrend: (totalConversions - prevConversions) / prevConversions,
      spendTrend: (totalSpend - prevSpend) / prevSpend
    };
  }, [campaigns, period]);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Campaign Performance</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Tabs defaultValue="overview" onValueChange={(v) => setMetricView(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="30d" onValueChange={(v) => setPeriod(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Overview Metrics */}
      <TabsContent value="overview" className="mt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{formatMetric(metrics.totalImpressions)}</div>
                <div className={`flex items-center ${metrics.impressionsTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metrics.impressionsTrend >= 0 ? 
                    <TrendingUp className="h-4 w-4 mr-1" /> : 
                    <TrendingDown className="h-4 w-4 mr-1" />
                  }
                  <span className="text-xs">{formatPercentChange(metrics.totalImpressions, metrics.totalImpressions * 0.7)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {activeCampaigns} active campaigns
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{formatMetric(metrics.totalClicks)}</div>
                <div className={`flex items-center ${metrics.clicksTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metrics.clicksTrend >= 0 ? 
                    <TrendingUp className="h-4 w-4 mr-1" /> : 
                    <TrendingDown className="h-4 w-4 mr-1" />
                  }
                  <span className="text-xs">{formatPercentChange(metrics.totalClicks, metrics.totalClicks * 0.8)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                CTR: {formatPercent(metrics.ctr)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{formatMetric(metrics.totalConversions)}</div>
                <div className={`flex items-center ${metrics.conversionsTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metrics.conversionsTrend >= 0 ? 
                    <TrendingUp className="h-4 w-4 mr-1" /> : 
                    <TrendingDown className="h-4 w-4 mr-1" />
                  }
                  <span className="text-xs">{formatPercentChange(metrics.totalConversions, metrics.totalConversions * 0.75)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Conversion rate: {formatPercent(metrics.conversionRate)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalSpend)}</div>
                <div className={`flex items-center ${metrics.spendTrend <= 0.15 ? 'text-green-500' : 'text-amber-500'}`}>
                  {metrics.spendTrend <= 0.15 ? 
                    <TrendingDown className="h-4 w-4 mr-1" /> : 
                    <TrendingUp className="h-4 w-4 mr-1" />
                  }
                  <span className="text-xs">{formatPercentChange(metrics.totalSpend, metrics.totalSpend * 0.85)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Budget utilization: {formatPercent(metrics.totalSpend / metrics.totalBudget)}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Line Chart */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Performance Trends</CardTitle>
              <CardDescription>Clicks and impressions over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={metrics.trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="clicks"
                    name="Clicks"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="impressions"
                    name="Impressions"
                    stroke="#82ca9d"
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Platform Distribution */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Platform Distribution</CardTitle>
              <CardDescription>Campaign budget allocation by platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {metrics.platformData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      {/* Performance Metrics */}
      <TabsContent value="performance" className="mt-0 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CTR Over Time */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Click-Through Rate (CTR)</CardTitle>
              <CardDescription>Percentage of impressions that resulted in clicks</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={metrics.trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(2)}%`, 'CTR']} />
                  <Legend />
                  <Line type="monotone" dataKey="ctr" name="CTR" stroke="#8884d8" />
                </ReLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Conversion Rate Over Time */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Conversion Rate</CardTitle>
              <CardDescription>Percentage of clicks that resulted in conversions</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={metrics.trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(2)}%`, 'Conversion Rate']} />
                  <Legend />
                  <Line type="monotone" dataKey="cr" name="Conversion Rate" stroke="#82ca9d" />
                </ReLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Avg. CTR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercent(metrics.ctr)}</div>
              <div className="mt-2">
                {metrics.ctr > 0.02 ? (
                  <Badge className="bg-green-500">Excellent</Badge>
                ) : metrics.ctr > 0.01 ? (
                  <Badge className="bg-amber-500">Good</Badge>
                ) : (
                  <Badge variant="destructive">Needs Improvement</Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Avg. Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercent(metrics.conversionRate)}</div>
              <div className="mt-2">
                {metrics.conversionRate > 0.05 ? (
                  <Badge className="bg-green-500">Excellent</Badge>
                ) : metrics.conversionRate > 0.02 ? (
                  <Badge className="bg-amber-500">Good</Badge>
                ) : (
                  <Badge variant="destructive">Needs Improvement</Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Cost Per Click</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.cpc)}</div>
              <div className="mt-2">
                {metrics.cpc < 1.5 ? (
                  <Badge className="bg-green-500">Efficient</Badge>
                ) : metrics.cpc < 3 ? (
                  <Badge className="bg-amber-500">Average</Badge>
                ) : (
                  <Badge variant="destructive">Expensive</Badge>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Cost Per Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.cpa)}</div>
              <div className="mt-2">
                {metrics.cpa < 20 ? (
                  <Badge className="bg-green-500">Efficient</Badge>
                ) : metrics.cpa < 50 ? (
                  <Badge className="bg-amber-500">Average</Badge>
                ) : (
                  <Badge variant="destructive">Expensive</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Conversion Trends */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-base">Conversion Trends</CardTitle>
            <CardDescription>Number of conversions over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={metrics.trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversions" name="Conversions" fill="#8884d8" />
              </ReBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* ROI Analysis */}
      <TabsContent value="roi" className="mt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1 text-green-500" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalBudget)}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {metrics.campaigns} campaigns
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1 text-blue-500" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalSpend)}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Budget utilization: {formatPercent(metrics.totalSpend / metrics.totalBudget)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Cost Per Click</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Target className="h-5 w-5 mr-1 text-purple-500" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.cpc)}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Industry average: {formatCurrency(2.50)}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Cost Per Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Share2 className="h-5 w-5 mr-1 text-amber-500" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.cpa)}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Industry average: {formatCurrency(35.00)}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROI by Campaign - Bar Chart */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Cost Per Acquisition by Platform</CardTitle>
              <CardDescription>Compare CPA across different platforms</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={metrics.platformData.map((platform: any) => ({
                    name: platform.name,
                    cpa: platform.clicks > 0 ? (platform.budget / platform.clicks) * 0.2 : 0
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'CPA']} />
                  <Legend />
                  <Bar dataKey="cpa" name="Cost Per Acquisition" fill="#8884d8" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* ROI Comparison - Platform vs Performance */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Platform Performance</CardTitle>
              <CardDescription>Click-through rate by platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={metrics.platformData.map((platform: any) => ({
                    name: platform.name,
                    ctr: platform.impressions > 0 ? (platform.clicks / platform.impressions) : 0
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(2)}%`, 'CTR']} />
                  <Legend />
                  <Bar dataKey="ctr" name="Click-Through Rate" fill="#82ca9d" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="text-base">Efficiency Analysis</CardTitle>
            <CardDescription>Comparing budget efficiency across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Platform</th>
                    <th className="text-right py-3 font-medium">Budget</th>
                    <th className="text-right py-3 font-medium">Spend</th>
                    <th className="text-right py-3 font-medium">CPC</th>
                    <th className="text-right py-3 font-medium">CPA</th>
                    <th className="text-right py-3 font-medium">ROAS (est.)</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.platformData.map((platform: any, index: number) => {
                    const spend = platform.budget * 0.8;
                    const cpc = platform.clicks > 0 ? spend / platform.clicks : 0;
                    const cpa = platform.clicks > 0 ? spend / (platform.clicks * 0.1) : 0;
                    const roas = cpa > 0 ? (Math.random() * 4 + 2) : 0; // Random ROAS between 2x-6x
                    
                    return (
                      <tr key={index} className="border-b">
                        <td className="py-3">{platform.name}</td>
                        <td className="text-right py-3">{formatCurrency(platform.budget)}</td>
                        <td className="text-right py-3">{formatCurrency(spend)}</td>
                        <td className="text-right py-3">{formatCurrency(cpc)}</td>
                        <td className="text-right py-3">{formatCurrency(cpa)}</td>
                        <td className="text-right py-3 font-medium">
                          {roas > 4 ? (
                            <span className="text-green-500">{roas.toFixed(1)}x</span>
                          ) : roas > 2 ? (
                            <span className="text-amber-500">{roas.toFixed(1)}x</span>
                          ) : (
                            <span className="text-red-500">{roas.toFixed(1)}x</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}

