
import React, { useState } from 'react';
import { useWebhookHistory } from '@/hooks/useWebhookHistory';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { WebhookEventTable } from './WebhookEventTable';
import { RefreshCw, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { EventDetailsModal } from './EventDetailsModal';
import { WebhookEvent } from '@/types/unified-types';

export default function WebhookHistoryContent() {
  const { events, isLoading, refetch } = useWebhookHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Filter events based on search query and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.event_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.targetUrl?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewEvent = (event: WebhookEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-grow">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <Loading center fullHeight text="Loading webhook events..." />
      ) : (
        <WebhookEventTable events={filteredEvents} onViewEvent={handleViewEvent} />
      )}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          open={isEventModalOpen}
          onOpenChange={setIsEventModalOpen}
        />
      )}
    </div>
  );
}
