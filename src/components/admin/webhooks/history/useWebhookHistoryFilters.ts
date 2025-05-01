
import { useState, useEffect, useMemo } from 'react';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { normalizeWebhookEvent } from '@/utils/authCompatibility';

export default function useWebhookHistoryFilters(events: UnifiedWebhookEvent[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  // Normalize all events to ensure consistent properties
  const normalizedEvents = useMemo(() => 
    events.map(event => normalizeWebhookEvent(event)), 
    [events]
  );
  
  // Extract unique event types for filter dropdown
  const eventTypes = useMemo(() => {
    const types = new Set<string>();
    normalizedEvents.forEach((event) => {
      if (event.eventType) types.add(event.eventType);
    });
    return Array.from(types);
  }, [normalizedEvents]);

  // Filter events based on search query, status, and type
  const filteredEvents = useMemo(() => {
    return normalizedEvents.filter((event) => {
      // Filter by search query (case-insensitive)
      const matchesSearch = searchQuery === '' || 
        (event.eventType && event.eventType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.url && event.url.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by status
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      
      // Filter by event type
      const matchesType = typeFilter === 'all' || event.eventType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [normalizedEvents, searchQuery, statusFilter, typeFilter]);

  // Get paginated results
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(startIndex, startIndex + eventsPerPage);
  }, [filteredEvents, currentPage, eventsPerPage]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const hasMorePages = currentPage < totalPages;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    eventTypes,
    filteredEvents,
    paginatedEvents,
    totalPages,
    hasMorePages,
    eventsPerPage
  };
}
