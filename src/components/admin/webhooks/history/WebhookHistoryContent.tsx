
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WebhookType } from '@/utils/webhookValidation';
import { Download, Filter, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/ui/pagination';
import { WebhookHistoryFilters } from './WebhookHistoryFilters';
import { WebhookEventRow } from './WebhookEventRow';
import { WebhookEvent } from '@/types/webhooks';

export interface WebhookHistoryContentProps {
  webhookEvents: WebhookEvent[];
  filteredEvents: WebhookEvent[];
  paginatedEvents: WebhookEvent[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  webhookTypes: string[];
  handleExportHistory: () => void;
  handleClearHistory: () => void;
}

export function WebhookHistoryContent({
  webhookEvents,
  filteredEvents,
  paginatedEvents,
  isLoading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  currentPage,
  totalPages,
  pageSize,
  handlePageChange,
  webhookTypes,
  handleExportHistory,
  handleClearHistory
}: WebhookHistoryContentProps) {
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Webhook Event History</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportHistory}
            disabled={filteredEvents.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            disabled={webhookEvents.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear History
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <WebhookHistoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          webhookTypes={webhookTypes}
        />
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading webhook events...</p>
                  </TableCell>
                </TableRow>
              ) : paginatedEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <p className="text-muted-foreground">No webhook events found</p>
                    {(searchTerm || statusFilter || typeFilter) && (
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('');
                          setTypeFilter('');
                        }}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEvents.map((event) => (
                  <WebhookEventRow 
                    key={event.id} 
                    event={event} 
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredEvents.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min((currentPage - 1) * pageSize + 1, filteredEvents.length)} to{' '}
              {Math.min(currentPage * pageSize, filteredEvents.length)} of {filteredEvents.length} results
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
