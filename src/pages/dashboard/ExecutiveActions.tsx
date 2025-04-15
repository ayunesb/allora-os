
import React from 'react';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ExecutiveActions = () => {
  // Sample data - in a real app, this would come from an API
  const actions = [
    {
      id: '1',
      task: 'Increase marketing budget for Q2',
      status: 'completed',
      executiveName: 'CMO',
      completedAt: '2025-04-10T15:30:00Z',
      result: 'Increased budget by 15% based on Q1 performance metrics'
    },
    {
      id: '2',
      task: 'Review sales team performance',
      status: 'pending',
      executiveName: 'CEO',
      triggeredBy: 'Weekly Review'
    },
    {
      id: '3',
      task: 'Optimize cloud infrastructure costs',
      status: 'failed',
      executiveName: 'CTO',
      error: 'Insufficient data to make optimization decision'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-300">
          <AlertCircle className="h-3 w-3 mr-1" /> Failed
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container px-4 py-6">
      <PageTitle
        title="Executive Actions"
        description="Track and manage executive decisions and automated actions"
      />
      
      <div className="mt-8 space-y-4">
        {actions.map(action => (
          <Card key={action.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">{action.task}</CardTitle>
                {getStatusBadge(action.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Executive:</span>
                  <span className="font-medium">{action.executiveName}</span>
                </div>
                
                {action.completedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed:</span>
                    <span>{new Date(action.completedAt).toLocaleString()}</span>
                  </div>
                )}
                
                {action.triggeredBy && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Triggered by:</span>
                    <span>{action.triggeredBy}</span>
                  </div>
                )}
                
                {action.result && (
                  <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md text-sm">
                    {action.result}
                  </div>
                )}
                
                {action.error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                    Error: {action.error}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveActions;
