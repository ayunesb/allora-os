
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

const StrategyAdoption: React.FC = () => {
  // Sample data - would come from an API in a real application
  const strategyData = [
    { name: 'High Risk', value: 20, color: 'var(--risk-high-DEFAULT, #ea384c)' },
    { name: 'Medium Risk', value: 45, color: 'var(--risk-medium-DEFAULT, #f97316)' },
    { name: 'Low Risk', value: 35, color: 'var(--risk-low-DEFAULT, #0ea5e9)' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Strategy Adoption</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={strategyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {strategyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyAdoption;
