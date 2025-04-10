
import { useState, useMemo } from 'react';
import { WebhookEvent } from '../useWebhookHistory';

export const useWebhookHistoryFilters = (webhookEvents: WebhookEvent[], pageSize = 10) => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Apply filters
  const filteredEvents = useMemo(() => {
    return webhookEvents.filter((event) => {
      const matchesSearch = searchTerm === '' || 
        event.targetUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.payload && JSON.stringify(event.payload).toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesType = typeFilter === 'all' || event.webhookType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [webhookEvents, searchTerm, statusFilter, typeFilter]);

  // Get unique webhook types for the filter dropdown
  const webhookTypes = useMemo(() => {
    return Array.from(new Set(webhookEvents.map(event => event.webhookType)));
  }, [webhookEvents]);

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    webhookTypes,
    filteredEvents,
    paginatedEvents,
    totalPages,
    pageSize,
    handlePageChange
  };
};
