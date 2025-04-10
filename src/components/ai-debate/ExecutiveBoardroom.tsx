
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
                          ({formatRoleTitle(message.executive.role)})
                        </span>
                        {message.sentiment === 'positive' && (
                          <ThumbsUp className="h-3.5 w-3.5 text-green-500" />
                        )}
                        {message.sentiment === 'negative' && (
                          <ThumbsDown className="h-3.5 w-3.5 text-red-500" />
                        )}
                        {message.sentiment === 'neutral' && (
                          <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                          </span>
                        )}
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg border border-border/40">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          {debateSummary && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Decision Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <h3 className="font-medium">Key Findings</h3>
                    </div>
                    <ul className="space-y-1 pl-6 list-disc">
                      {debateSummary.keyFindings.map((finding, index) => (
                        <li key={index} className="text-sm">{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <h3 className="font-medium">Points of Agreement</h3>
                      </div>
                      <ul className="space-y-1 pl-6 list-disc">
                        {debateSummary.agreedPoints.map((point, index) => (
                          <li key={index} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <h3 className="font-medium">Points of Disagreement</h3>
                      </div>
                      <ul className="space-y-1 pl-6 list-disc">
                        {debateSummary.disagreedPoints.map((point, index) => (
                          <li key={index} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Final Decision</h3>
                    </div>
                    <p className="text-sm">{debateSummary.finalDecision}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contributors">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Key Contributors</span>
              </CardTitle>
              <CardDescription>
                Meet the AI executives who contributed to your business strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {debateMessages.length > 0 && 
                  Array.from(new Set(debateMessages.map(m => m.executive.name))).map((name, index) => {
                    const executive = debateMessages.find(m => m.executive.name === name)?.executive;
                    if (!executive) return null;
                    
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/40">
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarImage src={executive.avatar} alt={executive.name} />
                          <AvatarFallback>{executive.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{executive.name}</h3>
                          <p className="text-xs text-muted-foreground">{formatRoleTitle(executive.role)}</p>
                          <p className="mt-2 text-sm">
                            {executive.role === 'ceo' 
                              ? 'Led the strategic direction discussion' 
                              : executive.role === 'cfo' 
                                ? 'Provided financial risk assessment'
                                : executive.role === 'strategy'
                                  ? 'Outlined strategic market positioning'
                                  : 'Contributed domain expertise to the discussion'}
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>The Decision Process</span>
              </CardTitle>
              <CardDescription>
                Understand how our AI executive team collaborates to create your strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="font-medium text-lg">1. Information Analysis</h3>
                  <p className="text-sm mt-1">
                    The AI executive team analyzes your company's industry, goals, and market position to establish a baseline for discussion.
                  </p>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="font-medium text-lg">2. Executive Debate</h3>
                  <p className="text-sm mt-1">
                    Each executive contributes based on their specialty - Elon Musk on innovation, Warren Buffett on financial prudence, Satya Nadella on digital transformation, etc.
                  </p>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="font-medium text-lg">3. Conflict Resolution</h3>
                  <p className="text-sm mt-1">
                    Executives debate contrasting approaches, weighing pros and cons to find the optimal strategy for your specific situation.
                  </p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h3 className="font-medium text-lg">4. Decision Synthesis</h3>
                  <p className="text-sm mt-1">
                    The final strategy combines the strongest insights from each executive, creating a balanced approach that addresses your company's unique challenges and opportunities.
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
