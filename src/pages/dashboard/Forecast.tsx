
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart } from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, RefreshCw, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trainMultiForecastModels, forecastMultipleFuture } from "@/agents/forecaster";
import { detectAnomalies, getAnomalyRecommendations, Anomaly, ThresholdConfig } from "@/agents/anomalyDetector";
import { toast } from "sonner";

// Default thresholds for different KPI types
const DEFAULT_THRESHOLDS: Record<string, ThresholdConfig> = {
  revenue: { min: 50000, max: 1000000 },
  churn: { min: 0, max: 0.2 },
  user_growth: { min: 100, max: 10000 },
  retention: { min: 0.6, max: 1.0 },
  conversion_rate: { min: 0.02, max: 0.2 },
  executive_resources: { min: 50, max: 450 }
};

// KPI display names
const KPI_NAMES: Record<string, string> = {
  revenue: "Revenue",
  churn: "Churn Rate",
  user_growth: "User Growth",
  retention: "Retention Rate",
  conversion_rate: "Conversion Rate",
  executive_resources: "Executive Resources"
};

export default function ForecastDashboard() {
  const [kpiData, setKpiData] = useState<Record<string, number[]>>({});
  const [forecasts, setForecasts] = useState<Record<string, number>>({});
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch KPI data and generate forecasts
  const fetchAndForecast = async () => {
    try {
      setLoading(true);
      
      // Get KPI types to forecast
      const types = ["revenue", "churn", "user_growth", "executive_resources"];
      const dataMap: Record<string, number[]> = {};

      // Fetch historical data for each KPI type
      for (const type of types) {
        let data;
        
        if (type === "executive_resources") {
          // Fetch executive resource history from the new table
          const { data: resourceHistory, error } = await supabase
            .from("executive_resource_history")
            .select("resource_points, created_at")
            .order("created_at", { ascending: true });
          
          if (!error && resourceHistory && resourceHistory.length > 0) {
            data = resourceHistory.map(entry => entry.resource_points);
          }
        } else {
          // Fetch regular KPI data from kpi_history
          const { data: kpiHistory, error } = await supabase
            .from("kpi_history")
            .select("*")
            .eq("type", type)
            .order("timestamp", { ascending: true });
          
          if (!error && kpiHistory && kpiHistory.length > 0) {
            data = kpiHistory.map(entry => entry.value);
          }
        }
        
        // If we have data, add it to our map
        if (data && data.length) {
          dataMap[type] = data;
        } else {
          // Generate synthetic data for demo purposes
          dataMap[type] = generateSyntheticData(type, 12);
        }
      }
      
      // Store the KPI data
      setKpiData(dataMap);
      
      // Train models for each KPI type
      const models = await trainMultiForecastModels(dataMap);
      
      // Generate forecasts
      const nextX = Math.max(...Object.values(dataMap).map(arr => arr.length));
      const multiForecast = await forecastMultipleFuture(models, nextX);
      
      // Store the forecasts
      setForecasts(multiForecast);
      
      // Detect anomalies
      const detectedAnomalies = detectAnomalies(multiForecast, DEFAULT_THRESHOLDS);
      setAnomalies(detectedAnomalies);
      
      // Generate recommendations
      const anomalyRecommendations = getAnomalyRecommendations(detectedAnomalies);
      setRecommendations(anomalyRecommendations);
      
    } catch (error) {
      console.error("Error in forecast generation:", error);
      toast.error("Failed to generate forecasts. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Generate synthetic data for demo purposes
  const generateSyntheticData = (type: string, count: number): number[] => {
    const data: number[] = [];
    let base = 0;
    
    switch (type) {
      case "revenue":
        base = 100000;
        for (let i = 0; i < count; i++) {
          data.push(base + Math.random() * 20000 - 10000); 
        }
        break;
      case "churn":
        base = 0.05;
        for (let i = 0; i < count; i++) {
          data.push(base + Math.random() * 0.06 - 0.03); 
        }
        break;
      case "user_growth":
        base = 500;
        for (let i = 0; i < count; i++) {
          data.push(base + Math.random() * 300 - 150); 
        }
        break;
      case "executive_resources":
        base = 200;
        for (let i = 0; i < count; i++) {
          data.push(base + Math.random() * 60 - 30); 
        }
        break;
      default:
        for (let i = 0; i < count; i++) {
          data.push(Math.random() * 100); 
        }
    }
    
    return data;
  };

  // Refresh forecasts
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAndForecast();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAndForecast();
  }, []);

  // Format data for charts
  const getChartData = (kpiType: string) => {
    const data = kpiData[kpiType] || [];
    const chartData = data.map((value, index) => ({
      period: `Period ${index + 1}`,
      value
    }));
    
    // Add forecast point if available
    if (forecasts[kpiType]) {
      chartData.push({
        period: `Forecast`,
        value: forecasts[kpiType],
        isForecast: true
      });
    }
    
    return chartData;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle 
          title="KPI Forecasts & Anomaly Detection" 
          description="Predictive analytics and early warning system for key performance indicators"
        />
        <Button 
          onClick={handleRefresh} 
          disabled={loading || refreshing}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Forecasts</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Training forecast models...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Anomalies Section */}
          {anomalies.length > 0 && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <AlertTriangle />
                  <span>Anomalies Detected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {anomalies.map((anomaly) => (
                    <Alert key={anomaly.kpi} variant={anomaly.severity === "critical" ? "destructive" : "warning"}>
                      <AlertTitle className="flex items-center gap-2">
                        {anomaly.issue === "Too High" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="capitalize">{KPI_NAMES[anomaly.kpi] || anomaly.kpi}</span>
                        <Badge variant={anomaly.severity === "critical" ? "destructive" : "outline"}>
                          {anomaly.severity}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription>
                        <p>Current forecast: {anomaly.value.toFixed(2)}</p>
                        <p>Issue: {anomaly.issue}</p>
                        {recommendations[anomaly.kpi] && (
                          <p className="mt-2 text-sm font-medium">
                            Recommendation: {recommendations[anomaly.kpi]}
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* KPI Forecasts Section */}
          <Card>
            <CardHeader>
              <CardTitle>KPI Forecasts</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cards">
                <TabsList className="mb-4">
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cards">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(forecasts).map((kpi) => {
                      const isAnomaly = anomalies.some(a => a.kpi === kpi);
                      const anomalyInfo = anomalies.find(a => a.kpi === kpi);
                      
                      return (
                        <Card key={kpi} className={isAnomaly ? 'border-yellow-500/50' : ''}>
                          <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center text-lg">
                              <span>{KPI_NAMES[kpi] || kpi}</span>
                              {isAnomaly && (
                                <Badge variant={anomalyInfo?.severity === "critical" ? "destructive" : "warning"}>
                                  {anomalyInfo?.issue}
                                </Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col gap-2">
                              <div className="text-2xl font-bold">
                                {kpi === 'churn' || kpi === 'retention' || kpi === 'conversion_rate'
                                  ? `${(forecasts[kpi] * 100).toFixed(1)}%` 
                                  : kpi === 'revenue' 
                                    ? `$${Math.round(forecasts[kpi]).toLocaleString()}`
                                    : Math.round(forecasts[kpi]).toLocaleString()
                                }
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Based on {kpiData[kpi]?.length || 0} historical data points
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="charts">
                  <div className="grid gap-6">
                    {Object.keys(forecasts).map((kpi) => {
                      const chartData = getChartData(kpi);
                      return (
                        <Card key={kpi}>
                          <CardHeader>
                            <CardTitle>{KPI_NAMES[kpi] || kpi}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-60">
                              {/* Placeholder for chart - in a real implementation we would use recharts */}
                              <div className="bg-gray-100 dark:bg-gray-800 h-full w-full rounded flex items-center justify-center">
                                <p>Chart visualization for {KPI_NAMES[kpi] || kpi}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
