
import React from 'react';
import { Card } from '@/components/ui/card';

interface ExecutiveDebateProps {
  topic?: string;
  participants?: string[];
}

export const ExecutiveDebate: React.FC<ExecutiveDebateProps> = ({
  topic = "Growth Strategy",
  participants = ["CEO", "CMO", "CTO"]
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Executive Debate: {topic}</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          The AI executives are debating the best approach to {topic.toLowerCase()}.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {participants.map(participant => (
            <span key={participant} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {participant}
            </span>
          ))}
        </div>
        
        <div className="mt-6 space-y-4 border-t pt-4">
          <p className="italic">Debate visualization is loading...</p>
        </div>
      </div>
    </Card>
  );
};

export default ExecutiveDebate;
