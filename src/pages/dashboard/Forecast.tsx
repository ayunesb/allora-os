
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { useForecastData } from "@/hooks/useForecastData";
import ForecastAnomalies from "@/components/forecast/ForecastAnomalies";
import ForecastCards from "@/components/forecast/ForecastCards";
import ForecastCharts from "@/components/forecast/ForecastCharts";

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
  const {
    kpiData,
    forecasts,
    anomalies,
    recommendations,
    loading,
    refreshing,
    handleRefresh
  } = useForecastData();

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
          <ForecastAnomalies 
            anomalies={anomalies} 
            recommendations={recommendations} 
            kpiNames={KPI_NAMES} 
          />

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
                  <ForecastCards 
                    forecasts={forecasts} 
                    kpiData={kpiData} 
                    anomalies={anomalies}
                    kpiNames={KPI_NAMES}
                  />
                </TabsContent>
                
                <TabsContent value="charts">
                  <ForecastCharts 
                    forecasts={forecasts} 
                    kpiData={kpiData}
                    kpiNames={KPI_NAMES}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
