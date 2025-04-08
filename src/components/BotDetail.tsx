
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Clock,
  Briefcase,
  GraduationCap,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { 
  ConsultationMessage,
  getBotByNameAndRole,
  generateBotResponse,
  saveConsultationMessage,
  startNewConsultation
} from "@/utils/botConsultationHelper";

export default function BotDetail() {
  const { botName, role } = useParams<{ botName: string; role: string }>();
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const bot = botName && role ? getBotByNameAndRole(botName, role) : null;

  // Initialize consultation
  useEffect(() => {
    async function initConsultation() {
      if (botName && role) {
        const newConsultationId = await startNewConsultation(botName, role);
        setConsultationId(newConsultationId);
      }
    }
    
    initConsultation();
  }, [botName, role]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!inputMessage.trim() || !consultationId || !botName || !role) return;
    
    setIsLoading(true);
    
    // Add user message
    const userMessage: ConsultationMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Save user message
    await saveConsultationMessage(consultationId, {
      type: "user",
      content: inputMessage
    });
    
    try {
      // Generate bot response
      const responseContent = await generateBotResponse(botName, role, inputMessage);
      
      // Add bot message
      const botMessage: ConsultationMessage = {
        type: "bot",
        content: responseContent,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message
      await saveConsultationMessage(consultationId, {
        type: "bot",
        content: responseContent
      });
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!bot) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-xl font-semibold mb-2">Advisor not found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find the executive advisor you're looking for.
          </p>
          <Link to="/dashboard/ai-bots">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Advisors</span>
            </Button>
          </Link>
        </CardContent>
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
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>{bot.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{bot.title}</span>
              </CardDescription>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>{bot.expertise}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card className="flex flex-col h-[calc(100vh-350px)] min-h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Consultation</CardTitle>
        </CardHeader>
        
        <CardContent className="overflow-y-auto flex-grow pb-0">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <Bot className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Start your consultation with {bot.name}
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.type === 'bot' ? 'items-start' : 'items-start justify-end'}`}>
                  {message.type === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col space-y-1 max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-lg ${message.type === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(new Date(message.timestamp), "h:mm a")}</span>
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 pb-4 border-t">
          <div className="flex items-center gap-2 w-full">
            <Textarea
              placeholder={`Ask ${bot.name} anything...`}
              className="min-h-[60px] flex-grow"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="h-[60px] w-[60px] flex-shrink-0"
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
