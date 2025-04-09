
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { DebateMessage as DebateMessageType, DebateParticipant } from '@/utils/consultation/types';
import { UserCircle, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DebateMessageProps {
  message: DebateMessageType;
  participants: DebateParticipant[];
  onVote?: (messageId: string, increment: boolean) => void;
  onToggleFavorite?: (messageId: string) => void;
}

const DebateMessage: React.FC<DebateMessageProps> = ({ 
  message, 
  participants,
  onVote,
  onToggleFavorite
}) => {
  const participant = participants.find(p => p.id === message.senderId);
  
  return (
    <div className={`flex gap-4 p-3 rounded-lg ${message.isUser ? 'bg-muted/50' : 'bg-card'} ${message.isFavorite ? 'border-2 border-yellow-400' : 'border border-border'}`}>
      <div className="flex-shrink-0">
        {message.isUser ? (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-primary" />
          </div>
        ) : message.senderId === 'system' ? (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-semibold">S</span>
          </div>
        ) : (
          <Avatar className="h-10 w-10">
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="font-semibold">{message.sender.charAt(0)}</span>
            </div>
          </Avatar>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <span className="font-medium">{message.sender}</span>
            {participant && (
              <span className="text-sm text-muted-foreground ml-2">{participant.title}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div className="text-sm">
          {message.content}
        </div>
        {!message.senderId.includes('system') && (
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => onVote && onVote(message.id, true)}
                disabled={!onVote}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-sm mx-1">{message.votes || 0}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => onVote && onVote(message.id, false)}
                disabled={!onVote || (message.votes || 0) <= 0}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-8 w-8", message.isFavorite && "text-yellow-500")} 
              onClick={() => onToggleFavorite && onToggleFavorite(message.id)}
              disabled={!onToggleFavorite}
            >
              <Star className="h-4 w-4" fill={message.isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebateMessage;
