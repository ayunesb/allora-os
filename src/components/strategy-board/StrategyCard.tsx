
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

interface StrategyCardProps {
  title: string;
  description: string;
  risk: string;
}

export default function StrategyCard({ title, description, risk }: StrategyCardProps) {
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
    <Card className="border-primary/10 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center">
          <Badge variant="outline" className={`flex items-center gap-1 ${getRiskColor(risk)}`}>
            {getRiskIcon(risk)}
            {risk} Risk
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
