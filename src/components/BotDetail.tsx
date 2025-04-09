
import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import BotInfo from "./bot-detail/BotInfo";
import MessageList from "./bot-detail/MessageList";
import MessageInput from "./bot-detail/MessageInput";
import NotFoundCard from "./bot-detail/NotFoundCard";
import { useBotConsultation } from "./bot-detail/useBotConsultation";

export default function BotDetail() {
  const { botName, role } = useParams<{ botName: string; role: string }>();
  const { bot, messages, isLoading, handleSendMessage } = useBotConsultation(botName, role);

  if (!bot) {
    return (
      <Card className="max-w-4xl mx-auto">
        <NotFoundCard />
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/dashboard/ai-bots">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
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
      
      <Card className="flex flex-col h-[calc(100vh-350px)] min-h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Consultation</CardTitle>
        </CardHeader>
        
        <CardContent className="overflow-y-auto flex-grow pb-0">
          <MessageList messages={messages} />
        </CardContent>
        
        <CardFooter className="pt-4 pb-4 border-t">
          <MessageInput 
            botName={bot.name}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
