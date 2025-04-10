
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { toast } from "sonner";

interface Recommendation {
  title: string;
  description: string;
  type: string;
  executiveBot: {
    name: string;
    role: string;
  };
  expectedImpact: number;
  timeframe: string;
}

interface AiRecommendationsProps {
  recommendations: Recommendation[];
  onApprove: (index: number) => void;
}

export default function AiRecommendations({ recommendations, onApprove }: AiRecommendationsProps) {
  const [feedbackState, setFeedbackState] = useState<Record<number, 'liked' | 'disliked' | null>>({});
  
  const handleFeedback = (index: number, isPositive: boolean) => {
    setFeedbackState(prev => ({
      ...prev,
      [index]: isPositive ? 'liked' : 'disliked'
    }));
    
    toast.success(
      isPositive 
        ? 'Thank you for your positive feedback!' 
        : 'Thank you for your feedback. We\'ll improve our recommendations.'
    );
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">AI Executive Recommendations</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary">Executive Team</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {recommendations.map((rec, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Badge variant="outline" className="capitalize">
                      {rec.type}
                    </Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 capitalize">
                      {rec.timeframe}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-start gap-3">
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarImage 
                    src={`/avatars/${rec.executiveBot.name.toLowerCase().replace(/\s+/g, '-')}.png`} 
                    alt={rec.executiveBot.name} 
                  />
                  <AvatarFallback>{rec.executiveBot.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Expected Impact</span>
                    <span>{rec.expectedImpact}%</span>
                  </div>
                  <ProgressBar value={rec.expectedImpact} max={100} className="h-1.5" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <span>Recommended by: </span>
                <span className="font-medium ml-1">{rec.executiveBot.name}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              {feedbackState[index] === 'liked' ? (
                <Button variant="outline" size="sm" className="text-green-500" disabled>
                  <Check className="mr-2 h-4 w-4" />
                  Approved
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onApprove(index)}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFeedback(index, false)}
                    className="text-muted-foreground"
                  >
                    <ThumbsDown className="mr-2 h-4 w-4 h-3 w-3" />
                  </Button>
                </div>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/dashboard/${rec.type === 'strategy' ? 'strategies' : rec.type === 'campaign' ? 'campaigns' : 'calls'}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
