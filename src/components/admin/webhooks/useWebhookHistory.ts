
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WebhookEvent, WebhookType } from '@/types/fixed/Webhook';
import { fetchWebhookEvents } from '@/services/webhookService';

export function useWebhookHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  
  // Fetch webhook events
  const { 
    data: events = [], 
    isLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['webhookEvents'],
    queryFn: fetchWebhookEvents
  });
  
  // Update local state when events are fetched
  useEffect(() => {
    if (events) {
      setWebhookEvents(events);
    }
  }, [events]);
  
  // Apply filters to events
  const filteredEvents = useMemo(() => {
    return webhookEvents.filter(event => {
      // Apply search filter
      const searchMatch = !searchTerm || 
        event.targetUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.status && event.status.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Apply status filter
      const statusMatch = !statusFilter || event.status === statusFilter;
      
      // Apply type filter
      const typeMatch = !typeFilter || event.webhookType === typeFilter;
      
      return searchMatch && statusMatch && typeMatch;
    });
  }, [webhookEvents, searchTerm, statusFilter, typeFilter]);
  
  // Calculate pagination
  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / pageSize);
  
  // Get paginated events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEvents.slice(startIndex, startIndex + pageSize);
  }, [filteredEvents, currentPage, pageSize]);
  
  // Mock functions to simulate webhook actions
  const retryWebhook = async (webhookEventId: string) => {
    try {
      // In a real implementation, this would call an API
      console.log(`Retrying webhook ${webhookEventId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setWebhookEvents(prev => prev.map(event => {
        if (event.id === webhookEventId) {
          return {
            ...event,
            status: 'success',
            responseCode: 200,
            response: { success: true },
            timestamp: new Date().toISOString()
          };
        }
        return event;
      }));
      
      return true;
    } catch (error) {
      console.error('Error retrying webhook:', error);
      return false;
    }
  };
  
  const deleteWebhook = async (webhookEventId: string) => {
    try {
      // In a real implementation, this would call an API
      console.log(`Deleting webhook ${webhookEventId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setWebhookEvents(prev => prev.filter(event => event.id !== webhookEventId));
      
      return true;
    } catch (error) {
      console.error('Error deleting webhook:', error);
      return false;
    }
  };
  
  const archiveWebhook = async (webhookEventId: string) => {
    try {
      // In a real implementation, this would call an API
      console.log(`Archiving webhook ${webhookEventId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setWebhookEvents(prev => prev.map(event => {
        if (event.id === webhookEventId) {
          return {
            ...event,
            status: 'archived'
          };
        }
        return event;
      }));
      
      return true;
    } catch (error) {
      console.error('Error archiving webhook:', error);
      return false;
    }
  };
  
  return {
    events: webhookEvents,
    filteredEvents,
    isLoading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedEvents,
    retryWebhook,
    deleteWebhook,
    archiveWebhook,
    webhookEvents
  };
}
