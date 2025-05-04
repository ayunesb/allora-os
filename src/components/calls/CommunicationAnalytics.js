import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// Helper function to get week number from date
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
export default function CommunicationAnalytics({ communications, isLoading }) {
    const [timeframe, setTimeframe] = useState("month");
    // Data processing for analytics
    // Communication types breakdown
    const typeBreakdown = communications.reduce((acc, comm) => {
        acc[comm.type] = (acc[comm.type] || 0) + 1;
        return acc;
    }, {});
    const typeData = Object.entries(typeBreakdown).map(([name, value]) => ({
        name,
        value,
    }));
    // Communication outcomes breakdown
    const outcomeBreakdown = communications.reduce((acc, comm) => {
        const outcome = comm.outcome || 'no_outcome';
        acc[outcome] = (acc[outcome] || 0) + 1;
        return acc;
    }, {});
    const outcomeData = Object.entries(outcomeBreakdown).map(([name, value]) => ({
        name: name === 'no_outcome' ? 'No Outcome' : name.replace('_', ' '),
        value,
    }));
    // Communication trends over time
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    // Weekly trend data
    const weeklyTrendData = Array.from({ length: 12 }, (_, i) => {
        const weekNumber = getWeekNumber(now) - 11 + i;
        return {
            name: `W${weekNumber > 0 ? weekNumber : 52 + weekNumber}`,
            calls: 0,
            messages: 0,
            meetings: 0,
        };
    });
    communications.forEach(comm => {
        const date = new Date(comm.ended_at || comm.created_at);
        const weekDiff = getWeekNumber(now) - getWeekNumber(date);
        if (weekDiff >= 0 && weekDiff < 12) {
            const index = 11 - weekDiff;
            if (comm.type === 'phone') {
                weeklyTrendData[index].calls++;
            }
            else if (comm.type === 'whatsapp') {
                weeklyTrendData[index].messages++;
            }
            else if (comm.type === 'zoom') {
                weeklyTrendData[index].meetings++;
            }
        }
    });
    // Monthly trend data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyTrendData = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - 5 + i + 12) % 12;
        return {
            name: monthNames[monthIndex],
            calls: 0,
            messages: 0,
            meetings: 0,
        };
    });
    communications.forEach(comm => {
        const date = new Date(comm.ended_at || comm.created_at);
        const monthDiff = (currentYear - date.getFullYear()) * 12 + currentMonth - date.getMonth();
        if (monthDiff >= 0 && monthDiff < 6) {
            const index = 5 - monthDiff;
            if (comm.type === 'phone') {
                monthlyTrendData[index].calls++;
            }
            else if (comm.type === 'whatsapp') {
                monthlyTrendData[index].messages++;
            }
            else if (comm.type === 'zoom') {
                monthlyTrendData[index].meetings++;
            }
        }
    });
    // Display the correct trend data based on timeframe
    const trendData = timeframe === 'week' ? weeklyTrendData : monthlyTrendData;
    // Colors for charts
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];
    // Lead engagement data - Dummy data for now
    const leadEngagementData = [
        { name: '1 touch', value: communications.filter(c => c.lead_id).length },
        { name: '2-3 touches', value: Math.floor(communications.filter(c => c.lead_id).length * 0.6) },
        { name: '4-6 touches', value: Math.floor(communications.filter(c => c.lead_id).length * 0.3) },
        { name: '7+ touches', value: Math.floor(communications.filter(c => c.lead_id).length * 0.1) },
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Communication Trends</CardTitle>
          <CardDescription>View trends across communication channels</CardDescription>
          <div className="flex gap-2">
            <Button variant={timeframe === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setTimeframe('week')}>
              Weekly
            </Button>
            <Button variant={timeframe === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setTimeframe('month')}>
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (<Skeleton className="w-full h-full"/>) : (<ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" stroke="#8884d8" name="Phone Calls"/>
                <Line type="monotone" dataKey="messages" stroke="#82ca9d" name="WhatsApp"/>
                <Line type="monotone" dataKey="meetings" stroke="#ffc658" name="Zoom Meetings"/>
              </LineChart>
            </ResponsiveContainer>)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Communication Types</CardTitle>
          <CardDescription>Breakdown by communication channel</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (<Skeleton className="w-full h-full"/>) : (<ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {typeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>)}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#0088FE]"></div>
            <span className="text-xs">Phone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#00C49F]"></div>
            <span className="text-xs">WhatsApp</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FFBB28]"></div>
            <span className="text-xs">Zoom</span>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Outcomes Analysis</CardTitle>
          <CardDescription>Conversion metrics from communications</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (<Skeleton className="w-full h-full"/>) : (<ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={outcomeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Count" fill="#8884d8"/>
              </ReBarChart>
            </ResponsiveContainer>)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lead Engagement</CardTitle>
          <CardDescription>Number of touchpoints per lead</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (<Skeleton className="w-full h-full"/>) : (<ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={leadEngagementData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {leadEngagementData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>)}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            The more touchpoints with a lead, the higher the conversion rate typically is.
          </p>
        </CardFooter>
      </Card>
    </div>);
}
