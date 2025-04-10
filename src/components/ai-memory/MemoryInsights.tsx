
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAiMemory } from '@/hooks/useAiMemory';
import { Button } from '@/components/ui/button';
import { Database, Clock, Brain, BarChart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MemoryInsights() {
  const { getLearningInsights, recentMemories } = useAiMemory();
  const { user } = useAuth();
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchInsights = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      const data = await getLearningInsights();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching learning insights:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInsights();
  }, [user]);
  
  if (!user) return null;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Memory Insights
        </CardTitle>
        <CardDescription>
          How the AI system is learning from your interactions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : insights ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <BarChart className="h-4 w-4 text-blue-500" />
                  Interactions
                </div>
                <div className="text-2xl font-bold">
                  {insights.positiveInteractions + insights.negativeInteractions || 0}
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  Positive Feedback
                </div>
                <div className="text-2xl font-bold">
                  {insights.positiveInteractions || 0}
                </div>
              </div>
            </div>
            
            {insights.positiveTopic && (
              <div className="p-3 border rounded-md">
                <div className="text-sm font-medium mb-1">Most Positive Topic</div>
                <div className="text-base">{insights.positiveTopic}</div>
              </div>
            )}
            
            {insights.negativeTopic && (
              <div className="p-3 border rounded-md">
                <div className="text-sm font-medium mb-1">Area for Improvement</div>
                <div className="text-base">{insights.negativeTopic}</div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-3 text-muted-foreground">
            No learning insights available yet. Continue interacting with the AI advisors to generate insights.
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button variant="ghost" size="sm" onClick={fetchInsights} disabled={isLoading}>
          <Database className="h-4 w-4 mr-2" />
          Refresh Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
