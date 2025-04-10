
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAiMemory } from '@/hooks/useAiMemory';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, MessageCircle, ThumbsUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MemoryInsights() {
  const { getLearningInsights, recentMemories, getRelevantMemories } = useAiMemory();
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      setIsLoading(true);
      try {
        const data = await getLearningInsights();
        setInsights(data);
        
        // Get some recent memories for display
        await getRelevantMemories('general', 'any', 'any', 5);
      } catch (error) {
        console.error('Failed to fetch learning insights:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchInsights();
  }, [getLearningInsights, getRelevantMemories]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          AI Memory & Learning Insights
        </CardTitle>
        <CardDescription>
          How your AI executives learn from interactions and adapt to your preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Positive Topic Insights</h3>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center mb-2">
                <ThumbsUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Preferred Topics
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {insights?.positiveTopic ? (
                  <Badge variant="outline" className="bg-emerald-100/50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                    {insights.positiveTopic}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">No positive topics recorded yet</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Areas for Improvement</h3>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-900">
              <div className="flex items-center mb-2">
                <MessageCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Topics to Refine
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {insights?.negativeTopic ? (
                  <Badge variant="outline" className="bg-amber-100/50 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                    {insights.negativeTopic}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">No improvement areas recorded yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Recent Memory Entries</h3>
          <div className="space-y-3">
            {recentMemories.length > 0 ? (
              recentMemories.slice(0, 3).map((memory, index) => (
                <div key={index} className="bg-muted/40 p-3 rounded-md border text-sm">
                  <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(memory.created_at).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1">
                      {memory.bot_name}
                    </Badge>
                  </div>
                  <div className="line-clamp-2 text-xs">
                    <span className="font-medium">You:</span> {memory.user_message}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-muted-foreground py-6">
                No memory entries recorded yet
              </div>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <p>Your AI executive team learns from each interaction and adapts based on your feedback. 
          Give thumbs up or down on responses to help them improve.</p>
        </div>
      </CardContent>
    </Card>
  );
}
