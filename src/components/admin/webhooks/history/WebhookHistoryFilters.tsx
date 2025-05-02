
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { WebhookType, WebhookStatus } from '@/types/unified-types';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WebhookFilterState } from '@/hooks/admin/useWebhookHistoryFilters';

interface WebhookHistoryFiltersProps {
  filter: WebhookFilterState;
  onFilterChange: (filter: Partial<WebhookFilterState>) => void;
  onResetFilters: () => void;
}

const typeOptions: WebhookType[] = ['zapier', 'custom', 'slack', 'github', 'stripe', 'notion'];

const statusOptions: WebhookStatus[] = ['success', 'failed', 'pending'];

export default function WebhookHistoryFilters({ 
  filter, 
  onFilterChange,
  onResetFilters,
}: WebhookHistoryFiltersProps) {
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const { types, status, dateRange, search } = filter;
  
  // Handle type selection/deselection
  const handleTypeSelect = (type: WebhookType) => {
    if (types.includes(type)) {
      onFilterChange({ types: types.filter(t => t !== type) });
    } else {
      onFilterChange({ types: [...types, type] });
    }
  };
  
  // Format date range for display
  const formatDateRange = () => {
    const [start, end] = dateRange;
    
    if (start && end) {
      return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
    }
    
    if (start) {
      return `From ${format(start, 'MMM d, yyyy')}`;
    }
    
    if (end) {
      return `Until ${format(end, 'MMM d, yyyy')}`;
    }
    
    return 'All dates';
  };
  
  return (
    <div className="space-y-4 mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filter Webhook Events</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
          className="h-7 text-xs"
        >
          Reset filters
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Filter */}
        <div className="space-y-1">
          <Label htmlFor="search" className="text-xs">Search</Label>
          <div className="flex">
            <Input
              id="search"
              placeholder="Search by URL or payload"
              value={search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="h-8 text-xs"
            />
            {search && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => onFilterChange({ search: '' })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Status Filter */}
        <div className="space-y-1">
          <Label htmlFor="status" className="text-xs">Status</Label>
          <Select 
            value={status} 
            onValueChange={(value) => onFilterChange({ status: value as WebhookStatus | '' })}
          >
            <SelectTrigger id="status" className="h-8 text-xs">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              {statusOptions.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Range Filter */}
        <div className="space-y-1">
          <Label className="text-xs">Date Range</Label>
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left h-8 text-xs font-normal"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {formatDateRange()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange[0] || undefined,
                  to: dateRange[1] || undefined
                }}
                onSelect={(range) => {
                  onFilterChange({ 
                    dateRange: [range?.from || null, range?.to || null] as [Date | null, Date | null]
                  });
                  setDatePopoverOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Type Filter */}
      <div className="space-y-1">
        <Label className="text-xs">Webhook Types</Label>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(type => (
            <Badge 
              key={type}
              variant={types.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTypeSelect(type)}
            >
              {type}
              {types.includes(type) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Active Filters Summary */}
      {(types.length > 0 || status || dateRange[0] || dateRange[1] || search) && (
        <div className="pt-2 flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          <span>Active filters:</span>
          {types.length > 0 && (
            <span>{types.length} type{types.length !== 1 ? 's' : ''}</span>
          )}
          {status && (
            <span>Status: {status}</span>
          )}
          {(dateRange[0] || dateRange[1]) && (
            <span>Date: {formatDateRange()}</span>
          )}
          {search && (
            <span>Search: "{search}"</span>
          )}
        </div>
      )}
    </div>
  );
}
