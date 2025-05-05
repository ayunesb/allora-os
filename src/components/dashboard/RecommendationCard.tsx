import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, AlertTriangle, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const RecommendationCard = ({ recommendation, onImplement, onDismiss }) => {
    const { toast } = useToast();
    const handleImplement = () => {
        if (onImplement) {
            onImplement(recommendation.id);
            toast({
                title: "Recommendation implemented",
                description: "The recommended action has been implemented successfully.",
                action: <Button variant="outline" size="sm">Undo</Button>
            });
        }
    };
    const handleDismiss = () => {
        if (onDismiss) {
            onDismiss(recommendation.id);
            toast({
                title: "Recommendation dismissed",
                description: "The recommendation has been dismissed.",
            });
        }
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high':
                return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            case 'medium':
                return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
            case 'low':
                return 'text-green-500 bg-green-50 dark:bg-green-900/20';
            default:
                return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'strategy':
                return <TrendingUp className="h-5 w-5"/>;
            case 'marketing':
                return <AlertTriangle className="h-5 w-5"/>;
            case 'sales':
                return <ArrowRight className="h-5 w-5"/>;
            case 'operations':
                return <CheckCircle className="h-5 w-5"/>;
            default:
                return <TrendingUp className="h-5 w-5"/>;
        }
    };
    return (<Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <span className={`p-1.5 rounded-full ${getImpactColor(recommendation.impact)}`}>
              {getCategoryIcon(recommendation.category)}
            </span>
            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          </div>
          {recommendation.isImplemented && (<span className="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full font-medium">
              Implemented
            </span>)}
        </div>
        <CardDescription>
          {recommendation.aiGenerated && (<span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full mr-2">
              AI Generated
            </span>)}
          <span className="text-xs capitalize">{recommendation.category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{recommendation.description}</p>
      </CardContent>
      {!recommendation.isImplemented && (<CardFooter className="flex justify-between pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={handleDismiss}>
            Dismiss
          </Button>
          <Button variant="default" size="sm" onClick={handleImplement}>
            Implement
          </Button>
        </CardFooter>)}
    </Card>);
};
export default RecommendationCard;
