
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface KPIData {
  label: string;
  value: number;
}

export default function KPIMetricsPage() {
  const [data, setData] = useState<KPIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetchApi<KPIData[]>('/api/kpis');
        setData(res);
        setError(null);
      } catch (err) {
        console.error('Failed to load KPIs', err);
        setError('Failed to load KPI metrics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    load();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <PageTitle title="KPI Metrics" description="Track your business performance metrics over time" />
      
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
        <Card className="my-6">
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366F1" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
