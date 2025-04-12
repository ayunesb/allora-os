
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Flame, ThermometerSnowflake, ThermometerSun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadScoreBadgeProps {
  score: 'hot' | 'warm' | 'cold';
  className?: string;
  showIcon?: boolean;
  pulsing?: boolean;
}

export const LeadScoreBadge: React.FC<LeadScoreBadgeProps> = ({ 
  score, 
  className = '',
  showIcon = true,
  pulsing = false
}) => {
  const badges = {
    hot: {
      icon: <Flame className="h-3 w-3 mr-1" />,
      class: "bg-gradient-to-r from-red-500 to-orange-400 border-red-400/30"
    },
    warm: {
      icon: <ThermometerSun className="h-3 w-3 mr-1" />,
      class: "bg-gradient-to-r from-amber-500 to-yellow-400 border-amber-400/30"
    },
    cold: {
      icon: <ThermometerSnowflake className="h-3 w-3 mr-1" />,
      class: "bg-gradient-to-r from-blue-500 to-cyan-400 border-blue-400/30"
    }
  };

  return (
    <Badge 
      className={cn(
        badges[score].class,
        "text-white font-medium transition-all border shadow-sm",
        pulsing && (score === 'hot' ? "animate-pulse-slow" : ""),
        className
      )}
    >
      {showIcon && badges[score].icon}
      {score.charAt(0).toUpperCase() + score.slice(1)}
    </Badge>
  );
};
