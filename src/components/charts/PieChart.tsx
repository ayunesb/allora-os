
import React from 'react';
import {
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PieChartProps {
  data: any[];
  category: string;
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function PieChart({
  data,
  category,
  index,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'],
  valueFormatter,
  className
}: PieChartProps) {
  const formatValue = valueFormatter || ((value) => `${value}`);

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={category}
          nameKey={index}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
