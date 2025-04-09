
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import BotInfo from "./bot-detail/BotInfo";
import MessageList from "./bot-detail/MessageList";
import MessageInput from "./bot-detail/MessageInput";
import NotFoundCard from "./bot-detail/NotFoundCard";
import BotDetailSkeleton from "./bot-detail/BotDetailSkeleton";
import { useBotConsultation } from "./bot-detail/useBotConsultation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function BotDetail() {
  const { botName, role } = useParams<{ botName: string; role: string }>();
  const { bot, messages, isLoading, error, handleSendMessage } = useBotConsultation(botName, role);
  const [isInitializing, setIsInitializing] = useState(true);
  const isMobile = useIsMobile();

  // Simulate initial loading state for better UX
  React.useEffect(() => {
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center justify-between'}`}>
        <Link to="/dashboard/ai-bots">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Advisors</span>
          </Button>
        </Link>
        <UserPreferencesDialog />
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <BotInfo bot={bot} />
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
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            error={error}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
