
import React, { useState } from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Check, X, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { WebhookEvent } from '@/types/webhooks';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from 'date-fns';
import { EventDetailsPanel } from './EventDetailsPanel';
import { StatusBadge } from './StatusBadge';

interface EventTableRowProps {
  event: WebhookEvent;
}

export const EventTableRow: React.FC<EventTableRowProps> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleRow = () => {
    setIsExpanded(!isExpanded);
  };

  // Format the date
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  return (
    <React.Fragment>
      <TableRow className="cursor-pointer" onClick={toggleRow}>
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
            <EventDetailsPanel event={event} />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};
