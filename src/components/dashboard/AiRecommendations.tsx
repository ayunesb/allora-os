
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  type: string;
}

interface AiRecommendationsProps {
  recommendations: Recommendation[];
  onApprove: (index: number) => void;
}

export default function AiRecommendations({ recommendations, onApprove }: AiRecommendationsProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {recommendations.map((rec, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {rec.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{rec.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => onApprove(index)}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Approve
              </Button>
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
