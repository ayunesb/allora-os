
import React from 'react';
import BotDebate from '../BotDebate';
import { useAuth } from '@/context/AuthContext';
import { Lightbulb } from 'lucide-react';

const ExecutiveDebate: React.FC = () => {
  const { profile } = useAuth();
  const companyName = profile?.company || 'Your Company';
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">How Your Strategy Was Created</h1>
        <p className="text-muted-foreground text-lg mb-4">
          See how the Allora AI Executive Team analyzed {companyName}'s needs and debated the best approach
        </p>
        
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-lg p-4 flex items-start gap-3">
          <Lightbulb className="h-6 w-6 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-medium text-amber-500 mb-1">AI Executive Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Our AI executives combine their expertise to create a comprehensive strategy for your business. 
              Each executive contributes based on their specialty: Elon Musk on innovation, Warren Buffett on 
              financial prudence, Satya Nadella on digital transformation, and many others.
            </p>
          </div>
        </div>
      </div>
      
      <BotDebate />
    </div>
  );
};

export default ExecutiveDebate;
