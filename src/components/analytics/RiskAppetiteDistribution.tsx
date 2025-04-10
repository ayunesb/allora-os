
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";

interface RiskAppetiteDistributionProps {
  data: any[];
}

const RiskAppetiteDistribution: React.FC<RiskAppetiteDistributionProps> = ({ data }) => {
  // Colors for chart
  const COLORS = ["#10B981", "#F97316", "#8B5CF6"];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Risk Appetite Distribution
        </CardTitle>
        <CardDescription>
          Analysis of risk tolerance across different business areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <AnalyticsChart 
            title=""
            description=""
            chartType="radialBar"
            data={data}
            dataKeys={["value"]}
            colors={COLORS}
            nameKey="name"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAppetiteDistribution;
