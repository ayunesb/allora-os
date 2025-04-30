
import { useEffect, useState } from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, TrendingUp, Users, Plugin } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KPI {
  label: string;
  value: number;
}

interface Agent {
  id: string;
  name: string;
  xp: number;
  success_rate: number;
}

interface Plugin {
  name: string;
  installs: number;
  roi: number;
}

export default function InsightsDashboard() {
  const { 
    data: kpis,
    isLoading: kpisLoading,
    isError: kpisError
  } = useApiQuery<KPI[]>('/api/kpis', { initialData: [] });
  
  const { 
    data: agents,
    isLoading: agentsLoading,
    isError: agentsError
  } = useApiQuery<Agent[]>('/api/agent-performance', { initialData: [] });
  
  const { 
    data: plugins,
    isLoading: pluginsLoading,
    isError: pluginsError
  } = useApiQuery<Plugin[]>('/api/plugin-usage', { initialData: [] });

  // Chart data for KPI metrics
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Mock chart data - in a real application, this would come from an API
    const data = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 5000) + 5000,
        leads: Math.floor(Math.random() * 50) + 30,
        conversion: (Math.random() * 5 + 2).toFixed(1)
      };
    });
    setChartData(data);
  }, []);

  const isLoading = kpisLoading || agentsLoading || pluginsLoading;
  const hasError = kpisError || agentsError || pluginsError;

  return (
    <div className="container mx-auto p-6">
      <DashboardBreadcrumb />
      <PageTitle title="Business Insights" description="Performance metrics and business intelligence dashboard" />
      
      {hasError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was a problem fetching dashboard data. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="w-full grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded animate-pulse w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="leads" stroke="#22C55E" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Top Performing Agents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {agents && agents.slice(0, 5).map((agent) => (
                      <li key={agent.id} className="border rounded-lg p-3 bg-card">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{agent.name}</p>
                          <span className="text-sm px-2 py-1 rounded bg-primary/20 text-primary">
                            {agent.success_rate}%
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">XP: {agent.xp}</div>
                      </li>
                    ))}
                    {!agents?.length && (
                      <li className="text-center py-8 text-muted-foreground">
                        No agent data available
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plugin className="h-5 w-5" /> Top Plugins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plugins && plugins.slice(0, 5).map((plugin) => (
                      <li key={plugin.name} className="border rounded-lg p-3 bg-card">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{plugin.name}</p>
                          <span className="text-sm px-2 py-1 rounded bg-primary/20 text-primary">
                            ROI: {plugin.roi.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {plugin.installs} installs
                        </div>
                      </li>
                    ))}
                    {!plugins?.length && (
                      <li className="text-center py-8 text-muted-foreground">
                        No plugin data available
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kpis && kpis.map((kpi, i) => (
                    <div key={i} className="bg-card/50 p-4 rounded-xl border shadow">
                      <p className="text-sm text-muted-foreground">{kpi.label}</p>
                      <p className="text-2xl font-bold">{kpi.value.toLocaleString()}</p>
                    </div>
                  ))}
                  {!kpis?.length && (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">
                      No KPI data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
