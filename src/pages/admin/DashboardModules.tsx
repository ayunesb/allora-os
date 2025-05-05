import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function DashboardModules() {
    return (<div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Modules</CardTitle>
          <CardDescription>
            Configure dashboard components and user experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dashboard module configuration content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>);
}
