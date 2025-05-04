import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPITracker } from '@/components/kpi/KPITracker';
import { Button } from "@/components/ui/button";
import { fetchKPIMetrics } from '@/utils/kpiService';
import { toast } from 'sonner';
import { RefreshCw, Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';
export default function KPIMetricsPage() {
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTimeframe, setSelectedTimeframe] = useState('month');
    const loadMetrics = async () => {
        setIsLoading(true);
        try {
            const data = await fetchKPIMetrics();
            setMetrics(data);
        }
        catch (error) {
            toast.error('Failed to load KPI metrics');
            console.error('Error loading metrics:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadMetrics();
    }, []);
    const handleExport = () => {
        const formattedData = metrics.map(metric => ({
            Type: metric.type,
            Value: metric.value,
            'Recorded At': new Date(metric.recorded_at).toLocaleString(),
            'Strategy ID': metric.strategy_id || 'N/A'
        }));
        exportToCSV(formattedData, 'kpi-metrics');
        toast.success('KPI metrics exported successfully');
    };
    const timeframeOptions = [
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'quarter', label: 'Quarter' },
        { value: 'year', label: 'Year' }
    ];
    // This would filter metrics based on the selected timeframe
    // For now, we'll just show all metrics
    const filteredMetrics = metrics;
    return (<div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">KPI Metrics Dashboard</h1>
          <p className="text-muted-foreground">Track your key performance indicators over time</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-muted rounded-md overflow-hidden">
            {timeframeOptions.map((option) => (<Button key={option.value} variant={selectedTimeframe === option.value ? "secondary" : "ghost"} className="h-9 rounded-none" onClick={() => setSelectedTimeframe(option.value)}>
                {option.label}
              </Button>))}
          </div>
          
          <Button variant="outline" size="sm" onClick={loadMetrics}>
            <RefreshCw className="h-4 w-4 mr-2"/>
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2"/>
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <KPITracker metrics={filteredMetrics} isLoading={isLoading}/>
        </CardContent>
      </Card>
    </div>);
}
