import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
const OnboardingAIWorkflow = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/onboarding/complete");
  };
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Customize Your AI Workflow</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select how you want to interact with your AI executive team.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI Executive Team Preferences</CardTitle>
          <CardDescription>
            Customize how your AI executives will collaborate and assist you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Proactive Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Allow your AI executives to proactively generate insights
                  based on your company data
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Executive Debates</h3>
                <p className="text-sm text-muted-foreground">
                  Enable your AI executives to debate strategic decisions with
                  various perspectives
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Risk Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Your AI team will analyze risk factors for every strategic
                  suggestion
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-md">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Implementation Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed implementation plans for approved strategies
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/integrations")}
          >
            Back
          </Button>
          <Button onClick={handleNext}>Finish Setup</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default OnboardingAIWorkflow;
