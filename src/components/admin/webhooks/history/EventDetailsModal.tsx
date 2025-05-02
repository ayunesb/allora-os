
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WebhookEvent } from "@/types/fixed/Webhook";
import { UnifiedWebhookEvent } from "@/types/unified-types";
import { formatDateTimeString } from "@/utils/dateUtils";
import JsonViewer from '@/components/ui/json-viewer';

type EventDetailsModalProps = {
  event: WebhookEvent | UnifiedWebhookEvent | null;
  isOpen: boolean;
  onClose: () => void;
};

function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  if (!event) return null;

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  // Get the event type and webhook type, handling different property names
  const eventType = event.eventType || event.event_type;
  const webhookType = event.webhookType || event.webhook_type || event.type;
  const url = event.targetUrl || event.url || '';
  const timestamp = formatDateTimeString(event.timestamp || event.created_at || '');
  const duration = event.duration ? `${event.duration}ms` : 'N/A';
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Webhook Event Details</span>
            <Badge variant="outline" className={getStatusBadgeClass(event.status)}>
              {event.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            View complete information about this webhook event
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm py-4">
          <div>
            <span className="text-muted-foreground">Event Type:</span>
            <p className="font-medium">{eventType}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Webhook Type:</span>
            <p className="font-medium capitalize">{webhookType}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Timestamp:</span>
            <p className="font-medium">{timestamp}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Duration:</span>
            <p className="font-medium">{duration}</p>
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Target URL:</span>
            <p className="font-mono text-xs break-all">{url}</p>
          </div>
        </div>

        <Tabs defaultValue="payload" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mb-2">
            <TabsTrigger value="payload">Payload</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
            {event.errorMessage && <TabsTrigger value="error">Error</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="payload" className="flex-1 overflow-hidden pt-2">
            <ScrollArea className="h-[300px]">
              {event.payload ? (
                <JsonViewer src={event.payload} />
              ) : (
                <div className="p-4 text-center text-muted-foreground">No payload data</div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="response" className="flex-1 overflow-hidden pt-2">
            <ScrollArea className="h-[300px]">
              {event.response ? (
                <JsonViewer src={event.response} />
              ) : (
                <div className="p-4 text-center text-muted-foreground">No response data</div>
              )}
            </ScrollArea>
          </TabsContent>
          
          {event.errorMessage && (
            <TabsContent value="error" className="flex-1 overflow-hidden pt-2">
              <ScrollArea className="h-[300px]">
                <div className="p-4">
                  <div className="p-3 bg-red-500/10 text-red-600 rounded-md border border-red-200">
                    {event.errorMessage}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          )}
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { EventDetailsModal };
