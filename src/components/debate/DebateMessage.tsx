
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy, Video, MessageSquare } from 'lucide-react';
import { DebateMessage as DebateMessageType, DebateParticipant } from '@/utils/consultation/types';

interface DebateMessageProps {
  message: DebateMessageType;
  participants: DebateParticipant[];
}

const DebateMessage: React.FC<DebateMessageProps> = ({ message, participants }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${message.isUser ? 'order-1' : 'order-2'}`}>
        {!message.isUser && message.senderId !== 'system' && (
          <div className="flex items-center mb-1 space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={participants.find(p => p.id === message.senderId)?.avatar} 
                alt={message.sender} 
              />
              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{message.sender}</span>
            {message.senderId !== 'system' && message.senderId !== 'user' && (
              <span className="text-xs text-muted-foreground">
                {participants.find(p => p.id === message.senderId)?.title}
              </span>
            )}
          </div>
        )}
        <div 
          className={`p-3 rounded-lg ${
            message.isUser 
              ? 'bg-primary text-primary-foreground' 
              : message.senderId === 'system'
                ? 'bg-muted text-muted-foreground'
                : 'bg-card border'
          }`}
        >
          {message.content.split('\n').map((line, i) => (
            <p key={i}>{line || <br />}</p>
          ))}
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {!message.isUser && message.senderId !== 'system' && (
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Video className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MessageSquare className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateMessage;
