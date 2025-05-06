import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import SystemHealthPage from "@/pages/admin/system-health/SystemHealthPage";
import ProductionDataPage from "./ProductionDataPage";
export default function SystemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.hash ? location.hash.substring(1) : "health";
  const handleTabChange = (value) => {
    navigate({ hash: value });
  };
  return (
    <div className="container py-6 max-w-7xl mx-auto">
      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="production">Production Data</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="mt-0">
          <SystemHealthPage />
        </TabsContent>

        <TabsContent value="production" className="mt-0">
          <ProductionDataPage />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Security Settings
            </h2>
            <p className="text-muted-foreground">
              This page is under construction
            </p>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-0">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
            <p className="text-muted-foreground">
              This page is under construction
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
