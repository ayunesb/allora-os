
import React from 'react';
import { useExecutiveDebate } from '@/hooks/useExecutiveDebate';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatRoleTitle } from '@/utils/consultation';
import { ThumbsUp, ThumbsDown, Lightbulb, Users, CheckCircle, MessageSquare, Briefcase, Brain } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ExecutiveBoardroom: React.FC = () => {
  const { debateMessages, debateSummary, isLoading } = useExecutiveDebate();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="debate" className="space-y-4">
        <TabsList className="mb-2">
          <TabsTrigger value="debate" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Debate Transcript</span>
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Decision Summary</span>
          </TabsTrigger>
          <TabsTrigger value="contributors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Key Contributors</span>
          </TabsTrigger>
          <TabsTrigger value="process" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Thinking Process</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="debate">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold">Executive Boardroom Debate</CardTitle>
              <CardDescription>
                See how our AI executive team analyzed your company's needs and debated the best strategic approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {debateMessages.map((message) => (
                  <div key={message.id} className="flex gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarImage src={message.executive.avatar} alt={message.executive.name} />
                      <AvatarFallback>
                        {message.executive.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.executive.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.executive.role || formatRoleTitle(message.executive.role || '')}
                        </span>
                      </div>
                      <div className="bg-secondary/10 rounded-lg p-3">
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold">Decision Summary</CardTitle>
              <CardDescription>
                The key decisions and recommendations from the executive team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/10 rounded-lg p-4">
                <p>{typeof debateSummary === 'string' ? debateSummary : "No summary is available for this debate yet."}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contributors">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold">Key Contributors</CardTitle>
              <CardDescription>
                The executive team members who contributed to this analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {debateMessages
                  .filter((m, i, arr) => arr.findIndex(m2 => m2.executive.name === m.executive.name) === i)
                  .map((message) => (
                    <div key={message.executive.name} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={message.executive.avatar} alt={message.executive.name} />
                        <AvatarFallback>
                          {message.executive.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{message.executive.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.executive.role || formatRoleTitle(message.executive.role || '')}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="process">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold">Thinking Process</CardTitle>
              <CardDescription>
                How our AI executive team approached the analysis of your business needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    Analysis Methodology
                  </h3>
                  <p className="text-sm">
                    Our AI executive team analyzes your business information through multiple perspectives,
                    using industry-specific knowledge and strategic frameworks to provide comprehensive insights.
                  </p>
                </div>
                
                <div className="bg-secondary/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                    Business Context Integration
                  </h3>
                  <p className="text-sm">
                    The team integrates your specific business context with market trends,
                    competitive analysis, and growth opportunities to create tailored recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveBoardroom;
