import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PlusCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpTooltip } from "@/components/help/HelpTooltip";
import { DocumentationLink } from "@/components/help/HelpTooltip";
export const EmptyDebateState = ({ onStartNewDebate }) => {
    return (<Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <HelpTooltip content={<div className="space-y-2">
              <p>The AI Executive Boardroom simulates strategic discussions between AI personas modeled after executives with different perspectives.</p>
              <DocumentationLink href="/help/ai-boardroom" label="Learn more about AI boardroom debates"/>
            </div>}>
            <Info className="h-4 w-4 text-muted-foreground cursor-help"/>
          </HelpTooltip>
        </div>
        <CardDescription>No active debates found</CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-3"/>
          <p className="text-sm text-muted-foreground mb-4">
            There are no active executive debates for your company. AI executive debates help generate strategic insights by simulating discussions between different executive perspectives.
          </p>
          <div className="space-y-2">
            <Button variant="default" onClick={onStartNewDebate} className="gap-2">
              <PlusCircle className="h-4 w-4"/>
              Start New Debate
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              You'll be able to select a topic and choose which AI executive personas should participate in the debate.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>);
};
