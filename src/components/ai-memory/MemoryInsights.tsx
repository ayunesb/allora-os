import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAiMemory } from '@/hooks/useAiMemory';
import { Button } from '@/components/ui/button';
import { Database, Brain, BarChart, TrendingUp, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useAiModelPreferences } from '@/hooks/useAiModelPreferences';
export default function MemoryInsights() {
    const { getLearningInsights, recentMemories } = useAiMemory();
    const { user } = useAuth();
    const { preferences } = useAiModelPreferences();
    const [insights, setInsights] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchInsights = async () => {
        if (!user)
            return;
        setIsLoading(true);
        try {
            const data = await getLearningInsights();
            setInsights(data);
        }
        catch (error) {
            console.error('Error fetching learning insights:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchInsights();
    }, [user]);
    if (!user)
        return null;
    // Calculate learning effectiveness if data is available
    const learningEffectiveness = insights ?
        Math.min(100, Math.round((insights.positiveInteractions /
            (insights.positiveInteractions + insights.negativeInteractions || 1)) * 100)) : 0;
    return (<Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4"/>
              AI Memory Insights
            </CardTitle>
            <CardDescription>
              How the AI system is learning from your interactions
            </CardDescription>
          </div>
          {preferences?.enableLearning ? (<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Zap className="h-3 w-3 mr-1"/>
              Learning Active
            </Badge>) : (<Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Learning Disabled
            </Badge>)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (<div className="space-y-3">
            <Skeleton className="h-20 w-full"/>
            <Skeleton className="h-16 w-full"/>
            <Skeleton className="h-16 w-full"/>
          </div>) : insights ? (<>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <BarChart className="h-4 w-4 text-blue-500"/>
                  Total Interactions
                </div>
                <div className="text-2xl font-bold">
                  {(insights.positiveInteractions + insights.negativeInteractions) || 0}
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500"/>
                  Learning Effectiveness
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold">{learningEffectiveness}%</span>
                  <Progress value={learningEffectiveness} className="h-2"/>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <ThumbsUp className="h-4 w-4 text-green-500"/>
                  Positive Feedback
                </div>
                <div className="text-xl font-bold text-green-600">
                  {insights.positiveInteractions || 0}
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <ThumbsDown className="h-4 w-4 text-red-500"/>
                  Areas for Improvement
                </div>
                <div className="text-xl font-bold text-red-600">
                  {insights.negativeInteractions || 0}
                </div>
              </div>
            </div>
            
            {insights.topTopics && insights.topTopics.length > 0 && (<div className="p-3 border rounded-md">
                <div className="text-sm font-medium mb-2">Top Learning Topics</div>
                <div className="flex flex-wrap gap-2">
                  {insights.topTopics.map((topic, i) => (<Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700">
                      {topic}
                    </Badge>))}
                </div>
              </div>)}
            
            {insights.positiveTopic && (<div className="p-3 border rounded-md bg-green-50">
                <div className="text-sm font-medium mb-1 text-green-700">Strongest Knowledge Area</div>
                <div className="text-base text-green-800">{insights.positiveTopic}</div>
              </div>)}
            
            {insights.negativeTopic && (<div className="p-3 border rounded-md bg-amber-50">
                <div className="text-sm font-medium mb-1 text-amber-700">Focus Area for Improvement</div>
                <div className="text-base text-amber-800">{insights.negativeTopic}</div>
              </div>)}
          </>) : (<div className="text-center py-3 text-muted-foreground">
            No learning insights available yet. Continue interacting with the AI advisors to generate insights.
          </div>)}
      </CardContent>
      
      <CardFooter>
        <Button variant="ghost" size="sm" onClick={fetchInsights} disabled={isLoading} className="mr-2">
          <Database className="h-4 w-4 mr-2"/>
          Refresh Insights
        </Button>
        
        <Button variant="outline" size="sm" disabled={isLoading || !preferences?.enableLearning} onClick={() => window.open('/dashboard/ai-settings', '_self')}>
          <Brain className="h-4 w-4 mr-2"/>
          Manage Learning
        </Button>
      </CardFooter>
    </Card>);
}
