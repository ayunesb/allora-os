import React from "react";
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
  Funnel,
  FunnelChart,
  LabelList,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Activity } from "lucide-react";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#4BC0C0",
  "#36A2EB",
  "#9966FF",
];
export function EnhancedVisualization({
  type,
  data,
  title,
  description,
  config = {},
}) {
  const renderVisualization = () => {
    switch (type) {
      case "treemap":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <Treemap
              data={data}
              dataKey="value"
              nameKey="name"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip formatter={(value) => [`${value}`, "Value"]} />
            </Treemap>
          </ResponsiveContainer>
        );
      case "funnel":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                fill={COLORS[0]}
              >
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );
      case "bubble":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name={config.xAxisName || "X"} />
              <YAxis type="number" dataKey="y" name={config.yAxisName || "Y"} />
              <ZAxis
                type="number"
                dataKey="z"
                range={[60, 400]}
                name={config.zAxisName || "Z"}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              {data.map((group, index) => (
                <Scatter
                  key={index}
                  name={group.name}
                  data={group.data}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        );
      case "heatmap":
        // Render a simple heatmap visualization (using a styled grid of divs)
        return (
          <div className="w-full h-[350px] overflow-auto">
            <div className="grid grid-cols-10 gap-1">
              {data.map((cell, index) => (
                <div
                  key={index}
                  className="aspect-square rounded"
                  style={{
                    backgroundColor: calculateHeatColor(
                      cell.value,
                      config.min || 0,
                      config.max || 100,
                    ),
                    opacity: 0.8,
                  }}
                  title={`${cell.name}: ${cell.value}`}
                />
              ))}
            </div>
          </div>
        );
      default:
        return <div>Visualization type not supported</div>;
    }
  };
  const calculateHeatColor = (value, min, max) => {
    // Calculate color based on value relative to min/max
    const ratio = (value - min) / (max - min);
    // Generate color from blue (cold) to red (hot)
    const hue = (1 - ratio) * 240;
    return `hsl(${hue}, 80%, 60%)`;
  };
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{renderVisualization()}</CardContent>
    </Card>
  );
}
