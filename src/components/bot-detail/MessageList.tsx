
import React, { useRef, useEffect } from "react";
import { Message } from "./useBotConsultation";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
}

const TypingIndicator = () => (
  <div className="flex space-x-1.5">
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
  </div>
);

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div 
      className="space-y-4 pb-4" 
      role="log" 
      aria-label="Conversation Messages" 
      aria-live="polite"
    >
      {messages.map((message, index) => {
        const isLatestUserMessage = 
          message.sender === "user" && 
          index === messages.findIndex(m => m.sender === "user" && m.id === message.id);
        
        const isLatestBotMessage = 
          message.sender === "bot" && 
          !message.isTyping && 
          index === messages.findIndex(m => m.sender === "bot" && m.id === message.id);

        return (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender === "user" ? "justify-end text-right" : "justify-start text-left"
            }`}
          >
            {message.sender === "bot" && (
              <div 
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"
                aria-hidden="true"
              >
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div 
              className={`max-w-[80%] flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-300",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                  isLatestUserMessage && "animate-fadeIn",
                  isLatestBotMessage && "animate-slideIn"
                )}
                role={message.sender === "user" ? "complementary" : "article"}
                aria-label={`${message.sender === "user" ? "You" : "Advisor"} said`}
              >
                {message.isTyping ? (
                  <TypingIndicator />
                ) : (
                  <div className="whitespace-pre-wrap">{message.content}</div>
                )}
              </div>
              <span 
                className="text-xs text-muted-foreground mt-1" 
                aria-label={`Sent at ${format(message.timestamp, 'p')}`}
              >
                {format(message.timestamp, 'p')}
              </span>
            </div>
            {message.sender === "user" && (
              <div 
                className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"
                aria-hidden="true"
              >
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
