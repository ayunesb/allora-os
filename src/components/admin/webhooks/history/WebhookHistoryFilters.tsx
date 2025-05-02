
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { WebhookType, WebhookStatus } from '@/types/fixed/Webhook';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { WebhookFilterState } from '@/hooks/admin/useWebhookHistoryFilters';

interface WebhookHistoryFiltersProps {
  events: UnifiedWebhookEvent[];
  availableTypes?: WebhookType[];
  availableStatuses?: WebhookStatus[];
  currentFilters: WebhookFilterState;
  onFilterChange: (filters: WebhookFilterState) => void;
}

export const WebhookHistoryFilters: React.FC<WebhookHistoryFiltersProps> = ({
  events,
  availableTypes = [],
  availableStatuses = [],
  currentFilters,
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<WebhookFilterState>(currentFilters);
  
  // Update local filters when parent filters change
  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleTypeSelect = (type: WebhookType) => {
    let newTypes: WebhookType[];
    
    if (filters.types.includes(type)) {
      newTypes = filters.types.filter((t) => t !== type);
    } else {
      newTypes = [...filters.types, type];
    }
    
    const updatedFilters = { ...filters, types: newTypes };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleStatusChange = (status: WebhookStatus | "") => {
    const updatedFilters = { ...filters, status: status };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleDateChange = (date: Date | null, index: 0 | 1) => {
    const newRange: [Date | null, Date | null] = [...filters.dateRange];
    newRange[index] = date;
    
    const updatedFilters = { ...filters, dateRange: newRange };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, searchQuery: e.target.value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const clearFilters = () => {
    const clearedFilters: WebhookFilterState = {
      types: [],
      status: '',
      dateRange: [null, null],
      searchQuery: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const hasActiveFilters = 
    filters.types.length > 0 || 
    filters.status !== '' || 
    filters.dateRange[0] !== null || 
    filters.dateRange[1] !== null || 
    filters.searchQuery !== '';

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search webhooks..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        {/* Webhook Type Filter */}
        <div className="flex-none">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto justify-start"
              >
                {filters.types.length > 0 
                  ? `${filters.types.length} Type${filters.types.length > 1 ? 's' : ''}`
                  : 'Filter by Type'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
              <div className="p-2">
                {availableTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center p-2 cursor-pointer hover:bg-muted rounded-md"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <div className="flex items-center h-4 w-4 mr-2">
                      {filters.types.includes(type) && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
                {availableTypes.length === 0 && (
                  <div className="p-2 text-muted-foreground italic text-sm">
                    No webhook types available
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Status Filter */}
        <div className="flex-none">
          <Select
            value={filters.status}
            onValueChange={(value: any) => handleStatusChange(value as WebhookStatus | "")}
          >
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Range */}
        <div className="flex-none">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange[0] && filters.dateRange[1] 
                  ? `${format(filters.dateRange[0], 'MMM d')} - ${format(filters.dateRange[1], 'MMM d')}`
                  : filters.dateRange[0]
                  ? `From ${format(filters.dateRange[0], 'MMM d')}`
                  : filters.dateRange[1]
                  ? `Until ${format(filters.dateRange[1], 'MMM d')}`
                  : 'Date Range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="flex gap-2 flex-col md:flex-row p-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Start Date</p>
                  <div className="border rounded-md">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange[0] || undefined}
                      onSelect={(date) => handleDateChange(date, 0)}
                      disabled={(date) => filters.dateRange[1] ? date > filters.dateRange[1] : false}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">End Date</p>
                  <div className="border rounded-md">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange[1] || undefined}
                      onSelect={(date) => handleDateChange(date, 1)}
                      disabled={(date) => filters.dateRange[0] ? date < filters.dateRange[0] : false}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t p-3 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    handleDateChange(null, 0);
                    handleDateChange(null, 1);
                  }}
                >
                  Clear
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {}}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex-none">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearFilters}
              className="w-full md:w-auto"
            >
              <X className="h-4 w-4" />
              <span className="ml-2 md:hidden">Clear Filters</span>
            </Button>
          </div>
        )}
      </div>
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.types.map((type) => (
            <Badge key={type} variant="secondary" className="capitalize">
              {type}
              <button
                onClick={() => handleTypeSelect(type)}
                className="ml-1 rounded-full hover:bg-muted inline-flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {filters.status && (
            <Badge variant="secondary" className="capitalize">
              Status: {filters.status}
              <button
                onClick={() => handleStatusChange('')}
                className="ml-1 rounded-full hover:bg-muted inline-flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {(filters.dateRange[0] || filters.dateRange[1]) && (
            <Badge variant="secondary">
              {filters.dateRange[0] && filters.dateRange[1] 
                ? `${format(filters.dateRange[0], 'MMM d')} - ${format(filters.dateRange[1], 'MMM d')}`
                : filters.dateRange[0]
                ? `From ${format(filters.dateRange[0], 'MMM d')}`
                : `Until ${format(filters.dateRange[1]!, 'MMM d')}`}
              <button
                onClick={() => {
                  handleDateChange(null, 0);
                  handleDateChange(null, 1);
                }}
                className="ml-1 rounded-full hover:bg-muted inline-flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.searchQuery && (
            <Badge variant="secondary">
              Search: {filters.searchQuery}
              <button
                onClick={() => handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                className="ml-1 rounded-full hover:bg-muted inline-flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default WebhookHistoryFilters;
