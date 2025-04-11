
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ExecutiveDebate from './ExecutiveDebate';
import { Button } from '@/components/ui/button';
import { Brain, Users, Lightbulb } from 'lucide-react';

export default function DebateStarterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Debate</h1>
        <p className="text-muted-foreground mt-2">
          Start a new AI-powered executive debate to generate strategic insights for your business
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <ExecutiveDebate />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-primary" />
                <span>How It Works</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Select Executives</h4>
                  <p className="text-xs text-muted-foreground">Choose which AI executives will participate in your debate</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Define Your Topic</h4>
                  <p className="text-xs text-muted-foreground">Choose a business challenge or opportunity to discuss</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Review & Apply</h4>
                  <p className="text-xs text-muted-foreground">Get actionable insights from diverse executive perspectives</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
