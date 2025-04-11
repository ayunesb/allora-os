
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyDebateStateProps {
  onStartNewDebate: () => void;
}

export const EmptyDebateState: React.FC<EmptyDebateStateProps> = ({ onStartNewDebate }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
        <CardDescription>No active debates found</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            There are no active executive debates for your company. Would you like to start one?
          </p>
          <Button 
            variant="default" 
            onClick={onStartNewDebate}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Start New Debate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
