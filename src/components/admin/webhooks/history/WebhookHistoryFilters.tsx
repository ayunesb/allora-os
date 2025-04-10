
import React, { useState } from 'react';
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBreakpoint } from "@/hooks/use-mobile";

interface WebhookHistoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  webhookTypes: string[];
  filteredEventsCount: number;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  handleExportHistory: () => void;
  handleClearHistory: () => void;
}

export const WebhookHistoryFilters: React.FC<WebhookHistoryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  webhookTypes,
  filteredEventsCount,
  totalCount,
  currentPage,
  pageSize,
  handleExportHistory,
  handleClearHistory
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const hasActiveFilters = statusFilter !== 'all' || typeFilter !== 'all' || searchTerm;
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const [showFilters, setShowFilters] = useState(false);
  
  // Reset function to clear all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <>
      {/* Mobile filter toggle */}
      {isMobileView && (
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportHistory}
            >
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearHistory}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    
      {/* Filters */}
      {(!isMobileView || showFilters) && (
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search webhooks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-initial w-full md:w-40">
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-initial w-full md:w-40">
            <Select 
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Webhook Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  {webhookTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {!isMobileView && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportHistory}
              >
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearHistory}
              >
                Clear
              </Button>
            </div>
          )}
          
          {isMobileView && hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>
      )}
      
      {/* Active filters */}
      {hasActiveFilters && !isMobileView && (
        <div className="flex flex-wrap gap-2 mb-3">
          {statusFilter !== 'all' && (
            <Badge variant="outline" className="flex items-center">
              Status: {statusFilter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setStatusFilter('all')} 
              />
            </Badge>
          )}
          
          {typeFilter !== 'all' && (
            <Badge variant="outline" className="flex items-center">
              Type: {typeFilter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setTypeFilter('all')} 
              />
            </Badge>
          )}
          
          {searchTerm && (
            <Badge variant="outline" className="flex items-center">
              Search: {searchTerm}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSearchTerm('')} 
              />
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs h-7 px-2"
          >
            Reset All
          </Button>
        </div>
      )}
      
      {/* Event count */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredEventsCount === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredEventsCount)} of {filteredEventsCount} events
        </div>
        
        {!isMobileView && (
          <div className="flex space-x-2 items-center">
            <Badge variant="outline">
              <Filter className="h-3 w-3 mr-1" />
              Filters: {hasActiveFilters ? 'Active' : 'None'}
            </Badge>
          </div>
        )}
      </div>
    </>
  );
};
