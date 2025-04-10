
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { toast } from "sonner";

// Import our new components
import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import AnalyticsInsightCards from "@/components/analytics/AnalyticsInsightCards";
import OverviewTabContent from "@/components/analytics/OverviewTabContent";
import BehaviorTabContent from "@/components/analytics/BehaviorTabContent";
import RecommendationsTabContent from "@/components/analytics/RecommendationsTabContent";

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

  return (
    <div className="animate-fadeIn space-y-6">
      <AnalyticsHeader isRefreshing={isRefreshing} onRefresh={fetchAnalyticsData} />

      <p className="text-xl text-gray-300 mb-6">
        Track your usage patterns and see how Allora AI learns from your actions
      </p>

      <AnalyticsInsightCards insights={analyticsData.insights} />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <OverviewTabContent
            timelineData={timelineData}
            activityTypeData={activityTypeData}
          />
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          <BehaviorTabContent
            insights={analyticsData.insights}
            riskData={riskData}
            activityData={analyticsData.activityData}
          />
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsTabContent recommendations={analyticsData.recommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
