
import React, { useEffect, useState } from 'react';
import { KPITracker } from '@/components/kpi/KPITracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Download, BarChart3 } from 'lucide-react';
import { KPIMetric } from '@/types/unified-types';
import { fetchKPIMetrics } from '@/utils/kpiService';
import { useToast } from '@/components/ui/use-toast';
import { exportToCSV } from '@/utils/exportUtils';

export default function KPIMetricsPage() {
  const [metrics, setMetrics] = useState<KPIMetric[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setIsLoading(true);
      const data = await fetchKPIMetrics();
      setMetrics(data);
    } catch (error) {
      toast({
        title: "Failed to load KPI metrics",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    const formattedData = metrics.map(metric => ({
      Type: metric.type,
      Value: metric.value,
      Date: new Date(metric.recorded_at).toLocaleDateString(),
      "Strategy ID": metric.strategy_id || "N/A"
    }));
    
    exportToCSV(formattedData, `kpi-metrics-${new Date().toISOString().split('T')[0]}`);
    
    toast({
      title: "Export successful",
      description: "KPI metrics have been exported to CSV"
    });
  };

  const filterMetricsByTab = (metrics: KPIMetric[], tab: string) => {
    if (tab === 'all') return metrics;
    
    const categoryMap: Record<string, string[]> = {
      'revenue': ['mrr', 'revenue', 'roi', 'ltv', 'arpu'],
      'acquisition': ['leads', 'conversion_rate', 'cac'],
      'engagement': ['active_users', 'session_duration', 'churn_rate'],
      'campaigns': ['campaigns', 'click_rate', 'open_rate']
    };
    
    return metrics.filter(metric => 
      categoryMap[tab]?.includes(metric.type.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">KPI Metrics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your key performance indicators and growth metrics
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadMetrics} 
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="w-full" 
        onValueChange={setSelectedTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Metrics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <KPITracker metrics={metrics} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <KPITracker 
            metrics={filterMetricsByTab(metrics, 'revenue')} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="acquisition" className="mt-0">
          <KPITracker 
            metrics={filterMetricsByTab(metrics, 'acquisition')} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="engagement" className="mt-0">
          <KPITracker 
            metrics={filterMetricsByTab(metrics, 'engagement')} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-0">
          <KPITracker 
            metrics={filterMetricsByTab(metrics, 'campaigns')} 
            isLoading={isLoading} 
          />
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            KPI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {isLoading ? (
              "Analyzing metrics..."
            ) : metrics.length > 0 ? (
              "Your KPIs are showing healthy growth trends. Consider focusing on reducing customer acquisition costs to improve overall ROI."
            ) : (
              "No KPI data available for analysis. Start tracking your metrics to receive insights."
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
