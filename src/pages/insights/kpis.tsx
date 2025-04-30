
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface KPIData {
  label: string;
  value: number;
}

export default function KPIMetricsPage() {
  const [data, setData] = useState<KPIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [detailedData, setDetailedData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetchApi<KPIData[]>('/api/kpis');
        setData(res);
        setError(null);
        
        // Generate mock detailed data for the chart
        const mockDetailedData = Array.from({ length: 30 }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: Math.floor(Math.random() * 1000) + 1000,
            leads: Math.floor(Math.random() * 15) + 5,
            conversions: Math.floor(Math.random() * 5) + 1
          };
        });
        setDetailedData(mockDetailedData);
      } catch (err) {
        console.error('Failed to load KPIs', err);
        setError('Failed to load KPI metrics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    load();
  }, []);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    
    // In a real app, you would fetch new data based on the time range
    // For now, we'll just simulate this
    setIsLoading(true);
    setTimeout(() => {
      // Generate new mock data with fewer or more points based on time range
      const daysCount = value === '7d' ? 7 : value === '30d' ? 30 : 90;
      const mockDetailedData = Array.from({ length: daysCount }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (daysCount - 1 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: Math.floor(Math.random() * 1000) + 1000,
          leads: Math.floor(Math.random() * 15) + 5,
          conversions: Math.floor(Math.random() * 5) + 1
        };
      });
      setDetailedData(mockDetailedData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-6">
      <DashboardBreadcrumb />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <PageTitle title="KPI Metrics" description="Track your business performance metrics over time" />
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select
              defaultValue={timeRange}
              onValueChange={handleTimeRangeChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {error && (
        <Alert variant="destructive" className="my-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!isLoading && !error && data.length === 0 && (
        <Card className="my-6">
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">No KPI metrics available yet.</p>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !error && data.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {data.slice(0, 3).map((kpi, i) => (
              <Card key={i} className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.random() > 0.5 ? "+" : "-"}
                    {(Math.random() * 15 + 5).toFixed(1)}% from last period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-6">
            <CardHeader>
              <CardTitle>KPI Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888"
                      tickFormatter={(value) => {
                        // Show fewer ticks for readability
                        return detailedData.length > 30 && detailedData.indexOf(detailedData.find(item => item.date === value)) % 3 !== 0
                          ? ''
                          : value;
                      }}
                    />
                    <YAxis stroke="#888888" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue ($)"
                      stroke="#6366F1" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leads"
                      name="Leads" 
                      stroke="#22C55E" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      name="Conversions"
                      stroke="#EF4444" 
                      strokeWidth={2} 
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
