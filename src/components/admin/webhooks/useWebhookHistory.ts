
import { useState, useEffect } from 'react';
import { WebhookEvent, WebhookType } from '@/types/unified-types';

export const useWebhookHistory = () => {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'success' | 'failed' | 'pending' | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<WebhookType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Mock data for demo
        const webhookEvents: WebhookEvent[] = [
          {
            id: "1",
            webhook_id: "wh_123",
            event_type: "test_event",
            webhookType: "zapier",
            webhook_type: "zapier",
            status: "success",
            payload: { test: true },
            created_at: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            targetUrl: "https://hooks.zapier.com/hooks/catch/123456/abcdef/"
          },
          {
            id: "2",
            webhook_id: "wh_456",
            event_type: "campaign_created",
            webhookType: "slack",
            webhook_type: "slack",
            status: "failed",
            payload: { campaign: "Summer Sale" },
            created_at: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            targetUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
          }
        ];
        
        setEvents(webhookEvents);
        setFilteredEvents(webhookEvents);
      } catch (err) {
        setError('Failed to load webhook history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(event => 
        event.targetUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.webhookType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(event => event.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(event => event.webhookType === typeFilter);
    }
    
    setFilteredEvents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, typeFilter, events]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  return {
    events,
    filteredEvents,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedEvents
  };
};
