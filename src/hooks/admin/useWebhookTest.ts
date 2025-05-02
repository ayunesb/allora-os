
import { useState } from 'react';
import { WebhookType, WebhookTestResult } from '@/types/fixed/Webhook';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useWebhookTest() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<WebhookTestResult | null>(null);

  /**
   * Test a webhook URL
   */
  const testWebhook = async (url: string, webhookType: WebhookType): Promise<WebhookTestResult> => {
    if (!url) {
      const result = { success: false, message: 'No URL provided' };
      setLastResult(result);
      return result;
    }

    setIsLoading(true);
    
    try {
      // Call edge function to test webhook
      const { data, error } = await supabase.functions.invoke('test-webhook', {
        body: { url, webhookType, testMode: true }
      });
      
      if (error) {
        throw error;
      }
      
      const result = data as WebhookTestResult;
      
      if (result.success) {
        toast.success('Webhook test successful');
      } else {
        toast.error(`Webhook test failed: ${result.message || 'Unknown error'}`);
      }
      
      setLastResult(result);
      return result;
    } catch (error) {
      console.error('Error testing webhook:', error);
      const result = { 
        success: false, 
        message: error.message || 'Failed to test webhook' 
      };
      setLastResult(result);
      toast.error(result.message);
      return result;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    testWebhook,
    isLoading,
    lastResult
  };
}
