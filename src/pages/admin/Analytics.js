import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function Analytics() {
    return (<div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            View business performance metrics and visualization data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Analytics content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>);
}
