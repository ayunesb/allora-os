
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { truncateUrl } from '@/utils/formatting';
import { formatRelativeTime } from '@/utils/dateUtils';

interface WebhookEventRowProps {
  event: UnifiedWebhookEvent;
  onViewDetail: () => void;
}

const WebhookEventRow: React.FC<WebhookEventRowProps> = ({ event, onViewDetail }) => {
  // Helper function to determine status badge variant
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return {
          variant: 'success' as const,
          label: 'Success',
          className: 'bg-green-500/10 text-green-500 border-green-500/20' 
        };
      case 'failed':
        return {
          variant: 'destructive' as const,
          label: 'Failed',
          className: 'bg-red-500/10 text-red-500 border-red-500/20'
        };
      case 'pending':
        return {
          variant: 'outline' as const,
          label: 'Pending',
          className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
        };
      default:
        return {
          variant: 'secondary' as const,
          label: status,
          className: ''
        };
    }
  };

  // Determine the badge variant based on status
  const statusConfig = getStatusVariant(event.status);
  
  // Either use eventType or event_type property based on which one exists
  const eventType = event.eventType || event.event_type || 'unknown';
  
  // Use the URL from either targetUrl or url property
  const url = event.targetUrl || event.url || '';
  
  // Format the timestamp
  const formattedTime = formatRelativeTime(event.timestamp || event.created_at);

  return (
    <TableRow>
      <TableCell>
        <Badge variant="outline" className={statusConfig.className}>
          {statusConfig.label}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="font-mono text-xs">
          {eventType}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-xs truncate block max-w-[200px]" title={url}>
          {truncateUrl(url)}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formattedTime}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewDetail}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">View Details</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WebhookEventRow;
