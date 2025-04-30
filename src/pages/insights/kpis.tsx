
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KPIData {
  label: string;
  value: number;
}

export default function KPIMetricsPage() {
  const [data, setData] = useState<KPIData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchApi<KPIData[]>('/api/kpis');
        setData(res);
      } catch (err) {
        console.error('Failed to load KPIs', err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">KPI Metrics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
