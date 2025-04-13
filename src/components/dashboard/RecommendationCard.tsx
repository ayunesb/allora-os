
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, BookOpen } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  type: 'strategy' | 'executive' | 'topic';
  score?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  onSelect?: () => void;
}

export function RecommendationCard({ 
  title, 
  description, 
  type, 
  score = 0,
  riskLevel = 'medium', 
  onSelect 
}: RecommendationCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'strategy':
        return <Zap className="h-4 w-4 text-amber-500" />;
      case 'executive':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'topic':
        return <Shield className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="h-full hover:border-primary/50 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {score > 0 && (
            <Badge variant="outline" className="ml-2">
              {score}%
            </Badge>
          )}
        </div>
        {type === 'strategy' && riskLevel && (
          <Badge className={`${getRiskColor()} hover:${getRiskColor()} mt-1`} variant="secondary">
            {riskLevel} risk
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between" 
          onClick={onSelect}
        >
          <span className="flex items-center">
            {getIcon()}
            <span className="ml-2 text-xs">
              {type === 'strategy' ? 'View Strategy' : 
               type === 'executive' ? 'Consult Executive' : 'Explore Topic'}
            </span>
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
