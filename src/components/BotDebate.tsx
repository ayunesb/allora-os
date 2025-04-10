
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useExecutiveDebate } from '@/hooks/useExecutiveDebate';
import ExecutiveBoardroom from '@/components/ai-debate/ExecutiveBoardroom';
import { MessageSquare, BookOpen, LineChart } from 'lucide-react';

export default function BotDebate() {
  return (
    <Card className="max-w-[1200px] mx-auto">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold">
          AI Executive Team Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="debate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="debate" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Executive Discussion
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Strategic Insights
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Market Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="debate">
            <ExecutiveBoardroom />
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Strategic Insights</h3>
              <p className="text-muted-foreground">
                In-depth analysis of your business goals and market position coming soon
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Market Analysis</h3>
              <p className="text-muted-foreground">
                Detailed market analysis and competitive positioning coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
