import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchMessagesForExecutive } from "@/agents/meshNetwork";
import { useAuth } from "@/context/AuthContext";
export const ExecutiveMessages = ({
  executiveName,
  executiveRole,
  avatarUrl,
}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const executiveMessages =
          await fetchMessagesForExecutive(executiveName);
        setMessages(executiveMessages);
      } catch (error) {
        console.error("Failed to fetch executive messages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMessages();
  }, [executiveName]);
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          Messages
          {messages.filter((m) => !m.read).length > 0 && (
            <Badge
              variant="destructive"
              className="rounded-full h-5 min-w-5 flex items-center justify-center p-1"
            >
              {messages.filter((m) => !m.read).length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Communications with other executives</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : messages.length > 0 ? (
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${!message.read ? "bg-primary/5 p-2 rounded-md" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        message.from === executiveName ? avatarUrl : undefined
                      }
                    />
                    <AvatarFallback>{getInitials(message.from)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{message.from}</p>
                      <time className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center p-6 text-muted-foreground">
            <p>No messages yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                // Placeholder for message generation
                console.log("Generate sample message");
              }}
            >
              Generate Introduction
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default ExecutiveMessages;
