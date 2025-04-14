import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchMessagesForExecutive } from "@/agents/meshNetwork";
import { generateMessageTemplate } from "@/agents/promptTemplates";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { MoreVertical, Send, User } from "lucide-react";

interface ExecutiveProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export default function ExecutiveMessages({ executive }: { executive: ExecutiveProfile }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedMessages = await fetchMessagesForExecutive(executive.name);
        
        // Map the fetched messages to the Message interface
        const formattedMessages = fetchedMessages.map(msg => ({
          id: msg.id,
          content: msg.message_content,
          sender: msg.from_executive,
          timestamp: msg.created_at,
        }));
        
        setMessages(formattedMessages);
      } catch (err: any) {
        console.error("Error fetching messages:", err);
        setError(err.message || "Failed to load messages");
        toast({
          variant: "destructive",
          title: "Failed to load messages",
          description: "There was an error fetching the executive messages."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMessages();
  }, [executive.name, toast]);
  
  const handleGenerateMessage = async () => {
    // Mock implementation for generating a message
    const newMessageContent = `[DRAFT] Strategic insight for ${executive.name} from ${profile?.name}`;
    
    // Optimistically update the UI
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: `temp-${Date.now()}`,
        content: newMessageContent,
        sender: profile?.name || 'You',
        timestamp: new Date().toISOString(),
      }
    ]);
    
    toast({
      title: "Message Generated",
      description: "A draft message has been added to the conversation."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          {executive.name}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleGenerateMessage}>
              Generate Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Send Feedback</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px] w-full pr-2">
          {isLoading ? (
            <div className="text-muted-foreground">Loading messages...</div>
          ) : error ? (
            <div className="text-destructive">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-muted-foreground">No messages yet.</div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id} className="text-sm">
                  <div className="font-bold">{message.sender}</div>
                  <div className="text-muted-foreground">{message.content}</div>
                  <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
}
