import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export const IntroductionState = ({ sampleDebate, onStartNewDebate }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
        <CardDescription>
          Preview of an executive debate - start your own to get personalized
          insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Sample Topic</h3>
          <p className="text-muted-foreground">{sampleDebate.topic}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold">Preview</h3>
          <p className="text-muted-foreground">{sampleDebate.summary}</p>
        </div>

        <div>
          <h3 className="text-md font-semibold">How It Works</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <PlusCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Start a Debate</h4>
                <p className="text-xs text-muted-foreground">
                  Set a business topic for your AI executives to discuss
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Watch the Discussion</h4>
                <p className="text-xs text-muted-foreground">
                  See different perspectives from AI executives with diverse
                  expertise
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Get Strategic Insights</h4>
                <p className="text-xs text-muted-foreground">
                  Receive actionable strategies based on the debate outcome
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="default" onClick={onStartNewDebate} className="px-8">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start Your First Debate
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Or{" "}
            <Link
              to="/dashboard/strategies"
              className="text-primary hover:underline"
            >
              view strategic recommendations
            </Link>{" "}
            based on previous debates
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
