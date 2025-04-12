
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { BarChart, LineChart } from '@/components/charts';
import { Download, Filter, RefreshCw, ChevronDown } from 'lucide-react';
import { fetchCampaignAnalytics } from '@/services/analyticsService';
import { format } from '@/utils/exportUtils';
import { formatCurrency, formatNumber, calculatePercentChange } from '@/utils/formatters';
import { Campaign } from '@/types/campaigns';
import { AnalyticsData, MetricComparison, PlatformMetrics, ChannelPerformance } from '@/types/analytics';
import { MetricCard } from './MetricCard';
import { PerformanceTable } from './PerformanceTable';
import { ConversionFunnel } from './ConversionFunnel';

interface AnalyticsTab {
  label: string;
  value: string;
}

const analyticsTabs: AnalyticsTab[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Performance', value: 'performance' },
  { label: 'Conversions', value: 'conversions' },
  { label: 'Platforms', value: 'platforms' },
];

export default function AdvancedCampaignAnalytics({ campaign }: { campaign: Campaign }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Set default date range to last 30 days
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return 'Select Date Range';
    const fromDate = dateRange.from.toLocaleDateString();
    const toDate = dateRange.to.toLocaleDateString();
    return `${fromDate} - ${toDate}`;
  };

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!campaign.id) throw new Error('Campaign ID is required');
      const data = await fetchCampaignAnalytics(campaign.id, dateRange?.from, dateRange?.to);
      setAnalyticsData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [campaign.id, dateRange]);

  // Refresh data
  const refreshData = () => {
    fetchData();
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  // Prepare data for export
  const prepareExportData = () => {
    if (!analyticsData) return [];
    const overviewData = {
      Impressions: analyticsData.impressions,
      Clicks: analyticsData.clicks,
      Leads: analyticsData.leads,
      Conversions: analyticsData.conversions,
      Spend: analyticsData.spend,
      Revenue: analyticsData.revenue,
      CTR: analyticsData.ctr,
      CPC: analyticsData.cpc,
      CPA: analyticsData.cpa,
      ROAS: analyticsData.roas,
    };
    const dailyMetricsData = analyticsData.dailyMetrics.map((item) => ({
      Date: item.date,
      Impressions: item.impressions,
      Clicks: item.clicks,
      Leads: item.leads,
      Conversions: item.conversions,
      Spend: item.spend,
      Revenue: item.revenue,
    }));
    return [overviewData, ...dailyMetricsData];
  };

  // Export data
  const handleExport = (type: 'csv' | 'pdf') => {
    const exportData = prepareExportData();
    if (type === 'csv') {
      format.csv(exportData, `${campaign.name}-analytics`);
    } else {
      format.pdf(exportData, `${campaign.name}-analytics`);
    }
  };

  // Prepare data for performance table
  const preparePerformanceData = (): { data: ChannelPerformance[], totalMetrics: any } => {
    if (!analyticsData) return { data: [], totalMetrics: null };
    
    // Example: convert platform metrics to channel performance data
    const channelData: ChannelPerformance[] = Object.entries(analyticsData.platformMetrics).map(([platform, metrics]) => ({
      channelName: platform,
      metrics: {
        impressions: metrics.impressions,
        clicks: metrics.clicks,
        ctr: metrics.ctr,
        conversions: metrics.conversions,
        conversionRate: metrics.conversions / metrics.clicks,
        cost: metrics.spend,
        revenue: metrics.revenue,
        roi: metrics.revenue / metrics.spend - 1
      }
    }));
    
    // Calculate totals
    const totalMetrics = {
      totalImpressions: channelData.reduce((sum, item) => sum + item.metrics.impressions, 0),
      totalClicks: channelData.reduce((sum, item) => sum + item.metrics.clicks, 0),
      totalConversions: channelData.reduce((sum, item) => sum + item.metrics.conversions, 0),
      totalCost: channelData.reduce((sum, item) => sum + item.metrics.cost, 0),
      totalRevenue: channelData.reduce((sum, item) => sum + item.metrics.revenue, 0)
    };
    
    return { data: channelData, totalMetrics };
  };
  
  // Prepare data for conversion funnel
  const prepareFunnelData = () => {
    if (!analyticsData) return null;
    
    return {
      impressions: analyticsData.impressions,
      clicks: analyticsData.clicks,
      leads: analyticsData.leads,
      conversions: analyticsData.conversions
    };
  };

  const performanceData = preparePerformanceData();
  const funnelData = prepareFunnelData();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold">Campaign Analytics</h2>
        <div className="flex flex-wrap gap-3">
          <DateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            className="w-[280px]"
          />
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="relative">
            <Button variant="outline" onClick={() => setShowExportMenu(!showExportMenu)}>
              <Download className="h-4 w-4 mr-2" />
              Export
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport('csv')}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport('pdf')}
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          {analyticsTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Impressions"
              value={formatNumber(analyticsData?.impressions)}
              change={calculatePercentChange(analyticsData?.comparisonData?.impressions?.previous, analyticsData?.comparisonData?.impressions?.current)}
            />
            <MetricCard
              title="Clicks"
              value={formatNumber(analyticsData?.clicks)}
              change={calculatePercentChange(analyticsData?.comparisonData?.clicks?.previous, analyticsData?.comparisonData?.clicks?.current)}
            />
            <MetricCard
              title="Leads"
              value={formatNumber(analyticsData?.leads)}
              change={calculatePercentChange(analyticsData?.comparisonData?.leads?.previous, analyticsData?.comparisonData?.leads?.current)}
            />
            <MetricCard
              title="Conversions"
              value={formatNumber(analyticsData?.conversions)}
              change={calculatePercentChange(analyticsData?.comparisonData?.conversions?.previous, analyticsData?.comparisonData?.conversions?.current)}
            />
            <MetricCard
              title="Spend"
              value={formatCurrency(analyticsData?.spend)}
              change={calculatePercentChange(analyticsData?.comparisonData?.spend?.previous, analyticsData?.comparisonData?.spend?.current)}
            />
            <MetricCard
              title="Revenue"
              value={formatCurrency(analyticsData?.revenue)}
              change={calculatePercentChange(analyticsData?.comparisonData?.revenue?.previous, analyticsData?.comparisonData?.revenue?.current)}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData?.dailyMetrics && analyticsData?.dailyMetrics.length > 0 ? (
                <LineChart
                  data={analyticsData?.dailyMetrics}
                  index="date"
                  categories={['impressions', 'clicks', 'leads', 'conversions']}
                />
              ) : (
                <p>No daily metrics data available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          {funnelData && performanceData.data.length > 0 ? (
            <PerformanceTable 
              data={performanceData.data} 
              totalMetrics={performanceData.totalMetrics}
            />
          ) : (
            <p>No performance data available.</p>
          )}
        </TabsContent>
        <TabsContent value="conversions" className="space-y-4">
          {funnelData ? (
            <ConversionFunnel data={funnelData} />
          ) : (
            <p>No conversion data available.</p>
          )}
        </TabsContent>
        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData?.platformMetrics && Object.keys(analyticsData?.platformMetrics).length > 0 ? (
                <BarChart
                  data={Object.entries(analyticsData?.platformMetrics).map(([platform, metrics]) => ({
                    platform,
                    impressions: metrics.impressions,
                    clicks: metrics.clicks,
                    leads: metrics.leads,
                    conversions: metrics.conversions,
                  }))}
                  index="platform"
                  categories={['impressions', 'clicks', 'leads', 'conversions']}
                />
              ) : (
                <p>No platform metrics data available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
