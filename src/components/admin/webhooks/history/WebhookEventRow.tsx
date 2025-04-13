
import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebhookEvent } from '@/types/webhooks';
import { Eye, RotateCw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WebhookEventRowProps {
  event: WebhookEvent;
}

export function WebhookEventRow({ event }: WebhookEventRowProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  const getWebhookTypeIcon = (type: string) => {
    // This would be replaced with actual icons based on the webhook type
    return null;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-2">
            {getWebhookTypeIcon(event.webhookType)}
            <span className="capitalize">{event.webhookType}</span>
          </div>
        </TableCell>
        <TableCell>{event.eventType || 'N/A'}</TableCell>
        <TableCell>
          <Badge className={getStatusColor(event.status)}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </TableCell>
        <TableCell>{formatDate(event.timestamp)}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm" onClick={() => setDetailsOpen(true)}>
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
        </TableCell>
      </TableRow>
      
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Webhook Event Details</DialogTitle>
            <DialogDescription>
              {event.webhookType} webhook event from {formatDate(event.timestamp)}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="payload">
            <TabsList>
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="meta">Metadata</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payload" className="max-h-96 overflow-auto">
              <pre className="bg-muted p-4 rounded-md text-xs">
                {JSON.stringify(event.payload, null, 2)}
              </pre>
            </TabsContent>
            
            <TabsContent value="response" className="max-h-96 overflow-auto">
              <pre className="bg-muted p-4 rounded-md text-xs">
                {JSON.stringify(event.response, null, 2)}
              </pre>
            </TabsContent>
            
            <TabsContent value="meta" className="max-h-96 overflow-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">ID:</div>
                  <div>{event.id}</div>
                  
                  <div className="font-medium">Type:</div>
                  <div className="capitalize">{event.webhookType}</div>
                  
                  <div className="font-medium">Event:</div>
                  <div>{event.eventType || 'N/A'}</div>
                  
                  <div className="font-medium">Status:</div>
                  <div>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="font-medium">Target URL:</div>
                  <div className="break-all">{event.targetUrl}</div>
                  
                  <div className="font-medium">Timestamp:</div>
                  <div>{formatDate(event.timestamp)}</div>
                  
                  <div className="font-medium">Source:</div>
                  <div>{event.source || 'N/A'}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
