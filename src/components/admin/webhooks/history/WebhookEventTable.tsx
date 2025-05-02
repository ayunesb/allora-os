
import React from 'react';
import { WebhookEvent } from '@/types/unified-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface WebhookEventTableProps {
  events: WebhookEvent[];
  isLoading?: boolean;
  onViewDetail: (event: WebhookEvent) => void;
}

export function WebhookEventTable({ events, isLoading, onViewDetail }: WebhookEventTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-48" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-8 w-16" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No webhook events found matching the current filters.</p>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return 'Invalid Date';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500 text-white';
      case 'failed': return 'bg-red-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                {event.event_type || event.eventType || 'Unknown'}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={event.targetUrl || event.url}>
                {event.source || (event.targetUrl || event.url ? new URL(event.targetUrl || event.url || '#').hostname : 'Unknown')}
              </TableCell>
              <TableCell>
                {formatDate(event.created_at || event.timestamp || '')}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onViewDetail(event)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default WebhookEventTable;
