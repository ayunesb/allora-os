
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

// Define the ExecutiveMessage type since it's not exported from meshNetwork
interface ExecutiveMessage {
  id: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  status: string;
  created_at?: string;
}

export function RecentExecutiveMessages() {
  const [messages, setMessages] = useState<ExecutiveMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentMessages() {
      setLoading(true);
      try {
        // Get the 5 most recent messages
        const { data, error } = await supabase
          .from('executive_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          throw error;
        }

        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching recent executive messages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentMessages();
    
    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('executive_messages_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'executive_messages'
      }, (payload) => {
        // Add the new message to the top of the list and remove the oldest
        setMessages(prev => {
          const newMessages = [payload.new as ExecutiveMessage, ...prev];
          if (newMessages.length > 5) {
            return newMessages.slice(0, 5);
          }
          return newMessages;
        });
      })
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Executive Communications
          </CardTitle>
          <CardDescription>Loading recent messages...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Executive Communications
        </CardTitle>
        <CardDescription>Recent messages between AI executives</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              No messages yet. Executive communications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="border rounded-md p-3 bg-muted/30">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium">
                    <Link 
                      to={`/dashboard/executives/${message.from_executive}`}
                      className="text-primary hover:underline"
                    >
                      {message.from_executive}
                    </Link>
                    {" → "}
                    <Link 
                      to={`/dashboard/executives/${message.to_executive}`}
                      className="text-primary hover:underline"
                    >
                      {message.to_executive}
                    </Link>
                  </div>
                  <Badge variant={message.status === 'unread' ? 'secondary' : 'outline'}>
                    {message.status}
                  </Badge>
                </div>
                <p className="text-sm">{message.message_content}</p>
                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {message.created_at && formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentExecutiveMessages;
