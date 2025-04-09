
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelfLearning } from '@/hooks/useSelfLearning';
import { Brain, TrendingUp, History, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type Insight = {
  title: string;
  value: string;
  description: string;
};

export default function LearningInsights() {
  const { getInsights } = useSelfLearning();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      setLoading(true);
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (error) {
        console.error('Error loading insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, [getInsights]);

  const getIconForInsight = (title: string) => {
    switch (title) {
      case 'Behavioral Pattern':
        return <Brain className="h-5 w-5 text-primary" />;
      case 'Risk Appetite':
        return <TrendingUp className="h-5 w-5 text-primary" />;
      case 'Learning Progress':
        return <History className="h-5 w-5 text-primary" />;
      case 'Usage Pattern':
        return <Calendar className="h-5 w-5 text-primary" />;
      default:
        return <Brain className="h-5 w-5 text-primary" />;
    }
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            Learning Insights
          </CardTitle>
          <CardDescription>
            How Allora AI is learning from your actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          Learning Insights
        </CardTitle>
        <CardDescription>
          How Allora AI is learning from your actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center text-sm text-muted-foreground">
                {getIconForInsight(insight.title)}
                <span className="ml-1.5">{insight.title}</span>
              </div>
              <div className="mt-1 text-2xl font-semibold">{insight.value}</div>
              <div className="text-xs text-muted-foreground">{insight.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
