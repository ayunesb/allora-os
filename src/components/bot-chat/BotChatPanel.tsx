
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, RefreshCw, Trash2, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRoleTitle } from "@/utils/consultation";
import { toast } from "sonner";

type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "bot";
  botName?: string;
  timestamp: Date;
};

type BotInfo = {
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
};

interface BotChatPanelProps {
  selectedBot: BotInfo | null;
  onSelectBot: (bot: BotInfo | null) => void;
  allBots: BotInfo[];
}

export default function BotChatPanel({ selectedBot, onSelectBot, allBots }: BotChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: selectedBot 
          ? `As ${selectedBot.name}, I would recommend approaching this from a ${selectedBot.specialty} perspective...`
          : "Our executive team would suggest looking at this from multiple angles...",
        sender: "bot",
        botName: selectedBot?.name,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const clearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>AI Executive Chat</CardTitle>
        <CardDescription>
          {selectedBot 
            ? `Speaking with ${selectedBot.name}, ${formatRoleTitle(selectedBot.role)}`
            : "Consult with our AI executive team"}
        </CardDescription>
        
        <Tabs defaultValue="chat" className="mt-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="executives">Executives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            {/* Chat interface will be shown here */}
          </TabsContent>
          
          <TabsContent value="executives" className="mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allBots.slice(0, 6).map((bot) => (
                <Button 
                  key={`${bot.role}-${bot.name}`}
                  variant={selectedBot?.name === bot.name ? "default" : "outline"}
                  className="flex items-center justify-start gap-2 h-auto py-2 px-3"
                  onClick={() => onSelectBot(bot)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={bot.avatar} alt={bot.name} />
                    <AvatarFallback>{bot.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{bot.name}</span>
                </Button>
              ))}
              
              <Button 
                variant={selectedBot === null ? "default" : "outline"}
                className="flex items-center justify-start gap-2 h-auto py-2 px-3"
                onClick={() => onSelectBot(null)}
              >
                <Avatar className="h-8 w-8 bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </Avatar>
                <span className="text-sm">All Executives</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-40 text-muted-foreground">
              <Bot className="h-12 w-12 mb-2 text-muted-foreground/50" />
              <p>No messages yet. Start the conversation with our AI executives.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  {msg.botName && <div className="font-semibold text-xs mb-1">{msg.botName}</div>}
                  <div className="break-words">{msg.content}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <div className="flex w-full gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none min-h-[60px]"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="h-[60px]"
            >
              <SendIcon className="h-5 w-5" />
            </Button>
            <Button 
              onClick={clearChat}
              variant="outline" 
              size="icon"
              title="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
