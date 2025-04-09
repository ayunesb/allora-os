
import React, { useRef, useEffect } from "react";
import { format } from "date-fns";
import { Bot, User, Clock } from "lucide-react";
import { ConsultationMessage } from "@/utils/consultation";

interface MessageListProps {
  messages: ConsultationMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center">
        <Bot className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Start your consultation
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex gap-3 ${message.type === 'bot' ? 'items-start' : 'items-start justify-end'}`}>
          {message.type === 'bot' && (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}
          
          <div className={`flex flex-col space-y-1 max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${message.type === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
              <p className="text-sm">{message.content}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{format(new Date(message.timestamp), "h:mm a")}</span>
            </div>
          </div>
          
          {message.type === 'user' && (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
