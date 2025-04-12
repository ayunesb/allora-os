
import React from 'react';
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface LineChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  className?: string;
}

export function LineChart({
  data,
  categories,
  index,
  colors = ['blue', 'green', 'purple', 'orange'],
  valueFormatter,
  yAxisWidth = 40,
  className
}: LineChartProps) {
  // Create a simpler formatter function that matches the expected type
  const formatValue = (value: any) => {
    if (valueFormatter && typeof value === 'number') {
      return valueFormatter(value);
    }
    return `${value}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={index} />
        <YAxis width={yAxisWidth} tickFormatter={formatValue} />
        <Tooltip 
          formatter={(value) => [formatValue(value), ""]}
        />
        <Legend />
        {categories.map((category, idx) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[idx % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
