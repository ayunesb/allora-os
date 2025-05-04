import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import RiskAppetiteDistribution from "./RiskAppetiteDistribution";
import InteractionTimeline from "./InteractionTimeline";
const BehaviorTabContent = ({ insights, riskData, activityData }) => {
    return (<div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskAppetiteDistribution data={riskData}/>
        <InteractionTimeline data={activityData}/>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary"/>
            Learning Progress
          </CardTitle>
          <CardDescription>
            How the AI system is adapting to your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.length > 0 ? (<ul className="space-y-2">
                {insights.map((insight, index) => (<li key={index} className="flex justify-between p-2 border-b border-border/30">
                    <span className="font-medium">{insight.title}</span>
                    <span className="text-primary">{insight.value}</span>
                  </li>))}
              </ul>) : (<p className="text-muted-foreground text-center py-4">
                Continue using the platform to generate learning insights
              </p>)}
          </div>
        </CardContent>
      </Card>
    </div>);
};
export default BehaviorTabContent;
