import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
const InteractionTimeline = ({ data }) => {
    return (<Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary"/>
          Interaction Timeline
        </CardTitle>
        <CardDescription>
          Pattern of engagement with AI executives over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <AnalyticsChart title="" description="" chartType="area" data={data} dataKeys={["value"]} colors={["#8B5CF6"]} xAxisDataKey="date"/>
        </div>
      </CardContent>
    </Card>);
};
export default InteractionTimeline;
