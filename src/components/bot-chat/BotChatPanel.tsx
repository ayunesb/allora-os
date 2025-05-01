
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, RefreshCw } from "lucide-react";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { useBotConsultation } from '@/components/bot-detail/useBotConsultation';
import { Skeleton } from "@/components/ui/skeleton";

interface BotChatPanelProps {
  botId: string;
  title?: string;
  description?: string;
  className?: string;
}

export function BotChatPanel({ 
  botId, 
  title = "AI Assistant", 
  description,
  className = ""
}: BotChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  
  // Use the hook with just the botId parameter
  const {
    messages,
    handleSendMessage,
    isLoading,
    isTyping,
    error,
    clearConversation: clearMessages,
    isVoiceEnabled,
    isListening,
    toggleVoiceInterface,
    startVoiceRecognition
  } = useBotConsultation(botId);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isInputDisabled) return;
    
    setIsInputDisabled(true);
    await handleSendMessage(inputValue);
    setInputValue("");
    setIsInputDisabled(false);
  };
  
  // Handle voice button click
  const handleVoiceClick = () => {
    if (isListening) {
      // Stop listening
      toggleVoiceInterface?.();
    } else {
      // Start listening
      startVoiceRecognition?.();
    }
  };
  
  return (
    <Card className={`flex flex-col h-[500px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto pb-0">
        {isLoading && messages.length === 0 ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-5/6" />
          </div>
        ) : (
          <ChatMessageList 
            messages={messages} 
            isTyping={isTyping}
            onClearChat={clearMessages}
          />
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isInputDisabled}
            className="flex-grow"
          />
          
          {isVoiceEnabled && (
            <Button 
              type="button" 
              size="icon" 
              variant={isListening ? "destructive" : "outline"}
              onClick={handleVoiceClick}
              disabled={isInputDisabled}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
          )}
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isInputDisabled}
          >
            {isInputDisabled ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
