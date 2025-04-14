
import React, { useState, useEffect } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedVisualization } from "@/components/analytics/EnhancedVisualizations";
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ZAxis,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Link } from "react-router-dom";
import { AlertTriangle, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RiskDataPoint {
  executiveName: string;
  executiveRole: string;
  averageRisk: number;
  decisionCount: number;
  x?: number;
  y?: number;
  z?: number;
}

export default function RiskHeatmap() {
  const [riskData, setRiskData] = useState<RiskDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("scatter");

  useEffect(() => {
    async function fetchRiskData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('executive_decisions')
          .select('executive_name, executive_role, risk_assessment');
        
        if (error) {
          throw error;
        }

        // Group data by executive
        const groupedData: Record<string, { role: string, risks: (number | null)[] }> = {};
        
        data.forEach(decision => {
          const riskValue = decision.risk_assessment ? parseFloat(decision.risk_assessment) : null;
          
          if (!groupedData[decision.executive_name]) {
            groupedData[decision.executive_name] = {
              role: decision.executive_role,
              risks: []
            };
          }
          
          if (riskValue !== null) {
            groupedData[decision.executive_name].risks.push(riskValue);
          }
        });

        // Calculate average risk and format data
        const formattedData: RiskDataPoint[] = Object.keys(groupedData).map((name, index) => {
          const validRisks = groupedData[name].risks.filter(r => r !== null) as number[];
          const average = validRisks.length > 0 
            ? validRisks.reduce((acc, val) => acc + val, 0) / validRisks.length 
            : 0;
            
          // Adding positioning data for bubble chart
          return {
            executiveName: name,
            executiveRole: groupedData[name].role,
            averageRisk: parseFloat(average.toFixed(2)),
            decisionCount: groupedData[name].risks.length,
            // Random positioning for bubble chart
            x: index + 1,
            y: average,
            z: groupedData[name].risks.length
          };
        });

        setRiskData(formattedData);
      } catch (err) {
        console.error("Error fetching executive risk data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRiskData();
  }, []);

  // Transform data for heatmap visualization
  const heatmapData = riskData.map(item => ({
    name: item.executiveName, 
    value: item.averageRisk * 20 // Scale to 0-100 for better visualization
  }));

  // Prepare data for bubble chart
  const bubbleChartData = [{
    name: "Executive Risk Analysis",
    data: riskData.map(item => ({
      x: item.x,
      y: item.averageRisk,
      z: item.decisionCount,
      name: item.executiveName,
      role: item.executiveRole
    }))
  }];

  // Transform data for scatter plot
  const scatterData = riskData.map(item => ({
    x: item.decisionCount,
    y: item.averageRisk,
    z: 15,
    executiveName: item.executiveName,
    executiveRole: item.executiveRole
  }));

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <PageTitle 
          title="Risk Heatmap" 
          description="Loading executive risk analysis..."
        />
        <div className="mt-8 space-y-4">
          <Progress value={45} className="w-full h-2" />
          <div className="text-center text-muted-foreground">
            Analyzing executive decision patterns...
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: number) => {
    if (risk <= 1) return "text-green-500";
    if (risk <= 2) return "text-emerald-400"; 
    if (risk <= 3) return "text-yellow-400";
    if (risk <= 4) return "text-orange-500";
    return "text-red-500";
  };

  const getRiskLevelName = (risk: number) => {
    if (risk <= 1) return "Very Conservative";
    if (risk <= 2) return "Conservative";
    if (risk <= 3) return "Balanced";
    if (risk <= 4) return "Bold";
    return "Very Bold";
  };

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="Executive Risk Heatmap" 
        description="Visualize risk patterns across your executive team"
      />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing data from {riskData.reduce((acc, curr) => acc + curr.decisionCount, 0)} decisions across {riskData.length} executives
          </span>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/decisions">
            View Decision Log
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="scatter" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="scatter">Risk vs. Activity</TabsTrigger>
          <TabsTrigger value="bubble">Executive Bubble Chart</TabsTrigger>
          <TabsTrigger value="heatmap">Risk Heatmap</TabsTrigger>
          <TabsTrigger value="table">Risk Table</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scatter" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Risk vs. Decision Count</CardTitle>
              <CardDescription>
                Executives plotted by how many decisions they've made (x-axis) and their average risk level (y-axis)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Decision Count"
                      label={{ value: 'Decision Count', position: 'bottom' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Risk Level" 
                      domain={[0, 5]}
                      label={{ value: 'Risk Level', angle: -90, position: 'insideLeft' }}
                    />
                    <ZAxis type="number" dataKey="z" range={[60, 150]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                              <p className="font-bold">{data.executiveName}</p>
                              <p className="text-sm text-muted-foreground">{data.executiveRole}</p>
                              <div className="mt-2">
                                <p>Decision Count: <span className="font-medium">{data.x}</span></p>
                                <p>Average Risk: <span className={`font-medium ${getRiskColor(data.y)}`}>{data.y}</span></p>
                                <p className="text-xs mt-1">({getRiskLevelName(data.y)})</p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      name="Executives" 
                      data={scatterData} 
                      fill="#8884d8"
                      shape={(props) => {
                        const { cx, cy, fill } = props;
                        const risk = props.payload.y;
                        let color = fill;
                        
                        // Dynamically color the dots based on risk level
                        if (risk <= 1) color = "#10b981"; // green
                        else if (risk <= 2) color = "#34d399"; // emerald
                        else if (risk <= 3) color = "#facc15"; // yellow
                        else if (risk <= 4) color = "#f97316"; // orange
                        else color = "#ef4444"; // red
                        
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={10} 
                            stroke="#fff" 
                            strokeWidth={1} 
                            fill={color} 
                            fillOpacity={0.7} 
                          />
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bubble" className="space-y-4">
          <EnhancedVisualization
            type="bubble"
            data={bubbleChartData}
            title="Executive Risk Bubble Chart"
            description="Size of bubble represents number of decisions made"
            config={{
              xAxisName: "Executive",
              yAxisName: "Risk Level",
              zAxisName: "Decision Count"
            }}
          />
        </TabsContent>
        
        <TabsContent value="heatmap" className="space-y-4">
          <EnhancedVisualization
            type="heatmap"
            data={heatmapData}
            title="Risk Heatmap"
            description="Color intensity represents risk level (blue = conservative, red = bold)"
            config={{ min: 0, max: 100 }}
          />
        </TabsContent>
        
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Risk Profile Table</CardTitle>
              <CardDescription>Detailed breakdown of risk levels by executive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Executive</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Decisions</th>
                      <th className="py-3 px-4 text-left">Avg Risk</th>
                      <th className="py-3 px-4 text-left">Risk Profile</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskData
                      .sort((a, b) => b.averageRisk - a.averageRisk)
                      .map((executive, index) => (
                        <tr key={index} className="border-b hover:bg-secondary/10">
                          <td className="py-3 px-4">
                            <Link 
                              to={`/dashboard/executives/${encodeURIComponent(executive.executiveName)}`}
                              className="hover:underline hover:text-primary font-medium"
                            >
                              {executive.executiveName}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{executive.executiveRole}</td>
                          <td className="py-3 px-4">{executive.decisionCount}</td>
                          <td className={`py-3 px-4 font-medium ${getRiskColor(executive.averageRisk)}`}>
                            {executive.averageRisk}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-16 h-2 rounded-full" 
                                style={{ 
                                  background: `linear-gradient(90deg, #10b981 0%, #facc15 50%, #ef4444 100%)`,
                                  position: 'relative'
                                }}
                              >
                                <div 
                                  className="absolute w-2 h-3 bg-white border rounded-full top-[-2px]"
                                  style={{ 
                                    left: `${(executive.averageRisk / 5) * 100 - 5}%`,
                                    transform: 'translateX(-50%)'
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {getRiskLevelName(executive.averageRisk)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/dashboard/executives/${encodeURIComponent(executive.executiveName)}`}>
                                View Profile
                              </Link>
                            </Button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Risk Executive</CardTitle>
          </CardHeader>
          <CardContent>
            {riskData.length > 0 ? (
              <div>
                <div className="text-2xl font-bold">
                  {riskData.sort((a, b) => b.averageRisk - a.averageRisk)[0].executiveName}
                </div>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="text-red-500 mr-1 h-4 w-4" />
                  <span className={`${getRiskColor(riskData.sort((a, b) => b.averageRisk - a.averageRisk)[0].averageRisk)}`}>
                    {riskData.sort((a, b) => b.averageRisk - a.averageRisk)[0].averageRisk} risk score
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No data available</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Team Risk</CardTitle>
          </CardHeader>
          <CardContent>
            {riskData.length > 0 ? (
              <div>
                <div className="text-2xl font-bold">
                  {(riskData.reduce((acc, item) => acc + item.averageRisk, 0) / riskData.length).toFixed(2)}
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {getRiskLevelName(riskData.reduce((acc, item) => acc + item.averageRisk, 0) / riskData.length)}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No data available</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Conservative Executive</CardTitle>
          </CardHeader>
          <CardContent>
            {riskData.length > 0 ? (
              <div>
                <div className="text-2xl font-bold">
                  {riskData.sort((a, b) => a.averageRisk - b.averageRisk)[0].executiveName}
                </div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                  <span className={`${getRiskColor(riskData.sort((a, b) => a.averageRisk - b.averageRisk)[0].averageRisk)}`}>
                    {riskData.sort((a, b) => a.averageRisk - b.averageRisk)[0].averageRisk} risk score
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
