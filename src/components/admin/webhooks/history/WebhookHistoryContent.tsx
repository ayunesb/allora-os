import React, { useMemo, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WebhookHistoryFilters } from "./WebhookHistoryFilters";
import { WebhookHistoryPagination } from "./WebhookHistoryPagination";
import { WebhookEvent } from "@/types/webhooks";
import { 
  Search, 
  Download, 
  Trash2, 
  RotateCcw, 
  ChevronDown,
  Eye,
  Calendar,
  Clock,
  ArrowUpDown
} from "lucide-react";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { WebhookType } from '@/utils/webhookValidation';
import { useBreakpoint } from '@/hooks/use-mobile';

interface WebhookHistoryContentProps {
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
  webhookTypes: WebhookType[];
  handleExportHistory: () => void;
  handleClearHistory: () => void;
}

export const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({
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
}) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'sm', 'mobile'].includes(breakpoint);
  
  const getStatusBadge = (status: 'success' | 'failed' | 'pending') => {
    switch(status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getTypeBadge = (type: WebhookType) => {
    switch(type) {
      case 'stripe':
        return <Badge className="bg-purple-600">Stripe</Badge>;
      case 'zapier':
        return <Badge className="bg-orange-500">Zapier</Badge>;
      case 'github':
        return <Badge className="bg-gray-800">GitHub</Badge>;
      case 'slack':
        return <Badge className="bg-green-600">Slack</Badge>;
      case 'custom':
        return <Badge className="bg-blue-600">Custom</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const statusCount = useMemo(() => {
    const counts = { pending: 0, success: 0, failed: 0 };
    
    events.forEach(event => {
      const status = event.status.toLowerCase();
      if (status === 'pending' || status === 'processing') {
        counts.pending++;
      } else if (status === 'success' || status === 'succeeded') {
        counts.success++;
      } else if (status === 'failed' || status === 'error') {
        counts.failed++;
      }
    });
    
    return counts;
  }, [events]);

  const filterEventsBy = useCallback((status: "pending" | "success" | "failed") => {
    let filteredEvents: WebhookEvent[] = [];
    
    if (status === "pending") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "pending" || 
        e.status.toLowerCase() === "processing"
      );
    } else if (status === "success") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "success" || 
        e.status.toLowerCase() === "succeeded"
      );
    } else if (status === "failed") {
      filteredEvents = events.filter(e => 
        e.status.toLowerCase() === "failed" || 
        e.status.toLowerCase() === "error"
      );
    }
    
    setFilteredEvents(filteredEvents);
    setActiveTab(status);
  }, [events]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search webhooks..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {webhookTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              title="Export History"
              onClick={handleExportHistory}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              title="Clear History"
              onClick={handleClearHistory}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-md">Webhook Events</CardTitle>
          <CardDescription>
            {isLoading ? (
              'Loading events...'
            ) : (
              `Showing ${paginatedEvents.length} of ${filteredEvents.length} events`
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobileView ? 'p-2' : 'p-4'}>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <RotateCcw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : webhookEvents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No webhook events recorded yet.</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No events matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setTypeFilter('');
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              {isMobileView ? (
                <div className="space-y-3">
                  {paginatedEvents.map((event) => (
                    <Card key={event.id} className="p-3 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          {getTypeBadge(event.webhookType as WebhookType)}
                          <p className="text-sm font-medium mt-1">{event.eventType || 'Generic Event'}</p>
                        </div>
                        <div>{getStatusBadge(event.status)}</div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 truncate">
                        {event.targetUrl}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(event.timestamp)}
                        </div>
                        {event.duration && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.duration}ms
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Type</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center">
                          Time
                          <ArrowUpDown className="h-3 w-3 ml-1" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right w-[80px]">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          {getTypeBadge(event.webhookType as WebhookType)}
                        </TableCell>
                        <TableCell>{event.eventType || 'Generic Event'}</TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[200px]">
                          {event.targetUrl}
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>{formatDate(event.timestamp)}</TableCell>
                        <TableCell className="text-right">
                          {event.duration ? `${event.duration}ms` : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <WebhookHistoryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
