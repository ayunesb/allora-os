
// This is a placeholder implementation for the zapier library
// In a real application, this would be a more robust implementation
// that integrates with Zapier webhooks

import { useState } from 'react';

export type BusinessEventType = 
  | 'LEAD_CONVERTED' 
  | 'CAMPAIGN_CREATED'
  | 'REVENUE_MILESTONE'
  | 'STRATEGY_APPROVED'
  | 'TASK_COMPLETED';

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

export function useZapier() {
  const [state, setState] = useState<ZapierState>({
    webhookUrl: localStorage.getItem('zapierWebhookUrl') || '',
    isLoading: false,
    lastTriggered: null,
    error: null,
  });

  const updateWebhookUrl = (url: string) => {
    localStorage.setItem('zapierWebhookUrl', url);
    setState(prev => ({ ...prev, webhookUrl: url }));
  };

  const triggerWebhook = async (eventType: BusinessEventType, data: Record<string, any>) => {
    if (!state.webhookUrl) {
      setState(prev => ({ ...prev, error: 'No webhook URL configured' }));
      return false;
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
      
      return true;
    } catch (error) {
      console.error('Error triggering Zapier webhook:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }));
      
      return false;
    }
  };

  return {
    ...state,
    updateWebhookUrl,
    triggerWebhook,
  };
}
