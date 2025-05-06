import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Brain, Info, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type LearningSettingsProps = {
    children: React.ReactNode;
    variant?: "default" | "custom";
    size?: "small" | "medium";
};

const LearningSettings: React.FC<LearningSettingsProps> = ({ children, variant = "default", size = "medium" }) => {
    const handleResetLearning = async () => {
        try {
            toast.success("Learning data has been reset", {
                description: "Your AI executives will start learning from scratch."
            });
        }
        catch (error) {
            console.error("Error resetting learning data:", error);
            toast.error("Failed to reset learning data");
        }
    };
    return (<Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5"/>
          Self-Learning Settings
        </CardTitle>
        <CardDescription>
          Control how your AI executives learn from your interactions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-base font-medium">Enable Self-Learning</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Allow AI executives to adapt based on your feedback and choices
            </p>
          </div>
          <Switch checked={learningEnabled} onCheckedChange={onToggleLearning}/>
        </div>
        
        <div className="bg-accent/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 mr-2"/>
            What does self-learning do?
          </h3>
          <ul className="text-sm space-y-2">
            <li>• Tracks which strategies you approve or reject</li>
            <li>• Learns your risk tolerance and business preferences</li>
            <li>• Adapts communication style to your preferences</li>
            <li>• Improves recommendations over time</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base font-medium">Learning Data</Label>
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex justify-between items-center text-sm">
              <span>Interactions tracked</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Learning sessions</span>
              <span className="font-medium">18</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Last updated</span>
              <span className="font-medium">Today, 2:45 PM</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="outline" className="text-destructive" onClick={handleResetLearning}>
          <RefreshCw className="h-4 w-4 mr-2"/>
          Reset Learning Data
        </Button>
      </CardFooter>
    </Card>);
}
