
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Send, FileText, Bell, Info } from "lucide-react";
import { toast } from "sonner";
import { useZapier } from '@/lib/zapier';
import { executeAndLogWebhook } from '@/utils/webhookUtils';

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const { triggerWorkflow } = useZapier();
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

  const sampleTriggers = [
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

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle>Zapier Integration Demo</CardTitle>
        </div>
        <CardDescription>
          Try sending different events to your Zapier webhook to test the integration
        </CardDescription>
        
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-amber-800">
            Due to browser security restrictions (CORS), webhook requests may appear to fail in the browser console
            but will still reach Zapier. Check your Zap's task history to confirm.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleTriggers.map((trigger) => (
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
      </CardContent>
    </Card>
  );
};

export default ZapierWebhookDemo;
