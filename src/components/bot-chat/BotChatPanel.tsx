
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getExecutiveImage } from "@/utils/ai-executives";
import { formatRoleTitle } from "@/utils/consultation/botRoleUtils";
import { useBotConsultation } from "@/components/bot-detail/useBotConsultation";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { VoiceControls } from "./VoiceControls";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IndustryExpertSelector } from "@/components/ai-bots/IndustryExpertSelector";

interface BotChatPanelProps {
  selectedBot: any;
  onSelectBot: (bot: any) => void;
  allBots: any[];
}

const BotChatPanel: React.FC<BotChatPanelProps> = ({ 
  selectedBot, 
  onSelectBot,
  allBots 
}) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedIndustryBot, setSelectedIndustryBot] = useState<any | null>(null);
  
  const currentBot = selectedIndustryBot || selectedBot;
  
  const { 
    bot, 
    messages, 
    isLoading, 
    isTyping,
    isVoiceEnabled,
    isListening,
    handleSendMessage, 
    clearConversation,
    toggleVoiceInterface,
    startVoiceRecognition 
  } = useBotConsultation(
    currentBot?.name, 
    currentBot?.role,
    currentBot?.industry
  );

  // Reset selected industry bot when main selected bot changes
  useEffect(() => {
    setSelectedIndustryBot(null);
  }, [selectedBot]);

  const handleIndustryExpertSelect = (expert: { name: string; role: string; industry: string }) => {
    setSelectedIndustryBot({
      name: expert.name,
      role: expert.role,
      title: formatRoleTitle(expert.role),
      industry: expert.industry,
      avatar: getExecutiveImage(expert.name)
    });
    setActiveTab("chat");
  };

  if (!currentBot) {
    return (
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select an executive advisor to start a conversation</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="chat">Conversation</TabsTrigger>
            <TabsTrigger value="experts">Industry Experts</TabsTrigger>
          </TabsList>
          
          {activeTab === "chat" && isVoiceEnabled !== undefined && (
            <VoiceControls
              isVoiceEnabled={isVoiceEnabled}
              isListening={isListening || false}
              toggleVoiceInterface={toggleVoiceInterface || (() => {})}
              startVoiceRecognition={startVoiceRecognition || (() => {})}
            />
          )}
        </div>
        
        <TabsContent value="chat" className="mt-4 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={currentBot?.avatar || getExecutiveImage(currentBot?.name)} />
                  <AvatarFallback>{currentBot?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{currentBot?.name}</CardTitle>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-muted-foreground">{currentBot?.title}</span>
                    {currentBot?.industry && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        {currentBot.industry}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChatMessageList 
                messages={messages}
                isTyping={isTyping}
                onClearChat={clearConversation}
              />
              
              <div className="mt-4">
                <ChatInput 
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  placeholder={`Ask ${currentBot?.name} a question...`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experts" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <IndustryExpertSelector onSelectExpert={handleIndustryExpertSelect} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BotChatPanel;
