
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type ZapierTriggerButtonProps = {
  webhookType: 'newUser' | 'newLead' | 'newCampaign' | 'taskComplete';
  label: string;
  onResult?: (success: boolean) => void;
};

export default function ZapierTriggerButton({ 
  webhookType, 
  label, 
  onResult 
}: ZapierTriggerButtonProps) {
  const [isTriggering, setIsTriggering] = useState(false);
  
  const triggerWebhook = async () => {
    setIsTriggering(true);
    
    try {
      // In a real implementation, this would make an API call to trigger the webhook
      // For this demo, we'll simulate a successful webhook trigger
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Zapier webhook for ${webhookType} triggered successfully`);
      
      if (onResult) {
        onResult(true);
      }
    } catch (error) {
      console.error(`Error triggering ${webhookType} webhook:`, error);
      toast.error(`Failed to trigger webhook: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      if (onResult) {
        onResult(false);
      }
    } finally {
      setIsTriggering(false);
    }
  };
  
  return (
    <Button
      onClick={triggerWebhook}
      disabled={isTriggering}
      variant="outline"
      size="sm"
    >
      {isTriggering ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Triggering...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
