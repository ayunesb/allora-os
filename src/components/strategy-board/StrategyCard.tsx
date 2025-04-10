
import React from "react";
import { Strategy } from "@/models/strategy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Edit, MessageSquare, FileDown, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StrategyCardProps {
  strategy: Strategy;
  onDebate: () => void;
  onExport: () => void;
}

export default function StrategyCard({ strategy, onDebate, onExport }: StrategyCardProps) {
  // Calculate a mock progress for demonstration
  const progress = strategy.status === 'Completed' ? 100 : Math.floor(Math.random() * 80) + 10;
  
  // Format the date
  const updatedDate = new Date(strategy.updated_at || strategy.created_at);
  const timeAgo = formatDistanceToNow(updatedDate, { addSuffix: true });
  
  // Get risk data
  const risk = strategy.risk || strategy.risk_level || 'Medium';
  
  // Render badge based on risk level
  const getRiskBadge = () => {
    switch (risk) {
      case 'High':
        return <Badge variant="destructive" className="font-medium">High Risk</Badge>;
      case 'Medium':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 font-medium">Medium Risk</Badge>;
      case 'Low':
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 font-medium">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown Risk</Badge>;
    }
  };
  
  // Render status badge
  const getStatusBadge = () => {
    if (strategy.status === 'Completed') {
      return (
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1 font-medium">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1 font-medium">
        <Clock className="h-3 w-3" />
        In Progress
      </Badge>
    );
  };
  
  return (
    <Card className="group overflow-hidden border border-white/10 shadow-xl bg-black/40 backdrop-blur-lg transition-all duration-300 hover:shadow-md hover:border-white/20 hover:-translate-y-1">
      <CardHeader className="pb-2 relative">
        <div className="flex flex-wrap gap-2 mb-1">
          {getRiskBadge()}
          {getStatusBadge()}
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-primary-foreground transition-colors duration-300 line-clamp-2">
          {strategy.title}
        </h3>
        
        {strategy.executiveBot && (
          <div className="text-xs text-muted-foreground">
            Proposed by {strategy.executiveBot}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-300 line-clamp-2">
          {strategy.description}
        </p>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <div className="text-xs text-muted-foreground w-full flex justify-between">
          <span>Updated {timeAgo}</span>
          <span>{strategy.impact || 'Medium'} Impact</span>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDebate();
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Debate
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="border border-white/10 hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onExport();
            }}
          >
            <FileDown className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
