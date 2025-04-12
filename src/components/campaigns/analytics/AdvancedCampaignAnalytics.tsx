
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { BarChart, LineChart, PieChart } from '@/components/charts';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { fetchCampaignAnalytics } from '@/services/analyticsService';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import { formatCurrency, formatNumber, calculatePercentChange } from '@/utils/formatters';
import { Campaign } from '@/types/campaigns';
import { AnalyticsData, AnalyticsMetrics, ChannelPerformance } from '@/types/analytics';
import { MetricCard } from './MetricCard';
import { PerformanceTable } from './PerformanceTable';
import { ConversionFunnel } from './ConversionFunnel';
import { useToast } from '@/components/ui/use-toast';
import { addDays, format, subDays } from 'date-fns';

interface AdvancedCampaignAnalyticsProps {
  campaign: Campaign;
  initialDateRange?: {
    from: Date;
    to: Date;
  };
}

export function AdvancedCampaignAnalytics({ 
  campaign, 
  initialDateRange 
}: AdvancedCampaignAnalyticsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState(initialDateRange || {
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [comparisonRange, setComparisonRange] = useState({
    from: subDays(dateRange.from, 30),
    to: subDays(dateRange.to, 30)
  });
  const [timeFrame, setTimeFrame] = useState('daily');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [comparisonData, setComparisonData] = useState<AnalyticsData | null>(null);

  // Fetch analytics data when parameters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch current period data
        const data = await fetchCampaignAnalytics({
          campaignId: campaign.id,
          startDate: format(dateRange.from, 'yyyy-MM-dd'),
          endDate: format(dateRange.to, 'yyyy-MM-dd'),
          timeFrame: timeFrame,
        });
        setAnalyticsData(data);
        
        // Fetch comparison period data
        const compData = await fetchCampaignAnalytics({
          campaignId: campaign.id,
          startDate: format(comparisonRange.from, 'yyyy-MM-dd'),
          endDate: format(comparisonRange.to, 'yyyy-MM-dd'),
          timeFrame: timeFrame,
        });
        setComparisonData(compData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load analytics data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [campaign.id, dateRange, timeFrame, toast]);

  // Update comparison range when date range changes
  useEffect(() => {
    const daysDiff = Math.round(
      (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    setComparisonRange({
      from: subDays(dateRange.from, daysDiff + 1),
      to: subDays(dateRange.from, 1)
    });
  }, [dateRange]);

  // Calculate summary metrics with comparison to previous period
  const summaryMetrics = useMemo(() => {
    if (!analyticsData || !comparisonData) return null;
    
    const current = analyticsData.summary;
    const previous = comparisonData.summary;
    
    return {
      impressions: {
        value: current.impressions,
        change: calculatePercentChange(previous.impressions, current.impressions),
      },
      clicks: {
        value: current.clicks,
        change: calculatePercentChange(previous.clicks, current.clicks),
      },
      conversions: {
        value: current.conversions,
        change: calculatePercentChange(previous.conversions, current.conversions),
      },
      ctr: {
        value: current.ctr,
        change: calculatePercentChange(previous.ctr, current.ctr),
      },
      conversionRate: {
        value: current.conversionRate,
        change: calculatePercentChange(previous.conversionRate, current.conversionRate),
      },
      costPerConversion: {
        value: current.costPerConversion,
        change: calculatePercentChange(previous.costPerConversion, current.costPerConversion) * -1, // Invert for cost metrics
      },
      revenue: {
        value: current.revenue,
        change: calculatePercentChange(previous.revenue, current.revenue),
      },
      roi: {
        value: current.roi,
        change: calculatePercentChange(previous.roi, current.roi),
      },
    };
  }, [analyticsData, comparisonData]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!analyticsData) return { timeSeriesData: [], channelData: [] };
    
    // Time series data for line charts
    const timeSeriesData = analyticsData.timeSeries.map(point => ({
      date: point.date,
      impressions: point.metrics.impressions,
      clicks: point.metrics.clicks,
      conversions: point.metrics.conversions,
      revenue: point.metrics.revenue,
      cost: point.metrics.cost,
    }));
    
    // Channel data for pie charts
    const channelData = analyticsData.channelPerformance.map(channel => ({
      name: channel.channelName,
      value: channel.metrics.conversions,
      impressions: channel.metrics.impressions,
      clicks: channel.metrics.clicks,
      cost: channel.metrics.cost,
      revenue: channel.metrics.revenue,
    }));
    
    return { timeSeriesData, channelData };
  }, [analyticsData]);

  // Calculate total metrics across all channels
  const totalChannelMetrics = useMemo(() => {
    if (!analyticsData) return null;
    
    return analyticsData.channelPerformance.reduce((prevMetrics, channel) => {
      const metrics = channel.metrics;
      return {
        totalImpressions: Number(prevMetrics.totalImpressions || 0) + Number(metrics.impressions || 0),
        totalClicks: Number(prevMetrics.totalClicks || 0) + Number(metrics.clicks || 0),
        totalConversions: Number(prevMetrics.totalConversions || 0) + Number(metrics.conversions || 0),
        totalCost: Number(prevMetrics.totalCost || 0) + Number(metrics.cost || 0),
        totalRevenue: Number(prevMetrics.totalRevenue || 0) + Number(metrics.revenue || 0),
      };
    }, { 
      totalImpressions: 0, 
      totalClicks: 0, 
      totalConversions: 0, 
      totalCost: 0, 
      totalRevenue: 0 
    });
  }, [analyticsData]);

  // Handle data export
  const handleExport = (exportFormat: 'csv' | 'pdf') => {
    if (!analyticsData) return;
    
    const filename = `${campaign.name}_analytics_${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}`;
    
    if (exportFormat === 'csv') {
      exportToCSV(analyticsData, filename);
    } else {
      exportToPDF(analyticsData, filename, campaign.name);
    }
    
    toast({
      title: 'Export Successful',
      description: `Analytics data has been exported as ${exportFormat.toUpperCase()}.`,
    });
  };

  // Handle data refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCampaignAnalytics({
        campaignId: campaign.id,
        startDate: format(dateRange.from, 'yyyy-MM-dd'),
        endDate: format(dateRange.to, 'yyyy-MM-dd'),
        timeFrame: timeFrame,
        forceRefresh: true,
      });
      setAnalyticsData(data);
      
      toast({
        title: 'Data Refreshed',
        description: 'Analytics data has been updated with the latest information.',
      });
    } catch (error) {
      console.error('Error refreshing analytics data:', error);
      toast({
        title: 'Error',
        description: 'Failed to refresh analytics data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            align="start"
            className="w-full sm:w-auto"
          />
          
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('csv')}
            disabled={isLoading || !analyticsData}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('pdf')}
            disabled={isLoading || !analyticsData}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading analytics data...</span>
          </div>
        )}
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {!isLoading && summaryMetrics && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Impressions" 
                  value={formatNumber(summaryMetrics.impressions.value)} 
                  change={summaryMetrics.impressions.change}
                  icon="eye"
                />
                <MetricCard 
                  title="Clicks" 
                  value={formatNumber(summaryMetrics.clicks.value)} 
                  change={summaryMetrics.clicks.change}
                  icon="mouse-pointer"
                />
                <MetricCard 
                  title="Conversions" 
                  value={formatNumber(summaryMetrics.conversions.value)} 
                  change={summaryMetrics.conversions.change}
                  icon="check-circle"
                />
                <MetricCard 
                  title="Revenue" 
                  value={formatCurrency(summaryMetrics.revenue.value)} 
                  change={summaryMetrics.revenue.change}
                  icon="dollar-sign"
                />
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="CTR" 
                  value={`${(summaryMetrics.ctr.value * 100).toFixed(2)}%`} 
                  change={summaryMetrics.ctr.change}
                  icon="percent"
                />
                <MetricCard 
                  title="Conversion Rate" 
                  value={`${(summaryMetrics.conversionRate.value * 100).toFixed(2)}%`} 
                  change={summaryMetrics.conversionRate.change}
                  icon="trending-up"
                />
                <MetricCard 
                  title="Cost Per Conversion" 
                  value={formatCurrency(summaryMetrics.costPerConversion.value)} 
                  change={summaryMetrics.costPerConversion.change}
                  icon="credit-card"
                  invertChange
                />
                <MetricCard 
                  title="ROI" 
                  value={`${(summaryMetrics.roi.value * 100).toFixed(2)}%`} 
                  change={summaryMetrics.roi.change}
                  icon="trending-up"
                />
              </div>
              
              {/* Time Series Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Metrics Over Time</CardTitle>
                    <CardDescription>Impressions and clicks during the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart 
                      data={chartData.timeSeriesData}
                      categories={['impressions', 'clicks']}
                      index="date"
                      colors={['blue', 'green']}
                      valueFormatter={(value) => formatNumber(value)}
                      yAxisWidth={60}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Metrics Over Time</CardTitle>
                    <CardDescription>Conversions and revenue during the selected period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart 
                      data={chartData.timeSeriesData}
                      categories={['conversions', 'revenue']}
                      index="date"
                      colors={['purple', 'orange']}
                      valueFormatter={(value, category) => 
                        category === 'revenue' ? formatCurrency(value) : formatNumber(value)
                      }
                      yAxisWidth={60}
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        
        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-6">
          {!isLoading && analyticsData && (
            <>
              {/* Channel Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Distribution</CardTitle>
                    <CardDescription>Conversion distribution by marketing channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart 
                        data={chartData.channelData}
                        category="value"
                        index="name"
                        valueFormatter={(value) => formatNumber(value)}
                        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Revenue</CardTitle>
                    <CardDescription>Revenue distribution by marketing channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart 
                        data={chartData.channelData}
                        category="revenue"
                        index="name"
                        valueFormatter={(value) => formatCurrency(value)}
                        colors={["violet", "cyan", "yellow", "pink", "blue", "green"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Channel Performance Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>Detailed metrics by marketing channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceTable 
                    data={analyticsData.channelPerformance}
                    totalMetrics={totalChannelMetrics}
                  />
                </CardContent>
              </Card>
              
              {/* Channel Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Comparison</CardTitle>
                  <CardDescription>Key metrics comparison across channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={chartData.channelData}
                    categories={["clicks", "conversions"]}
                    index="name"
                    colors={["blue", "green"]}
                    valueFormatter={(value) => formatNumber(value)}
                    layout="vertical"
                    className="h-96"
                  />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Conversions Tab */}
        <TabsContent value="conversions" className="space-y-6">
          {!isLoading && analyticsData && (
            <>
              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Visualize the customer journey from impression to conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <ConversionFunnel 
                    data={{
                      impressions: analyticsData.summary.impressions,
                      clicks: analyticsData.summary.clicks,
                      leads: analyticsData.summary.leads || 0,
                      opportunities: analyticsData.summary.opportunities || 0,
                      conversions: analyticsData.summary.conversions,
                    }}
                  />
                </CardContent>
              </Card>
              
              {/* Conversion by Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion by Type</CardTitle>
                  <CardDescription>Breakdown of different conversion types</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={analyticsData.conversionTypes || []}
                    categories={["count"]}
                    index="type"
                    colors={["purple"]}
                    valueFormatter={(value) => formatNumber(value)}
                    className="h-80"
                  />
                </CardContent>
              </Card>
              
              {/* Conversion Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Trends</CardTitle>
                  <CardDescription>Conversion rate and cost per conversion over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart 
                    data={analyticsData.timeSeries.map(point => ({
                      date: point.date,
                      conversionRate: point.metrics.conversionRate * 100,
                      costPerConversion: point.metrics.costPerConversion,
                    }))}
                    categories={["conversionRate", "costPerConversion"]}
                    index="date"
                    colors={["green", "red"]}
                    valueFormatter={(value, category) => 
                      category === "conversionRate" 
                        ? `${value.toFixed(2)}%` 
                        : formatCurrency(value)
                    }
                    yAxisWidth={60}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          {!isLoading && analyticsData && analyticsData.audienceData && (
            <>
              {/* Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                    <CardDescription>Audience breakdown by age group</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart 
                      data={analyticsData.audienceData.ageGroups}
                      categories={["percentage"]}
                      index="group"
                      colors={["blue"]}
                      valueFormatter={(value) => `${value.toFixed(1)}%`}
                      className="h-80"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                    <CardDescription>Audience breakdown by gender</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart 
                        data={analyticsData.audienceData.genderDistribution}
                        category="percentage"
                        index="gender"
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        colors={["blue", "pink", "purple"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Top regions by audience size</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={analyticsData.audienceData.topRegions.slice(0, 10)}
                    categories={["percentage"]}
                    index="region"
                    colors={["indigo"]}
                    valueFormatter={(value) => `${value.toFixed(1)}%`}
                    layout="vertical"
                    className="h-96"
                  />
                </CardContent>
              </Card>
              
              {/* Devices and Interests */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                    <CardDescription>Audience breakdown by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart 
                        data={analyticsData.audienceData.deviceDistribution}
                        category="percentage"
                        index="device"
                        valueFormatter={(value) => `${value.toFixed(1)}%`}
                        colors={["cyan", "amber", "emerald", "rose"]}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Interests</CardTitle>
                    <CardDescription>Most common audience interests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart 
                      data={analyticsData.audienceData.topInterests.slice(0, 8)}
                      categories={["percentage"]}
                      index="interest"
                      colors={["orange"]}
                      valueFormatter={(value) => `${value.toFixed(1)}%`}
                      layout="vertical"
                      className="h-80"
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
