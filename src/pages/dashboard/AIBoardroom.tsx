
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AIExecutiveBoardroom } from '@/components/ai-boardroom/AIExecutiveBoardroom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { CircleDollarSign, Users } from 'lucide-react';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AIBoardroomPage() {
  const [boardroomTopic, setBoardroomTopic] = useState("");
  const [riskLevel, setRiskLevel] = useState("medium");
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Helmet>
        <title>AI Executive Boardroom | Allora AI</title>
      </Helmet>
      
      <PageTitle 
        title="AI Executive Boardroom"
        description="Witness your AI executive team debate and make strategic decisions for your business"
      >
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">Executive Strategy Debate</span>
        </div>
      </PageTitle>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="debate" className="space-y-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="debate">Executive Debate</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="debate" className="space-y-6">
                <AIExecutiveBoardroom
                  discussionTopic={boardroomTopic || "revenue growth strategy"}
                  riskLevel={riskLevel}
                />
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Discussion Topic</Label>
                    <Input
                      id="topic"
                      placeholder="Enter a business topic for executive debate..."
                      value={boardroomTopic}
                      onChange={(e) => setBoardroomTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="risk">Risk Appetite</Label>
                    <Select
                      value={riskLevel}
                      onValueChange={setRiskLevel}
                    >
                      <SelectTrigger id="risk">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                        <SelectItem value="medium">Balanced (Medium Risk)</SelectItem>
                        <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="mt-4">
                    <CircleDollarSign className="mr-2 h-4 w-4" />
                    Set Risk Strategy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
