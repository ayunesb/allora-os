
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { toast } from "sonner";
import { CampaignAnalytics } from "@/components/campaigns/CampaignAnalytics";

// Import our components
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsInsightCards from "@/components/analytics/AnalyticsInsightCards";
import OverviewTabContent from "@/components/analytics/OverviewTabContent";
import BehaviorTabContent from "@/components/analytics/BehaviorTabContent";
import RecommendationsTabContent from "@/components/analytics/RecommendationsTabContent";
import { PredictiveAnalytics } from "@/components/analytics/PredictiveAnalytics";
import { CustomReportBuilder } from "@/components/analytics/CustomReportBuilder";
import { EnhancedVisualization } from "@/components/analytics/EnhancedVisualizations";

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

  // Sample data for funnel analysis
  const funnelData = [
    { name: "Website Visitors", value: 5800 },
    { name: "Lead Captures", value: 2200 },
    { name: "Qualified Leads", value: 1300 },
    { name: "Proposals Sent", value: 700 },
    { name: "Negotiations", value: 350 },
    { name: "Closed Deals", value: 180 }
  ];

  // Sample data for heatmap (engagement by weekday/hour)
  const generateHeatmapData = () => {
    const data = [];
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    for (const weekday of weekdays) {
      for (const hour of hours) {
        data.push({
          name: `${weekday} ${hour}:00`,
          weekday,
          hour,
          value: Math.floor(Math.random() * 100)
        });
      }
    }
    return data;
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <AnalyticsHeader isRefreshing={isRefreshing} onRefresh={fetchAnalyticsData} />

      <p className="text-xl text-gray-300 mb-6">
        Track your usage patterns and see how Allora AI learns from your actions
      </p>

      <AnalyticsInsightCards insights={analyticsData.insights} />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Analytics</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <OverviewTabContent
            timelineData={timelineData}
            activityTypeData={activityTypeData}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <EnhancedVisualization
              type="funnel"
              data={funnelData}
              title="Lead Conversion Funnel"
              description="Visualization of your lead conversion pipeline"
            />
            <EnhancedVisualization
              type="treemap"
              data={[
                { name: "Marketing", value: 40 },
                { name: "Sales", value: 25 },
                { name: "Product", value: 15 },
                { name: "Support", value: 10 },
                { name: "Operations", value: 8 },
                { name: "Finance", value: 2 }
              ]}
              title="Budget Allocation"
              description="Current budget distribution across departments"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          <BehaviorTabContent
            insights={analyticsData.insights}
            riskData={riskData}
            activityData={analyticsData.activityData}
          />
          
          <div className="grid grid-cols-1 gap-6 mt-6">
            <EnhancedVisualization
              type="heatmap"
              data={generateHeatmapData()}
              title="User Engagement Heatmap"
              description="Engagement patterns by time of day and day of week"
              config={{ min: 0, max: 100 }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsTabContent recommendations={analyticsData.recommendations} />
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6">
          <CampaignAnalytics 
            campaignName="Current Marketing Campaign" 
            isComparison={true}
          />
        </TabsContent>
        
        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics onRefresh={fetchAnalyticsData} />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <CustomReportBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
