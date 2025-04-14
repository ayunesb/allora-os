
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Clock } from "lucide-react";
import { type ExecutiveMessage } from "@/agents/meshNetwork";

export default function AIChatDashboard() {
  const [messages, setMessages] = useState<ExecutiveMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("executive_messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to fetch messages:", error);
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    }

    fetchMessages();

    // Set up realtime subscription for new executive messages
    const channel = supabase
      .channel('executive_messages_realtime')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'executive_messages' 
        }, 
        (payload) => {
          console.log('New message received!', payload.new);
          // Add the new message to the messages array
          setMessages((current) => [...current, payload.new as ExecutiveMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">💬 Live AI Executive Chat</h1>
        <p className="text-muted-foreground mt-2">
          Watch live communications between AI executives in your organization
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Executive Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-4 text-center text-muted-foreground">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="py-10 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-medium text-lg">No messages yet</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Executive messages will appear here when executives communicate with each other.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="border rounded-lg p-3 bg-muted/30"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">
                      <span className="text-primary">{msg.from_executive}</span> ➡️ <span className="text-secondary">{msg.to_executive}</span>
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {msg.created_at && formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </div>
                  </div>
                  <p className="text-sm">{msg.message_content}</p>
                  {msg.task_link && (
                    <div className="mt-2">
                      <a 
                        href={msg.task_link} 
                        className="text-xs text-primary hover:underline"
                      >
                        View related task
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
