
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface RiskAppetiteDistributionProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const RiskAppetiteDistribution: React.FC<RiskAppetiteDistributionProps> = ({ data }) => {
  // Colors for different risk levels
  const COLORS = ["#10B981", "#F97316", "#EC4899"];
  
  // Filter out risk levels with 0 value if there's at least one non-zero value
  const hasValues = data.some(item => item.value > 0);
  const chartData = hasValues ? data.filter(item => item.value > 0) : data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Risk Appetite
        </CardTitle>
        <CardDescription>
          Your preferred risk level based on decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RiskAppetiteDistribution;
