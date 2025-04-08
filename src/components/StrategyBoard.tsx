
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

export default function StrategyBoard() {
  const [strategies, setStrategies] = useState([
    { 
      title: "Expand to New Markets", 
      description: "Analyze emerging markets and expand operations.",
      risk: "Medium"
    },
    { 
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows.",
      risk: "Low"
    },
    { 
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards.",
      risk: "High"
    }
  ]);

  const getRiskIcon = (risk: string) => {
    switch(risk) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "Medium":
        return <TrendingUp className="h-4 w-4 text-amber-500" />;
      case "Low":
        return <ShieldCheck className="h-4 w-4 text-green-500" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "High":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📈 Your Strategic Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <Card key={index} className="border-primary/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{strategy.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{strategy.description}</p>
              <div className="flex items-center">
                <Badge variant="outline" className={`flex items-center gap-1 ${getRiskColor(strategy.risk)}`}>
                  {getRiskIcon(strategy.risk)}
                  {strategy.risk} Risk
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
