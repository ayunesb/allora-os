import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export function BarChart({
  data,
  categories,
  index,
  colors = ["blue", "green", "purple", "orange"],
  valueFormatter,
  layout = "horizontal",
  className,
}) {
  // Create a simpler formatter function that matches the expected type for Recharts
  const formatTickValue = (value) => {
    if (valueFormatter && typeof value === "number") {
      return valueFormatter(value);
    }
    return `${value}`;
  };
  // Tooltip formatter
  const formatTooltipValue = (value, name) => {
    if (valueFormatter && typeof value === "number") {
      return [valueFormatter(value, name), name];
    }
    return [`${value}`, name];
  };
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === "horizontal" ? (
          <>
            <XAxis dataKey={index} />
            <YAxis tickFormatter={formatTickValue} />
          </>
        ) : (
          <>
            <XAxis type="number" tickFormatter={formatTickValue} />
            <YAxis type="category" dataKey={index} width={120} />
          </>
        )}
        <Tooltip formatter={formatTooltipValue} />
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
