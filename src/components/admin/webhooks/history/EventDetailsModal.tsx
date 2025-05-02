
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { format } from 'date-fns';
import { Code, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventDetailsModalProps {
  event: UnifiedWebhookEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to format JSON for display
const formatJson = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
};

export function EventDetailsModal({ event, open, onOpenChange }: EventDetailsModalProps) {
  const statusIcon = () => {
    switch (event.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  const statusBadgeVariant = (): string => {
    switch (event.status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {statusIcon()}
            Webhook Event Details
            <Badge variant={statusBadgeVariant()} className="ml-2 capitalize">{event.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Event metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Event Type</h3>
              <p className="text-sm">{event.event_type || event.eventType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Webhook Type</h3>
              <p className="text-sm capitalize">{event.webhookType || event.webhook_type || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Timestamp</h3>
              <p className="text-sm">{format(new Date(event.created_at || event.timestamp || ''), 'MMM d, yyyy HH:mm:ss')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Source</h3>
              <p className="text-sm">{event.source || 'Unknown'}</p>
            </div>
          </div>

          {/* Target URL */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Target URL</h3>
            <p className="text-sm break-all bg-muted p-2 rounded">{event.targetUrl || event.url || 'No URL specified'}</p>
          </div>

          {/* Duration */}
          {event.duration !== undefined && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Duration</h3>
              <p className="text-sm">{event.duration}ms</p>
            </div>
          )}

          {/* Payload */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
              <Code className="h-4 w-4" /> Payload
            </h3>
            <Card>
              <CardContent className="p-0">
                <pre className="text-xs p-4 bg-muted/50 rounded-md overflow-x-auto max-h-48">
                  {formatJson(event.payload || 'No payload')}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Response */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
              <Code className="h-4 w-4" /> Response
            </h3>
            <Card>
              <CardContent className="p-0">
                <pre className="text-xs p-4 bg-muted/50 rounded-md overflow-x-auto max-h-48">
                  {formatJson(event.response || 'No response data')}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailsModal;
