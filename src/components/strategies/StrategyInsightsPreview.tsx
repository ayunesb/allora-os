
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrategyAnalysis } from '@/utils/strategyInsights';

interface StrategyInsightsPreviewProps {
  analysis?: StrategyAnalysis;
  isLoading?: boolean;
}

export default function StrategyInsightsPreview({ 
  analysis,
  isLoading = false 
}: StrategyInsightsPreviewProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center">
        <div className="animate-pulse">Loading strategy insights...</div>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Strategy Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Key Strengths</h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.strengths.slice(0, 3).map((strength, index) => (
              <li key={index} className="text-sm text-muted-foreground">{strength}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Potential Challenges</h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.weaknesses.slice(0, 3).map((weakness, index) => (
              <li key={index} className="text-sm text-muted-foreground">{weakness}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[140px]">
            <h3 className="text-sm font-medium mb-2">Complexity</h3>
            <div className="flex items-center">
              <div className="w-full bg-secondary h-2 rounded-full">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${analysis.implementationComplexity.score}%` }}
                />
              </div>
              <span className="ml-2 text-xs font-medium">
                {analysis.implementationComplexity.score}%
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h3 className="text-sm font-medium mb-2">Competitive Edge</h3>
            <div className="flex items-center">
              <div className="w-full bg-secondary h-2 rounded-full">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${analysis.competitiveAdvantage.score}%` }}
                />
              </div>
              <span className="ml-2 text-xs font-medium">
                {analysis.competitiveAdvantage.score}%
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Key Insights</h3>
          <div className="space-y-2">
            {analysis.insights.slice(0, 2).map((insight) => (
              <div key={insight.id} className="flex items-start space-x-2">
                <Badge 
                  variant={insight.type === 'positive' ? 'default' : 
                          insight.type === 'negative' ? 'destructive' : 
                          'outline'}
                  className="mt-0.5"
                >
                  {insight.type === 'positive' ? 'Pro' : 
                   insight.type === 'negative' ? 'Con' : 'Note'}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
