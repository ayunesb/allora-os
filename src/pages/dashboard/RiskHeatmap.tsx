import React, { useState, useEffect } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import RiskHeatmapChart from "@/components/risk/RiskHeatmapChart";
// import RiskFactorsList from "@/components/risk/RiskFactorsList";
import RiskMitigationTable from "@/components/risk/RiskMitigationTable";
import { useRiskData } from "@/hooks/useRiskData";

export default function RiskHeatmap() {
  const [activeTab, setActiveTab] = useState("heatmap");
  const { riskData, isLoading, error, refreshData } = useRiskData();
  
  useEffect(() => {
    // Load risk data on component mount
    refreshData();
  }, [refreshData]);
  
  const handleExportData = () => {
    // Implementation for exporting risk data
    console.log("Exporting risk data...");
    
    // Create a JSON blob and trigger download
    const dataStr = JSON.stringify(riskData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `risk-heatmap-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="container mx-auto p-4">
      <PageTitle title="Risk Heatmap" description="Visualize risk factors across your strategies">
        Risk Heatmap
      </PageTitle>
      
      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Plans</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <TabsContent value="heatmap" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-80">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">
                Error loading risk data: {error}
              </div>
            ) : (
              <RiskHeatmapChart data={riskData?.heatmapData || []} />
            )}
          </TabsContent>
          
          <TabsContent value="factors" className="mt-0">
            {/* <RiskFactorsList factors={riskData?.factors || []} isLoading={isLoading} /> */}
          </TabsContent>
          
          <TabsContent value="mitigation" className="mt-0">
            <RiskMitigationTable plans={riskData?.mitigationPlans || []} isLoading={isLoading} />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
