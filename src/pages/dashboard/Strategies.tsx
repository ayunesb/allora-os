
import Navbar from "@/components/Navbar";
import { TrendingUp, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Strategies() {
  const strategies = [
    {
      title: "Market Expansion Strategy",
      description: "AI-generated plan to enter new markets with minimal risk",
      status: "Ready",
    },
    {
      title: "Revenue Optimization",
      description: "Streamline operations and maximize profit margins",
      status: "In Progress",
    },
    {
      title: "Competitive Analysis",
      description: "Detailed breakdown of market competitors and opportunities",
      status: "Ready",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">AI-Generated Business Strategies</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          Allora AI automatically builds full business plans customized to your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {strategies.map((strategy, index) => (
            <div key={index} className="dashboard-card flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{strategy.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  strategy.status === "Ready" 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-amber-500/20 text-amber-400"
                }`}>
                  {strategy.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6">{strategy.description}</p>
              
              <Button className="mt-auto" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Strategy
              </Button>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Generate New Strategy</h2>
          <p className="text-gray-300 mb-4">
            Let our AI create a customized business strategy based on your goals and market conditions.
          </p>
          <Button className="allora-button">
            Create Strategy <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
