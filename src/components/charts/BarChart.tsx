
import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface BarChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export function BarChart({
  data,
  categories,
  index,
  colors = ['blue', 'green', 'purple', 'orange'],
  valueFormatter,
  layout = 'horizontal',
  className
}: BarChartProps) {
  // Create a simpler formatter function that matches the expected type
  const formatValue = (value: any) => {
    if (valueFormatter && typeof value === 'number') {
      return valueFormatter(value);
    }
    return `${value}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <RechartsBarChart 
        data={data} 
        layout={layout}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'horizontal' ? (
          <>
            <XAxis dataKey={index} />
            <YAxis tickFormatter={formatValue} />
          </>
        ) : (
          <>
            <XAxis type="number" tickFormatter={formatValue} />
            <YAxis type="category" dataKey={index} width={120} />
          </>
        )}
        <Tooltip 
          formatter={(value) => [formatValue(value), ""]}
        />
        <Legend />
        {categories.map((category, idx) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[idx % colors.length]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
