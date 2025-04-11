
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Flame, ThermometerSnowflake, ThermometerSun } from 'lucide-react';

interface LeadScoreBadgeProps {
  score: 'hot' | 'warm' | 'cold';
  className?: string;
}

export const LeadScoreBadge: React.FC<LeadScoreBadgeProps> = ({ score, className = '' }) => {
  switch (score) {
    case 'hot':
      return (
        <Badge className={`bg-red-500 hover:bg-red-600 ${className}`}>
          <Flame className="h-3 w-3 mr-1" />
          Hot
        </Badge>
      );
    case 'warm':
      return (
        <Badge className={`bg-amber-500 hover:bg-amber-600 ${className}`}>
          <ThermometerSun className="h-3 w-3 mr-1" />
          Warm
        </Badge>
      );
    case 'cold':
      return (
        <Badge className={`bg-blue-500 hover:bg-blue-600 ${className}`}>
          <ThermometerSnowflake className="h-3 w-3 mr-1" />
          Cold
        </Badge>
      );
    default:
      return null;
  }
};
