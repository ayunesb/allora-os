
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LearningInsights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getInsights } = useSelfLearning();

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const fetchedInsights = await getInsights();
      setInsights(fetchedInsights);
    } catch (error) {
      console.error("Error loading insights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LearningInsightsSkeleton />;
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Learning Insights</CardTitle>
          <Button variant="ghost" size="sm" onClick={loadInsights} className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh insights</span>
          </Button>
        </div>
        <CardDescription>
          Personalized insights based on your usage patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No insights available yet.</p>
            <p className="text-sm mt-1">Continue using Allora AI to generate personalized insights.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full flex-shrink-0">
                  <span className="text-primary text-sm">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function LearningInsightsSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-[180px]" />
        <Skeleton className="h-4 w-[250px] mt-2" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="w-full">
                <Skeleton className="h-5 w-[80%] mb-2" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
