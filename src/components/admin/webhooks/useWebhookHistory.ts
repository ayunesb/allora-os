
import { useState, useEffect } from 'react';
import { WebhookEvent, WebhookType } from '@/types/fixed/Webhook';
import { getWebhookEvents } from '@/services/webhookService';

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
        const webhookEvents = await getWebhookEvents();
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
        event.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.webhook_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(event => event.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(event => event.webhook_type === typeFilter);
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
