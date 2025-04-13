
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage users, permissions, and roles for your Allora AI platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>User management content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
