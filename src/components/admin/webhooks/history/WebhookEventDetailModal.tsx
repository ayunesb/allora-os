
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { CopyButton } from '@/components/CopyButton';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface WebhookEventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: UnifiedWebhookEvent | null;
}

export function WebhookEventDetailModal({ isOpen, onClose, event }: WebhookEventDetailModalProps) {
  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Webhook Event Details</span>
            <Badge variant="outline" className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Event Type</h4>
              <p className="text-sm text-muted-foreground">{event.event_type || event.eventType}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Created</h4>
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {new Date(event.created_at).toLocaleDateString()}
                <Clock className="h-3.5 w-3.5 ml-2 mr-1" />
                {new Date(event.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Target URL</h4>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <p className="truncate flex-1">{event.url || event.targetUrl}</p>
              <CopyButton text={event.url || event.targetUrl || ''} showText={false} />
            </div>
          </div>
          
          {event.payload && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium">Payload</h4>
                <CopyButton 
                  text={typeof event.payload === 'string' ? event.payload : JSON.stringify(event.payload, null, 2)} 
                  showText={true}
                />
              </div>
              <ScrollArea className="h-40 rounded-md border p-2">
                <pre className="text-xs">
                  {typeof event.payload === 'string' ? event.payload : JSON.stringify(event.payload, null, 2)}
                </pre>
              </ScrollArea>
            </div>
          )}
          
          {event.response && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium">Response</h4>
                <CopyButton 
                  text={typeof event.response === 'string' ? event.response : JSON.stringify(event.response, null, 2)} 
                  showText={true}
                />
              </div>
              <ScrollArea className="h-40 rounded-md border p-2">
                <pre className="text-xs">
                  {typeof event.response === 'string' ? event.response : JSON.stringify(event.response, null, 2)}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WebhookEventDetailModal;
