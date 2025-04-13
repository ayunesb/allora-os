
import React from 'react';
import { WebhookEvent } from '@/types/webhooks';

interface EventDetailsPanelProps {
  event: WebhookEvent;
}

export const EventDetailsPanel: React.FC<EventDetailsPanelProps> = ({ event }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-1">Target URL</h4>
        <code className="text-xs bg-muted p-2 rounded block break-all">
          {event.targetUrl}
        </code>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-1">Request Payload</h4>
        <pre className="text-xs bg-muted p-2 rounded block overflow-auto max-h-40">
          {JSON.stringify(event.payload, null, 2)}
        </pre>
      </div>

      {event.errorMessage && (
        <div>
          <h4 className="text-sm font-medium mb-1 text-destructive">Error</h4>
          <pre className="text-xs bg-destructive/10 text-destructive p-2 rounded block overflow-auto max-h-40">
            {event.errorMessage}
          </pre>
        </div>
      )}

      {event.response && (
        <div>
          <h4 className="text-sm font-medium mb-1">Response</h4>
          <pre className="text-xs bg-muted p-2 rounded block overflow-auto max-h-40">
            {typeof event.response === 'object'
              ? JSON.stringify(event.response, null, 2)
              : event.response}
          </pre>
        </div>
      )}
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Event ID: {event.id}</span>
        <span>Duration: {event.duration ? `${event.duration}ms` : 'N/A'}</span>
      </div>
    </div>
  );
};
