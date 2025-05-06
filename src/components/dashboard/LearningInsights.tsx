import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
export default function LearningInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          Learning Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Based on your recent interactions, we've identified potential areas
          for growth in your marketing strategy and customer engagement
          approach.
        </p>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-primary/10 rounded-md">
            <h4 className="font-medium text-sm">Content Marketing</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Your audience engages 2.5x more with video content compared to
              written posts.
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-md">
            <h4 className="font-medium text-sm">Lead Response Time</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Responding within 1 hour increases conversion rate by 37% based on
              your data.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// Export the component as a named export as well for backward compatibility
export { LearningInsights };
