
import React from 'react';
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import { WebhookEvent } from './useWebhookHistory';
import { 
  EventTableRow, 
  EmptyState,
  EventTableHeader
} from './event-table';

interface WebhookEventTableProps {
  events: WebhookEvent[];
  isLoading: boolean;
}

const WebhookEventTable: React.FC<WebhookEventTableProps> = ({ events, isLoading }) => {
  if (isLoading || events.length === 0) {
    return <EmptyState isLoading={isLoading} />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <EventTableHeader />
        <TableBody>
          {events.map((event) => (
            <EventTableRow key={event.id} event={event} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WebhookEventTable;
