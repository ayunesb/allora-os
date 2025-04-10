
import React from 'react';
import BotDebate from '../BotDebate';
import { useAuth } from '@/context/AuthContext';
import { Lightbulb, Brain, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-amber-950/10 border border-amber-800/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-medium text-amber-500 mb-1">Executive Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI executives combine their expertise to create a comprehensive strategy for your business. 
                  Each executive contributes based on their specialty: Elon Musk on innovation, Warren Buffett on 
                  financial prudence, Satya Nadella on digital transformation, and many others.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/10 border border-primary/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Brain className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-medium text-primary mb-1">Strategic Decision Making</h3>
                <p className="text-sm text-muted-foreground">
                  The AI executive team analyzes your company information, industry trends, and market opportunities
                  to generate strategies tailored to your specific business goals, risk appetite, and growth stage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-green-950/10 border border-green-800/30">
            <CardContent className="p-4 flex items-start gap-3">
              <MessageSquare className="h-6 w-6 text-green-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-medium text-green-500 mb-1">Debate & Discussion</h3>
                <p className="text-sm text-muted-foreground">
                  Just like a real executive boardroom, our AI team engages in debate and discussion, challenging 
                  assumptions and refining ideas. The best strategies emerge from this collaborative process where 
                  different perspectives are considered.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-950/10 border border-blue-800/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Users className="h-6 w-6 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-medium text-blue-500 mb-1">Implementation Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Beyond just strategy creation, our AI executives develop practical implementation plans, 
                  marketing campaigns, sales scripts, and other operational tools to help you execute 
                  the strategy effectively.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BotDebate />
    </div>
  );
};

export default ExecutiveDebate;
