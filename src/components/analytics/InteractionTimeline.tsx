
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface InteractionTimelineProps {
  data: Array<{
    date: string;
    count: number;
    type: string;
  }>;
}

const InteractionTimeline: React.FC<InteractionTimelineProps> = ({ data }) => {
  // Transform data to group by date and type
  const chartData = useMemo(() => {
    const groupedData: Record<string, Record<string, number>> = {};
    
    data.forEach(item => {
      if (!groupedData[item.date]) {
        groupedData[item.date] = {};
      }
      
      const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      groupedData[item.date][type] = (groupedData[item.date][type] || 0) + item.count;
    });
    
    return Object.entries(groupedData).map(([date, types]) => ({
      date,
      ...types
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  // Get unique types for the bars
  const uniqueTypes = useMemo(() => {
    const types = new Set<string>();
    data.forEach(item => {
      const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      types.add(type);
    });
    return Array.from(types);
  }, [data]);

  // Colors for different action types
  const typeColors: Record<string, string> = {
    View: "#8B5CF6",
    Create: "#10B981",
    Update: "#F97316",
    Delete: "#EC4899"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Interaction Timeline
        </CardTitle>
        <CardDescription>
          Your activity patterns over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              {uniqueTypes.map(type => (
                <Bar 
                  key={type} 
                  dataKey={type} 
                  stackId="a" 
                  fill={typeColors[type] || "#8884d8"} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            No interaction data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractionTimeline;
