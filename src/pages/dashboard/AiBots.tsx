
import Navbar from "@/components/Navbar";
import { Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiBots() {
  const aiBots = [
    {
      name: "Elon Musk",
      title: "Innovation Strategist",
      specialty: "Disruptive Technologies",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      name: "Sara Chen",
      title: "Growth Expert",
      specialty: "Market Expansion",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      name: "Jeff Bezos",
      title: "Scaling Advisor",
      specialty: "Operational Excellence",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      name: "Satya Nadella",
      title: "Tech Strategy",
      specialty: "Digital Transformation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiBots.map((bot, index) => (
            <div key={index} className="dashboard-card flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-xl font-bold mb-1">{bot.name}</h3>
              <p className="text-primary mb-1">{bot.title}</p>
              <p className="text-gray-400 text-sm mb-6">{bot.specialty}</p>
              
              <Button className="mt-auto w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Consult
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-secondary/40 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-300">
            Our AI Executive Team combines specialized LLMs trained on the thinking patterns, 
            expertise, and strategic approaches of the world's most successful business leaders. 
            Consult with any team member to get personalized advice tailored to your specific 
            business challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
