import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { UnifiedWebhookEvent as WebhookEvent } from '@/types/unified-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface EventDetailsPanelProps {
  event: WebhookEvent;
}

export function EventDetailsPanel({ event }: EventDetailsPanelProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const getWebhookTypeBadge = (type: WebhookType) => {
    switch (type) {
      case 'zapier':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Zapier</Badge>;
      case 'slack':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Slack</Badge>;
      case 'stripe':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Stripe</Badge>;
      case 'github':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">GitHub</Badge>;
      case 'notion':
        return <Badge className="bg-black text-white hover:bg-gray-800">Notion</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Custom</Badge>;
    }
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    toast.success(message);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          {getStatusBadge(event.status)}
          {getWebhookTypeBadge(event.webhookType)}
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
            {event.eventType}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Webhook Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-muted-foreground">Target URL</div>
              <div className="flex items-center mt-1">
                <span className="truncate max-w-[250px] font-mono text-xs">
                  {event.targetUrl}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 ml-1"
                  onClick={() => copyToClipboard(event.targetUrl, 'URL copied to clipboard')}
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy URL</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-1"
                  asChild
                >
                  <a href={event.targetUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only">Open URL</span>
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <div className="font-medium text-muted-foreground">Webhook ID</div>
              <div className="font-mono text-xs mt-1">{event.webhook_id}</div>
            </div>

            <div>
              <div className="font-medium text-muted-foreground">Event ID</div>
              <div className="font-mono text-xs mt-1">{event.id}</div>
            </div>

            <div>
              <div className="font-medium text-muted-foreground">Timestamp</div>
              <div className="text-xs mt-1">
                {new Date(event.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
              {JSON.stringify(event.payload, null, 2)}
            </pre>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => copyToClipboard(event.payload, 'Payload copied to clipboard')}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy payload</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {event.response && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                {JSON.stringify(event.response, null, 2)}
              </pre>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => copyToClipboard(event.response, 'Response copied to clipboard')}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy response</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default EventDetailsPanel;
