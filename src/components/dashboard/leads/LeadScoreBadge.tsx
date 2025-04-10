
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Flame, CloudSun, Snowflake } from 'lucide-react';

type LeadScoreBadgeProps = {
  score: 'hot' | 'warm' | 'cold';
};

export const LeadScoreBadge: React.FC<LeadScoreBadgeProps> = ({ score }) => {
  const getScoreColor = (score: 'hot' | 'warm' | 'cold') => {
    switch(score) {
      case 'hot': return 'bg-red-500/10 text-red-500 border-red-200';
      case 'warm': return 'bg-orange-500/10 text-orange-500 border-orange-200';
      case 'cold': return 'bg-blue-500/10 text-blue-500 border-blue-200';
    }
  };
  
  const getScoreIcon = (score: 'hot' | 'warm' | 'cold') => {
    switch(score) {
      case 'hot': return <Flame className="w-3.5 h-3.5 mr-1" />;
      case 'warm': return <CloudSun className="w-3.5 h-3.5 mr-1" />;
      case 'cold': return <Snowflake className="w-3.5 h-3.5 mr-1" />;
    }
  };

  return (
    <Badge variant="outline" className={`${getScoreColor(score)} flex items-center`}>
      {getScoreIcon(score)}
      {score.charAt(0).toUpperCase() + score.slice(1)}
    </Badge>
  );
};
