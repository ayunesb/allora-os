
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminModuleGrid } from "@/components/admin/dashboard/AdminModuleGrid";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { StatsRow } from "@/components/admin/dashboard/StatsRow";
import { StatItem } from "@/components/admin/dashboard/StatsRow";

export default function AdminDashboard() {
  // Sample stats data for StatsRow
  const sampleStats: StatItem[] = [
    { name: "Total Users", value: "1,234", change: "+12.5%", up: true },
    { name: "Active Companies", value: "78", change: "+8.3%", up: true },
    { name: "Monthly Revenue", value: "$24,500", change: "+15.2%", up: true },
    { name: "Conversion Rate", value: "3.2%", change: "-0.5%", up: false }
  ];

  return (
    <div className="space-y-6">
      {/* AdminHeader component doesn't accept title/description props directly */}
      <AdminHeader />
      
      {/* Provide required stats and isLoading props */}
      <StatsRow stats={sampleStats} isLoading={false} />
      
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
