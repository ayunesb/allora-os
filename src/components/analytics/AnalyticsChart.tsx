
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface AnalyticsChartProps {
  title: string;
  description: string;
  chartType: "line" | "area" | "bar" | "pie" | "radialBar";
  data: any[];
  dataKeys: string[];
  colors: string[];
  xAxisDataKey?: string;
  nameKey?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  description,
  chartType,
  data,
  dataKeys,
  colors,
  xAxisDataKey,
  nameKey = "name"
}) => {
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  stroke={colors[index % colors.length]}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKeys[0]}
                nameKey={nameKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "radialBar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="10%" 
              outerRadius="80%" 
              barSize={20} 
              data={data}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey={dataKeys[0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </RadialBar>
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={{
                  top: '50%',
                  right: 0,
                  transform: 'translate(0, -50%)',
                  lineHeight: '24px',
                }}
                formatter={(value, entry, index) => {
                  // Display the name from our data instead
                  return data[index % data.length][nameKey];
                }}
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {renderChart()}
    </div>
  );
};

export default AnalyticsChart;
