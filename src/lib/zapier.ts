
/**
 * Zapier Integration Helper
 * Enables triggering automation workflows via Zapier webhooks
 */

import { useSelfLearning } from '@/hooks/useSelfLearning';

export const triggerZap = async (event: string, payload: Record<string, any>) => {
  try {
    // In production, you would use an environment variable for the webhook URL
    const ZAPIER_WEBHOOK_URL = payload.webhookUrl || "YOUR_ZAPIER_WEBHOOK_URL";
    
    if (!ZAPIER_WEBHOOK_URL || ZAPIER_WEBHOOK_URL === "YOUR_ZAPIER_WEBHOOK_URL") {
      throw new Error("Zapier webhook URL not configured");
    }
    
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        event, 
        payload,
        timestamp: new Date().toISOString(),
        source: 'Allora AI Platform'
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.status}`);
    }
    
    // Track this zapier event in our self-learning system if we have userId
    if (payload.userId) {
      // We're not using the hook directly because this is not a React component
      // In a real implementation, you'd pass the user ID to this function
      // or handle the tracking separately
      console.log('Would track Zapier event:', {
        action: 'trigger_zapier_webhook',
        category: 'automation',
        entityId: payload.entityId,
        entityType: payload.entityType,
        metadata: {
          event,
          success: true
        }
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error triggering Zapier webhook:", error);
    return { success: false, error };
  }
};

// Component hook for using Zapier within React components
export const useZapier = () => {
  const { trackAction } = useSelfLearning();
  
  const triggerZapierWorkflow = async (
    webhookUrl: string,
    event: string,
    payload: Record<string, any> = {},
    entityId?: string,
    entityType?: string
  ) => {
    // Add webhook URL to payload
    const fullPayload = {
      ...payload,
      webhookUrl
    };
    
    const result = await triggerZap(event, fullPayload);
    
    // Track this action in our self-learning system
    trackAction(
      'trigger_zapier_workflow',
      'automation',
      entityId,
      entityType,
      {
        event,
        success: result.success
      }
    );
    
    return result;
  };
  
  return {
    triggerWorkflow: triggerZapierWorkflow
  };
};
