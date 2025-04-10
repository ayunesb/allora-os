
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BotDebate from '../BotDebate';
import { useAuth } from '@/context/AuthContext';

const ExecutiveDebate: React.FC = () => {
  const { profile } = useAuth();
  const companyName = profile?.company || 'Your Company';
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">How Your Strategy Was Created</h1>
        <p className="text-muted-foreground text-lg">
          See how the AI executive team analyzed {companyName}'s needs and debated the best approach
        </p>
      </div>
      
      <BotDebate />
    </div>
  );
};

export default ExecutiveDebate;
