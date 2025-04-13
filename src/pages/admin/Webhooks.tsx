
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Webhooks() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Webhook Management</CardTitle>
          <CardDescription>
            Configure integrations with external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Webhook configuration content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
