
import React, { useRef, useEffect, useState } from "react";
import { Message } from "./useBotConsultation";
import { Bot, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MessageListProps {
  messages: Message[];
}

const TypingIndicator = () => (
  <div className="flex space-x-1.5" aria-label="AI is typing">
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
  </div>
);

const MessageItem = React.memo(({ message, isLatest }: { message: Message; isLatest: boolean }) => {
  const isUser = message.sender === "user";
  
  return (
    <div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      {!isUser && (
        <div 
          className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"
          aria-hidden="true"
        >
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div 
        className={`max-w-[80%] flex flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-lg transition-all duration-300",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted",
            isUser && isLatest && "animate-fadeIn",
            !isUser && isLatest && !message.isTyping && "animate-slideIn"
          )}
          role={isUser ? "complementary" : "article"}
          aria-label={`${isUser ? "You" : "Advisor"} said`}
        >
          {message.isTyping ? (
            <TypingIndicator />
          ) : (
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
          )}
        </div>
        <span 
          className="text-xs text-muted-foreground mt-1" 
          aria-label={`Sent at ${format(message.timestamp, 'p')}`}
        >
          {format(message.timestamp, 'p')}
        </span>
      </div>
      {isUser && (
        <div 
          className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"
          aria-hidden="true"
        >
          <User className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );
});

MessageItem.displayName = "MessageItem";

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const prevMessagesLengthRef = useRef(messages.length);

  useEffect(() => {
    try {
      if (messages.length > prevMessagesLengthRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      prevMessagesLengthRef.current = messages.length;
    } catch (error) {
      console.error("Error scrolling to bottom:", error);
      setHasError(true);
    }
  }, [messages]);

  if (hasError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          There was an error displaying messages. Please refresh the page.
        </AlertDescription>
      </Alert>
    );
  }

  if (messages.length === 0) {
    return null;
  }

  // Helper function to find the last index that matches a condition
  const findLastIndex = <T,>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
        return i;
      }
    }
    return -1;
  };

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
          index === findLastIndex(messages, m => m.sender === "user");
        
        const isLatestBotMessage = 
          message.sender === "bot" && 
          !message.isTyping && 
          index === findLastIndex(messages, m => m.sender === "bot" && !m.isTyping);

        return (
          <MessageItem 
            key={message.id} 
            message={message} 
            isLatest={isLatestUserMessage || isLatestBotMessage} 
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessageList);
