
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Bell, Send } from "lucide-react";

interface ManualTriggerContentProps {
  webhookUrl: string;
  isTriggering: string | null;
  triggerSample: (event: string, payload: Record<string, any>) => Promise<void>;
}

export function ManualTriggerContent({ 
  webhookUrl, 
  isTriggering, 
  triggerSample 
}: ManualTriggerContentProps) {
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
  
  return (
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
  );
}
