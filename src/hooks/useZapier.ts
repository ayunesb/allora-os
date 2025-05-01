
import { useState } from 'react';
import { triggerBusinessEvent, testWebhook } from '@/lib/zapier';
import { BusinessEventType, WebhookResult } from '@/types';

export const useZapier = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const triggerWebhook = async (
    webhookUrl: string, 
    eventType: BusinessEventType, 
    payload: Record<string, any>
  ): Promise<WebhookResult> => {
    setIsLoading(true);
    try {
      const result = await triggerBusinessEvent(webhookUrl, eventType, payload);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    triggerWebhook,
    testWebhook,
    triggerBusinessEvent
  };
};

export default useZapier;
