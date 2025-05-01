
/**
 * Zapier Integration Library
 * Provides utilities for working with Zapier webhooks
 */

import { useState } from 'react';
import { BusinessEventType, WebhookResult } from '@/utils/webhookTypes';

export interface BusinessEventPayload {
  eventType: BusinessEventType;
  timestamp: string;
  data: Record<string, any>;
}

interface ZapierState {
  webhookUrl: string;
  isLoading: boolean;
  lastTriggered: Date | null;
  error: string | null;
}

/**
 * Custom hook for interacting with Zapier webhooks
 */
export function useZapier() {
  const [state, setState] = useState<ZapierState>({
    webhookUrl: localStorage.getItem('zapier_webhook_url') || '',
    isLoading: false,
    lastTriggered: null,
    error: null,
  });

  /**
   * Update the webhook URL in state and local storage
   */
  const updateWebhookUrl = (url: string) => {
    localStorage.setItem('zapier_webhook_url', url);
    setState(prev => ({ ...prev, webhookUrl: url }));
  };

  /**
   * Trigger a webhook with the specified event type and data
   */
  const triggerWebhook = async (eventType: BusinessEventType, data: Record<string, any>): Promise<WebhookResult> => {
    if (!state.webhookUrl) {
      setState(prev => ({ ...prev, error: 'No webhook URL configured' }));
      return { success: false, message: 'No webhook URL configured' };
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const payload: BusinessEventPayload = {
      eventType,
      timestamp: new Date().toISOString(),
      data,
    };

    try {
      // Use no-cors to handle CORS issues with Zapier webhooks
      await fetch(state.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        lastTriggered: new Date(),
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Error triggering Zapier webhook:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage
      }));
      
      return { success: false, message: errorMessage, error };
    }
  };
  
  /**
   * For compatibility with external modules
   */
  const triggerBusinessEvent = async (eventType: BusinessEventType, data: Record<string, any>): Promise<WebhookResult> => {
    return triggerWebhook(eventType, data);
  };

  return {
    webhookUrl: state.webhookUrl,
    isLoading: state.isLoading,
    lastTriggered: state.lastTriggered,
    error: state.error,
    updateWebhookUrl,
    triggerWebhook,
    triggerBusinessEvent
  };
}

/**
 * Standalone function to trigger a business event (for non-hook usage)
 */
export const triggerBusinessEvent = async (
  eventType: BusinessEventType,
  data: Record<string, any>
): Promise<WebhookResult> => {
  try {
    const webhookUrl = localStorage.getItem('zapier_webhook_url');
    if (!webhookUrl) {
      return { success: false, message: 'No webhook URL configured' };
    }

    const payload: BusinessEventPayload = {
      eventType,
      timestamp: new Date().toISOString(),
      data,
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error('Error triggering business event:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
};
