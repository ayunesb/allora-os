import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/backend/supabase';
export function useWebhookHistory({ limit = 50, initialFilter } = {}) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const fetchHistory = useCallback(async ({ eventType, status, fromDate, toDate } = {}) => {
        try {
            setIsLoading(true);
            setError(null);
            let query = supabase
                .from('webhook_logs')
                .select('*', { count: 'exact' });
            // Apply filters if provided
            if (eventType) {
                // Handle conversion from Zapier's "lead_created" format to our "lead.created" format
                let mappedEventType = eventType;
                if (eventType === 'lead.created') {
                    mappedEventType = 'lead.created';
                }
                query = query.eq('message_type', mappedEventType);
            }
            if (status) {
                query = query.eq('status', status);
            }
            if (fromDate) {
                query = query.gte('created_at', fromDate.toISOString());
            }
            if (toDate) {
                query = query.lte('created_at', toDate.toISOString());
            }
            // Order by created_at desc and limit results
            query = query.order('created_at', { ascending: false }).limit(limit);
            const { data, error, count } = await query;
            if (error)
                throw error;
            // Transform to WebhookEvent format
            const transformedEvents = (data || []).map((event) => ({
                id: event.id,
                webhook_id: event.webhook_id || '',
                event_type: event.message_type,
                status: event.status,
                created_at: event.created_at,
                payload: event.payload || {},
                targetUrl: event.url,
                webhookType: 'custom', // Default value, should be updated based on URL or other logic
                timestamp: event.created_at,
                response: event.response,
                // Legacy field aliases for backward compatibility
                url: event.url,
            }));
            setEvents(transformedEvents);
            setTotal(count || 0);
        }
        catch (err) {
            console.error('Error fetching webhook history:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
        finally {
            setIsLoading(false);
        }
    }, [limit]);
    // Initial fetch with any provided filters
    useEffect(() => {
        fetchHistory(initialFilter || {});
    }, [fetchHistory, initialFilter]);
    return {
        events,
        isLoading,
        error,
        total,
        fetchHistory,
    };
}
export default useWebhookHistory;
