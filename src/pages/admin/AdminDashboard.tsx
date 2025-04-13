
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminModuleGrid } from "@/components/admin/dashboard/AdminModuleGrid";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { StatsRow } from "@/components/admin/dashboard/StatsRow";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Admin Dashboard" 
        description="Manage your Allora AI platform settings and configurations"
      />
      
      <StatsRow />
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Modules</CardTitle>
          <CardDescription>
            Access various administrative tools and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminModuleGrid />
        </CardContent>
      </Card>
    </div>
  );
}
