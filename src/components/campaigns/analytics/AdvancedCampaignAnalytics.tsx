import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, TrendingUp, BarChart3, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Campaign } from '@/models/campaign';

interface AdvancedCampaignAnalyticsProps {
  campaign: Campaign;
  metrics?: {
    impressions: number[];
    clicks: number[];
    conversions: number[];
    cost: number[];
    dates: string[];
  };
  isLoading?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AdvancedCampaignAnalytics({ 
  campaign, 
  metrics = generateMockMetrics(),
  isLoading = false 
}: AdvancedCampaignAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('performance');
  const [showInfoCard, setShowInfoCard] = useState(false);
  
  // Create charting data from metrics
  const performanceData = metrics.dates.map((date, index) => ({
    date,
    impressions: metrics.impressions[index],
    clicks: metrics.clicks[index],
    conversions: metrics.conversions[index],
    cost: metrics.cost[index],
    cpc: metrics.clicks[index] ? (metrics.cost[index] / metrics.clicks[index]).toFixed(2) : '0',
    ctr: metrics.impressions[index] ? ((metrics.clicks[index] / metrics.impressions[index]) * 100).toFixed(2) : '0',
  }));
  
  // Calculate total metrics
  const totalImpressions = metrics.impressions.reduce((a, b) => a + b, 0);
  const totalClicks = metrics.clicks.reduce((a, b) => a + b, 0);
  const totalConversions = metrics.conversions.reduce((a, b) => a + b, 0);
  const totalCost = metrics.cost.reduce((a, b) => a + b, 0);
  
  // Fix type issues with these calculated values
  const avgCPC = totalClicks ? (totalCost / totalClicks).toFixed(2) : '0';
  const avgCTR = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
  const conversionRate = totalClicks ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0';
  
  // Funnel data
  const funnelData = [
    { name: 'Impressions', value: totalImpressions },
    { name: 'Clicks', value: totalClicks },
    { name: 'Conversions', value: totalConversions },
  ];
  
  // Cost distribution data
  const costDistributionData = [
    { name: 'Ad Creative', value: totalCost * 0.25 },
    { name: 'Audience Targeting', value: totalCost * 0.45 },
    { name: 'Platform Fees', value: totalCost * 0.15 },
    { name: 'Other', value: totalCost * 0.15 },
  ];
  
  // Fix the ROI calculation to ensure we're working with numbers
  const campaignBudget = typeof campaign.budget === 'string' 
    ? parseFloat(campaign.budget) || 5000 
    : (campaign.budget || 5000);
    
  // Make sure all operands are numbers to fix the TypeScript errors
  const totalConversionsNumber = Number(totalConversions);
  const campaignBudgetNumber = Number(campaignBudget);
  const totalCostNumber = Number(totalCost);
  
  // Ensure we're working with numbers in calculations
  const estimatedRevenue = totalConversionsNumber * campaignBudgetNumber * 0.2;
  const roi = ((estimatedRevenue - totalCostNumber) / totalCostNumber * 100).toFixed(2);
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowInfoCard(!showInfoCard)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="h-4 w-4 mr-1" />
            {showInfoCard ? "Hide Insights" : "Show Insights"}
          </Button>
        </div>
        
        {showInfoCard && (
          <Card className="mt-4 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <TrendingUp className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">AI Campaign Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    {getAiInsight(campaign, {
                      ctr: parseFloat(avgCTR),
                      cpc: parseFloat(avgCPC),
                      conversionRate: parseFloat(conversionRate),
                      roi: parseFloat(roi)
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <TabsContent value="performance" className="mt-4">
          <div className="grid gap-4 md:grid-cols-4">
            <MetricCard
              title="Impressions"
              value={totalImpressions.toLocaleString()}
              description="Total number of ad views"
              trend={5.2}
            />
            <MetricCard
              title="Clicks"
              value={totalClicks.toLocaleString()}
              description="Total ad clicks"
              trend={3.8}
            />
            <MetricCard
              title="CTR"
              value={`${avgCTR}%`}
              description="Click-through rate"
              trend={1.2}
            />
            <MetricCard
              title="Avg. CPC"
              value={`$${avgCPC}`}
              description="Cost per click"
              trend={-2.1}
              trendIsGood={false}
            />
          </div>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Campaign Performance Over Time
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="px-1 ml-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">This chart shows how your campaign metrics have changed over time. Look for patterns in user engagement to optimize your campaign.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>Track impressions and clicks over the campaign period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'ctr') return [`${value}%`, 'CTR'];
                        if (name === 'cpc') return [`$${value}`, 'CPC'];
                        return [value, typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name];
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="impressions"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      opacity={0.3}
                      activeDot={{ r: 8 }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="clicks"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      opacity={0.3}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="ctr"
                      stroke="#ff7300"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cpc"
                      stroke="#0088FE"
                      activeDot={{ r: 8 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversion" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Conversions"
              value={totalConversions.toLocaleString()}
              description="Total conversion events"
              trend={7.2}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              description="Clicks to conversions"
              trend={2.5}
            />
            <MetricCard
              title="Cost Per Conversion"
              value={`$${totalConversions ? (totalCost / totalConversions).toFixed(2) : '0'}`}
              description="Acquisition cost"
              trend={-1.8}
              trendIsGood={false}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                <CardDescription>From impressions to conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={funnelData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        formatter={(value) => [value.toLocaleString(), 'Count']}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#8884d8"
                        radius={[0, 4, 4, 0]}
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Label
                          position="center"
                          content={({ value, x, y, width, height }) => (
                            <text
                              x={x + width - 10}
                              y={y + height / 2}
                              fill="#FFFFFF"
                              textAnchor="end"
                              dominantBaseline="middle"
                            >
                              {(value as number).toLocaleString()}
                            </text>
                          )}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Conversion Trends</CardTitle>
                <CardDescription>Daily conversion performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="conversions" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#82ca9d"
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="roi" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Spend"
              value={`$${totalCost.toLocaleString()}`}
              description="Campaign budget used"
              trend={0}
              showTrend={false}
            />
            <MetricCard
              title="Est. Revenue"
              value={`$${estimatedRevenue.toLocaleString()}`}
              description="Based on conversion value"
              trend={9.4}
            />
            <MetricCard
              title="ROI"
              value={`${roi}%`}
              description="Return on investment"
              trend={4.7}
              trendIsGood={parseFloat(roi) > 0}
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Budget Allocation</CardTitle>
                <CardDescription>Where your budget is being spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {costDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ROI Analysis</CardTitle>
                <CardDescription>Cost vs revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="cost" name="Cost" fill="#ff8042" />
                      <Bar 
                        dataKey="conversions" 
                        name="Est. Revenue" 
                        fill="#00C49F"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                ROI Insights
              </CardTitle>
              <CardDescription>AI-powered analysis of your campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {getRoiInsight(campaign, parseFloat(roi))}
              </p>
              
              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2">Optimization Suggestions:</h4>
                <ul className="space-y-1">
                  {getOptimizationSuggestions(campaign, {
                    ctr: parseFloat(avgCTR),
                    cpc: parseFloat(avgCPC),
                    conversionRate: parseFloat(conversionRate)
                  }).map((suggestion, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="mr-2">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: number;
  trendIsGood?: boolean;
  showTrend?: boolean;
}

function MetricCard({ 
  title, 
  value, 
  description, 
  trend, 
  trendIsGood = true,
  showTrend = true
}: MetricCardProps) {
  const trendColor = !showTrend ? 'text-muted-foreground' : 
    (trend === 0 ? 'text-muted-foreground' : 
      (trend > 0 ? 
        (trendIsGood ? 'text-green-500' : 'text-red-500') : 
        (trendIsGood ? 'text-red-500' : 'text-green-500')
      )
    );
  
  const TrendIcon = trend > 0 ? ChevronUp : ChevronDown;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          {showTrend && (
            <div className={`flex items-center ${trendColor}`}>
              {trend !== 0 && <TrendIcon className="h-4 w-4 mr-1" />}
              <span className="text-sm">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}

function generateMockMetrics() {
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  const impressions = Array.from({ length: 14 }, () => Math.floor(Math.random() * 3000) + 1000);
  const clicks = impressions.map(imp => Math.floor(imp * (Math.random() * 0.05 + 0.02)));
  const conversions = clicks.map(click => Math.floor(click * (Math.random() * 0.1 + 0.05)));
  const cost = clicks.map(click => parseFloat((click * (Math.random() * 0.5 + 0.5)).toFixed(2)));
  
  return { dates, impressions, clicks, conversions, cost };
}

function getAiInsight(campaign: Campaign, metrics: { ctr: number, cpc: number, conversionRate: number, roi: number }) {
  if (metrics.ctr < 1) {
    return `This ${campaign.platform} campaign is underperforming with a low click-through rate of ${metrics.ctr}%. Consider refreshing your ad creative and targeting to improve engagement.`;
  } else if (metrics.conversionRate < 3) {
    return `While your campaign is generating clicks, the conversion rate of ${metrics.conversionRate}% suggests your landing page may need optimization to better convert interested visitors.`;
  } else if (metrics.roi < 0) {
    return `This campaign is currently showing a negative ROI of ${metrics.roi}%. Review your cost structure and targeting to improve efficiency and generate positive returns.`;
  } else {
    return `Your ${campaign.platform} campaign is performing well with a healthy CTR of ${metrics.ctr}% and conversion rate of ${metrics.conversionRate}%. The current ROI is ${metrics.roi}%, indicating a profitable campaign.`;
  }
}

function getRoiInsight(campaign: Campaign, roi: number) {
  if (roi < 0) {
    return `This ${campaign.platform} campaign is currently showing a negative ROI of ${roi}%. This doesn't necessarily mean the campaign should be stopped, as early-stage campaigns often require optimization before becoming profitable. Consider reviewing your audience targeting, bid strategy, and ad creative to improve performance.`;
  } else if (roi < 50) {
    return `Your campaign is showing a positive but modest ROI of ${roi}%. There's room for improvement in efficiency. Analyze which specific ad groups or creatives are performing best and consider reallocating budget to these higher-performing elements.`;
  } else if (roi < 100) {
    return `With an ROI of ${roi}%, this campaign is performing well above industry averages. The strategy is working effectively, but continue monitoring to maintain this performance level and look for opportunities to scale while maintaining efficiency.`;
  } else {
    return `Exceptional performance with an ROI of ${roi}%! This campaign is significantly outperforming expectations. Consider increasing budget allocation to scale these results while closely monitoring to ensure ROI remains strong as you expand reach.`;
  }
}

function getOptimizationSuggestions(campaign: Campaign, metrics: { ctr: number, cpc: number, conversionRate: number }) {
  const suggestions = [];
  
  if (metrics.ctr < 1.5) {
    suggestions.push(`Improve ad creative with more compelling visuals and copy to increase CTR from current ${metrics.ctr}%`);
    suggestions.push(`Refine audience targeting to reach users more likely to engage with your content`);
  }
  
  if (metrics.cpc > 2) {
    suggestions.push(`Optimize bid strategy to reduce cost per click from current $${metrics.cpc}`);
    suggestions.push(`Test different ad scheduling to focus budget on highest-performing time periods`);
  }
  
  if (metrics.conversionRate < 5) {
    suggestions.push(`Enhance landing page experience to improve conversion rate from current ${metrics.conversionRate}%`);
    suggestions.push(`Implement A/B testing on call-to-action elements to identify highest-converting options`);
  }
  
  if (campaign.platform === 'Google') {
    suggestions.push(`Expand keyword research to identify lower competition, higher-intent search terms`);
  } else if (campaign.platform === 'Facebook' || campaign.platform === 'Instagram') {
    suggestions.push(`Test different ad formats (carousel, video, stories) to find best-performing creative types`);
  } else if (campaign.platform === 'LinkedIn') {
    suggestions.push(`Refine professional targeting criteria to reach more relevant decision-makers`);
  }
  
  return suggestions.slice(0, 4);
}

export default AdvancedCampaignAnalytics;
