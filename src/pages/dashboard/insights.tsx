import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, TrendingUp, Users } from 'lucide-react';
import { useApiQuery } from '@/hooks/useApiQuery';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export default function InsightsPage() {
    const [timeframe, setTimeframe] = useState('7d');
    const { data: kpiData, isLoading: isKpiLoading, error: kpiError } = useApiQuery('/api/kpi', { timeframe });
    const { data: chartData, isLoading: isChartLoading, error: chartError } = useApiQuery('/api/chart', { timeframe });
    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
    };
    return (<div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Insights</h1>
        <div>
          <button className={`px-3 py-1 rounded-md ${timeframe === '7d' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => handleTimeframeChange('7d')}>
            7 Days
          </button>
          <button className={`px-3 py-1 rounded-md ml-2 ${timeframe === '30d' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => handleTimeframeChange('30d')}>
            30 Days
          </button>
        </div>
      </div>

      {kpiError && (<Alert variant="destructive">
          <AlertCircle className="h-4 w-4"/>
          <AlertDescription>
            Failed to load KPI data. Please try again.
          </AlertDescription>
        </Alert>)}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-4 w-4"/> Total Wins</CardTitle>
          </CardHeader>
          <CardContent>
            {isKpiLoading ? <p>Loading...</p> : <p className="text-2xl font-bold">{kpiData?.total_wins || 0}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-4 w-4"/> Total Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            {isKpiLoading ? <p>Loading...</p> : <p className="text-2xl font-bold">{kpiData?.total_strategies || 0}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-4 w-4"/> Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isKpiLoading ? <p>Loading...</p> : <p className="text-2xl font-bold">{kpiData?.total_users || 0}</p>}
          </CardContent>
        </Card>
      </div>

      {chartError && (<Alert variant="destructive">
          <AlertCircle className="h-4 w-4"/>
          <AlertDescription>
            Failed to load chart data. Please try again.
          </AlertDescription>
        </Alert>)}

      <Card>
        <CardHeader>
          <CardTitle>Performance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {isChartLoading ? (<p>Loading chart...</p>) : (<ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }}/>
              </LineChart>
            </ResponsiveContainer>)}
        </CardContent>
      </Card>
    </div>);
}
