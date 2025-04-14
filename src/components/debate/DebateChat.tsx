
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { 
  Heart, 
  ThumbsUp, 
  ThumbsDown,
  Send, 
  Download, 
  Save, 
  BarChart4,
  Sparkles,
  User
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DebateChatProps {
  debateTitle: string;
  debateObjective: string;
  messages: DebateMessage[];
  participants: DebateParticipant[];
  isLoading: boolean;
  onSendMessage: (e: React.FormEvent) => void;
  onSaveDebate: () => void;
  onExportDebate: () => void;
  onGenerateSummary: () => void;
  newMessage: string;
  onNewMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onVoteMessage: (messageId: string, vote: 1 | -1) => void;
  onToggleFavorite: (messageId: string) => void;
}

// These types should exist in your codebase already
// If not, you'll need to implement them accordingly
type MessageType = 'system' | 'user' | 'bot';

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
  onToggleFavorite
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create a map of participants for easy lookup
  const participantsMap = new Map<string, DebateParticipant>();
  participants.forEach(participant => {
    participantsMap.set(participant.name, participant);
  });
  
  // Determine if the scrollable area needs a bottom fade for UX
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollIndicator(scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 20);
    };
    
    container.addEventListener('scroll', checkScroll);
    checkScroll();
    
    return () => container.removeEventListener('scroll', checkScroll);
  }, [messages]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{debateTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">{debateObjective}</p>
          </div>
          
          <div className="flex space-x-1">
            {participants.map((participant) => (
              <TooltipProvider key={participant.id || participant.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="-mr-3 border-2 border-background rounded-full transition-transform hover:scale-105 hover:z-10">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.role}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent 
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto px-4 pb-0 relative"
      >
        <AnimatePresence initial={false}>
          {showScrollIndicator && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"
            />
          )}
        </AnimatePresence>
        
        <div className="space-y-4 pb-4">
          <AnimatePresence initial={false}>
            {messages.map((message, i) => {
              const isSystemMessage = message.senderId === 'system';
              const isUserMessage = message.isUser;
              const participant = participantsMap.get(message.sender);
              
              if (isSystemMessage) {
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <div className="bg-muted/50 text-muted-foreground text-sm py-2 px-4 rounded-full">
                      {message.content}
                    </div>
                  </motion.div>
                );
              }
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                  className={cn(
                    "flex",
                    isUserMessage ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    isUserMessage && "flex-row-reverse"
                  )}>
                    <Avatar className="h-8 w-8 mt-0.5 flex-shrink-0">
                      {isUserMessage ? (
                        <>
                          <AvatarImage src="/avatars/user.png" alt="You" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src={participant?.avatar} alt={message.sender} />
                          <AvatarFallback>
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    
                    <div className={cn(
                      "space-y-1",
                      isUserMessage && "items-end"
                    )}>
                      <div className={cn(
                        "inline-flex items-center",
                        isUserMessage && "flex-row-reverse"
                      )}>
                        <span className={cn(
                          "text-sm font-medium px-1",
                          isUserMessage ? "text-primary" : ""
                        )}>
                          {message.sender}
                        </span>
                        {!isUserMessage && (
                          <span className="text-xs text-muted-foreground px-1">
                            {participant?.role}
                          </span>
                        )}
                      </div>
                      
                      <div className={cn(
                        "rounded-lg p-3",
                        isUserMessage 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-card-foreground"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {!isSystemMessage && (
                        <div className={cn(
                          "flex items-center text-xs text-muted-foreground gap-2 pt-0.5",
                          isUserMessage && "justify-end"
                        )}>
                          <button 
                            onClick={() => onToggleFavorite(message.id)} 
                            className={cn(
                              "p-1 rounded-full hover:bg-muted/50 transition-colors",
                              message.isFavorite ? "text-red-500" : "text-muted-foreground"
                            )}
                          >
                            <Heart className="h-3 w-3" />
                          </button>
                          
                          <button 
                            onClick={() => onVoteMessage(message.id, 1)}
                            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          
                          <button 
                            onClick={() => onVoteMessage(message.id, -1)}
                            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                          
                          <span className="text-xs">
                            {message.votes > 0 ? `+${message.votes}` : message.votes}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-2"
              >
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i} 
                        className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Executives are thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 pb-4 flex-shrink-0">
        <form onSubmit={onSendMessage} className="w-full space-y-2">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={onNewMessageChange}
              placeholder="Ask a question or provide input to the executives..."
              className="min-h-[80px] resize-none pr-12"
            />
            <div className="absolute bottom-2 right-2">
              <Button 
                type="submit" 
                size="icon" 
                className="h-8 w-8 rounded-full" 
                disabled={isLoading || !newMessage.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={onExportDebate} disabled={messages.length === 0}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={onSaveDebate} disabled={messages.length === 0}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
            
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={onGenerateSummary}
              disabled={messages.length < 5}
              className="gap-1"
            >
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default DebateChat;
