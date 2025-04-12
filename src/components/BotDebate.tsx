
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ExecutiveBoardroom from '@/components/ai-debate/ExecutiveBoardroom';
import { MessageSquare, BookOpen, LineChart, Briefcase, Sparkles } from 'lucide-react';
import ScrollableTabs, { TabItem } from '@/components/ui/scrollable-tabs';

export default function BotDebate() {
  const tabs: TabItem[] = [
    {
      id: "debate",
      label: "Executive Discussion",
      icon: MessageSquare
    },
    {
      id: "insights",
      label: "Strategic Insights",
      icon: BookOpen
    },
    {
      id: "analysis",
      label: "Market Analysis",
      icon: LineChart
    },
    {
      id: "innovations",
      label: "Innovation Ideas",
      icon: Sparkles
    },
    {
      id: "implementation",
      label: "Implementation Plan",
      icon: Briefcase
    }
  ];
  
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
          <ScrollableTabs 
            tabs={tabs} 
            className="safari-fix"
            variant="default"
          />
          
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
