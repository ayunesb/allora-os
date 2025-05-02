
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import  JsonViewer  from '@/components/JsonViewer';

interface EventDetailsModalProps {
  event: UnifiedWebhookEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsModal({ 
  event,
  open,
  onOpenChange
}: EventDetailsModalProps) {
  const formattedDate = event.created_at || event.timestamp 
    ? format(new Date(event.created_at || event.timestamp || ''), 'PP pp')
    : 'Unknown date';

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Webhook Event Details
            <Badge variant={getStatusBadgeVariant(event.status)} className="capitalize">
              {event.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {event.event_type || event.eventType || 'Unknown event'} • {formattedDate}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Event ID</h4>
              <p className="text-sm text-muted-foreground">{event.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Webhook Type</h4>
              <p className="text-sm text-muted-foreground capitalize">
                {event.webhookType || event.webhook_type || 'Unknown'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Target URL</h4>
              <p className="text-sm text-muted-foreground break-all">
                {event.targetUrl || event.url || 'Not available'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Source</h4>
              <p className="text-sm text-muted-foreground">
                {event.source || 'Internal'}
              </p>
            </div>
            {event.duration !== undefined && (
              <div>
                <h4 className="text-sm font-medium mb-1">Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {event.duration}ms
                </p>
              </div>
            )}
          </div>

          <Tabs defaultValue="payload">
            <TabsList>
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>
            <TabsContent value="payload" className="mt-4">
              <div className="border rounded-md p-4 bg-muted/30 overflow-auto max-h-80">
                {event.payload ? (
                  <JsonViewer data={event.payload} />
                ) : (
                  <p className="text-sm text-muted-foreground">No payload data available</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="response" className="mt-4">
              <div className="border rounded-md p-4 bg-muted/30 overflow-auto max-h-80">
                {event.response ? (
                  <JsonViewer data={event.response} />
                ) : (
                  <p className="text-sm text-muted-foreground">No response data available</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
