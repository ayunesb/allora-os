
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, Send } from "lucide-react";

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const [isSending, setIsSending] = React.useState(false);
  
  const sendTestData = async () => {
    setIsSending(true);
    
    try {
      // Using no-cors mode to handle CORS issues
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          action: 'test',
          timestamp: new Date().toISOString(),
          data: {
            message: 'This is a test event from Allora AI',
            source: 'Webhook Management Dashboard',
          }
        }),
      });
      
      // Since we're using no-cors, we can't actually check the response
      // So we'll just assume it worked
      toast.success('Test data sent to Zapier webhook');
    } catch (error) {
      console.error('Error sending webhook data:', error);
      toast.error('Failed to send test data to Zapier webhook');
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="mt-4 border rounded-md p-4 bg-card">
      <h4 className="text-sm font-medium mb-2">Test Zapier Integration</h4>
      
      <p className="text-xs text-muted-foreground mb-4">
        Send test data to your Zapier webhook to verify your Zap is working correctly.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs">
          <div className="bg-primary/10 p-2 rounded">
            <code>{"{ action: 'test', timestamp: '2025-04-13T12:00:00Z', ... }"}</code>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="bg-green-500/10 p-2 rounded text-green-500">
            Zapier
          </div>
        </div>
        
        <Button 
          size="sm" 
          onClick={sendTestData}
          disabled={isSending}
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? 'Sending...' : 'Send Test Data'}
        </Button>
      </div>
    </div>
  );
};

export default ZapierWebhookDemo;
