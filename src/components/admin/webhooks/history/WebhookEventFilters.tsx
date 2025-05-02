import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WebhookStatus, WebhookType } from '@/types/fixed/Webhook';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { SearchIcon, FilterIcon } from 'lucide-react';

interface WebhookEventFiltersProps {
  filters: {
    types: WebhookType[];
    status: WebhookStatus | '';
    dateRange: [Date | null, Date | null];
    search: string;
  };
  onFilterChange: (filters: any) => void;
  availableTypes: WebhookType[];
}

const WebhookEventFilters: React.FC<WebhookEventFiltersProps> = ({ 
  filters, 
  onFilterChange,
  availableTypes 
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value as WebhookStatus | ''
    });
  };

  const handleTypeChange = (value: string) => {
    // If "all" is selected, clear the types filter
    if (value === 'all') {
      onFilterChange({
        ...filters,
        types: []
      });
      return;
    }
    
    // Otherwise, set the type filter to just this type
    onFilterChange({
      ...filters,
      types: [value as WebhookType]
    });
  };

  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    onFilterChange({
      ...filters,
      dateRange
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Search Input */}
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search events..."
                className="pl-8"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <Label htmlFor="status-filter">Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Type Filter */}
          <div>
            <Label htmlFor="type-filter">Webhook Type</Label>
            <Select 
              value={filters.types.length > 0 ? filters.types[0] : 'all'} 
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {availableTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Range Picker */}
          <div>
            <Label htmlFor="date-range">Date Range</Label>
            <DatePickerWithRange 
              value={{ from: filters.dateRange[0], to: filters.dateRange[1] }}
              onChange={(range) => handleDateRangeChange([range?.from || null, range?.to || null])}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookEventFilters;
