
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  GraduationCap, 
  Briefcase,
  Building,
  Brain 
} from "lucide-react";
import { useCompanyId } from "@/hooks/useCompanyId";
import { toast } from "sonner";
import { 
  generateBotResponse, 
  saveConsultationMessage, 
  getBotByNameAndRole, 
  startNewConsultation
} from "@/utils/botConsultationHelper";

// Form schema for the chat input
const formSchema = z.object({
  message: z.string().min(1, "Please enter a message")
});

export default function BotDetail() {
  const { botName, role } = useParams();
  const navigate = useNavigate();
  const companyId = useCompanyId();
  const [bot, setBot] = useState<any>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string, timestamp: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load bot details and start a consultation
  useEffect(() => {
    if (!botName || !role) {
      toast.error("Invalid bot details");
      navigate("/dashboard/ai-bots");
      return;
    }

    const botDetails = getBotByNameAndRole(botName, role);
    if (!botDetails) {
      toast.error("Bot not found");
      navigate("/dashboard/ai-bots");
      return;
    }

    setBot(botDetails);

    // Start a new consultation
    async function initConsultation() {
      const id = await startNewConsultation(botName, role);
      if (id) {
        setConsultationId(id);
        // Add initial greeting from bot
        const greeting = `Hello! I'm ${botName}, ${botDetails.title}. I specialize in ${botDetails.expertise}. How can I assist you today?`;
        setMessages([{
          type: 'bot',
          content: greeting,
          timestamp: new Date().toISOString()
        }]);
        
        // Save the bot's initial message
        if (id) {
          await saveConsultationMessage(id, {
            type: 'bot',
            content: greeting
          });
        }
      }
    }

    initConsultation();
  }, [botName, role, navigate]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!consultationId || !bot) return;

    const userMessage = {
      type: 'user' as const,
      content: values.message,
      timestamp: new Date().toISOString()
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    
    // Reset form
    form.reset();
    
    // Save user message to database
    await saveConsultationMessage(consultationId, {
      type: userMessage.type,
      content: userMessage.content
    });

    // Show loading state
    setIsLoading(true);

    try {
      // Generate bot response
      const botResponseText = await generateBotResponse(bot.name, bot.role, userMessage.content);
      
      // Create bot message object
      const botMessage = {
        type: 'bot' as const,
        content: botResponseText,
        timestamp: new Date().toISOString()
      };
      
      // Add bot message to state
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message to database
      await saveConsultationMessage(consultationId, {
        type: botMessage.type,
        content: botMessage.content
      });
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response");
    } finally {
      setIsLoading(false);
    }
  };

  if (!bot) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate("/dashboard/ai-bots")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Consultation with {bot.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bot Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Executive Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-4xl font-bold">{bot.name.charAt(0)}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{bot.name}</p>
                  <p className="text-sm text-muted-foreground">{bot.title}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Expertise</p>
                  <p className="text-sm text-muted-foreground">{bot.expertise}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Brain className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Advisory Style</p>
                  <p className="text-sm text-muted-foreground">
                    {bot.role === 'ceo' ? 'Visionary and strategic thinking' : 
                     bot.role === 'cfo' ? 'Data-driven financial insights' :
                     bot.role === 'cmo' ? 'Creative market-focused approach' :
                     bot.role === 'cio' ? 'Innovative technological solutions' :
                     'Strategic business consulting'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-muted-foreground">
                    {bot.role === 'ceo' ? 'Fortune 500 leadership' : 
                     bot.role === 'cfo' ? 'Financial management and investment strategy' :
                     bot.role === 'cmo' ? 'Global brand development and marketing campaigns' :
                     bot.role === 'cio' ? 'Enterprise technology transformation' :
                     'Industry-leading consulting'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col h-[600px]">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversation
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.type === 'user' ? 'You' : bot.name}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t mt-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message..." 
                            className="min-h-[60px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="self-end"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { MessageSquare } from "lucide-react";
