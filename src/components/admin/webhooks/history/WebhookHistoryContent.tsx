import React, { useState, useEffect } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Filter, MoreHorizontal, RefreshCw } from 'lucide-react';
import WebhookEventTable from '../WebhookEventTable';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import WebhookEventDetailModal from './WebhookEventDetailModal';
import { cn } from '@/lib/utils';
import useWebhookHistoryFilters from './useWebhookHistoryFilters';
import { Badge } from '@/components/ui/badge';
import CopyButton from '@/components/CopyButton';

interface WebhookHistoryContentProps {
  webhookId: string;
  events: UnifiedWebhookEvent[];
  isLoading: boolean;
  onRefresh: () => void;
}

const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({ 
  webhookId, 
  events, 
  isLoading,
  onRefresh
}) => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    eventTypes,
    paginatedEvents,
    totalPages,
    hasMorePages,
    eventsPerPage
  } = useWebhookHistoryFilters(events);

  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetail = (event: UnifiedWebhookEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <Card className="space-y-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Webhook History</CardTitle>
        <div className="flex items-center space-x-2">
          <CopyButton text={webhookId} className="ml-2" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <MoreHorizontal className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="grid gap-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Search</h4>
                    <Input
                      type="search"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenuSeparator />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Status</h4>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Event Type</h4>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <WebhookEventTable
          events={paginatedEvents}
          isLoading={isLoading}
          onViewDetail={handleViewDetail}
        />
      </CardContent>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="text-sm text-muted-foreground">
          Showing {paginatedEvents.length} of {events.length} events
        </div>
        <div className="flex items-center space-x-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePrevPage();
            }}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </a>
          <Button variant="outline" size="sm" disabled>
            Page {currentPage} of {totalPages}
          </Button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (hasMorePages) handleNextPage();
            }}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              !hasMorePages ? "pointer-events-none opacity-50" : ""
            )}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>

      <WebhookEventDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        event={selectedEvent}
      />
    </Card>
  );
};

export default WebhookHistoryContent;
