
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAiLearning } from '@/hooks/useAiLearning';

interface FeedbackButtonsProps {
  messageId?: string;
  interactionId?: string;
  botName: string;
  botRole: string;
  topic?: string;
  onFeedbackSubmitted?: (isPositive: boolean) => void;
}

export default function FeedbackButtons({
  messageId,
  interactionId,
  botName,
  botRole,
  topic,
  onFeedbackSubmitted
}: FeedbackButtonsProps) {
  const { trackFeedback, isLoading } = useAiLearning();
  
  const handleFeedback = async (isPositive: boolean) => {
    await trackFeedback(
      interactionId,
      messageId,
      botName,
      botRole,
      isPositive,
      undefined, // No comment
      { topic }
    );
    
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted(isPositive);
    }
  };
  
  return (
    <div className="flex items-center gap-1 mt-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50" 
        onClick={() => handleFeedback(true)}
        disabled={isLoading}
      >
        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
        <span className="text-xs">Helpful</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50" 
        onClick={() => handleFeedback(false)}
        disabled={isLoading}
      >
        <ThumbsDown className="h-3.5 w-3.5 mr-1" />
        <span className="text-xs">Not helpful</span>
      </Button>
    </div>
  );
}
