
import { useState, useCallback, useEffect } from 'react';
import { WebhookEvent } from '@/types/unified-types';

export function useWebhookHistory() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const refreshEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock implementation - replace with actual API call
      // const response = await fetch('/api/webhooks/events');
      // const data = await response.json();
      // setEvents(data);
      setEvents([]);
    } catch (err) {
      setError('Failed to fetch webhook events');
      console.error('Error fetching webhook events:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Initial fetch
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);
  
  return {
    events,
    isLoading,
    error,
    refreshEvents
  };
}
