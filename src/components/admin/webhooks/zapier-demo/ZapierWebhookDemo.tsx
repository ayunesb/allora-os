import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Send, FileText, Bell, GitBranch, Users, CreditCard, BarChart } from "lucide-react";
import { toast } from "sonner";
import { useZapier, BusinessEventType, BusinessEventPayload } from '@/lib/zapier';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const { triggerWorkflow, triggerBusinessEvent } = useZapier();
  const [isTriggering, setIsTriggering] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>("manual");

  const triggerSample = async (event: string, payload: Record<string, any>) => {
    if (!webhookUrl) {
      toast.error("Please enter and save a Zapier webhook URL first");
      return;
    }

    setIsTriggering(event);
    
    try {
      const result = await triggerWorkflow(
        webhookUrl,
        event,
        payload
      );
      
      if (result.success) {
        toast.success(`Successfully triggered "${event}" event`);
      } else {
        toast.error(`Failed to trigger "${event}" event: ${result.message || result.error?.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(`Error triggering "${event}" event:`, error);
      toast.error(`Error: ${error.message || `Failed to trigger "${event}" event`}`);
    } finally {
      setIsTriggering(null);
    }
  };

  const triggerBusinessSample = async (
    eventType: BusinessEventType, 
    payload: BusinessEventPayload
  ) => {
    if (!webhookUrl) {
      toast.error("Please enter and save a Zapier webhook URL first");
      return;
    }

    setIsTriggering(eventType);
    
    try {
      const result = await triggerBusinessEvent(eventType, {
        ...payload,
        webhookUrl
      });
      
      if (result.success) {
        toast.success(`Successfully triggered "${eventType}" business event`);
      } else {
        toast.error(`Failed to trigger "${eventType}" business event: ${result.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(`Error triggering "${eventType}" business event:`, error);
      toast.error(`Error: ${error.message || `Failed to trigger "${eventType}" business event`}`);
    } finally {
      setIsTriggering(null);
    }
  };

  const manualTriggers = [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Document Created",
      event: "document_created",
      payload: { 
        document_id: "doc_" + Math.random().toString(36).substring(2, 10),
        title: "Sample Document",
        created_at: new Date().toISOString()
      }
    },
    {
      icon: <Bell className="h-4 w-4" />,
      title: "Notification Event",
      event: "notification_event",
      payload: {
        type: "info",
        message: "This is a sample notification",
        timestamp: new Date().toISOString()
      }
    },
    {
      icon: <Send className="h-4 w-4" />,
      title: "Message Sent",
      event: "message_sent",
      payload: {
        message_id: "msg_" + Math.random().toString(36).substring(2, 10),
        recipient: "sample@example.com",
        subject: "Sample Subject",
        sent_at: new Date().toISOString()
      }
    }
  ];

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
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle>Zapier Integration Demo</CardTitle>
        </div>
        <CardDescription>
          Test and demonstrate business events with your Zapier webhook
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="business">Business Events</TabsTrigger>
            <TabsTrigger value="manual">Manual Triggers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business" className="mt-0">
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
                      onClick={() => triggerBusinessSample(trigger.event as BusinessEventType, trigger.payload)}
                      disabled={isTriggering === trigger.event || !webhookUrl}
                    >
                      {isTriggering === trigger.event ? "Sending..." : "Trigger Business Event"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {manualTriggers.map((trigger) => (
                <Card key={trigger.event} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {trigger.icon}
                      <CardTitle className="text-sm">{trigger.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <p className="mb-1">Event: <code>{trigger.event}</code></p>
                    <p>Payload: <code>{JSON.stringify(trigger.payload).substring(0, 60)}...</code></p>
                  </CardContent>
                  <CardFooter className="pb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => triggerSample(trigger.event, trigger.payload)}
                      disabled={isTriggering === trigger.event || !webhookUrl}
                    >
                      {isTriggering === trigger.event ? "Sending..." : "Trigger Event"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookDemo;
