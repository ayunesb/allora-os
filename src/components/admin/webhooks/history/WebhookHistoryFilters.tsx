
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { WebhookType, WebhookStatus } from '@/types/fixed/Webhook';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { useWebhookHistoryFilters } from '@/hooks/admin/useWebhookHistoryFilters';

export interface WebhookHistoryFiltersProps {
  events: UnifiedWebhookEvent[];
  onFilterChange: (filtered: UnifiedWebhookEvent[]) => void;
}

export function WebhookHistoryFilters({ events, onFilterChange }: WebhookHistoryFiltersProps) {
  const { filters, setFilters, availableTypes, availableStatuses, filteredEvents } = useWebhookHistoryFilters(events);
  
  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredEvents);
  }, [filteredEvents, onFilterChange]);

  const handleDateRangeChange = (range: [Date | null, Date | null]) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      types: value === 'all' ? [] : [value as WebhookType]
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      status: value === 'all' ? '' : value as WebhookStatus
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      types: [],
      status: '',
      dateRange: [null, null],
      searchQuery: ''
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium">
            Search
          </label>
          <Input
            id="search"
            placeholder="Search events..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Service
          </label>
          <Select
            value={filters.types.length > 0 ? filters.types[0] : 'all'}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem>
              {availableTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select
            value={filters.status || 'all'}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {availableStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <DateRangePicker
            value={filters.dateRange}
            onChange={handleDateRangeChange}
            align="start"
            locale="en-US"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredEvents.length} of {events.length} events
      </div>
    </div>
  );
}
