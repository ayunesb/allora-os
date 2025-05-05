import React from 'react';
import { Lightbulb, ThumbsUp, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimplifiedCard } from '@/components/ui/SimplifiedCard';
import { useToast } from '@/hooks/use-toast';
export default function SimplifiedRecommendations({ recommendations = [], onApprove, isLoading = false, error = null, onRetry }) {
    const { toast } = useToast();
    const handleApprove = (index) => {
        toast({
            title: "Recommendation approved",
            description: "The AI recommendation will be implemented.",
        });
        onApprove(index);
    };
    const getImpactIcon = (impact) => {
        switch (impact) {
            case 'high':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">High Impact</span>;
            case 'medium':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Medium Impact</span>;
            case 'low':
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Low Impact</span>;
            default:
                return null;
        }
    };
    return (<SimplifiedCard title="AI Business Recommendations" description="Simple, actionable insights to help your business grow" icon={<Sparkles className="h-5 w-5 text-purple-500"/>} isLoading={isLoading} error={error} onRetry={onRetry} variant="default" className="border-purple-200" contentClassName="space-y-4">
      {recommendations.length === 0 ? (<div className="text-center py-8">
          <Lightbulb className="h-10 w-10 text-muted-foreground mx-auto mb-3"/>
          <p className="text-muted-foreground">No recommendations available at the moment.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Check back later or update your business profile to get personalized suggestions.
          </p>
        </div>) : (<div className="space-y-4">
          {recommendations.map((recommendation, index) => (<div key={recommendation.id} className="bg-background border rounded-lg p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg">{recommendation.title}</h3>
                {getImpactIcon(recommendation.impact)}
              </div>
              
              <p className="text-muted-foreground">{recommendation.description}</p>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1"/>
                  <span>{recommendation.category}</span>
                </div>
                
                <Button size="sm" onClick={() => handleApprove(index)} className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4"/>
                  <span>Approve</span>
                  <ArrowRight className="h-3 w-3 ml-1"/>
                </Button>
              </div>
            </div>))}
        </div>)}
    </SimplifiedCard>);
}
