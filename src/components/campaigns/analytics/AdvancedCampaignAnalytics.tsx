import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const safeNumber = (value) => {
  return typeof value === "number" ? value : 0;
};
const formatAsPercent = (value) => {
  return `${(value * 100).toFixed(2)}%`;
};
const formatAsCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};
export function AdvancedCampaignAnalytics({ campaign }) {
  const [activeTab, setActiveTab] = useState("overview");
  // Safely access nested properties
  const metrics = campaign.metrics || {};
  const dayMetrics = campaign.dayMetrics || [];
  const channelBreakdown = campaign.channelBreakdown || [];
  const deviceBreakdown = campaign.deviceBreakdown || [];
  // Calculate additional metrics with fallbacks
  const impressions = safeNumber(metrics.impressions);
  const clicks = safeNumber(metrics.clicks);
  const conversions = safeNumber(metrics.conversions);
  const cost = safeNumber(metrics.cost);
  const ctr = metrics.ctr ?? (impressions > 0 ? clicks / impressions : 0);
  const cpc = metrics.cpc ?? (clicks > 0 ? cost / clicks : 0);
  const conversionRate =
    metrics.conversionRate ?? (clicks > 0 ? conversions / clicks : 0);
  const roi = metrics.roi ?? (cost > 0 ? (conversions * 100 - cost) / cost : 0);
  // Performance overview data for the card metrics
  const performanceData = [
    { name: "Impressions", value: impressions },
    { name: "Clicks", value: clicks },
    { name: "Conversions", value: conversions },
    { name: "CTR", value: ctr, format: formatAsPercent },
    { name: "CPC", value: cpc, format: formatAsCurrency },
    { name: "Conv. Rate", value: conversionRate, format: formatAsPercent },
    { name: "ROI", value: roi, format: (v) => `${(v * 100).toFixed(2)}%` },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{campaign.name} Analytics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {performanceData.slice(0, 4).map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {item.name}
              </h3>
              <p className="text-2xl font-bold">
                {item.format
                  ? item.format(item.value)
                  : item.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceData.slice(4).map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {item.name}
              </h3>
              <p className="text-2xl font-bold">
                {item.format
                  ? item.format(item.value)
                  : item.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Trends</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="h-80">
                {dayMetrics.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dayMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="impressions"
                        stroke="#8884d8"
                        name="Impressions"
                        dot={false}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="clicks"
                        stroke="#82ca9d"
                        name="Clicks"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No daily metrics available
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="channels">
              <div className="h-80">
                {channelBreakdown.length > 0 ? (
                  <div className="flex flex-col md:flex-row gap-6">
                    <ResponsiveContainer width="50%" height={300}>
                      <PieChart>
                        <Pie
                          data={channelBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {channelBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                      </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={300}>
                      <BarChart data={channelBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No channel breakdown available
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <div className="h-80">
                {deviceBreakdown.length > 0 ? (
                  <div className="flex flex-col md:flex-row gap-6">
                    <ResponsiveContainer width="50%" height={300}>
                      <PieChart>
                        <Pie
                          data={deviceBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#82ca9d"
                          dataKey="value"
                        >
                          {deviceBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, "Value"]} />
                      </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={300}>
                      <BarChart data={deviceBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" name="Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No device breakdown available
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
