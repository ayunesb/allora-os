
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ArrowRightLeft } from 'lucide-react';
import { fetchAllMessagesForExecutive, type ExecutiveMessage } from '@/agents/meshNetwork';
import { formatDistanceToNow } from 'date-fns';

export function ExecutiveMessages({ executiveName }: { executiveName?: string }) {
  const [messages, setMessages] = useState<ExecutiveMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<'sent' | 'received' | 'all'>('all');

  useEffect(() => {
    async function loadMessages() {
      if (!executiveName) return;
      
      setLoading(true);
      try {
        const allMessages = await fetchAllMessagesForExecutive(executiveName, 50);
        setMessages(allMessages);
      } catch (error) {
        console.error("Failed to load executive messages:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
    
    // Refresh messages every 30 seconds
    const interval = setInterval(loadMessages, 30000);
    return () => clearInterval(interval);
  }, [executiveName]);

  // Filter messages based on direction
  const filteredMessages = messages.filter(message => {
    if (direction === 'all') return true;
    if (direction === 'sent') return message.from_executive === executiveName;
    if (direction === 'received') return message.to_executive === executiveName;
    return true;
  });

  const getMessageBackground = (message: ExecutiveMessage) => {
    if (message.from_executive === executiveName) {
      return 'bg-primary/10 border-primary/20';
    }
    if (message.status === 'unread') {
      return 'bg-amber-50 border-amber-200';
    }
    return 'bg-background border-border';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Executive Messages
            </CardTitle>
            <CardDescription>
              {executiveName ? `${executiveName}'s communications` : 'Executive communications'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={direction === 'all' ? 'default' : 'outline'} 
              onClick={() => setDirection('all')}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={direction === 'received' ? 'default' : 'outline'} 
              onClick={() => setDirection('received')}
            >
              Received
            </Button>
            <Button 
              size="sm" 
              variant={direction === 'sent' ? 'default' : 'outline'} 
              onClick={() => setDirection('sent')}
            >
              Sent
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-4 text-center text-muted-foreground">
            Loading messages...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-10 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="font-medium text-lg">No messages yet</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {direction === 'all' 
                ? 'Executive messages will appear here when executives communicate with each other.' 
                : direction === 'sent' 
                  ? `${executiveName} hasn't sent any messages yet.` 
                  : `${executiveName} hasn't received any messages yet.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`border rounded-lg p-3 ${getMessageBackground(message)}`}
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <ArrowRightLeft className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      {message.from_executive === executiveName ? 
                        `To: ${message.to_executive}` : 
                        `From: ${message.from_executive}`}
                    </span>
                  </div>
                  <Badge variant={message.status === 'unread' ? 'secondary' : 'outline'}>
                    {message.status}
                  </Badge>
                </div>
                <p className="text-sm mb-2">{message.message_content}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {message.created_at && formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </div>
                  {message.task_link && (
                    <a 
                      href={message.task_link} 
                      className="text-primary hover:underline"
                    >
                      View related task
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ExecutiveMessages;
