
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Bot, MessageSquare, User, PlusCircle, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { executiveBots } from "@/backend/executiveBots";
import BotCard from "@/components/BotCard";
import ExecutiveRoster from "@/components/ExecutiveRoster";

export default function AiBots() {
  const [selectedBot, setSelectedBot] = useState<{
    name: string;
    title: string;
    specialty: string;
    avatar: string;
  } | null>(null);
  
  const [consultationInput, setConsultationInput] = useState("");
  const [consultationHistory, setConsultationHistory] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);
  
  const aiBots = [
    {
      name: "Elon Musk",
      title: "Innovation Strategist",
      specialty: "Disruptive Technologies",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      role: "ceo"
    },
    {
      name: "Sara Chen",
      title: "Growth Expert",
      specialty: "Market Expansion",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      role: "cmo"
    },
    {
      name: "Jeff Bezos",
      title: "Scaling Advisor",
      specialty: "Operational Excellence",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      role: "ceo"
    },
    {
      name: "Satya Nadella",
      title: "Tech Strategy",
      specialty: "Digital Transformation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      role: "cio"
    },
  ];

  const handleConsult = (bot: typeof aiBots[0]) => {
    setSelectedBot(bot);
    setConsultationHistory([]);
  };

  const sendConsultationMessage = () => {
    if (!consultationInput.trim() || !selectedBot) return;
    
    setConsultationHistory(prev => [...prev, {type: 'user', content: consultationInput}]);
    
    setTimeout(() => {
      const botResponse = `As ${selectedBot.name}, I'd recommend approaching this challenge by focusing on innovation and efficiency. Let's discuss this further to develop a tailored strategy for your specific situation.`;
      setConsultationHistory(prev => [...prev, {type: 'bot', content: botResponse}]);
    }, 1000);
    
    setConsultationInput("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <Bot className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI Executive Team</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          Allora AI's Board of Directors: Virtual advisors powered by specialized AI models
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiBots.map((bot, index) => (
            <BotCard 
              key={index} 
              bot={bot} 
              onConsult={() => handleConsult(bot)}
            />
          ))}
        </div>
        
        <ExecutiveRoster />
        
        <div className="mt-12 bg-secondary/40 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-300">
            Our AI Executive Team combines specialized LLMs trained on the thinking patterns, 
            expertise, and strategic approaches of the world's most successful business leaders. 
            Consult with any team member to get personalized advice tailored to your specific 
            business challenges.
          </p>
        </div>

        <Dialog open={!!selectedBot} onOpenChange={(open) => !open && setSelectedBot(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {selectedBot && (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={selectedBot.avatar} alt={selectedBot.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <DialogTitle>{selectedBot?.name}</DialogTitle>
                  <DialogDescription>{selectedBot?.title} - {selectedBot?.specialty}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto my-4 space-y-4 min-h-[300px]">
              {consultationHistory.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Users className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>Start your consultation with {selectedBot?.name}</p>
                </div>
              ) : (
                consultationHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              <Textarea
                value={consultationInput}
                onChange={(e) => setConsultationInput(e.target.value)}
                placeholder={`Ask ${selectedBot?.name} for strategic advice...`}
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendConsultationMessage();
                  }
                }}
              />
              <Button 
                className="self-end" 
                onClick={sendConsultationMessage}
                disabled={!consultationInput.trim()}
              >
                Send
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
