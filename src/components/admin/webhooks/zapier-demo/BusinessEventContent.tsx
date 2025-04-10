
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Users, CreditCard, BarChart } from "lucide-react";

interface BusinessEventContentProps {
  webhookUrl: string;
  isTriggering: string | null;
  triggerBusinessSample: (
    eventType: string, 
    payload: Record<string, any>
  ) => Promise<void>;
}

export function BusinessEventContent({ 
  webhookUrl, 
  isTriggering, 
  triggerBusinessSample 
}: BusinessEventContentProps) {
  const businessEventSamples = [
    {
      icon: <GitBranch className="h-4 w-4" />,
      title: "Strategy Approved",
      event: "strategy_approved",
      payload: {
        companyId: "comp_" + Math.random().toString(36).substring(2, 8),
        entityId: "strat_" + Math.random().toString(36).substring(2, 8),
        entityType: "strategy",
        strategyName: "Global Expansion Strategy",
        botName: "Elon Musk",
        suggestedBy: "Reed Hastings",
        riskLevel: "Medium",
        timestamp: new Date().toISOString()
      }
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Lead Converted to Client",
      event: "lead_converted",
      payload: {
        companyId: "comp_" + Math.random().toString(36).substring(2, 8),
        entityId: "lead_" + Math.random().toString(36).substring(2, 8),
        entityType: "lead",
        name: "Jane Smith",
        company: "Innovatech Solutions",
        previousStatus: "Qualified",
        status: "Client",
        botName: "Pat Wadors",
        timestamp: new Date().toISOString()
      }
    },
    {
      icon: <BarChart className="h-4 w-4" />,
      title: "Campaign Launched",
      event: "campaign_launched",
      payload: {
        companyId: "comp_" + Math.random().toString(36).substring(2, 8),
        entityId: "camp_" + Math.random().toString(36).substring(2, 8),
        entityType: "campaign",
        name: "Q2 LinkedIn Campaign",
        platform: "LinkedIn",
        budget: 5000,
        botName: "Antonio Lucio",
        timestamp: new Date().toISOString()
      }
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      title: "Revenue Milestone Reached",
      event: "revenue_milestone_reached",
      payload: {
        companyId: "comp_" + Math.random().toString(36).substring(2, 8),
        entityId: "rev_" + Math.random().toString(36).substring(2, 8),
        entityType: "revenue",
        amount: 100000,
        milestone: "100K",
        botName: "Warren Buffett",
        timestamp: new Date().toISOString()
      }
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {businessEventSamples.map((trigger) => (
        <Card key={trigger.event} className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {trigger.icon}
              <CardTitle className="text-sm">{trigger.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <p className="mb-1">Event: <code>{trigger.event}</code></p>
            <p className="mb-1">Bot: <code>{trigger.payload.botName}</code></p>
            <p>Payload: <code>{JSON.stringify(trigger.payload).substring(0, 60)}...</code></p>
          </CardContent>
          <CardFooter className="pb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => triggerBusinessSample(trigger.event, trigger.payload)}
              disabled={isTriggering === trigger.event || !webhookUrl}
            >
              {isTriggering === trigger.event ? "Sending..." : "Trigger Business Event"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
