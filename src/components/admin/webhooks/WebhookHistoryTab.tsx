
import React from 'react';
import { WebhookEvent } from '@/types/unified-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface WebhookHistoryTabProps {
  events: WebhookEvent[];
  onRefresh: () => void;
  isLoading: boolean;
}

const WebhookHistoryTab: React.FC<WebhookHistoryTabProps> = ({ 
  events, 
  onRefresh,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Webhook Event History</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading webhook events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No webhook events have been recorded yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Events will appear here once webhooks are triggered.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{event.event_type}</span>
                  <span className={`text-sm ${
                    event.status === 'success' ? 'text-green-500' :
                    event.status === 'failed' ? 'text-red-500' :
                    'text-amber-500'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Target: {event.targetUrl || event.url}</p>
                  <p>Time: {new Date(event.timestamp || event.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookHistoryTab;
