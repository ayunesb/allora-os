
import React from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForecastChart } from "@/components/forecasting/ForecastChart";
import { ForecastMetrics } from "@/components/forecasting/ForecastMetrics";
import { ForecastScenarios } from "@/components/forecasting/ForecastScenarios";
import { useForecastData } from "@/hooks/useForecastData";

export default function Forecast() {
  const { data, isLoading, error } = useForecastData();
  
  return (
    <div className="container mx-auto p-4">
      <PageTitle title="Financial Forecast" description="Projected financial performance">
        Financial Forecast
      </PageTitle>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastChart 
                data={data?.revenue} 
                isLoading={isLoading}
                error={error}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scenarios" className="space-y-4">
          <ForecastScenarios 
            scenarios={data?.scenarios}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4">
          <ForecastMetrics 
            metrics={data?.metrics}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
