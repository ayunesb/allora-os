
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceOverview from '@/components/analytics/PerformanceOverview';
import StrategyROIBreakdown from '@/components/analytics/StrategyROIBreakdown';
import LeadSourceAnalysis from '@/components/analytics/LeadSourceAnalysis';
import CampaignConversionMetrics from '@/components/analytics/CampaignConversionMetrics';
import WeeklyPerformanceCard from '@/components/analytics/WeeklyPerformanceCard';
import AnalyticsDateRangePicker from '@/components/analytics/AnalyticsDateRangePicker';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';

export default function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleDateRangeChange = (newRange: [Date | null, Date | null]) => {
    setDateRange(newRange);
    // Fetch new data based on date range
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <AnalyticsHeader 
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PerformanceOverview isLoading={isRefreshing} />
            <StrategyROIBreakdown isLoading={isRefreshing} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LeadSourceAnalysis isLoading={isRefreshing} />
            <CampaignConversionMetrics isLoading={isRefreshing} />
            <WeeklyPerformanceCard isLoading={isRefreshing} />
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="pt-4">
          <CampaignConversionMetrics isLoading={isRefreshing} />
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
          <StrategyROIBreakdown isLoading={isRefreshing} />
        </TabsContent>
        
        <TabsContent value="leads" className="pt-4">
          <LeadSourceAnalysis isLoading={isRefreshing} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
