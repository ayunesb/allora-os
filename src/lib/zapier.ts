
/**
 * Zapier Integration Helper
 * Enables triggering automation workflows via Zapier webhooks
 */

import { useSelfLearning } from '@/hooks/useSelfLearning';
import { ActionCategory } from '@/utils/selfLearning';
import { sanitizeInput } from '@/utils/sanitizers';

// Base function to trigger a Zapier webhook with proper validation
export const triggerZap = async (event: string, payload: Record<string, any>) => {
  try {
    // Validate webhook URL
    const webhookUrl = payload.webhookUrl;
    
    if (!webhookUrl) {
      throw new Error("Zapier webhook URL not provided");
    }
    
    // Basic URL validation
    try {
      new URL(webhookUrl);
    } catch (e) {
      throw new Error("Invalid Zapier webhook URL format");
    }
    
    // Verify it's a Zapier webhook
    if (!webhookUrl.includes('hooks.zapier.com')) {
      console.warn('The webhook URL does not appear to be from Zapier');
    }
    
    // Sanitize event name and payload values to prevent injection
    const sanitizedEvent = sanitizeInput(event);
    const sanitizedPayload = Object.entries(payload).reduce((acc, [key, value]) => {
      // Only sanitize string values
      acc[key] = typeof value === 'string' ? sanitizeInput(value) : value;
      return acc;
    }, {} as Record<string, any>);
    
    // Add metadata
    const requestBody = {
      event: sanitizedEvent,
      payload: sanitizedPayload,
      timestamp: new Date().toISOString(),
      source: 'Allora AI Platform'
    };
    
    // Make the request to Zapier
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    // Validate response
    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.status} ${response.statusText}`);
    }
    
    // Track this zapier event in our self-learning system if we have userId
    if (sanitizedPayload.userId) {
      console.log('Would track Zapier event:', {
        action: 'trigger_zapier_webhook',
        category: 'automation',
        entityId: sanitizedPayload.entityId,
        entityType: sanitizedPayload.entityType,
        metadata: {
          event: sanitizedEvent,
          success: true
        }
      });
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error triggering Zapier webhook:", error);
    return { success: false, error };
  }
};

// React hook for using Zapier within components
export const useZapier = () => {
  const { trackAction } = useSelfLearning();
  
  const triggerZapierWorkflow = async (
    webhookUrl: string,
    event: string,
    payload: Record<string, any> = {},
    entityId?: string,
    entityType?: string
  ) => {
    if (!webhookUrl || !webhookUrl.trim()) {
      return { success: false, error: new Error("Webhook URL is required") };
    }
    
    // Add webhook URL to payload
    const fullPayload = {
      ...payload,
      webhookUrl: webhookUrl.trim()
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
