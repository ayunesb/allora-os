import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
const PerformanceMetrics = ({ isLoading = false }) => {
  // Sample data - in a real application this would come from an API
  const performanceData = [
    { date: "2025-04-01", strategies: 2, leads: 5, campaigns: 1 },
    { date: "2025-04-02", strategies: 3, leads: 8, campaigns: 1 },
    { date: "2025-04-03", strategies: 4, leads: 12, campaigns: 2 },
    { date: "2025-04-04", strategies: 5, leads: 15, campaigns: 2 },
    { date: "2025-04-05", strategies: 5, leads: 18, campaigns: 3 },
    { date: "2025-04-06", strategies: 7, leads: 22, campaigns: 3 },
    { date: "2025-04-07", strategies: 8, leads: 25, campaigns: 4 },
  ];
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="strategies"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="leads" stroke="#82ca9d" />
              <Line type="monotone" dataKey="campaigns" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
export default PerformanceMetrics;
