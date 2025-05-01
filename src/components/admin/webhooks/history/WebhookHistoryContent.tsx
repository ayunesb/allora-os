
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WebhookEventTable from '@/components/admin/webhooks/WebhookEventTable';
import { useWebhookHistory } from '../useWebhookHistory';
import { Button } from '@/components/ui/button';
import { Search, Filter, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { WebhookType } from '@/types/fixed/Webhook';

export function WebhookHistoryContent() {
  const {
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
  } = useWebhookHistory();

  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as 'success' | 'failed' | 'pending' | 'all');
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as WebhookType | 'all');
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Events</CardTitle>
        <CardDescription>
          View and manage your webhook event history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Search and filter controls */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
              
              {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {/* Filters row */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status-filter" className="text-sm font-medium">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="type-filter" className="text-sm font-medium">
                  Webhook Type
                </label>
                <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="zapier">Zapier</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            {filteredEvents.length === 0 ? (
              'No events found'
            ) : (
              `Showing ${(currentPage - 1) * 10 + 1}-${Math.min(currentPage * 10, filteredEvents.length)} of ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`
            )}
          </div>
          
          {/* Events table */}
          <WebhookEventTable events={paginatedEvents} isLoading={isLoading} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
                
                {getPaginationItems()}
                
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
