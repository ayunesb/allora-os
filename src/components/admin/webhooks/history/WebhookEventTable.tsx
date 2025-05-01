
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WebhookEvent } from '@/types/unified-types';
import { Eye } from 'lucide-react';

interface WebhookEventTableProps {
  events: WebhookEvent[];
  onViewEvent: (event: WebhookEvent) => void;
}

export function WebhookEventTable({ events, onViewEvent }: WebhookEventTableProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const truncateUrl = (url?: string) => {
    if (!url) return 'N/A';
    return url.length > 40 ? `${url.substring(0, 40)}...` : url;
  };

  if (events.length === 0) {
    return (
      <div className="bg-background border rounded-md p-8 text-center">
        <p className="text-muted-foreground">No webhook events found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                {event.eventType || event.event_type || 'Unknown'}
              </TableCell>
              <TableCell>{formatDate(event.created_at)}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {truncateUrl(event.targetUrl || event.url)}
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeVariant(event.status)}>
                  {event.status || 'Unknown'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewEvent(event)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
