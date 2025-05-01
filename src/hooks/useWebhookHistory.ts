
import { useState, useEffect } from 'react';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { normalizeWebhookEvent } from '@/utils/authCompatibility';
import { toast } from 'sonner';

export function useWebhookHistory() {
  const [events, setEvents] = useState<UnifiedWebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAuth();
  const user = auth.user;

  const fetchWebhookEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // For demonstration, we're using mock data
      // In a real implementation, this would query Supabase
      const mockWebhookEvents: UnifiedWebhookEvent[] = [
        {
          id: '1',
          webhook_id: 'webhook-1',
          eventType: 'lead_created',
          event_type: 'lead_created',
          status: 'success',
          created_at: new Date().toISOString(),
          payload: { email: 'test@example.com', name: 'Test User' },
          response: { success: true },
          targetUrl: 'https://example.com/webhook',
          url: 'https://example.com/webhook',
          webhookType: 'custom',
          webhook_type: 'custom',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          webhook_id: 'webhook-2',
          eventType: 'strategy_approved',
          event_type: 'strategy_approved',
          status: 'failed',
          created_at: new Date().toISOString(),
          payload: { strategy_id: '123', name: 'Growth Strategy' },
          response: { error: 'Connection refused' },
          targetUrl: 'https://api.service.com/webhook',
          url: 'https://api.service.com/webhook',
          webhookType: 'zapier',
          webhook_type: 'zapier',
          timestamp: new Date().toISOString()
        }
      ];

      setEvents(mockWebhookEvents);
    } catch (err) {
      console.error('Error fetching webhook events:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch webhook events'));
      toast.error('Failed to load webhook event history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhookEvents();
  }, [user?.id]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchWebhookEvents
  };
}
