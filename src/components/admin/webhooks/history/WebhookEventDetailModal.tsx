import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import JsonViewer from '@/components/JsonViewer';
const WebhookEventDetailModal = ({ event, isOpen, onClose }) => {
    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Success</Badge>;
            case 'failed':
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
            case 'pending':
                return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };
    const formattedDate = event.created_at || event.timestamp ?
        format(new Date(event.created_at || event.timestamp), 'PPP p') :
        'Unknown date';
    return (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Webhook Event Details</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            {getStatusBadge(event.status)}
            <span className="text-muted-foreground">{formattedDate}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Event Information</h3>
            <div className="bg-muted/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Event Type</p>
                <p className="font-mono">{event.event_type || event.eventType || event.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Source</p>
                <p>{event.source || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target URL</p>
                <p className="font-mono truncate">{event.targetUrl || event.url || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p>{event.duration ? `${event.duration}ms` : 'Not available'}</p>
              </div>
            </div>
          </div>
          
          {/* Payload */}
          <div>
            <h3 className="text-sm font-medium mb-2">Payload</h3>
            <div className="bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto">
              <JsonViewer data={event.payload || {}}/>
            </div>
          </div>
          
          {/* Response */}
          <div>
            <h3 className="text-sm font-medium mb-2">Response</h3>
            <div className="bg-muted/50 rounded-lg p-3 max-h-[200px] overflow-auto">
              <JsonViewer data={event.response || {}}/>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);
};
export default WebhookEventDetailModal;
