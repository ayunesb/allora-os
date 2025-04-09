
import React, { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pb-2">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start gap-3 transition-opacity animate-fade-in",
            message.sender === "bot" ? "opacity-100" : "opacity-100",
            {"mt-8": index > 0 && messages[index - 1].sender !== message.sender}
          )}
          aria-label={`${message.sender === "bot" ? "Advisor" : "You"} message`}
        >
          <div 
            className={cn(
              "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
              message.sender === "bot" ? "bg-primary/20" : "bg-secondary"
            )}
            aria-hidden="true"
          >
            {message.sender === "bot" ? (
              <Bot className="h-4 w-4 text-primary" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          
          <div className={cn("flex flex-col", isMobile ? "max-w-[calc(100%-60px)]" : "max-w-[80%]")}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">
                {message.sender === "bot" ? "Advisor" : "You"}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(message.timestamp), "h:mm a")}
              </span>
            </div>
            
            <div 
              className={cn(
                "rounded-lg p-3",
                message.sender === "bot" 
                  ? "bg-primary/5 border border-primary/10" 
                  : "bg-secondary"
              )}
            >
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
