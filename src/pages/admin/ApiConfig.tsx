
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiConfig() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Manage API keys and external service connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>API configuration content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
