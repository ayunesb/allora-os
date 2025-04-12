
import React from "react";
import { Card } from "@/components/ui/card";
// We're removing the non-existent import and using what's available

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-muted-foreground">Manage users and permissions</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">API Key Management</h2>
          <p className="text-muted-foreground">Create and manage API keys</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Webhook Management</h2>
          <p className="text-muted-foreground">Configure and monitor webhooks</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Company Settings</h2>
          <p className="text-muted-foreground">Manage company-wide settings</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Launch Plan</h2>
          <p className="text-muted-foreground">Manage platform launch</p>
        </Card>
      </div>
    </div>
  );
}
