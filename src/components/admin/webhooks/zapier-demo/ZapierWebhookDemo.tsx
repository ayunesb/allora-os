
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap, GlassWater, User, Briefcase, CheckCircle2 } from "lucide-react";
import { useZapier } from '@/lib/zapier';
import type { BusinessEventType, BusinessEventPayload } from '@/utils/webhookTypes';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const { triggerWorkflow } = useZapier();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const demoEvents: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    title: string;
    type: BusinessEventType;
    payload: BusinessEventPayload;
  }> = [
    {
      id: 'new_lead',
      name: 'New Lead Created',
      icon: <User className="h-4 w-4" />,
      title: 'Generate a lead created event',
      type: 'new_lead_added',  // Fixed to match BusinessEventType
      payload: {
        leadName: 'John Smith',
        companyName: 'Acme, Inc.',
        email: 'john@example.com',
        source: 'Website Demo',
        timestamp: new Date().toISOString()
      }
    },
    {
      id: 'new_strategy',
      name: 'Strategy Approved',
      icon: <Briefcase className="h-4 w-4" />,
      title: 'Generate a strategy approved event',
      type: 'new_strategy_approved',  // Fixed to match BusinessEventType
      payload: {
        strategyTitle: 'Market Expansion Strategy',
        approvedBy: 'Executive Team',
        riskLevel: 'Medium',
        timestamp: new Date().toISOString()
      }
    },
    {
      id: 'revenue_milestone',
      name: 'Revenue Milestone',
      icon: <CheckCircle2 className="h-4 w-4" />,
      title: 'Generate a revenue milestone event',
      type: 'revenue_milestone',  // Fixed to match BusinessEventType
      payload: {
        amount: 100000,
        companyName: 'Acme, Inc.',
        milestone: 'First $100K',
        timestamp: new Date().toISOString()
      }
    }
  ];

  const handleTriggerDemo = async (demoEvent: typeof demoEvents[0]) => {
    setIsLoading(prev => ({ ...prev, [demoEvent.id]: true }));
    
    try {
      const result = await triggerWorkflow(
        webhookUrl,
        demoEvent.type,
        demoEvent.payload,
        `demo-${demoEvent.id}`,
        'demo'
      );
      
      if (result.success) {
        toast({
          title: "Demo event sent",
          description: `Successfully sent ${demoEvent.name} event to Zapier`,
        });
      } else {
        toast({
          title: "Failed to send event",
          description: result.message || "An error occurred while sending the event to Zapier",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to trigger Zapier webhook",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [demoEvent.id]: false }));
    }
  };

  return (
    <div className="mt-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="demo-events">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-400" />
              Test Zapier Integration
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-muted-foreground mb-3">
              Send demo events to test your Zapier integration. These events simulate real business events that would trigger automations.
            </div>
            
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="grid gap-3">
                  {demoEvents.map((demoEvent) => (
                    <div key={demoEvent.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {demoEvent.icon}
                        <span className="text-sm">{demoEvent.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTriggerDemo(demoEvent)}
                        disabled={isLoading[demoEvent.id]}
                      >
                        {isLoading[demoEvent.id] ? "Sending..." : "Send Event"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="text-xs text-muted-foreground mt-3">
              Note: You need to configure a Zap in Zapier that listens for these events using the Webhook trigger.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ZapierWebhookDemo;
