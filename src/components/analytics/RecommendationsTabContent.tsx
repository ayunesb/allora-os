import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
const RecommendationsTabContent = ({ recommendations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Personalized Recommendations
        </CardTitle>
        <CardDescription>
          Based on your usage patterns and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Recommended Strategies</h3>
            {recommendations.strategies.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.strategies.map((strategy, index) => (
                  <li key={index} className="p-3 bg-accent/30 rounded-md">
                    <div className="font-medium">{strategy.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {strategy.description}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No strategy recommendations yet
              </p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Preferred Topics</h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.topics.length > 0 ? (
                recommendations.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {topic}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No topic preferences detected yet
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Preferred Executives</h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.executives.length > 0 ? (
                recommendations.executives.map((executive, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-secondary/40 rounded-full text-sm"
                  >
                    {executive}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No executive preferences detected yet
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default RecommendationsTabContent;
