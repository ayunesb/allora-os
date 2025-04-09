
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useDebateSession from '@/hooks/useDebateSession';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import BotDebate from '../BotDebate';

const ExecutiveDebate: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <BotDebate />
    </div>
  );
};

export default ExecutiveDebate;
