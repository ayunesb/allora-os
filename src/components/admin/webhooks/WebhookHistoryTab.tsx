
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, History, Search } from "lucide-react";
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
import { WebhookEvent, useWebhookHistory } from './useWebhookHistory';
import WebhookEventTable from './WebhookEventTable';
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Component for displaying webhook event history with filtering and pagination
 */
const WebhookHistoryTab: React.FC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Get webhook events from the hook
  const { 
    webhookEvents, 
    isLoading, 
    clearHistory, 
    exportHistory 
  } = useWebhookHistory();

  // Apply filters
  const filteredEvents = webhookEvents.filter((event) => {
    const matchesSearch = searchTerm === '' || 
      event.targetUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.payload && JSON.stringify(event.payload).toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.webhookType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get page data
  const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + PAGE_SIZE);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get unique webhook types for the filter dropdown
  const webhookTypes = Array.from(new Set(webhookEvents.map(event => event.webhookType)));

  const handleExportHistory = () => {
    exportHistory();
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all webhook history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Webhook Event History
        </CardTitle>
        <CardDescription>
          View and analyze past webhook events, their status, and payloads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
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
        
        {/* Event count */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, filteredEvents.length)} of {filteredEvents.length} events
          </div>
          
          <div className="flex space-x-2 items-center">
            <Badge variant="outline">
              <Filter className="h-3 w-3 mr-1" />
              Filters: {statusFilter !== 'all' || typeFilter !== 'all' || searchTerm ? 'Active' : 'None'}
            </Badge>
          </div>
        </div>
        
        {/* Event table */}
        <WebhookEventTable 
          events={paginatedEvents} 
          isLoading={isLoading} 
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  const distance = Math.abs(page - currentPage);
                  return distance === 0 || distance === 1 || page === 1 || page === totalPages;
                })
                .map((page, index, array) => {
                  // Show ellipsis for skipped pages
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <PaginationItem>
                          <PaginationLink disabled>...</PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    </React.Fragment>
                  );
                })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookHistoryTab;
