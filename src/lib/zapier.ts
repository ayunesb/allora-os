
/**
 * Zapier Integration Helper
 * Enables triggering automation workflows via Zapier webhooks
 */

import { useSelfLearning } from '@/hooks/useSelfLearning';
import { sanitizeInput } from '@/utils/sanitizers';
import { executeAndLogWebhook } from '@/utils/webhookUtils'; 
import { validateApiCredential } from '@/utils/apiCredentialValidator';
import { logger } from '@/utils/loggingService';
import { secureStorage } from '@/utils/cryptoUtils';
import { BusinessEventType, BusinessEventPayload } from '@/utils/webhookTypes';

// Helper to securely store webhook URLs
const securelyStoreWebhookUrl = (webhookUrl: string, prefix: string = 'zapier'): void => {
  try {
    // Use a prefix to distinguish between different types of webhook URLs
    const key = `${prefix}_webhook_url`;
    
    // Use our secure storage utility which encrypts data
    secureStorage.setItem(key, webhookUrl);
    
    logger.info(`Webhook URL stored securely for ${prefix}`);
  } catch (error) {
    logger.error('Error storing webhook URL:', error);
  }
};

// Helper to securely retrieve webhook URLs
const securelyRetrieveWebhookUrl = (prefix: string = 'zapier'): string | null => {
  try {
    const key = `${prefix}_webhook_url`;
    return secureStorage.getItem(key);
  } catch (error) {
    logger.error('Error retrieving webhook URL:', error);
    return null;
  }
};

// Base function to trigger a Zapier webhook with proper validation
export const triggerZap = async (event: string, payload: Record<string, any>) => {
  try {
    logger.info(`Triggering Zapier webhook for event: ${event}`, { event });
    
    // Validate webhook URL
    const webhookUrl = payload.webhookUrl;
    
    if (!webhookUrl) {
      throw new Error("Zapier webhook URL not provided");
    }
    
    // Validate the webhook URL format
    const isValid = await validateApiCredential(webhookUrl, 'zapier', {
      logAttempts: true,
      redactSensitive: false
    });
    
    if (!isValid) {
      logger.warn(`Invalid Zapier webhook URL format: ${webhookUrl}`);
      return { 
        success: false, 
        message: "Invalid Zapier webhook URL format" 
      };
    }
    
    // Sanitize event name and payload values to prevent injection
    const sanitizedEvent = sanitizeInput(event);
    const sanitizedPayload = Object.entries(payload).reduce((acc, [key, value]) => {
      // Only sanitize string values
      acc[key] = typeof value === 'string' ? sanitizeInput(value) : value;
      return acc;
    }, {} as Record<string, any>);
    
    // Prepare request body
    const requestBody = {
      event: sanitizedEvent,
      payload: sanitizedPayload,
      timestamp: new Date().toISOString(),
      source: 'Allora AI Platform'
    };
    
    // Use our improved webhook execution with better logging
    const result = await executeAndLogWebhook(webhookUrl, requestBody, 'zapier', sanitizedEvent);
    
    logger.info('Zapier webhook execution result', {
      event: sanitizedEvent,
      success: result.success
    });
    
    return { success: result.success, message: result.message };
  } catch (error: any) {
    logger.error("Error triggering Zapier webhook:", error);
    return { success: false, error };
  }
};

// React hook for using Zapier within components
export const useZapier = () => {
  const { trackAction } = useSelfLearning();
  
  // Regular component-based webhook triggering (for buttons, etc)
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
    
    // Store the webhook URL securely for future use
    securelyStoreWebhookUrl(webhookUrl.trim());
    
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
  
  // Automatic business event based webhook triggering
  const triggerBusinessEvent = async (
    eventType: BusinessEventType,
    payload: BusinessEventPayload
  ) => {
    // Get the webhook URL from secure storage
    const webhookUrl = securelyRetrieveWebhookUrl('zapier') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
    
    if (!webhookUrl) {
      logger.warn("No Zapier webhook URL configured. Business event not sent.");
      return { success: false, error: new Error("No Zapier webhook URL configured") };
    }
    
    // Prepare the full payload
    const fullPayload = {
      ...payload,
      webhookUrl,
      timestamp: payload.timestamp || new Date().toISOString(),
      source: 'Allora AI Business Event'
    };
    
    logger.info(`Triggering business event: ${eventType}`, { 
      eventType, 
      entityId: payload.entityId, 
      entityType: payload.entityType 
    });
    
    const result = await triggerZap(eventType, fullPayload);
    
    // Track the automatic business event trigger
    trackAction(
      'auto_business_event',
      'automation',
      payload.entityId,
      payload.entityType,
      {
        eventType,
        success: result.success
      }
    );
    
    return result;
  };
  
  return {
    triggerWorkflow: triggerZapierWorkflow,
    triggerBusinessEvent
  };
};

// Standalone function for components that don't use hooks
export const triggerBusinessEvent = async (
  eventType: BusinessEventType,
  payload: BusinessEventPayload
) => {
  // Get the webhook URL from secure storage
  const webhookUrl = securelyRetrieveWebhookUrl('zapier') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
  
  if (!webhookUrl) {
    logger.warn("No Zapier webhook URL configured. Business event not sent.");
    return { success: false, error: new Error("No Zapier webhook URL configured") };
  }
  
  // Add webhook URL to payload
  const fullPayload = {
    ...payload,
    webhookUrl,
    timestamp: payload.timestamp || new Date().toISOString(),
  };
  
  return await triggerZap(eventType, fullPayload);
};
