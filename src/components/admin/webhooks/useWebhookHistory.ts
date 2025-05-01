import { useState, useCallback } from 'react';
import { WebhookEvent, WebhookResult } from '@/types/fixed/Webhook';
import { WebhookType } from '@/utils/webhookValidation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface FilterOptions {
  webhookType?: WebhookType;
  dateRange?: { from: Date | null; to: Date | null };
}

export function useWebhookHistory(initialFilter?: FilterOptions) {
  const [filter, setFilter] = useState<FilterOptions | undefined>(initialFilter);
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [activeTab, setActiveTab] = useState<"pending" | "success" | "failed">("success");
  const [filteredEvents, setFilteredEvents] = useState<WebhookEvent[]>([]);

  // Fetch webhook events
  const { data: events = [], isLoading, error, refetch } = useQuery({
    queryKey: ['webhookEvents'],
    queryFn: async () => {
      let query = supabase
        .from('webhook_events')
        .select('*')
        .order('timestamp', { ascending: false });

      if (dateRange.from) {
        query = query.gte('timestamp', dateRange.from.toISOString());
      }
      if (dateRange.to) {
        query = query.lte('timestamp', dateRange.to.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as WebhookEvent[];
    }
  });

  // Function to update the date range
  const updateDateRange = useCallback((newRange: { from: Date | null; to: Date | null }) => {
    setDateRange(newRange);
  }, []);

  // Function to clear the date range
  const clearDateRange = useCallback(() => {
    setDateRange({ from: null, to: null });
  }, []);

  // Function to apply the filter
  const applyFilter = useCallback((newFilter: FilterOptions) => {
    setFilter(newFilter);
  }, []);

  // Function to clear the filter
  const clearFilter = useCallback(() => {
    setFilter(undefined);
  }, []);

  // Filter events based on filter and date range
  const filterEvents = useCallback((events: WebhookEvent[]) => {
    return events.filter(event => {
      // Use webhookType instead of webhook_id for filtering
      if (filter?.webhookType && event.webhookType !== filter.webhookType) {
        return false;
      }

      if (dateRange.from && new Date(event.timestamp) < dateRange.from) {
        return false;
      }
      if (dateRange.to && new Date(event.timestamp) > dateRange.to) {
        return false;
      }
      return true;
    });
  }, [filter, dateRange]);

  // Function to filter events by status
  const filterEventsBy = useCallback((status: "pending" | "success" | "failed") => {
    let filteredEvents: WebhookEvent[] = [];
    
    if (status === "pending") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "pending" || 
        e.status.toLowerCase() === "processing"
      );
    } else if (status === "success") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "success" || 
        e.status.toLowerCase() === "succeeded"
      );
    } else if (status === "failed") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "failed" || 
        e.status.toLowerCase() === "error"
      );
    }
    
    setFilteredEvents(filteredEvents);
    setActiveTab(status);
  }, [events]);

  return {
    events,
    filteredEvents,
    isLoading,
    error,
    refetch,
    filter,
    dateRange,
    activeTab,
    applyFilter,
    clearFilter,
    updateDateRange,
    clearDateRange,
    filterEvents,
    filterEventsBy,
    setFilteredEvents,
    setActiveTab
  };
}
