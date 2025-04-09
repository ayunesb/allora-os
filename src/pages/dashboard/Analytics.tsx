
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, LineChart, Pie, Bar, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Brain, TrendingUp, Calendar, Activity, BarChart3, PieChart as PieChartIcon, Users, Target } from "lucide-react";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import StatsCard from "@/components/analytics/StatsCard";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
import InteractionTimeline from "@/components/analytics/InteractionTimeline";
import RiskAppetiteDistribution from "@/components/analytics/RiskAppetiteDistribution";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { getInsights, getRecommendations } = useSelfLearning();
  const [analyticsData, setAnalyticsData] = useState<any>({
    insights: [],
    recommendations: {
      strategies: [],
      executives: [],
      topics: []
    },
    activityData: []
  });

  // Load analytics data on mount
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Function to fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch insights and recommendations from the self-learning engine
      const [insights, recommendations] = await Promise.all([
        getInsights(),
        getRecommendations()
      ]);
      
      // Generate some mock activity data for the timeline
      // This could be replaced with actual user action data in the future
      const mockActivityData = generateMockActivityData();
      
      setAnalyticsData({
        insights,
        recommendations,
        activityData: mockActivityData
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to load analytics data. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const generateMockActivityData = () => {
    const activityTypes = ["view", "create", "update", "delete"];
    const now = new Date();
    
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(now.getDate() - 29 + i);
      
      return {
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
        type: activityTypes[Math.floor(Math.random() * activityTypes.length)]
      };
    });
  };

  // Extract data for risk appetite distribution
  const riskData = [
    { name: "Low Risk", value: 0 },
    { name: "Medium Risk", value: 0 },
    { name: "High Risk", value: 0 }
  ];
  
  // Find the risk appetite insight
  const riskAppetiteInsight = analyticsData.insights.find(
    (insight: any) => insight.title === "Risk Appetite"
  );
  
  // Update the corresponding value in the riskData array
  if (riskAppetiteInsight) {
    const riskValue = riskAppetiteInsight.value.toLowerCase();
    const riskIndex = riskData.findIndex(item => 
      item.name.toLowerCase().includes(riskValue)
    );
    
    if (riskIndex !== -1) {
      riskData[riskIndex].value = 1;
    }
  }

  // Colors for charts
  const COLORS = ["#8B5CF6", "#EC4899", "#F97316", "#10B981"];

  // Prepare data for the interaction timeline
  const timelineData = analyticsData.activityData
    .reduce((acc: any[], item: any) => {
      const existingItem = acc.find(x => x.date === item.date);
      if (existingItem) {
        existingItem.count += item.count;
      } else {
        acc.push({ date: item.date, count: item.count });
      }
      return acc;
    }, [])
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Prepare activity type distribution data
  const activityTypeData = analyticsData.activityData
    .reduce((acc: any, item: any) => {
      const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      const existingItem = acc.find((x: any) => x.name === type);
      if (existingItem) {
        existingItem.value += item.count;
      } else {
        acc.push({ name: type, value: item.count });
      }
      return acc;
    }, []);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchAnalyticsData}
          disabled={isRefreshing}
        >
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <p className="text-xl text-gray-300 mb-6">
        Track your usage patterns and see how Allora AI learns from your actions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {analyticsData.insights.map((insight: any, index: number) => (
          <StatsCard
            key={index}
            title={insight.title}
            value={insight.value}
            description={insight.description}
            icon={
              insight.title === "Behavioral Pattern" ? Brain :
              insight.title === "Risk Appetite" ? TrendingUp :
              insight.title === "Learning Progress" ? Activity :
              Calendar
            }
          />
        ))}
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsChart 
              title="Activity Over Time"
              description="Your platform usage in the last 30 days"
              chartType="line"
              data={timelineData}
              dataKeys={["count"]}
              colors={["#8B5CF6"]}
              xAxisDataKey="date"
            />
            
            <AnalyticsChart 
              title="Activity Type Distribution"
              description="Breakdown of your different interactions"
              chartType="pie"
              data={activityTypeData}
              dataKeys={["value"]}
              colors={COLORS}
              nameKey="name"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskAppetiteDistribution data={riskData} />
            <InteractionTimeline data={analyticsData.activityData} />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Learning Progress
              </CardTitle>
              <CardDescription>
                How the AI system is adapting to your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.insights.length > 0 ? (
                  <ul className="space-y-2">
                    {analyticsData.insights.map((insight: any, index: number) => (
                      <li key={index} className="flex justify-between p-2 border-b border-border/30">
                        <span className="font-medium">{insight.title}</span>
                        <span className="text-primary">{insight.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Continue using the platform to generate learning insights
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Based on your usage patterns and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Recommended Strategies</h3>
                  {analyticsData.recommendations.strategies.length > 0 ? (
                    <ul className="space-y-2">
                      {analyticsData.recommendations.strategies.map((strategy: any, index: number) => (
                        <li key={index} className="p-3 bg-accent/30 rounded-md">
                          <div className="font-medium">{strategy.title}</div>
                          <div className="text-sm text-muted-foreground">{strategy.description}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No strategy recommendations yet</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferred Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData.recommendations.topics.length > 0 ? (
                      analyticsData.recommendations.topics.map((topic: string, index: number) => (
                        <div key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                          {topic}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No topic preferences detected yet</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferred Executives</h3>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData.recommendations.executives.length > 0 ? (
                      analyticsData.recommendations.executives.map((executive: string, index: number) => (
                        <div key={index} className="px-3 py-1 bg-secondary/40 rounded-full text-sm">
                          {executive}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No executive preferences detected yet</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
