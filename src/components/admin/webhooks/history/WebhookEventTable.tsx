
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Eye, FileJson } from 'lucide-react';

export interface WebhookEventTableProps {
  events: UnifiedWebhookEvent[];
  onViewDetail: (event: UnifiedWebhookEvent) => void;
}

const WebhookEventTable: React.FC<WebhookEventTableProps> = ({ 
  events,
  onViewDetail
}) => {
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'success': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getWebhookTypeLabel = (type?: string): string => {
    if (!type) return 'Unknown';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Webhook Type</TableHead>
            <TableHead className="hidden md:table-cell">Target URL</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No webhook events found
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center">
                    <span className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(event.status)}`}></span>
                    <span className="capitalize">{event.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {event.event_type || event.eventType || 'unknown'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getWebhookTypeLabel(event.webhookType || event.webhook_type || event.type)}
                </TableCell>
                <TableCell className="hidden md:table-cell truncate max-w-[200px]" title={event.targetUrl || event.url}>
                  {event.targetUrl || event.url}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDistanceToNow(new Date(event.created_at || event.timestamp || ''), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewDetail(event)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WebhookEventTable;
