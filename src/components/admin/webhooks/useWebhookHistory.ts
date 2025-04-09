
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { WebhookType } from '@/utils/webhookValidation';

/**
 * Interface for webhook event data structure
 */
export interface WebhookEvent {
  id: string;
  timestamp: string;
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  payload: any;
  status: 'success' | 'error' | 'pending';
  responseCode?: number;
  response?: any;
  errorMessage?: string;
  duration?: number;
}

/**
 * Interface for webhook local storage data
 */
interface WebhookHistoryStorage {
  version: number;
  events: WebhookEvent[];
  lastUpdated: string;
}

/**
 * Custom hook for managing webhook event history
 */
export const useWebhookHistory = () => {
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load webhook history from localStorage on mount
  useEffect(() => {
    loadWebhookHistory();
  }, []);

  /**
   * Load webhook history from localStorage
   */
  const loadWebhookHistory = () => {
    setIsLoading(true);
    try {
      const storedHistory = localStorage.getItem('webhook_event_history');
      
      if (storedHistory) {
        const parsedHistory: WebhookHistoryStorage = JSON.parse(storedHistory);
        // Sort by timestamp, most recent first
        const sortedEvents = parsedHistory.events.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setWebhookEvents(sortedEvents);
      } else {
        setWebhookEvents([]);
      }
    } catch (error) {
      console.error('Error loading webhook history:', error);
      setWebhookEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Save webhook history to localStorage
   */
  const saveWebhookHistory = (events: WebhookEvent[]) => {
    try {
      const historyData: WebhookHistoryStorage = {
        version: 1,
        events,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('webhook_event_history', JSON.stringify(historyData));
      setWebhookEvents(events);
    } catch (error) {
      console.error('Error saving webhook history:', error);
      toast.error('Failed to save webhook event history');
    }
  };

  /**
   * Add a new webhook event to history
   */
  const addWebhookEvent = (event: WebhookEvent) => {
    const updatedEvents = [event, ...webhookEvents];
    saveWebhookHistory(updatedEvents);
    return event.id; // Return the ID for potential future references
  };

  /**
   * Update an existing webhook event (useful for updating status after completion)
   */
  const updateWebhookEvent = (eventId: string, updates: Partial<WebhookEvent>) => {
    const updatedEvents = webhookEvents.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    );
    
    saveWebhookHistory(updatedEvents);
  };

  /**
   * Clear all webhook history
   */
  const clearHistory = () => {
    localStorage.removeItem('webhook_event_history');
    setWebhookEvents([]);
    toast.success('Webhook event history cleared');
  };

  /**
   * Export webhook history as JSON file
   */
  const exportHistory = () => {
    try {
      const historyData: WebhookHistoryStorage = {
        version: 1,
        events: webhookEvents,
        lastUpdated: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(historyData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `webhook-history-${new Date().toISOString().substring(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
      
      toast.success('Webhook history exported successfully');
    } catch (error) {
      console.error('Error exporting webhook history:', error);
      toast.error('Failed to export webhook history');
    }
  };

  /**
   * Generate a test webhook event for demonstration purposes
   */
  const generateTestEvent = (type: WebhookType = 'stripe', status: 'success' | 'error' = 'success') => {
    const payload = {
      event: 'test_event',
      timestamp: new Date().toISOString(),
      data: {
        id: `test_${Math.floor(Math.random() * 1000000)}`,
        source: 'Webhook Testing Tool'
      }
    };
    
    const newEvent: WebhookEvent = {
      id: `wh_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      timestamp: new Date().toISOString(),
      webhookType: type,
      eventType: 'test_webhook',
      targetUrl: `https://api.${type}.com/webhooks/test`,
      payload,
      status,
      responseCode: status === 'success' ? 200 : 400,
      response: status === 'success' ? { received: true } : null,
      errorMessage: status === 'error' ? 'Connection refused' : undefined,
      duration: Math.floor(Math.random() * 1000) + 100,
    };
    
    addWebhookEvent(newEvent);
    toast.success('Test webhook event generated');
    return newEvent.id;
  };

  return {
    webhookEvents,
    isLoading,
    addWebhookEvent,
    updateWebhookEvent,
    clearHistory,
    exportHistory,
    generateTestEvent
  };
};
