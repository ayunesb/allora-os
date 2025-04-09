
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Check, X, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { WebhookEvent } from './useWebhookHistory';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from 'date-fns';

interface WebhookEventTableProps {
  events: WebhookEvent[];
  isLoading: boolean;
}

const WebhookEventTable: React.FC<WebhookEventTableProps> = ({ events, isLoading }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpand = (eventId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(eventId)) {
      newExpandedRows.delete(eventId);
    } else {
      newExpandedRows.add(eventId);
    }
    setExpandedRows(newExpandedRows);
  };

  // Format the date
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  // Function to truncate long strings
  const truncateString = (str: string, maxLength: number = 50): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };

  // Function to format the payload preview
  const formatPayloadPreview = (payload: any): string => {
    try {
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch (e) {
          // If it can't be parsed as JSON, use it as is
        }
      }
      
      const payloadStr = typeof payload === 'string' 
        ? payload 
        : JSON.stringify(payload);
        
      return truncateString(payloadStr);
    } catch (error) {
      return 'Error formatting payload';
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "default" | "destructive" | "outline" = "outline";
    let icon = null;
    
    switch(status) {
      case 'success':
        variant = "default";
        icon = <Check className="h-3 w-3 mr-1" />;
        break;
      case 'error':
        variant = "destructive";
        icon = <X className="h-3 w-3 mr-1" />;
        break;
      default:
        variant = "outline";
        break;
    }
    
    return (
      <Badge variant={variant} className="flex items-center capitalize">
        {icon}
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Loading webhook event history...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No webhook events found matching the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Webhook</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Response</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const isExpanded = expandedRows.has(event.id);
            
            return (
              <React.Fragment key={event.id}>
                <TableRow className="cursor-pointer" onClick={() => toggleRowExpand(event.id)}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs capitalize">
                      {event.webhookType}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(event.timestamp)}</TableCell>
                  <TableCell>
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">
                    {event.responseCode ? `${event.responseCode}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" asChild>
                      <a href={event.targetUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>

                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/50 p-4">
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
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WebhookEventTable;
