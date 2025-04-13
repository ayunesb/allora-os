
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemService } from './SystemHealthPage';
import OverviewTab from './tabs/OverviewTab';
import ServicesTab from './tabs/ServicesTab';
import AlertsTab from './tabs/AlertsTab';

interface SystemHealthTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  services: SystemService[];
  systemHealth: {
    status: 'healthy' | 'degraded' | 'down';
    percentage: number;
  };
}

export default function SystemHealthTabs({ 
  activeTab, 
  onTabChange, 
  services,
  systemHealth
}: SystemHealthTabsProps) {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab services={services} />
      </TabsContent>
      
      <TabsContent value="services">
        <ServicesTab services={services} />
      </TabsContent>
      
      <TabsContent value="alerts">
        <AlertsTab />
      </TabsContent>
    </Tabs>
  );
}
