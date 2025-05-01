
import React from 'react';
import { Button } from '@/components/ui/button';

interface ManualTriggerContentProps {
  webhookUrl: string;
  onTrigger: () => void;
  isLoading: boolean;
  isTriggering?: string | null;
}

const ManualTriggerContent: React.FC<ManualTriggerContentProps> = ({
  webhookUrl,
  onTrigger,
  isLoading,
  isTriggering
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Send a simple test webhook to your Zapier webhook URL. This will help you verify that your Zapier integration is working correctly.
      </p>
      
      <Button
        onClick={onTrigger}
        disabled={!webhookUrl || isLoading || isTriggering === 'manual'}
        className="w-full"
      >
        {isLoading || isTriggering === 'manual' ? 'Sending...' : 'Send Test Webhook'}
      </Button>
      
      <div className="bg-muted p-4 rounded-md mt-4">
        <h4 className="font-medium text-sm mb-2">Webhook Payload</h4>
        <pre className="text-xs overflow-auto bg-background p-2 rounded">
{JSON.stringify({
  message: "This is a manual trigger test",
  timestamp: new Date().toISOString(),
  triggered_by: "manual-demo"
}, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ManualTriggerContent;
