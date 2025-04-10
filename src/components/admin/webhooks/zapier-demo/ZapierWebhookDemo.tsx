
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { useZapier, BusinessEventType, BusinessEventPayload } from '@/lib/zapier';
import { ZapierWebhookDemoTabs } from './ZapierWebhookDemoTabs';

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const { triggerWorkflow, triggerBusinessEvent } = useZapier();
  const [isTriggering, setIsTriggering] = React.useState<string | null>(null);

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
        <ZapierWebhookDemoTabs
          webhookUrl={webhookUrl}
          isTriggering={isTriggering}
          triggerSample={triggerSample}
          triggerBusinessSample={triggerBusinessSample}
        />
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookDemo;
