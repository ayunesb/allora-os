
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Users, BrainCircuit, ArrowRight } from "lucide-react";
import { getExecutiveImage, getExecutiveSuggestions } from "@/utils/ai-executives";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  senderRole?: string;
  isExecutive?: boolean;
}

interface ExecutiveData {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
}

export function ExecutiveInteraction({ riskAppetite = "medium" }: { riskAppetite?: "low" | "medium" | "high" }) {
  const [activeTab, setActiveTab] = useState("chat");
  const [activeExecutiveId, setActiveExecutiveId] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: "welcome-msg",
      sender: "AI Team",
      content: "Welcome! Choose an executive advisor to get started with a personalized conversation.",
      timestamp: new Date(),
      isExecutive: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Get executive team based on risk appetite
  const executives = getExecutiveSuggestions(riskAppetite);
  
  // Find the currently active executive
  const activeExecutive = executives.find(exec => exec.id === activeExecutiveId);

  const handleSendMessage = async () => {
    if (!userMessage.trim() || !activeExecutiveId) {
      toast.error("Please enter a message and select an executive");
      return;
    }

    const activeExec = executives.find(exec => exec.id === activeExecutiveId);
    if (!activeExec) return;

    // Add user message to chat
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "You",
      content: userMessage,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMsg]);
    setUserMessage("");
    setIsLoading(true);

    try {
      // Simulated AI response - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responseContent = generateExecutiveResponse(userMessage, activeExec);
      
      const execResponse: Message = {
        id: `exec-${Date.now()}`,
        sender: activeExec.name,
        content: responseContent,
        timestamp: new Date(),
        senderRole: activeExec.title,
        isExecutive: true
      };
      
      setChatHistory(prev => [...prev, execResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectExecutive = (executiveId: string) => {
    const exec = executives.find(e => e.id === executiveId);
    if (!exec) return;
    
    setActiveExecutiveId(executiveId);
    
    // Add welcome message from the executive
    const welcomeMsg: Message = {
      id: `welcome-${Date.now()}`,
      sender: exec.name,
      content: `Hello, I'm ${exec.name}, your ${exec.title}. My expertise is in ${exec.specialty}. How can I help you today?`,
      timestamp: new Date(),
      senderRole: exec.title,
      isExecutive: true
    };
    
    setChatHistory([welcomeMsg]);
  };

  // Simple response generator based on executive role and user message
  const generateExecutiveResponse = (message: string, executive: ExecutiveData): string => {
    const lowercaseMsg = message.toLowerCase();
    
    if (executive.role === "ceo") {
      if (lowercaseMsg.includes("strategy") || lowercaseMsg.includes("vision")) {
        return "Looking at the big picture, I'd recommend focusing on strategic expansion while maintaining your current operational excellence. Let's set up a detailed strategy session to discuss specifics.";
      } else if (lowercaseMsg.includes("growth") || lowercaseMsg.includes("expand")) {
        return "Growth should be methodical. Based on your current metrics, I see 3 potential expansion paths. Let's analyze market conditions and your risk appetite before deciding.";
      } else {
        return "From a leadership perspective, this requires careful consideration of both short and long-term implications. I'd suggest we examine the strategic alignment with your company goals first, then discuss implementation options.";
      }
    } else if (executive.role === "cfo") {
      if (lowercaseMsg.includes("invest") || lowercaseMsg.includes("funding")) {
        return "Based on current financial projections, I'd recommend allocating resources strategically with a focus on ROI. Let's review your balance sheet and cash flow first to determine the optimal investment strategy.";
      } else if (lowercaseMsg.includes("cost") || lowercaseMsg.includes("budget")) {
        return "I've analyzed your cost structure and identified potential optimization areas that could improve margins by 12-15% without affecting quality or output. Would you like to explore these options?";
      } else {
        return "From a financial perspective, we should focus on maximizing shareholder value while maintaining sufficient operational flexibility. Let me prepare a detailed financial analysis for your consideration.";
      }
    } else if (executive.role.includes("marketing")) {
      return "My analysis of your current marketing efforts shows opportunities for improved engagement in the digital space. I'd recommend a targeted approach focusing on your core demographic with personalized messaging.";
    } else if (executive.role.includes("sales")) {
      return "Looking at your sales pipeline, I see potential to optimize conversion rates at the qualification stage. A revised approach to lead qualification could potentially increase your close rate by 22%.";
    } else {
      return "I've analyzed your query and have several recommendations based on industry best practices and your company's specific circumstances. Would you like me to elaborate on implementation strategies?";
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Executive AI Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chat" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            {!activeExecutiveId ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <BrainCircuit className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select an Executive Advisor</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Choose an executive from your AI team to get personalized advice and insights.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab("team")}
                >
                  View Executive Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar className="h-10 w-10">
                    <img 
                      src={activeExecutive?.avatar} 
                      alt={activeExecutive?.name} 
                      className="aspect-square h-full w-full"
                    />
                  </Avatar>
                  <div>
                    <h3 className="text-base font-medium">{activeExecutive?.name}</h3>
                    <p className="text-xs text-muted-foreground">{activeExecutive?.title}</p>
                  </div>
                </div>
                
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {chatHistory.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isExecutive ? "justify-start" : "justify-end"}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isExecutive 
                              ? "bg-secondary text-secondary-foreground" 
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.senderRole && (
                            <p className="text-xs font-medium mb-1">{message.sender} ({message.senderRole})</p>
                          )}
                          {!message.senderRole && (
                            <p className="text-xs font-medium mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                          <p className="text-xs font-medium mb-1">{activeExecutive?.name} is typing...</p>
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.2s" }}></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.4s" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex items-center gap-2 pt-2">
                  <Input
                    placeholder="Ask your executive team..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={isLoading || !userMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="team">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {executives.map((executive) => (
                <Card 
                  key={executive.id}
                  className={`cursor-pointer transition-all hover:bg-accent ${
                    activeExecutiveId === executive.id ? "border-primary" : ""
                  }`}
                  onClick={() => {
                    handleSelectExecutive(executive.id);
                    setActiveTab("chat");
                  }}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <img 
                        src={executive.avatar} 
                        alt={executive.name} 
                        className="aspect-square h-full w-full"
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{executive.name}</h3>
                      <p className="text-sm text-muted-foreground">{executive.title}</p>
                      <p className="text-xs mt-1">{executive.specialty}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
