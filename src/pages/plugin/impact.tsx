
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Badge } from '@/components/ui/badge';

interface PluginImpact {
  plugin_name: string;
  events: number;
  total_value: number;
}

export default function PluginImpactPage() {
  const [impact, setImpact] = useState<PluginImpact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        setIsLoading(true);
        const data = await fetchApi('/api/plugin/impact');
        setImpact(data || []);
      } catch (error) {
        console.error('Failed to fetch plugin impact data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImpact();
  }, []);

  return (
    <div className="container py-8">
      <DashboardBreadcrumb />
      
      <h1 className="text-2xl font-bold mb-4">🔍 Plugin ROI Impact</h1>
      <p className="text-muted-foreground mb-6">Per-tenant plugin activity and value generated.</p>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded-sm mb-2"></div>
                <div className="h-4 w-1/2 bg-muted rounded-sm"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : impact.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impact.map(p => (
            <Card key={p.plugin_name} className="border border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold">{p.plugin_name}</h2>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Events tracked: {p.events}</p>
                <p className="text-lg font-semibold text-green-400 mt-2">
                  Value: ${p.total_value.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No plugin impact data available yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
