
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExecutiveBoardroom from '@/components/ai-debate/ExecutiveBoardroom';
import { MessageSquare, BookOpen, LineChart, Briefcase, Sparkles } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';

export default function BotDebate() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTabletView = breakpoint === 'tablet';
  
  return (
    <Card className="max-w-[1200px] mx-auto">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl font-bold">
          Allora AI Executive Team Analysis
        </CardTitle>
        <CardDescription>
          See how our executive team collaborated to create your company's strategic plan
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="debate" className="space-y-6">
          <TabsList className="tabs-scrollable safari-fix">
            <TabsTrigger 
              value="debate" 
              className={`flex items-center ${isMobileView ? 'px-2 py-1 text-xs tab-compact' : isTabletView ? 'px-3 py-1.5 tab-text-sm' : 'gap-2'}`}
            >
              <MessageSquare className="h-4 w-4" />
              <span className={isMobileView ? "sr-only" : ""}>Executive Discussion</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="insights" 
              className={`flex items-center ${isMobileView ? 'px-2 py-1 text-xs tab-compact' : isTabletView ? 'px-3 py-1.5 tab-text-sm' : 'gap-2'}`}
            >
              <BookOpen className="h-4 w-4" />
              <span className={isMobileView ? "sr-only" : ""}>Strategic Insights</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="analysis" 
              className={`flex items-center ${isMobileView ? 'px-2 py-1 text-xs tab-compact' : isTabletView ? 'px-3 py-1.5 tab-text-sm' : 'gap-2'}`}
            >
              <LineChart className="h-4 w-4" />
              <span className={isMobileView ? "sr-only" : ""}>Market Analysis</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="innovations" 
              className={`flex items-center ${isMobileView ? 'px-2 py-1 text-xs tab-compact' : isTabletView ? 'px-3 py-1.5 tab-text-sm' : 'gap-2'}`}
            >
              <Sparkles className="h-4 w-4" />
              <span className={isMobileView ? "sr-only" : ""}>Innovation Ideas</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="implementation" 
              className={`flex items-center ${isMobileView ? 'px-2 py-1 text-xs tab-compact' : isTabletView ? 'px-3 py-1.5 tab-text-sm' : 'gap-2'}`}
            >
              <Briefcase className="h-4 w-4" />
              <span className={isMobileView ? "sr-only" : ""}>Implementation Plan</span>
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
          
          <TabsContent value="innovations">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Innovation Ideas</h3>
              <p className="text-muted-foreground">
                Cutting-edge innovation concepts for your business coming soon
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="implementation">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Implementation Plan</h3>
              <p className="text-muted-foreground">
                Step-by-step execution plan for your strategy coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
