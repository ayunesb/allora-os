
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Bot, MessageSquare, User, FileText, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { executiveBots } from "@/backend/executiveBots";
import { Separator } from "@/components/ui/separator";
import { ConsultationMessage, generateBotResponse } from "@/utils/botConsultationHelper";
import ConsultationHistory from "@/components/ConsultationHistory";

// Define skills for different executive roles
const botSkills: Record<string, string[]> = {
  ceo: [
    "Strategic Vision & Leadership",
    "Business Model Innovation",
    "Scaling Operations",
    "Market Positioning",
    "Fundraising Strategy"
  ],
  cfo: [
    "Financial Planning & Analysis",
    "Investment Strategy",
    "Risk Management",
    "Capital Allocation",
    "Financial Modeling"
  ],
  cio: [
    "Digital Transformation",
    "Technology Architecture",
    "IT Governance",
    "Cybersecurity Strategy",
    "Enterprise Systems"
  ],
  cmo: [
    "Brand Strategy",
    "Growth Marketing",
    "Customer Acquisition",
    "Market Research",
    "Competitive Positioning"
  ],
  chro: [
    "Talent Strategy",
    "Organizational Design",
    "Culture Development",
    "Performance Management",
    "Leadership Development"
  ],
  strategy: [
    "Market Analysis",
    "Competitive Intelligence",
    "Opportunity Assessment",
    "Strategic Planning",
    "Innovation Management"
  ]
};

export default function BotDetail() {
  const { botName, role } = useParams<{ botName: string; role: string }>();
  const [consultationInput, setConsultationInput] = useState("");
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // For demo purposes, use placeholder data
  const botData = {
    name: botName || "Executive Bot",
    role: role || "ceo",
    title: role === "ceo" ? "Chief Executive Officer" : 
           role === "cfo" ? "Chief Financial Officer" : 
           role === "cio" ? "Chief Information Officer" : 
           role === "cmo" ? "Chief Marketing Officer" : 
           role === "chro" ? "Chief HR Officer" : "Strategy Consultant",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    bio: `${botName} is a specialized AI advisor trained on the strategic thinking, leadership approach, and business philosophy of the world's most successful ${role === "ceo" ? "chief executives" : "business leaders"}.`,
    expertise: botSkills[role || "ceo"] || botSkills.ceo
  };

  const sendMessage = async () => {
    if (!consultationInput.trim()) return;
    
    const userMessage: ConsultationMessage = {
      type: 'user',
      content: consultationInput,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setConsultationInput("");
    setIsTyping(true);
    
    try {
      // Generate bot response (would be API call in production)
      const responseText = await generateBotResponse(
        botData.name,
        botData.role,
        userMessage.content
      );
      
      // Add a slight delay to simulate thinking
      setTimeout(() => {
        const botMessage: ConsultationMessage = {
          type: 'bot',
          content: responseText,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating response:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link to="/dashboard/ai-bots" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to AI Team
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
              <img src={botData.avatar} alt={botData.name} className="w-full h-full object-cover" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">{botData.name}</h1>
              <p className="text-xl text-primary">{botData.title}</p>
              <p className="text-muted-foreground mt-2">{botData.bio}</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="consult" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="consult" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Consult</span>
            </TabsTrigger>
            <TabsTrigger value="expertise" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Expertise</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consult" className="space-y-4">
            <div className="bg-card rounded-lg border p-4 mb-4 min-h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                    <Bot className="h-12 w-12 mb-4 text-primary/50" />
                    <p className="text-lg font-medium mb-2">Start your consultation with {botData.name}</p>
                    <p className="text-sm max-w-md">
                      Ask for advice on business strategy, leadership challenges, 
                      or specific questions related to {botData.role.toUpperCase()} responsibilities.
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-start gap-3 max-w-[80%]">
                          {message.type === 'bot' && (
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                              <img src={botData.avatar} alt={botData.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          
                          <div 
                            className={`rounded-lg px-4 py-3 ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            {message.content}
                          </div>
                          
                          {message.type === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3 max-w-[80%]">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                            <img src={botData.avatar} alt={botData.name} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="rounded-lg px-4 py-3 bg-muted">
                            <div className="flex gap-1 items-center">
                              <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="flex gap-2 mt-auto">
                <Textarea
                  value={consultationInput}
                  onChange={(e) => setConsultationInput(e.target.value)}
                  placeholder={`Ask ${botData.name} for advice...`}
                  className="min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  className="self-end" 
                  onClick={sendMessage}
                  disabled={!consultationInput.trim() || isTyping}
                >
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="expertise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-4">Core Expertise</h3>
                <ul className="space-y-3">
                  {botData.expertise.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-bold mb-4">Recommended For</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <span>Strategic decision-making and leadership challenges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <span>Advice on scaling your business and team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <span>Guidance on {botData.role === 'ceo' ? 'executive leadership' : botData.role === 'cfo' ? 'financial strategy' : botData.role === 'cmo' ? 'marketing and growth' : 'strategic planning'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <span>Navigating complex business challenges</span>
                  </li>
                </ul>
                
                <Separator className="my-4" />
                
                <Alert className="bg-primary/10 border-primary/30">
                  <AlertDescription>
                    This AI advisor is trained on the thinking patterns, expertise, and strategic approaches
                    of {botData.name} and other successful {botData.role.toUpperCase()} leaders.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <ConsultationHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
