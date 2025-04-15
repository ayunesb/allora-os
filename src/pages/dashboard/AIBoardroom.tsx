
import React from 'react';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { AIExecutiveBoardroom } from '@/components/ai-boardroom/AIExecutiveBoardroom';
import ExecutiveActionPanel from '@/components/executives/ExecutiveActionPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AIBoardroom() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <TypographyH1>AI Executive Boardroom</TypographyH1>
        <TypographyP>
          Your virtual boardroom of AI executives ready to provide strategic guidance and insights tailored to your business.
        </TypographyP>
      </div>

      <Tabs defaultValue="boardroom" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="boardroom">Executive Debate</TabsTrigger>
          <TabsTrigger value="action-panel">Executive Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="boardroom">
          <AIExecutiveBoardroom />
        </TabsContent>
        <TabsContent value="action-panel">
          <div className="grid md:grid-cols-1 gap-4">
            <TypographyP>
              Ask executives specific questions and they'll respond with insights plus take actions when needed, like checking revenue data or logging strategies to your tools.
            </TypographyP>
            <ExecutiveActionPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
