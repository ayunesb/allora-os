
import React, { useState, useEffect } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { LearningInsights } from "@/components/dashboard/LearningInsights";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import PerformanceMetrics from "@/components/analytics/PerformanceMetrics";
import UserActivityGraph from "@/components/analytics/UserActivityGraph";
import StrategyAdoption from "@/components/analytics/StrategyAdoption";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>({ strategies: [], executives: [], topics: [] });
  
  const { getInsights, getRecommendations } = useSelfLearning();
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load recommendations in parallel
      const fetchedRecommendations = await getRecommendations();
      setRecommendations(fetchedRecommendations);
    } catch (error) {
      console.error("Error loading analytics data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <PageTitle title="Analytics & Insights" description="Track performance and get personalized business recommendations" />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PerformanceMetrics isLoading={isLoading} />
            </div>
            <div className="md:col-span-1">
              <LearningInsights />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Recommended Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[180px] rounded-lg" />
              ))
            ) : (
              recommendations.strategies.map((strategy: any) => (
                <RecommendationCard
                  key={strategy.id}
                  title={strategy.title}
                  description={`Recommended based on your ${strategy.riskLevel} risk profile. Adoption score: ${strategy.score}%`}
                  type="strategy"
                  score={strategy.score}
                  riskLevel={strategy.riskLevel}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="strategies" className="mt-6">
          <StrategyAdoption />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <UserActivityGraph />
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-6">
          <div className="bg-secondary/40 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Campaign Analytics</h3>
            <p className="text-muted-foreground">
              Campaign analytics will be available once you have active campaigns running.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
