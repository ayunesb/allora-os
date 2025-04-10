
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DebateParticipant } from '@/utils/consultation/types';
import { DebateReaction } from '@/hooks/useExecutiveBoardroom';

interface ThoughtBubbleProps {
  reaction: DebateReaction;
  executives: DebateParticipant[];
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({
  reaction,
  executives
}) => {
  const executive = executives.find(e => e.id === reaction.executiveId);
  if (!executive) return null;
  
  // Position the thought bubble near the right edge
  const positionStyle = {
    right: '20px',
    top: '10px'
  };
  
  return (
    <motion.div 
      className="absolute z-10 flex items-start gap-2"
      style={positionStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <div className="absolute -left-2 top-3 w-2 h-2 rotate-45 bg-gray-700"></div>
        <div className="bg-gray-700 rounded-lg py-1 px-2 text-xs text-white max-w-[150px]">
          {reaction.thought}
        </div>
      </div>
      <Avatar className="h-6 w-6 border border-gray-800">
        <AvatarImage src={executive.avatar} alt={executive.name} />
        <AvatarFallback className="bg-purple-900 text-white text-xs">
          {executive.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default ThoughtBubble;
