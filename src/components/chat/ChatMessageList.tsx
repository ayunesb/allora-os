
import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/fixed/Message';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageListProps {
  messages: Message[];
  isTyping?: boolean;
  onClearChat: () => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ 
  messages, 
  isTyping = false,
  onClearChat 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No messages yet</p>
          <p className="text-sm text-muted-foreground">
            Start the conversation by sending a message
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          className="text-muted-foreground hover:text-foreground"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      
      <div className="space-y-4 mt-2 max-h-[400px] overflow-y-auto pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.text}
              
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted">
              <div className="flex gap-1 items-center h-6">
                <Skeleton className="h-2 w-2 rounded-full animate-pulse" />
                <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-75" />
                <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
