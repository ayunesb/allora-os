
import React, { useState, useEffect } from 'react';
import { PageTitle } from '@/components/ui/page-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendationCard, { Recommendation } from '@/components/dashboard/RecommendationCard';
import { PageErrorBoundary } from '@/components/errorHandling/PageErrorBoundary';
import { useSelfLearning } from '@/hooks/useSelfLearning';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PerformanceMetrics from '@/components/analytics/PerformanceMetrics';
import UserActivityGraph from '@/components/analytics/UserActivityGraph';
import StrategyAdoption from '@/components/analytics/StrategyAdoption';

export default function Analytics() {
  const { trackAction, getInsights, getRecommendations } = useSelfLearning();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Track page view
        trackAction('view_page', 'analytics');
        
        // Fetch recommendations (in a real app)
        // In this demo, we'll use mock data
        setTimeout(() => {
          setRecommendations([
            {
              id: '1',
              title: 'Increase content marketing efforts',
              description: 'Based on your current strategy performance, increasing content marketing efforts could yield 23% more lead generation.',
              impact: 'high',
              category: 'marketing',
              aiGenerated: true
            },
            {
              id: '2',
              title: 'Optimize conversion funnel',
              description: 'Your lead-to-customer conversion rate is below industry average. Optimizing your sales funnel could improve conversion by 15%.',
              impact: 'medium',
              category: 'sales',
              aiGenerated: true
            },
            {
              id: '3',
              title: 'Expand to new market segment',
              description: 'Market analysis shows an opportunity to expand into the healthcare vertical with your current solution.',
              impact: 'high',
              category: 'strategy',
              aiGenerated: true
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [trackAction]);
  
  const handleImplementRecommendation = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? {...rec, isImplemented: true} : rec
      )
    );
    
    // Track the implementation
    trackAction('implement_recommendation', 'analytics', id, 'recommendation');
  };
  
  const handleDismissRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    
    // Track the dismissal
    trackAction('dismiss_recommendation', 'analytics', id, 'recommendation');
  };
  
  return (
    <PageErrorBoundary pageName="Analytics">
      <div className="space-y-6">
        <PageTitle
          title="Business Analytics"
          description="Track performance metrics and view AI-generated business insights"
        />
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="strategies">Strategy Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <PerformanceMetrics isLoading={isLoading} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UserActivityGraph />
              <StrategyAdoption />
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Recommendations</CardTitle>
                <CardDescription>
                  Smart business recommendations based on your performance data and industry trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-2">
                          <div className="h-5 w-2/3 bg-muted rounded"></div>
                          <div className="h-3 w-1/3 bg-muted rounded"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="h-20 bg-muted rounded"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {recommendations.map((recommendation) => (
                      <RecommendationCard 
                        key={recommendation.id}
                        recommendation={recommendation}
                        onImplement={handleImplementRecommendation}
                        onDismiss={handleDismissRecommendation}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No recommendations at this time. We'll generate more insights as you use the platform.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strategies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Strategy Performance Metrics</CardTitle>
                <CardDescription>
                  Track the performance of your business strategies over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Strategy performance tracking will be available once you have implemented strategies through the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}
