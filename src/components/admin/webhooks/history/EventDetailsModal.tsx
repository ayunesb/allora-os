
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { WebhookEvent } from '@/types/unified-types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Simple JSON viewer component
const JsonViewer = ({ data }: { data: any }) => {
  return (
    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

// Format date function
const formatDateTimeString = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    return date.toLocaleString();
  } catch (error) {
    return 'Invalid Date';
  }
};

interface EventDetailsModalProps {
  event: WebhookEvent;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  if (!event) return null;
  
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500 text-white';
      case 'failed': return 'bg-red-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Webhook Event Details</DialogTitle>
          <DialogDescription>
            Event ID: {event.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Header info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Event Type</p>
              <p className="text-sm">{event.event_type || event.eventType || event.type || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Created At</p>
              <p className="text-sm">{formatDateTimeString(event.created_at || event.timestamp || '')}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Webhook Type</p>
              <p className="text-sm capitalize">{event.webhookType || event.type || 'custom'}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Target URL</p>
            <p className="text-sm break-all">{event.targetUrl || event.url || 'N/A'}</p>
          </div>

          <Separator />

          {/* Response details */}
          {event.response && (
            <>
              <div>
                <h3 className="text-sm font-medium">Response</h3>
                <JsonViewer data={event.response} />
              </div>
              <Separator />
            </>
          )}

          {/* Payload details */}
          <div>
            <h3 className="text-sm font-medium">Payload</h3>
            <JsonViewer data={event.payload || {}} />
          </div>
          
          {/* Error details if any */}
          {event.responseCode && event.responseCode >= 400 && (
            <div className="mt-4 p-4 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20">
              <h3 className="text-sm font-medium text-red-700 dark:text-red-400">Error Code</h3>
              <p className="text-sm text-red-600 dark:text-red-400">Response code: {event.responseCode}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailsModal;
