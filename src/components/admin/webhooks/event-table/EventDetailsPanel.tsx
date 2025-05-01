
import React from 'react';
import { WebhookEvent, WebhookType } from '@/types/fixed/Webhook';
import { formatDistanceToNow } from 'date-fns';
import StatusBadge from './StatusBadge';
import JsonViewer from '@/components/JsonViewer';
import { Calendar, Hash, Server, RefreshCw, Clock, File, MessageSquare } from 'lucide-react';

interface EventDetailsPanelProps {
  event: WebhookEvent;
  expanded?: boolean;
}

const EventDetailsPanel = ({ event, expanded = false }: EventDetailsPanelProps) => {
  if (!expanded) return null;

  // Format the date to relative time
  const relativeTime = event.created_at || event.timestamp
    ? formatDistanceToNow(new Date(event.created_at || event.timestamp), { addSuffix: true })
    : 'Unknown time';

  // Format webhook type with proper capitalization
  const formatWebhookType = (type: string | WebhookType): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const webhookType = event.webhookType || event.webhook_type || event.type || 'Unknown';
  const eventType = event.eventType || event.event_type || 'Unknown';
  const url = event.targetUrl || event.url || 'No URL';
  
  return (
    <div className="bg-muted/30 p-4 rounded-md space-y-4 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-start gap-2 mb-2">
            <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground block">ID</span>
              <span className="font-mono text-xs">{event.id}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground block">Time</span>
              <span>{relativeTime}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 mb-2">
            <Server className="h-4 w-4 text-muted-foreground mt-0.5" /> 
            <div>
              <span className="text-muted-foreground block">Type</span>
              <span>{formatWebhookType(webhookType as string)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-start gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground block">Event</span>
              <span>{eventType}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground block">Duration</span>
              <span>{event.duration ? `${event.duration}ms` : 'N/A'}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground block">Status</span>
              <StatusBadge status={event.status} />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <span className="text-muted-foreground block mb-1">Target URL</span>
        <code className="text-xs break-all block p-2 bg-muted rounded">{url}</code>
      </div>
      
      {event.payload && (
        <div>
          <span className="text-muted-foreground block mb-1">Payload</span>
          <div className="max-h-60 overflow-auto rounded border">
            <JsonViewer data={event.payload} />
          </div>
        </div>
      )}
      
      {event.response && (
        <div>
          <span className="text-muted-foreground block mb-1">Response</span>
          <div className="max-h-60 overflow-auto rounded border">
            <JsonViewer data={event.response} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPanel;
