import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function ImplementationTabs({ activeTab, onTabChange }) {
    return (<Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
      </TabsList>
    </Tabs>);
}
