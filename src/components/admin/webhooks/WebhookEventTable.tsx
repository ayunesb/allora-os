
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import WebhookEventRow from './history/WebhookEventRow';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import { normalizeWebhookEvent } from '@/utils/authCompatibility';

interface WebhookEventTableProps {
  events: UnifiedWebhookEvent[];
  isLoading?: boolean;
  onViewDetail: (event: UnifiedWebhookEvent) => void;
}

const WebhookEventTable: React.FC<WebhookEventTableProps> = ({ 
  events, 
  isLoading = false,
  onViewDetail 
}) => {
  if (isLoading) {
    return <div className="text-center p-4">Loading webhook events...</div>;
  }

  if (!events.length) {
    return <div className="text-center p-4">No webhook events found.</div>;
  }

  // Normalize all webhook events to ensure they have consistent properties
  const normalizedEvents = events.map(event => normalizeWebhookEvent(event));

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-24">Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {normalizedEvents.map((event) => (
            <WebhookEventRow 
              key={event.id} 
              event={event} 
              onViewDetail={() => onViewDetail(event)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WebhookEventTable;
