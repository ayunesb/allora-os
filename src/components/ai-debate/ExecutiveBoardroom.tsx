
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, MessageCircle, Check, X, AlertTriangle } from 'lucide-react';
import { useExecutiveDebate } from '@/hooks/useExecutiveDebate';
import { formatRoleTitle } from '@/utils/consultation';

export default function ExecutiveBoardroom() {
  const { debateMessages, debateSummary, isLoading } = useExecutiveDebate();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        
        <div className="space-y-4 mt-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="bg-background/80">
              <CardContent className="p-4">
                <div className="flex gap-4 items-start">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Executive Boardroom Discussion</h2>
        <p className="text-muted-foreground">
          Your AI executive team analyzed your business needs and debated the best strategic approach
        </p>
      </div>
      
      {/* Executive Debate Messages */}
      <div className="space-y-4">
        {debateMessages.map(message => (
          <Card key={message.id} className="bg-background/80 border-muted/60 hover:border-muted transition-all">
            <CardContent className="pt-4 pb-4">
              <div className="flex gap-4 items-start">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={message.executive.avatar} alt={message.executive.name} />
                  <AvatarFallback>{message.executive.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.executive.name}</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      {formatRoleTitle(message.executive.role)}
                    </Badge>
                    {message.sentiment === 'positive' && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Supportive
                      </Badge>
                    )}
                    {message.sentiment === 'negative' && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200 text-xs">
                        <X className="h-3 w-3 mr-1" />
                        Concerned
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-md text-foreground/90">{message.content}</p>
                  
                  <div className="text-xs text-muted-foreground pt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Debate Summary */}
      {debateSummary && (
        <Card className="border-amber-200/30 bg-amber-50/10">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Executive Decision Summary
            </CardTitle>
            <CardDescription>
              The key findings and decisions from your AI executive team
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-green-500" />
                Agreed Points
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {debateSummary.agreedPoints.map((point, index) => (
                  <li key={index} className="text-sm">{point}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Points of Discussion
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {debateSummary.disagreedPoints.map((point, index) => (
                  <li key={index} className="text-sm">{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                Final Decision
              </h4>
              <p className="text-sm">{debateSummary.finalDecision}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
