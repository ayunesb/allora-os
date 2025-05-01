
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Settings, Info, ArrowLeft } from 'lucide-react';
import BotChatPanel from '@/components/bot-chat/BotChatPanel';
import BotSettingsPanel from '@/components/bot-chat/BotSettingsPanel';
import BotInfoPanel from '@/components/bot-chat/BotInfoPanel';
import { useAuth } from '@/context/AuthContext';
import { normalizeUserObject } from '@/utils/authCompatibility';

interface BotDetailProps {
  bot?: {
    name: string;
    title: string;
    expertise: string;
    id?: string;
    description?: string;
    avatar?: string;
    industry?: string;
    specialties?: string[];
    [key: string]: any;
  }
}

export default function BotDetail({ bot: initialBot }: BotDetailProps) {
  const { botId } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  
  const normalizedProfile = normalizeUserObject(profile);
  
  // If no bot was passed in props, use the botId from URL params to create a default bot
  const bot = initialBot || {
    id: botId,
    name: "AI Advisor",
    title: "Business Strategist",
    expertise: "Growth Strategies",
    description: "I help businesses identify growth opportunities and develop strategic plans to achieve their goals.",
    avatar: "/ai-advisors/business-strategist.png",
    industry: normalizedProfile?.industry || "General Business",
    specialties: ["Market Analysis", "Competitive Strategy", "Growth Planning"]
  };

  const handleBackClick = () => {
    navigate('/dashboard/ai-bots');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Advisors
      </Button>
      
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={bot.avatar} alt={bot.name} />
              <AvatarFallback className="bg-primary/10 text-lg">
                {bot.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1 text-center sm:text-left">
              <CardTitle className="text-xl">{bot.name}</CardTitle>
              <CardDescription className="text-base">{bot.title}</CardDescription>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                <Badge variant="outline" className="bg-primary/10">
                  {bot.expertise}
                </Badge>
                {bot.industry && (
                  <Badge variant="outline" className="bg-secondary/10">
                    {bot.industry}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 sm:px-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Info</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="chat" className="mt-0">
              <BotChatPanel botId={bot.id || ''} bot={bot} />
            </TabsContent>
            
            <TabsContent value="info" className="mt-0">
              <BotInfoPanel 
                bot={bot}
                description={bot.description} 
                specialties={bot.specialties} 
                expertise={bot.expertise} 
              />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <BotSettingsPanel botId={bot.id || ''} bot={bot} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
