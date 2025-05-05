import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const UserActivityGraph = () => {
    // Sample data - would typically come from an API
    const activityData = [
        { day: 'Monday', count: 12 },
        { day: 'Tuesday', count: 19 },
        { day: 'Wednesday', count: 15 },
        { day: 'Thursday', count: 25 },
        { day: 'Friday', count: 20 },
        { day: 'Saturday', count: 8 },
        { day: 'Sunday', count: 5 },
    ];
    return (<Card className="h-full">
      <CardHeader>
        <CardTitle>Weekly User Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
        }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>);
};
export default UserActivityGraph;
