import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import BotInfo from "./bot-detail/BotInfo";
import MessageList from "./bot-detail/MessageList";
import MessageInput from "./bot-detail/MessageInput";
import NotFoundCard from "./bot-detail/NotFoundCard";
import BotDetailSkeleton from "./bot-detail/BotDetailSkeleton";
import { useBotConsultation, type Bot } from "./bot-detail/useBotConsultation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BotDetail() {
  const { botId } = useParams<{ botId: string }>();
  const [botName, role] = botId?.split('-') || ['', ''];
  
  const { 
    bot, 
    messages, 
    isLoading, 
    isTyping,
    error, 
    retryCount,
    handleSendMessage,
    retryLastMessage,
    clearConversation
  } = useBotConsultation(botName, role);
  const [isInitializing, setIsInitializing] = useState(true);
  const isMobile = useIsMobile();

  // Simulate initial loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto" aria-live="polite" aria-busy="true">
        <div className="flex items-center justify-between">
          <div className="h-9"><div className="w-32 h-4 bg-muted rounded animate-pulse"></div></div>
          <div className="w-10 h-9 bg-muted rounded animate-pulse"></div>
        </div>
        <BotDetailSkeleton />
      </div>
    );
  }

  if (!bot) {
    return (
      <Card className="max-w-4xl mx-auto">
        <NotFoundCard />
      </Card>
    );
  }

  // Determine if we can retry based on whether there are messages and we're not loading
  const canRetry = messages.length > 0 && !isLoading;

  // Create a fallback bot object with required fields if any are missing
  const enhancedBot: Bot = {
    id: bot?.id,
    name: bot?.name || '',
    title: bot?.title || role || 'Executive Advisor',
    role: bot?.role || role || 'Executive Advisor',
    description: bot?.description,
    avatar: bot?.avatar,
    expertise: bot?.expertise || 'Business Strategy',
    isActive: bot?.isActive
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center justify-between'}`}>
        <Link to="/dashboard/ai-bots">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Advisors</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2" 
                  onClick={clearConversation} 
                  disabled={messages.length === 0}
                >
                  <span>New Conversation</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start a new conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <UserPreferencesDialog />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize advisor responses</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Help</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" align="center" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">How to use this advisor</p>
                  <ul className="text-xs space-y-1 list-disc pl-3">
                    <li>Ask specific questions about your business</li>
                    <li>Share details about your situation for better advice</li>
                    <li>Use the preferences to customize responses</li>
                    <li>Save your favorite responses for later reference</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <BotInfo bot={enhancedBot} />
          {retryCount > 2 && (
            <CardDescription className="mt-2 text-amber-500 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Having trouble? Try adjusting your question or check your user preferences for this advisor.
            </CardDescription>
          )}
        </CardHeader>
      </Card>
      
      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card 
        className="flex flex-col h-[calc(100vh-350px)] min-h-[400px]"
        aria-label={`Consultation with ${bot.name}`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Consultation</CardTitle>
        </CardHeader>
        
        <CardContent 
          className="overflow-y-auto flex-grow pb-0" 
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-center p-4">
              <p>Start your consultation with {bot.name} by sending a message below.</p>
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
        </CardContent>
        
        <CardFooter className="pt-4 pb-4 border-t">
          <MessageInput 
            botName={bot.name}
            isLoading={isLoading || isTyping}
            onSendMessage={handleSendMessage}
            onRetry={retryLastMessage}
            onClear={clearConversation}
            error={error}
            canRetry={canRetry}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
