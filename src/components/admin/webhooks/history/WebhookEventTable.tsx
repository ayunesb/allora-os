
import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, ChevronRight } from 'lucide-react';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { EventDetailsModal } from './EventDetailsModal';
import { Badge } from '@/components/ui/badge';

interface WebhookEventTableProps {
  events: UnifiedWebhookEvent[];
  onViewEvent?: (event: UnifiedWebhookEvent) => void;
}

export const WebhookEventTable: React.FC<WebhookEventTableProps> = ({ 
  events,
  onViewEvent
}) => {
  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleViewDetails = (event: UnifiedWebhookEvent) => {
    setSelectedEvent(event);
    setDetailsOpen(true);
    if (onViewEvent) {
      onViewEvent(event);
    }
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'warning';
      default:
        return 'outline';
    }
  };
  
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-muted/20">
        <h3 className="mb-2 text-lg font-semibold">No webhook events found</h3>
        <p className="text-sm text-muted-foreground">
          When webhook events are triggered, they will appear here
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(event.created_at || event.timestamp || ''), 'MMM d, yyyy HH:mm')}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {event.event_type || event.eventType || 'Unknown'}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {event.source || (event.webhookType || event.webhook_type || 'unknown')}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(event.status)} className="capitalize">
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleViewDetails(event)}
                    variant="ghost"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          open={detailsOpen} 
          onOpenChange={setDetailsOpen} 
        />
      )}
    </>
  );
};

export default WebhookEventTable;
