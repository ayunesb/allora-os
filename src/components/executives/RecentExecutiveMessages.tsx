
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnifiedExecutiveMessage } from '@/types/unified-types';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface RecentExecutiveMessagesProps {
  messages: UnifiedExecutiveMessage[];
  isLoading?: boolean;
  onViewMoreMessages: () => void;
}

// Add a helper function to normalize messages with different property names
export const normalizeExecutiveMessage = (msg: any): UnifiedExecutiveMessage => {
  return {
    id: msg.id || '',
    created_at: msg.created_at || new Date().toISOString(),
    from_executive: msg.from_executive || msg.fromExecutive || '',
    to_executive: msg.to_executive || msg.toExecutive || '',
    message_content: msg.message_content || msg.content || '',
    content: msg.content || msg.message_content || '',
    status: msg.status || 'unread'
  };
};

const RecentExecutiveMessages: React.FC<RecentExecutiveMessagesProps> = ({
  messages,
  isLoading = false,
  onViewMoreMessages
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessagesSquare className="h-5 w-5 mr-2" />
            Executive Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full animate-pulse" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessagesSquare className="h-5 w-5 mr-2" />
            Executive Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <p>No recent executive messages</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Process messages to ensure they have all properties
  const normalizedMessages = messages.map(msg => normalizeExecutiveMessage(msg));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessagesSquare className="h-5 w-5 mr-2" />
          Executive Communications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {normalizedMessages.slice(0, 5).map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-center">
                  {message.from_executive && (
                    <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                      From {typeof message.from_executive === 'string' ? message.from_executive : 'Executive'}
                    </Badge>
                  )}
                  {message.to_executive && (
                    <Badge variant="outline" className="bg-secondary/10 text-secondary text-xs">
                      To {typeof message.to_executive === 'string' ? message.to_executive : 'Executive'}
                    </Badge>
                  )}
                  {message.status && (
                    <span className={`text-xs ${message.status === 'read' ? 'text-green-500' : 'text-amber-500'}`}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </span>
                  )}
                </div>
                <p className="text-sm line-clamp-2">
                  {message.message_content || message.content}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {messages.length > 5 && (
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" size="sm" onClick={onViewMoreMessages} className="text-xs">
              View all messages
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentExecutiveMessages;
