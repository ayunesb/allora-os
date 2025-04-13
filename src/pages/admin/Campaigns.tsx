
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>
            Manage marketing campaigns across different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Campaign management content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
