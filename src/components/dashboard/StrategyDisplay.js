import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";
export default function StrategyDisplay() {
    return (<Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <GitBranch className="mr-2 h-5 w-5 text-primary"/>
          Strategy Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Your current business strategies are focused on market expansion and customer retention.
          The AI executive team has provided insights based on your company profile.
        </p>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-primary/10 rounded-md">
            <h4 className="font-medium text-sm">Market Penetration</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Focus on existing markets with current products to increase market share.
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-md">
            <h4 className="font-medium text-sm">Product Development</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Develop new products for existing markets based on customer feedback.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>);
}
// Export the component as a named export as well for backward compatibility
export { StrategyDisplay };
