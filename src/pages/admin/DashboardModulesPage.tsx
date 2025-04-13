
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardModulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Modules</h1>
      <p className="text-muted-foreground">
        Configure and manage dashboard modules and components.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Module Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dashboard module management interface will be displayed here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Layout Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure dashboard layouts and positioning here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
