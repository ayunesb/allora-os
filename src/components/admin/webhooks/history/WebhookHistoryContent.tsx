
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { WebhookHistoryFilters } from './WebhookHistoryFilters';
import { WebhookEventTable } from './WebhookEventTable';
import { WebhookEvent } from '@/types/fixed/Webhook';
import { UnifiedWebhookEvent } from '@/types/unified-types';

interface WebhookHistoryContentProps {
  events: WebhookEvent[];
}

const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState<UnifiedWebhookEvent[]>(events);
  
  const handleFilterChange = (filtered: UnifiedWebhookEvent[]) => {
    setFilteredEvents(filtered);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-medium">Webhook History</h3>
            <p className="text-sm text-muted-foreground">
              View and filter recent webhook events
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <WebhookHistoryFilters events={events} onFilterChange={handleFilterChange} />
        <WebhookEventTable events={filteredEvents} />
      </CardContent>
    </Card>
  );
};

export default WebhookHistoryContent;
