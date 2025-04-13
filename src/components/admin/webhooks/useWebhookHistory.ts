
import { useState, useEffect, useCallback } from 'react';
import { WebhookEvent } from '@/types/webhooks';
import { toast } from 'sonner';
import { WebhookType } from '@/utils/webhookValidation';

/**
 * Custom hook for managing webhook event history
 */
export const useWebhookHistory = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  
  // Event data state
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<WebhookEvent[]>([]);
  const [paginatedEvents, setPaginatedEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  
  // Available options for filtering
  const webhookTypes: WebhookType[] = ['stripe', 'zapier', 'github', 'slack', 'custom'];
  
  // Load events from localStorage (or in a real app, from the database)
  useEffect(() => {
    const loadEvents = () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would fetch from your API or database
        const storedHistory = localStorage.getItem('webhook_event_history');
        
        if (!storedHistory) {
          setWebhookEvents([]);
          setFilteredEvents([]);
          setIsLoading(false);
          return;
        }
        
        const history = JSON.parse(storedHistory);
        const eventsList = history.events || [];
        
        // Add sample events for demo if none exist
        if (eventsList.length === 0) {
          const sampleEvents: WebhookEvent[] = [
            {
              id: 'wh_1',
              webhookType: 'zapier',
              eventType: 'lead_created',
              targetUrl: 'https://hooks.zapier.com/hooks/catch/12345/abcdef/',
              source: 'app',
              status: 'success',
              timestamp: new Date().toISOString(),
              payload: { data: 'lead data' },
              response: { status: '200' },
              duration: 120
            },
            {
              id: 'wh_2',
              webhookType: 'stripe',
              eventType: 'payment.success',
              targetUrl: 'https://api.example.com/webhooks/stripe',
              source: 'stripe',
              status: 'success',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              payload: { data: 'payment data' },
              response: { status: '200' },
              duration: 89
            },
            {
              id: 'wh_3',
              webhookType: 'slack',
              eventType: 'notification',
              targetUrl: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXX',
              source: 'app',
              status: 'failed',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              payload: { message: 'Test notification' },
              response: { error: 'Invalid token' },
              duration: 67,
              errorMessage: 'Authentication failed'
            }
          ];
          
          // Save sample events to localStorage for demo
          localStorage.setItem('webhook_event_history', JSON.stringify({
            version: 1,
            events: sampleEvents,
            lastUpdated: new Date().toISOString()
          }));
          
          setWebhookEvents(sampleEvents);
          setFilteredEvents(sampleEvents);
        } else {
          setWebhookEvents(eventsList);
          setFilteredEvents(eventsList);
        }
      } catch (error) {
        console.error('Error loading webhook history:', error);
        setWebhookEvents([]);
        setFilteredEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);
  
  // Calculate paginated events whenever filtered events or pagination settings change
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedEvents(filteredEvents.slice(startIndex, endIndex));
  }, [filteredEvents, currentPage, pageSize]);
  
  // Apply filters when they change
  useEffect(() => {
    if (!webhookEvents.length) return;
    
    setIsLoading(true);
    
    // Apply filters
    let result = [...webhookEvents];
    
    if (searchTerm) {
      const lowerCaseQuery = searchTerm.toLowerCase();
      result = result.filter(
        event => 
          event.webhookType.toLowerCase().includes(lowerCaseQuery) ||
          (event.eventType && event.eventType.toLowerCase().includes(lowerCaseQuery)) ||
          event.targetUrl.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    if (statusFilter) {
      result = result.filter(event => event.status === statusFilter);
    }
    
    if (typeFilter) {
      result = result.filter(event => event.webhookType === typeFilter);
    }
    
    // Set filtered events and reset to first page if filters changed
    setFilteredEvents(result);
    if (result.length > 0 && result.length !== filteredEvents.length) {
      setCurrentPage(1);
    }
    
    setIsLoading(false);
  }, [webhookEvents, searchTerm, statusFilter, typeFilter]);
  
  // Calculate total pages based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  
  // Handle exporting history
  const handleExportHistory = useCallback(() => {
    try {
      // Prepare data
      const exportData = {
        exportDate: new Date().toISOString(),
        events: webhookEvents
      };
      
      // Create blob and download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `webhook-history-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Webhook history exported successfully');
    } catch (error) {
      console.error('Error exporting webhook history:', error);
      toast.error('Failed to export webhook history');
    }
  }, [webhookEvents]);
  
  // Handle clearing history
  const handleClearHistory = useCallback(() => {
    try {
      // Clear from localStorage (or in a real app, from the database)
      localStorage.setItem('webhook_event_history', JSON.stringify({
        version: 1,
        events: [],
        lastUpdated: new Date().toISOString()
      }));
      
      setWebhookEvents([]);
      setFilteredEvents([]);
      
      toast.success('Webhook history cleared successfully');
    } catch (error) {
      console.error('Error clearing webhook history:', error);
      toast.error('Failed to clear webhook history');
    }
  }, []);

  return {
    webhookEvents,
    filteredEvents,
    paginatedEvents,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    totalPages,
    pageSize,
    handlePageChange: setCurrentPage,
    webhookTypes,
    handleExportHistory,
    handleClearHistory
  };
};
