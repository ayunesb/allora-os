
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { WebhookEvent, WebhookType, WebhookStatus } from '@/types/webhooks';

interface EventDetailsPanelProps {
  event: WebhookEvent;
}

const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({ event }) => {
  // Ensure we have consistent property access regardless of source format
  const normalizedEvent = {
    id: event.id,
    type: event.webhookType || event.event_type as WebhookType,
    status: event.status,
    created_at: event.created_at || event.timestamp,
    targetUrl: event.targetUrl || event.webhook_id,
    payload: event.payload || {},
    response: event.response || {}
  };
  
  const getStatusColor = (status: WebhookStatus | string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return `${date.toLocaleString()} (${formatDistance(date, new Date(), { addSuffix: true })})`;
    } catch (e) {
      return timeString;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-1">Event Details</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-muted-foreground">ID:</div>
          <div>{normalizedEvent.id}</div>
          
          <div className="text-muted-foreground">Type:</div>
          <div className="capitalize">{normalizedEvent.type}</div>
          
          <div className="text-muted-foreground">Status:</div>
          <div>
            <Badge 
              variant="outline" 
              className={`${getStatusColor(normalizedEvent.status)}`}
            >
              {normalizedEvent.status}
            </Badge>
          </div>
          
          <div className="text-muted-foreground">Timestamp:</div>
          <div>{formatTime(normalizedEvent.created_at)}</div>
          
          <div className="text-muted-foreground">Target URL:</div>
          <div className="truncate">{normalizedEvent.targetUrl}</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-1">Payload</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(normalizedEvent.payload, null, 2)}
        </pre>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-1">Response</h4>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(normalizedEvent.response, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default EventDetailsPanel;
