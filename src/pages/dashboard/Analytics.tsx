
import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceOverview from '@/components/analytics/PerformanceOverview';
import StrategyROIBreakdown from '@/components/analytics/StrategyROIBreakdown';
import LeadSourceAnalysis from '@/components/analytics/LeadSourceAnalysis';
import CampaignConversionMetrics from '@/components/analytics/CampaignConversionMetrics';
import WeeklyPerformanceCard from '@/components/analytics/WeeklyPerformanceCard';
import AnalyticsDateRangePicker from '@/components/analytics/AnalyticsDateRangePicker';
import { PageTitle } from '@/components/ui/page-title';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';

// Mock data
const weeklyData = [
  { week: 'Week 1', leads: 43, revenue: 5200 },
  { week: 'Week 2', leads: 58, revenue: 6100 },
  { week: 'Week 3', leads: 47, revenue: 5800 },
  { week: 'Week 4', leads: 71, revenue: 7400 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date()
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <DashboardBreadcrumb
            rootPath="/dashboard/analytics"
            rootLabel="Analytics"
            rootIcon={<BarChart className="h-4 w-4" />}
          />
          
          <PageTitle>
            Analytics Dashboard
            <span className="block text-sm font-normal text-muted-foreground mt-1">
              Insights and metrics for your marketing performance
            </span>
          </PageTitle>
        </div>
        
        <div>
          <AnalyticsDateRangePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>

      <AnalyticsHeader />
      
      <WeeklyPerformanceCard data={weeklyData} />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <LineChart className="h-4 w-4 mr-2" />
            Performance Overview
          </TabsTrigger>
          <TabsTrigger value="roi">
            <BarChart className="h-4 w-4 mr-2" />
            Strategy ROI
          </TabsTrigger>
          <TabsTrigger value="leads">
            <PieChart className="h-4 w-4 mr-2" />
            Lead Sources
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <PerformanceOverview />
        </TabsContent>
        <TabsContent value="roi" className="space-y-4">
          <StrategyROIBreakdown />
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <LeadSourceAnalysis />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Campaign Conversion Metrics</h2>
        <CampaignConversionMetrics />
      </div>
    </div>
  );
}
