import React from "react";
import { PageTitle } from "@/components/ui/page-title";
export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-6">
      <PageTitle
        title="Admin Dashboard"
        description="Manage your platform settings"
      >
        Admin Dashboard
      </PageTitle>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-medium">User Management</h3>
          <p className="text-muted-foreground">Manage users and permissions</p>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-medium">System Settings</h3>
          <p className="text-muted-foreground">Configure global settings</p>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-medium">Analytics</h3>
          <p className="text-muted-foreground">View platform analytics</p>
        </div>
      </div>
    </div>
  );
}
