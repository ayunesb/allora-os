import React from 'react';
import { Message } from './MessageType';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className="flex flex-col">
            {message.sender === 'bot' && (
              <div className="flex items-center space-x-2 mb-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-executive.png" alt="AI Bot" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">AI Advisor</span>
              </div>
            )}
            <div className={`rounded-lg px-4 py-2 max-w-2xl ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
              <p className="text-sm">{message.text}</p>
              <span className="block text-xs text-right mt-1 opacity-70">
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
