
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Save, Download, FileText, Star } from 'lucide-react';
import { DebateMessage as DebateMessageType, DebateParticipant } from '@/utils/consultation/types';
import DebateMessage from './DebateMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  onVoteMessage?: (messageId: string, increment: boolean) => void;
  onToggleFavorite?: (messageId: string) => void;
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
  onVoteMessage,
  onToggleFavorite,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState("all");

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const favoritedMessages = messages.filter(message => message.isFavorite);

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Messages</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>Favorites ({favoritedMessages.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="h-full">
            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <DebateMessage 
                    key={message.id} 
                    message={message} 
                    participants={participants}
                    onVote={onVoteMessage}
                    onToggleFavorite={onToggleFavorite} 
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="favorites" className="h-full">
            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
              <div className="space-y-4">
                {favoritedMessages.length > 0 ? (
                  favoritedMessages.map((message) => (
                    <DebateMessage 
                      key={message.id} 
                      message={message} 
                      participants={participants}
                      onVote={onVoteMessage}
                      onToggleFavorite={onToggleFavorite} 
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Star className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No favorites yet</h3>
                    <p className="text-muted-foreground">
                      Star important messages to save them here for quick reference
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
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
