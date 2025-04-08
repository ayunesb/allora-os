
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Save, Download, FileText } from 'lucide-react';
import { DebateMessage as DebateMessageType, DebateParticipant } from '@/utils/consultation/types';
import DebateMessage from './DebateMessage';

interface DebateChatProps {
  debateTitle: string;
  debateObjective: string;
  messages: DebateMessageType[];
  participants: DebateParticipant[];
  isLoading: boolean;
  onSendMessage: (e: React.FormEvent) => void;
  onSaveDebate: () => void;
  onExportDebate: () => void;
  onGenerateSummary: () => void;
  newMessage: string;
  onNewMessageChange: (value: string) => void;
}

const DebateChat: React.FC<DebateChatProps> = ({
  debateTitle,
  debateObjective,
  messages,
  participants,
  isLoading,
  onSendMessage,
  onSaveDebate,
  onExportDebate,
  onGenerateSummary,
  newMessage,
  onNewMessageChange,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{debateTitle || 'Executive Debate'}</CardTitle>
            <CardDescription>
              {debateObjective || 'AI executives discussing strategies'}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onSaveDebate}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onExportDebate}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onGenerateSummary}>
              <FileText className="h-4 w-4 mr-1" />
              Summary
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ScrollArea className="h-[calc(100vh-350px)] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <DebateMessage 
                key={message.id} 
                message={message} 
                participants={participants} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4">
        <form onSubmit={onSendMessage} className="flex space-x-2 w-full">
          <Input
            placeholder="Ask a question or provide guidance..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim() || isLoading}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default DebateChat;
