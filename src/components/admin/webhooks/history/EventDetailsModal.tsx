
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WebhookEvent } from '@/types/unified-types';
import { X, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface EventDetailsModalProps {
  event: WebhookEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsModal({ event, open, onOpenChange }: EventDetailsModalProps) {
  const formatDateTimeLocal = (isoString?: string) => {
    if (!isoString) return 'N/A';
    try {
      const date = new Date(isoString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">Webhook Event Details</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Event Type</h3>
              <p className="font-medium">{event.eventType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <Badge className={getStatusBadgeVariant(event.status)}>
                {event.status || 'Unknown'}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created At</h3>
              <p>{formatDateTimeLocal(event.created_at)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Target URL</h3>
              <div className="flex items-center gap-2">
                <a 
                  href={event.targetUrl || event.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  {(event.targetUrl || event.url || 'N/A').substring(0, 30)}
                  {(event.targetUrl || event.url || 'N/A').length > 30 ? '...' : ''}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(event.targetUrl || event.url || '', 'URL')}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy URL</span>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Payload</h3>
            <div className="bg-muted rounded-md p-2 relative">
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(
                  typeof event.payload === 'string' 
                    ? event.payload 
                    : JSON.stringify(event.payload, null, 2), 
                  'Payload'
                )}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <pre className="text-xs overflow-auto max-h-60 pt-8">
                {typeof event.payload === 'string' 
                  ? event.payload 
                  : JSON.stringify(event.payload, null, 2) || 'No payload data'}
              </pre>
            </div>
          </div>

          {event.response && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Response</h3>
              <div className="bg-muted rounded-md p-2 relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(
                    typeof event.response === 'string' 
                      ? event.response 
                      : JSON.stringify(event.response, null, 2), 
                    'Response'
                  )}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <pre className="text-xs overflow-auto max-h-60 pt-8">
                  {typeof event.response === 'string' 
                    ? event.response 
                    : JSON.stringify(event.response, null, 2) || 'No response data'}
                </pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
