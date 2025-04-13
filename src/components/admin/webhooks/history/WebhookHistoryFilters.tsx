
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface WebhookHistoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  webhookTypes: string[];
}

export function WebhookHistoryFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  webhookTypes
}: WebhookHistoryFiltersProps) {
  const statusOptions = ['success', 'failed', 'pending'];
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
  };
  
  const hasFilters = searchTerm || statusFilter || typeFilter;
  
  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search webhooks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        
        <div className="flex flex-1 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Webhook Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {webhookTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={handleClearFilters} className="h-10 w-10">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {hasFilters && (
        <div className="flex items-center text-sm">
          <Filter className="mr-2 h-4 w-4" />
          <span>
            Filtering by:
            {searchTerm && <span className="ml-1 font-medium">Search term "{searchTerm}"</span>}
            {statusFilter && <span className="ml-1 font-medium">Status "{statusFilter}"</span>}
            {typeFilter && <span className="ml-1 font-medium">Type "{typeFilter}"</span>}
          </span>
        </div>
      )}
    </div>
  );
}
